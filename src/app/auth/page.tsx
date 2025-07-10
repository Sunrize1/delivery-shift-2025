

import { Center, Stack, Loader, Container, Title, Text} from '@mantine/core';
import AuthForm from '@/components/Auth/AuthForm';

export default function AuthPage() {



  return (
    <Container size={'lg'} py={48}>
      <Stack gap={'xl'}>
        <Stack gap={'md'}>
          <Title order={2}>Авторизация</Title>
          <Text c="var(--text-secondary)">
            Введите номер телефона для входа в личный кабинет
          </Text>
        </Stack>
        <AuthForm />
      </Stack>
    </Container>
  );
}