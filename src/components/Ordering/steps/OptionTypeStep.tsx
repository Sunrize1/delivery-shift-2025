'use client';

import { CalculateDeliveryOption } from "@/types/delivery/CalculateDeliveryResponse";
import { Package } from "@/types/delivery/PackagesTypesResponse";
import { Point } from "@/types/delivery/PointsResponse";
import { Box, Flex, Group, Loader, Paper, Stack, Text, Title } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import PlaneIcon from '../../../assets/Ordering/Plane.svg';
import BusIcon from '../../../assets/Ordering/Bus.svg';
import AdIcon from '../../../assets/Ordering/Ad.svg';
import { notifications } from "@mantine/notifications";
import { UseFormReturnType } from "@mantine/form";
import { OrderDeliveryRequest, optionType } from "@/types/delivery/OrderDeliveryRequest";

interface OptionTypeStepProps {
  form: UseFormReturnType<OrderDeliveryRequest>;
}

interface DeliveryCalculationData {
  options: CalculateDeliveryOption[];
  senderPoint: Point;
  receiverPoint: Point;
  package: Package;
}

export default function OptionTypeStep({ form }: OptionTypeStepProps) {
  const [calculationData, setCalculationData] = useState<DeliveryCalculationData | null>(null);
  const router = useRouter();

  useEffect(() => {
    const data = localStorage.getItem('deliveryCalculation');
    if (data) {
      try {
        const parsedData = JSON.parse(data);
        setCalculationData(parsedData);
      } catch (error) {
        notifications.show({
          title: 'Ошибка',
          message: 'Не удалось загрузить данные расчета',
          color: 'red',
        });
        router.push('/');
      }
    } else {
      router.push('/');
    }
  }, [router]);

  const handleOptionSelect = (selectedOptionType: optionType) => {
    form.setFieldValue('optionType', selectedOptionType);
  };

  if (!calculationData) {
    return (
      <Stack align="center" py="xl">
        <Loader />
      </Stack>
    );
  }

  const selectedOption = form.values.optionType;

  return (
    <Stack gap={'xl'}>
      
      <Paper 
        p={'md'} 
        w={'100%'} 
        withBorder 
        bg={'var(--bg-primary)'}
        radius={'xl'}
        style={{ 
          cursor: 'pointer',
          border: selectedOption === optionType.DEFAULT ? '2px solid var(--mantine-color-green-6)' : undefined,
        }}
        onClick={() => handleOptionSelect(optionType.DEFAULT)}
      >
        <Group>
          <Box p={'sm'} style={{alignSelf: 'flex-start'}}>
            <Image src={BusIcon} alt="Bus" width={24} height={24} />
          </Box>
          <Flex direction={'column'} justify={'space-between'} gap={'xl'}>
            <Stack gap={'0px'}>
              <Text c={'var(--text-secondary)'}>{calculationData.options[0].name}</Text>
              <Title order={3}>{calculationData.options[0].price} ₽</Title>
            </Stack>
            <Text c={'var(--text-secondary)'}>{calculationData.options[0].days} дней</Text>
          </Flex>
        </Group>
      </Paper>
      
      <Paper 
        p={'md'} 
        w={'100%'} 
        withBorder 
        bg={'var(--bg-primary)'}
        radius={'xl'}
        style={{ 
          cursor: 'pointer',
          border: selectedOption === optionType.EXPRESS ? '2px solid var(--mantine-color-green-6)' : undefined,
        }}
        onClick={() => handleOptionSelect(optionType.EXPRESS)}
      >
        <Group>
          <Box p={'sm'} style={{alignSelf: 'flex-start'}}>
            <Image src={PlaneIcon} alt="Plane" width={24} height={24} />
          </Box>
          <Flex direction={'column'} justify={'space-between'} gap={'xl'}>
            <Stack gap={'0px'}>
              <Text c={'var(--text-secondary)'}>{calculationData.options[1].name}</Text>
              <Title order={3}>{calculationData.options[1].price} ₽</Title>
            </Stack>
            <Text c={'var(--text-secondary)'}>{calculationData.options[1].days} дней</Text>
          </Flex>
        </Group>
      </Paper>
      
      <Image src={AdIcon} alt="Ad" style={{
        width: "100%",
        height: "auto",
      }} />
    </Stack>
  );
} 