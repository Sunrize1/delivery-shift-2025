import { Box, Button, Flex, Group, TextInput, Title } from "@mantine/core";

export default function TrackPackageForm() {
    return (
        <Box w={'100%'} bg={'var(--bg-surface)'} p={'xl'} style={{ borderRadius: 16 }}>
            <Title order={2}>Отследить посылку</Title>
            <Flex direction={{base: 'column', md: 'row'}} gap={'md'} mt={'xl'}>
               <TextInput
                   placeholder="Номер заказа"
                   radius={'md'}
                   size="lg"
                   type="number"
               />
               <Button 
                   variant="filled"
                   radius={'lg'}
                   size="lg"
                   color={'blue'}>
                 Найти
               </Button>
            </Flex>
        </Box>
    )
}