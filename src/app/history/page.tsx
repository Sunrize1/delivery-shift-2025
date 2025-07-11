"use client";

import { Container, Title, Loader, Text, Stack, Center } from "@mantine/core";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getOrders } from "@/api/history/getOrders";
import { Order } from "@/types/history/getOrdersResponse";
import OrderCardsList from "@/components/history/orderCardsList";
import { notifications } from "@mantine/notifications";

export default function HistoryPage() {
    const { isAuthenticated } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!isAuthenticated) return;
            
            try {
                setLoading(true);
                const response = await getOrders();
                setOrders(response.data.orders);
            } catch (err) {
                notifications.show({
                    title: "Ошибка",
                    message: "Не удалось загрузить заказы",
                    color: "red",
                });
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [isAuthenticated]);

    if (loading) {
        return (
            <Container 
                size="lg" 
                mt="xl"
                px="md"
                style={{ minHeight: "100vh" }}
            >
                <Center>
                    <Loader size="lg" />
                </Center>
            </Container>
        );
    }

    return (
        <Container 
            size="lg" 
            mt="xl"
        >
            <Title 
                order={2} 
                mb="xl"
                c="var(--text-primary)"
            >
                История
            </Title>
            <OrderCardsList orders={orders} />
        </Container>
    );
}
