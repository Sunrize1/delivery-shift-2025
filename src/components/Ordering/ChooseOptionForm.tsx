'use client'

import { CalculateDeliveryOption } from "@/types/delivery/CalculateDeliveryResponse";
import { Package } from "@/types/delivery/PackagesTypesResponse";
import { Point } from "@/types/delivery/PointsResponse";
import { Box, Container, Flex, Group, Loader,  Paper,  Stack, Text, Title } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import PlaneIcon from '../../assets/Ordering/Plane.svg'
import BusIcon from '../../assets/Ordering/Bus.svg'
import AdIcon from '../../assets/Ordering/Ad.svg'
import { notifications } from "@mantine/notifications";

interface ChooseOptionFormProps {
    pickedOption: string;
    onOptionChange: (option: string) => void;
}

interface DeliveryCalculationData {
    options: CalculateDeliveryOption[];
    senderPoint: Point;
    receiverPoint: Point;
    package: Package;
  }

export default function ChooseOptionForm({pickedOption, onOptionChange}: ChooseOptionFormProps) {
    const [calculationData, setCalculationData] = useState<DeliveryCalculationData | null>(null);
    const [selectedOption, setSelectedOption] = useState<string | null>(pickedOption);
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
  
  
    if (!calculationData) {
      return (
        <Container size="lg" py="xl">
          <Loader/>
        </Container>
      );
    }
  
    return (
       <Stack gap={'xl'}>
        <Paper p={'md'} w={'100%'} withBorder radius={'xl'}>
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
        <Paper p={'md'} w={'100%'} withBorder radius={'xl'}>
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
    )
}