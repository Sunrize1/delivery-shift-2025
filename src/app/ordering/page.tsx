'use client';
import { Container, Progress, Stack, Text, Title, Button, Group, Flex } from "@mantine/core";
import { useState, useEffect } from "react";
import { useForm } from "@mantine/form";
import { OrderDeliveryRequest, payer, optionType } from "@/types/delivery/OrderDeliveryRequest";
import { OrderDeliveryResponse } from "@/types/delivery/OrderDeliveryResponse";
import { notifications } from "@mantine/notifications";
import { orderDelivery } from "@/api/delivery/orderDelivery";
import { useRouter } from "next/navigation";
import { phoneMapper } from "@/utils/phoneMapper";
import OrderSuccessPage from "@/components/Ordering/OrderSuccessPage";

import OptionTypeStep from "@/components/Ordering/steps/OptionTypeStep";
import ReceiverStep from "@/components/Ordering/steps/ReceiverStep";
import SenderStep from "@/components/Ordering/steps/SenderStep";
import ReceiverAddressStep from "@/components/Ordering/steps/ReceiverAddressStep";
import SenderAddressStep from "@/components/Ordering/steps/SenderAddressStep";
import PayerStep from "@/components/Ordering/steps/PayerStep";
import ReviewStep from "@/components/Ordering/steps/ReviewStep";

const STEPS = [
  { title: "Способ отправки", description: "Выберите тип доставки" },
  { title: "Получатель", description: "Данные получателя" },
  { title: "Отправитель", description: "Данные отправителя" },
  { title: "Откуда забрать", description: "Откуда забрать" },
  { title: "Куда доставить", description: "Куда доставить" },
  { title: "Оплата доставки", description: "Кто оплачивает" },
  { title: "Проверка данных заказа", description: "Проверьте данные заказа" },
];

export default function OrderingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<OrderDeliveryResponse | null>(null);
  const router = useRouter();

  const form = useForm<OrderDeliveryRequest>({
    initialValues: {
      packageId: '',
      optionType: optionType.DEFAULT,
      senderPointId: '',
      senderAddress: {
        street: '',
        house: '',
        apartment: '',
        comment: '',
      },
      sender: {
        firstname: '',
        lastname: '',
        middlename: '',
        phone: '',
      },
      receiverPointId: '',
      receiverAddress: {
        street: '',
        house: '',
        apartment: '',
        comment: '',
        isNonContact: false,
      },
      receiver: {
        firstname: '',
        lastname: '',
        middlename: '',
        phone: '',
      },
      payer: payer.SENDER,
    },
    validate: (values) => {
      const errors: any = {};
      
      if (currentStep === 0 && !values.optionType) {
        errors.optionType = 'Выберите тип доставки';
      }
      
      if (currentStep === 1) {
        if (!values.receiver.firstname) errors['receiver.firstname'] = 'Введите имя получателя';
        if (!values.receiver.lastname) errors['receiver.lastname'] = 'Введите фамилию получателя';
        if (!values.receiver.phone || values.receiver.phone.length < 18) {
          errors['receiver.phone'] = 'Введите корректный телефон получателя';
        }
      }
      
      if (currentStep === 2) {
        if (!values.sender.firstname) errors['sender.firstname'] = 'Введите имя отправителя';
        if (!values.sender.lastname) errors['sender.lastname'] = 'Введите фамилию отправителя';
        if (!values.sender.phone || values.sender.phone.length < 18) {
          errors['sender.phone'] = 'Введите корректный телефон отправителя';
        }
      }

      if (currentStep === 3) {
        if (!values.senderAddress.street) errors['senderAddress.street'] = 'Введите улицу';
        if (!values.senderAddress.house) errors['senderAddress.house'] = 'Введите дом';
      }
      
      if (currentStep === 4) {
        if (!values.receiverAddress.street) errors['receiverAddress.street'] = 'Введите улицу';
        if (!values.receiverAddress.house) errors['receiverAddress.house'] = 'Введите дом';
      }
      
      
      return errors;
    },
  });

  const nextStep = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (form.validate().hasErrors) {
      notifications.show({
        title: 'Ошибка валидации',
        message: 'Пожалуйста, заполните все обязательные поля',
        color: 'red',
      });
      return;
    }
    
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (stepIndex: number) => {
    setCurrentStep(stepIndex);
  };

  useEffect(() => {
    const data = localStorage.getItem('deliveryCalculation');
    if (data) {
      try {
        const parsedData = JSON.parse(data);
        form.setValues({
          ...form.values,
          packageId: parsedData.package?.id || '',
          senderPointId: parsedData.senderPoint?.id || '',
          receiverPointId: parsedData.receiverPoint?.id || '',
        });
      } catch (error) {
        console.error('Failed to parse delivery calculation data:', error);
      }
    }
  }, []);

  const handleSubmit = async (values: OrderDeliveryRequest) => {
    if (currentStep !== STEPS.length - 1) {
      return;
    }
    
    
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      const preparedData = {
        ...values,
        sender: {
          ...values.sender,
          phone: phoneMapper(values.sender.phone),
        },
        receiver: {
          ...values.receiver,
          phone: phoneMapper(values.receiver.phone),
        },
      };
      
      const response = await orderDelivery(preparedData);
      
      if (response.data.success) {
        setOrderSuccess(response.data);
        localStorage.removeItem('deliveryCalculation');
      } else {
        notifications.show({
          title: 'Ошибка',
          message: response.data.reason || 'Не удалось создать заказ',
          color: 'red',
        });
      }
    } catch (error) {
      notifications.show({
        title: 'Ошибка',
        message: 'Не удалось создать заказ',
        color: 'red',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <OptionTypeStep form={form} />;
      case 1:
        return <ReceiverStep form={form} />;
      case 2:
        return <SenderStep form={form} />;
      case 3:
        return <SenderAddressStep form={form} />;
      case 4:
        return <ReceiverAddressStep form={form} />;
      case 5:
        return <PayerStep form={form} />;
      case 6:
        return <ReviewStep form={form} onEditStep={goToStep} />;
      default:
        return <OptionTypeStep form={form} />;
    }
  };

  if (orderSuccess) {
    return <OrderSuccessPage orderData={orderSuccess.order} />;
  }

  return (
    <Container size="lg" py="xl">
      <Stack mt={'100px'} gap={'xl'} w={{base: '100%', sm: currentStep === 6 ? "100%" : '464px'}}>
        <Title order={2}>{STEPS[currentStep].title}</Title>
        <Stack p={'0px'} gap={'xs'}>
          <Text>Шаг {currentStep + 1} из {STEPS.length}</Text>
          <Progress 
            color="green" 
            size={'sm'} 
            radius={'xl'} 
            w={{base: '100%', sm:'464px'}}
            value={((currentStep + 1) / STEPS.length) * 100}
          />
        </Stack>
        
        <form onSubmit={form.onSubmit(handleSubmit)}>
          {renderStep()}
          <Flex justify="space-between" mt="xl" direction={{base: 'column', sm: 'row'}} gap={'xl'}>
            <Button 
              variant="outline"
              w={'100%'}
              onClick={prevStep}
              disabled={currentStep === 0}
            >
              Назад
            </Button>
            
            {currentStep === STEPS.length - 1 ? (
              <Button type="button"  onClick={() => handleSubmit(form.values)} loading={isSubmitting} disabled={isSubmitting} w={'100%'}>
                Создать заказ
              </Button>
            ) : (
              <Button type="button" onClick={(e) => nextStep(e)} w={'100%'}>
                Далее
              </Button>
            )}
          </Flex>
        </form>
      </Stack>
    </Container>
  );
}
