import { cancelOrder } from "@/api/history/cancelOrder";
import { Button, Modal, Stack, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications, showNotification } from "@mantine/notifications";
import Image from "next/image";
import AcceptIcon from '../../assets/history/Accept.svg'

interface CancelOrderModalProps {
    orderId: string;
    isOpen: boolean;
    onClose: () => void;
}

export default function CancelOrderModal({ orderId, isOpen, onClose }: CancelOrderModalProps) {

    const handleCancelOrder = async () => {
        try {
            await cancelOrder(orderId);
            showNotification({
                title: 'Заказ отменен',
                message: 'Заказ успешно отменен',
                color: 'green',
            })
            onClose();
        } catch (error) {
            notifications.show({
                title: 'Ошибка',
                message: 'Не удалось отменить заказ',
                color: 'red',
            })
            onClose()
        }
    }

    return (
        <Modal radius={'lg'} opened={isOpen} onClose={onClose} centered>
            <Stack align="center" p={'xl'}>
                <Image src={AcceptIcon} width={56} height={56} alt="Accept" />
                <Title order={3}>Отменить заказ?</Title>
                <Button w={'100%'} variant="outline"  onClick={handleCancelOrder}>
                    Отменить
                </Button>
                <Button w={'100%'}  variant="filled"  onClick={onClose}>Не отменять</Button>
            </Stack>
        </Modal>
    )
}