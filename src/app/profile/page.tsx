'use client';

import { useAuth } from "@/context/AuthContext";
import { Container, Title, Stack, Group, Button, TextInput, Select, Box, Flex } from "@mantine/core";
import { useForm } from "@mantine/form";
import { updateProfile } from "@/api/profile/updateProfile";
import { notifications } from "@mantine/notifications";
import ChevronDownIcon from '../../assets/UI/Select/Chevron Down.svg'
import Image from "next/image";

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  
  const form = useForm({
    initialValues: {
      firstname: user?.firstname || '',
      middlename: user?.middlename || '',
      lastname: user?.lastname || '',
      phone: user?.phone || '',
      email: user?.email || '',
      city: user?.city || ''
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      const response = await updateProfile(values);
      
      updateUser(response.data);
      
      notifications.show({
        title: 'Успешно',
        message: 'Профиль обновлен',
        color: 'green',
      });
    } catch (error) {
      notifications.show({
        title: 'Ошибка',
        message: 'Не удалось обновить профиль',
        color: 'red',
      });
    }
  };

  return (
    <Container 
      size="lg"
      h={'100vh'}
      mt={113}
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap={24}>
          <Title order={2} size="h2" fw={700} c="var(--text-primary)">
            Профиль
          </Title>
          
          <Flex 
            gap={24} 
            align="flex-start" 
            direction={{base: 'column', md: 'row'}}
          >
            <Stack gap={24} w={'100%'}>
              <TextInput
                label="Имя"
                placeholder="Введите имя"
                {...form.getInputProps('firstname')}
              />
              
              <TextInput
                label="Фамилия"
                placeholder="Введите фамилию"
                {...form.getInputProps('lastname')}
              />
              
              <TextInput
                label="Отчество"
                placeholder="Введите отчество"
                {...form.getInputProps('middlename')}
              />
            </Stack>

            <Stack gap={24} w={'100%'}>
              <TextInput
                label="Номер телефона"
                {...form.getInputProps('phone')}
                readOnly
                disabled
              />
              
              <TextInput
                label="Email"
                placeholder="Введите email"
                {...form.getInputProps('email')}
              />
              
              <Select
                label="Город"
                placeholder="Выберите город"
                {...form.getInputProps('city')}
                rightSection={<Image src={ChevronDownIcon} alt="Chevron Down" />}
                data={[
                  { value: 'moscow', label: 'Москва' },
                  { value: 'spb', label: 'Санкт-Петербург' },
                  { value: 'novosibirsk', label: 'Новосибирск' },
                  { value: 'ekaterinburg', label: 'Екатеринбург' },
                  { value: 'kazan', label: 'Казань' },
                  { value: 'nizhny', label: 'Нижний Новгород' },
                  { value: 'chelyabinsk', label: 'Челябинск' },
                  { value: 'samara', label: 'Самара' },
                  { value: 'omsk', label: 'Омск' },
                  { value: 'rostov', label: 'Ростов-на-Дону' }
                ]}
              />
            </Stack>
          </Flex>

          <Box mt={16}>
            <Button
              type="submit"
              size="xl"
              w={{base: '100%', md: 328}}
            >
              Обновить данные
            </Button>
          </Box>
        </Stack>
      </form>
    </Container>
  );
}