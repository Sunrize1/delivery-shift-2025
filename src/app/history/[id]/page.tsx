'use client';

import { redirect, useParams } from "next/navigation";
import { getOrderDetails } from "@/api/history/getOrderDetails";
import { Order } from "@/types/history/getOrdersResponse";
import { useEffect, useState } from "react";
import { notifications } from "@mantine/notifications";
import { Center, Container, Loader } from "@mantine/core";
import OrderCardDetails from "@/components/history/orderCardDetails";

export default function HistoryPage() {
    const { id } = useParams();

    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                setLoading(true);
                const response = await getOrderDetails(id as string);
                setOrder(response.data.order);
            } catch (error) {
                notifications.show({
                    title: "Ошибка",
                    message: "Не удалось загрузить заказ",
                    color: "red",
                });
                redirect('/history');
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [id]);

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
        <Container size={'lg'}>
            <OrderCardDetails order={order} />
        </Container>
    );
}