'use client';

import { Button, Container, Group, Paper, Stack, Text, Title, Box, Flex } from "@mantine/core";
import { useRouter } from "next/navigation";
import { OrderDeliveryResponse } from "@/types/delivery/OrderDeliveryResponse";
import SuccessIcon from '../../assets/Ordering/Success.svg'
import Image from "next/image";

interface OrderSuccessPageProps {
  orderData: OrderDeliveryResponse;
}

export default function OrderSuccessPage({ orderData }: OrderSuccessPageProps) {
  const router = useRouter();

  const getStatusLabel = (status: number) => {
    switch (status) {
      case 0:
        return "Создан";
      case 1:
        return "В пути";
      case 2:
        return "Доставлен";
      default:
        return "Неизвестно";
    }
  };

  const getOptionLabel = (option: string) => {
    switch (option) {
      case "DEFAULT":
        return "Обычная доставка";
      case "EXPRESS":
        return "Экспресс доставка";
      default:
        return option;
    }
  };

  const orderNumber = `123456789123`;

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl" mt="100px">
        <Group align="center" gap="md">
          <Image src={SuccessIcon} alt="Success" width={80} height={80} />
          <Title order={2} >Заявка отправлена</Title>

        </Group>
        <Text  c="var(--text-secondary)">
            Вы можете оплатить ваш заказ в разделе «Профиль»
          </Text>

        <Paper p="xl" radius="xl" bg="var(--bg-primary)" withBorder w="100%" maw={600}>
          <Stack gap="lg">
            <Stack gap="xs">
              <Text size="sm" c="var(--text-secondary)">Номер заказа</Text>
              <Text fw={600}>{orderNumber}</Text>
            </Stack>

            <Stack gap="xs">
              <Text size="sm" c="var(--text-secondary)">Статус</Text>
              <Group gap="xs">
                <Box
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--mantine-color-yellow-6)',
                  }}
                />
                <Text>{getStatusLabel(orderData.order.status)}</Text>
              </Group>
            </Stack>

            <Stack gap="xs">
              <Text size="sm" c="var(--text-secondary)">Адрес доставки</Text>
              <Text>
                Россия, г. {orderData.order.receiverPoint.name}, {orderData.order.receiverAddress.street}, д. {orderData.order.receiverAddress.house}
                {orderData.order.receiverAddress.apartment && `, кв. ${orderData.order.receiverAddress.apartment}`}
              </Text>
            </Stack>

            <Stack gap="xs">
              <Text size="sm" c="var(--text-secondary)">Тип доставки</Text>
              <Text>{getOptionLabel(orderData.order.option)}</Text>
            </Stack>
          </Stack>
          <Text mt={'lg'} size="sm" c="var(--text-secondary)" >
          Вся информация была продублирована в SMS
        </Text>
        </Paper>


        <Flex gap="md" w={{base: '100%', sm: '500'}} direction={{base: 'column', sm: 'row'}}>
          <Button 
            variant="outline"
            w={'100%'}
            onClick={() => router.push('/profile')}
          >
            Посмотреть статус
          </Button>
          <Button 
            w={'100%'}
            onClick={() => router.push('/')}
          >
            На главную
          </Button>
        </Flex>
      </Stack>
    </Container>
  );
} 