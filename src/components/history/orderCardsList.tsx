"use client";

import { Container, Title, Stack, Group, Text, Divider, Center } from "@mantine/core";
import { Order } from "@/types/history/getOrdersResponse";
import OrderCard from "./orderCard";

interface OrderCardsListProps {
    orders: Order[];
}

export default function OrderCardsList({ orders }: OrderCardsListProps) {
    return (
        <>
            <Group
                my={'lg'}
                p={'0px'}
                visibleFrom="sm"
            >
                <Text
                    size="sm"
                    c="var(--text-muted)"
                    style={{ minWidth: "200px" }}
                >
                    Номер заказа
                </Text>
                <Text
                    size="sm"
                    c="var(--text-muted)"
                    style={{ flex: 1 }}
                >
                    Адрес доставки
                </Text>
                <Text
                    size="sm"
                    c="var(--text-muted)"
                    style={{ minWidth: "135px" }}
                >
                    Статус заказа
                </Text>
                <div style={{ width: "100px" }}></div>
            </Group>

            <Divider mt={'md'} color={'var(--border-color)'} visibleFrom="sm" />

            <Text
                size="lg"
                c="var(--text-primary)"
                mb="md"
                hiddenFrom="sm"
            >
                Заказы
            </Text>

            <Stack gap={'0px'}>
                {orders.length > 0 ? (
                    orders.map((order, index) => (
                        <OrderCard key={`${order._id}-${index}`} order={order} />
                    ))
                ) : (
                    <Center 
                        py="xl" 
                    >
                        <Text c="var(--text-muted)" ta="center">
                            Нет заказов
                        </Text>
                    </Center>
                )}
            </Stack>
        </>
    );
}
