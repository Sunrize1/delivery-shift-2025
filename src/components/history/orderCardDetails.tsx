import { Order } from "@/types/history/getOrdersResponse";
import { Paper, Stack, Title, Text, Group, Button, Flex } from "@mantine/core";
import { getOptionLabel, getStatusInfo } from "@/utils/enumsTranslators";
import { useRouter } from "next/navigation";
import DeliveryProgressBar from "./DeliveryProgressBar";
import CancelOrderModal from "./CancelOrderModal";
import { useState } from "react";

interface OrderCardDetailsProps {
    order: Order | null;
}

export default function OrderCardDetails({ order }: OrderCardDetailsProps) {
    const [isCancelOrderModalOpen, setIsCancelOrderModalOpen] = useState(false);
    const router = useRouter();
    const fullAddress = `Россия, г.${order?.receiverPoint.name} ул.${order?.receiverAddress.street}, д. ${order?.receiverAddress.house}`;
    return (
        <Stack mt={113} gap="xl">
            <Title order={2}>{'Заказ №' + order?._id}</Title>
            
            <Group align="flex-start" gap="xl" wrap="nowrap">
                <Paper withBorder py={'lg'} px={'xl'} bg={'var(--bg-primary)'} radius={'lg'} style={{ flex: 1 }}>
                    <Stack gap="lg">
                        <Stack gap={'xs'}>
                            <Text size="sm" c="var(--text-secondary)">Статус</Text>
                            <Text fw={500}>{getStatusInfo(order?.status ?? 0).label}</Text>
                            <DeliveryProgressBar currentStatus={order?.status ?? 0} />
                        </Stack>
                        <Stack gap={'xs'}>
                            <Text size="sm" c="var(--text-secondary)">Адрес доставки</Text>
                            <Text fw={500}>{fullAddress} {order?.receiverAddress.apartment ? `, кв. ${order?.receiverAddress.apartment}` : ''}</Text>
                        </Stack>
                        <Stack gap={'xs'}>
                            <Text size="sm" c="var(--text-secondary)">Тип доставки</Text>
                            <Text fw={500}>{getOptionLabel(order?.option ?? '')}</Text>
                        </Stack>
                        <Flex w={{base: '100%', sm: '450px'}} gap={'lg'} direction={{base: 'column', sm: 'row'}}>
                            <Button flex={{base: 'auto', sm: '1'}}  variant="outline" color="var(--mantine-color-gray-6)" onClick={() => router.back()}>
                            Назад
                            </Button>
                            <Button disabled={!order?.cancellable} flex={{base: 'auto', sm: '1'}} variant="filled" color="var(--mantine-color-gray-6)" onClick={() => setIsCancelOrderModalOpen(true)}>
                              Отменить заказ
                            </Button>
                        </Flex>
                    </Stack>
                </Paper>

            </Group>
            <CancelOrderModal orderId={order?._id ?? ''} isOpen={isCancelOrderModalOpen} onClose={() => setIsCancelOrderModalOpen(false)} />
        </Stack>
    );
}