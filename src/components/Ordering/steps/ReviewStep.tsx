'use client';

import { Stack, Text, Paper, Group, Button, Title, Divider } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { OrderDeliveryRequest, payer, optionType } from "@/types/delivery/OrderDeliveryRequest";
import EditIcon from '../../../assets/Ordering/Edit.svg'
import Image from "next/image";
import { useEffect, useState } from "react";
import { CalculateDeliveryOption } from "@/types/delivery/CalculateDeliveryResponse";
import { notifications } from "@mantine/notifications";

interface ReviewStepProps {
  form: UseFormReturnType<OrderDeliveryRequest>;
  onEditStep: (stepIndex: number) => void;
}

export default function ReviewStep({ form, onEditStep }: ReviewStepProps) {
  const values = form.values;
  const [selectedOption, setSelectedOption] = useState<CalculateDeliveryOption | null>(null);

  useEffect(() => {
    const data = localStorage.getItem('deliveryCalculation');
    if (data) {
      try {
        const parsedData = JSON.parse(data);
        const options = parsedData.options;
        
        let selected = null;
        if (values.optionType === optionType.DEFAULT) {
          selected = options[0]; 
        } else if (values.optionType === optionType.EXPRESS) {
          selected = options[1];
        }
        
        setSelectedOption(selected);
      } catch (error) {
        notifications.show({
          title: 'Ошибка',
          message: 'Не удалось загрузить данные о доставке',
          color: 'red',
        });
      }
    }
  }, [values.optionType]);




  return (
    <Stack gap="md">
      

      <Paper p="md" radius={'xl'} bg={'var(--bg-secondary)'}>
        <Group justify="space-around" align="center">
          <Stack>
            <Text >Получатель</Text>
          </Stack>
          <Stack gap="xs">
            <Text size="sm" c="var(--text-secondary)">ФИО</Text>
            <Text>{values.receiver.lastname} {values.receiver.firstname} {values.receiver.middlename}</Text>
          </Stack>
          <Stack gap="xs">
            <Text size="sm" c="var(--text-secondary)">Телефон</Text>
            <Text >{values.receiver.phone}</Text>
          </Stack>
          <Image style={{cursor: 'pointer'}} src={EditIcon} alt="Edit" width={24} height={24} onClick={() => onEditStep(1)} />
        </Group>
      </Paper>

      <Paper p="md" radius={'xl'} bg={'var(--bg-secondary)'}>
        <Group justify="space-around" align="center">
        <Stack>
            <Text >Отправитель</Text>
          </Stack>
          <Stack gap="xs">
            <Text size="sm" c="var(--text-secondary)">ФИО</Text>
            <Text>{values.sender.lastname} {values.sender.firstname} {values.sender.middlename}</Text>
          </Stack>
          <Stack gap="xs">
            <Text size="sm" c="var(--text-secondary)">Телефон</Text>
            <Text >{values.sender.phone}</Text>
          </Stack>
          <Image style={{cursor: 'pointer'}} src={EditIcon} alt="Edit" width={24} height={24} onClick={() => onEditStep(2)} />
        </Group>
      </Paper>

      
      <Paper p="md" radius={'xl'} bg={'var(--bg-secondary)'}>
        <Group justify="space-around" align="center">
          <Stack>
              <Text >Откуда забрать</Text>
            </Stack>
            <Stack gap="xs">
              <Text size="sm" c="var(--text-secondary)">Адрес</Text>
              <Text>{values.senderAddress.street}, д. {values.senderAddress.house}
              {values.senderAddress.apartment && `, кв. ${values.senderAddress.apartment}`}</Text>
            </Stack>
            <Stack gap="xs">
              <Text size="sm" c="var(--text-secondary)">Заметка</Text>
              <Text >{values.senderAddress.comment}</Text>
            </Stack>
            <Image style={{cursor: 'pointer'}} src={EditIcon} alt="Edit" width={24} height={24} onClick={() => onEditStep(3)} />
        </Group>
      </Paper>

      <Paper p="md" radius={'xl'} bg={'var(--bg-secondary)'}>
        <Group justify="space-around" align="center">
          <Stack>
              <Text >Куда доставить</Text>
            </Stack>
            <Stack gap="xs">
              <Text size="sm" c="var(--text-secondary)">Адрес</Text>
              <Text>{values.receiverAddress.street}, д. {values.receiverAddress.house}
              {values.receiverAddress.apartment && `, кв. ${values.receiverAddress.apartment}`}</Text>
            </Stack>
            <Stack gap="xs">
              <Text size="sm" c="var(--text-secondary)">Заметка</Text>
              <Text >{values.receiverAddress.comment}</Text>
            </Stack>
            <Image style={{cursor: 'pointer'}} src={EditIcon} alt="Edit" width={24} height={24} onClick={() => onEditStep(4)} />
        </Group>
      </Paper>
      
        <Stack gap="md">
          <Group justify="flex-end">
            <Text size="lg">Итого:</Text>
            <Text size="lg" fw={600}>
              {selectedOption ? `${selectedOption.price} ₽` : '--- ₽'}
            </Text>
          </Group>
          
          <Group justify="flex-end">
            <Text c="var(--text-secondary)">Тариф:</Text>
            <Text>
              {selectedOption && selectedOption.name}
            </Text>
          </Group>
          
          <Group justify="flex-end">
            <Text c="var(--text-secondary)">Срок:</Text>
            <Text>
              {selectedOption ? `${selectedOption.days} дней` : '--- дней'}
            </Text>
          </Group>
        </Stack>
    </Stack>
  );
} 