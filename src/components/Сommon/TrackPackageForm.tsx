'use client'
import { Box, Button, Flex, Group, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";

export default function TrackPackageForm() {
    const router = useRouter();
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            orderId: '',
        },
        validate: {
            orderId: (value) => value.length > 0 ? null : 'Номер заказа обязателен',
        },
    })
    
    return (
        <Box w={'100%'} bg={'var(--bg-surface)'} p={'xl'} style={{ borderRadius: 16 }}>
            <Title order={2}>Отследить посылку</Title>
            <Flex direction={{base: 'column', md: 'row'}} gap={'md'} mt={'xl'}>
               <TextInput
                   placeholder="Номер заказа"
                   type="number"
                   {...form.getInputProps('orderId')}
               />
               <Button 
                   variant="filled"
                   onClick={() => router.push(`/history/${form.values.orderId}`)}
                   >
                 Найти
               </Button>
            </Flex>
        </Box>
    )
}