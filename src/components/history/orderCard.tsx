import { Order } from "@/types/history/getOrdersResponse";
import { getStatusInfo } from "@/utils/enumsTranslators";
import { Card, Group, Text, Button, Badge, Stack, Divider, Box } from "@mantine/core";
import { useRouter } from "next/navigation";

interface OrderCardProps {
    order: Order;
}




export default function OrderCard({ order }: OrderCardProps) {
    const router = useRouter();
    const statusInfo = getStatusInfo(order.status);
    
    const fullAddress = `Россия, г.${order.receiverPoint.name} ул.${order.receiverAddress.street}, д. ${order.receiverAddress.house}`;

    const handleClick = () => {
        router.push(`/history/${order._id}`);
    }

    return (
        <Box 
            py={'lg'} 
        >
            <Group justify="space-between" align="center" visibleFrom="sm">
                <div style={{ minWidth: "150px" }}>
                    <Text size="md" fw={500} c="var(--text-primary)">
                        {order._id}
                    </Text>
                </div>

                <div style={{ flex: 1, minWidth: "200px" }}>
                    <Text size="md" c="var(--text-primary)" lineClamp={1}>
                        {fullAddress} {order.receiverAddress.apartment ? `, кв. ${order.receiverAddress.apartment}` : ''}
                    </Text>
                </div>

                <div style={{ minWidth: "120px" }}>
                    <Group gap="xs">
                        <Box
                            style={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                backgroundColor: statusInfo.color,
                            }}
                        />
                        <Text>{statusInfo.label}</Text>
                    </Group>
                </div>

                <Button
                    variant="subtle"
                    size="sm"
                    c="var(--text-muted)"
                    style={{ 
                        textDecoration: "underline",
                    }}
                    onClick={handleClick}
                >
                    Подробнее
                </Button>
            </Group>

            <Stack gap="md" hiddenFrom="sm">
                <Group justify="space-between" align="flex-start" wrap="nowrap">
                    <Stack gap="xs" style={{ flex: 1, minWidth: 0 }}>
                        <Text size="xs" c="var(--text-muted)" fw={500}>
                            Номер заказа
                        </Text>
                        <Text size="sm" fw={500} c="var(--text-primary)" truncate>
                            {order._id}
                        </Text>
                    </Stack>
                    
                    <Group gap="xs" style={{ flexShrink: 0 }}>
                        <Box
                            style={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                backgroundColor: statusInfo.color,
                            }}
                        />
                        <Text size="sm">{statusInfo.label}</Text>
                    </Group>
                </Group>

                <Stack gap="xs">
                    <Text size="xs" c="var(--text-muted)" fw={500}>
                        Адрес доставки
                    </Text>
                    <Text size="sm" c="var(--text-primary)" style={{ lineHeight: 1.4 }}>
                        {fullAddress}
                    </Text>
                </Stack>

                <Group justify="flex-end" mt="xs">
                    <Button
                        variant="subtle"
                        size="xs"
                        c="var(--text-muted)"
                        style={{ 
                            textDecoration: "underline",
                            padding: "4px 8px"
                        }}
                        onClick={handleClick}
                    >
                        Подробнее
                    </Button>
                </Group>
            </Stack>

            <Divider mt={'md'} color={'var(--border-color)'} />
        </Box>
    )
}