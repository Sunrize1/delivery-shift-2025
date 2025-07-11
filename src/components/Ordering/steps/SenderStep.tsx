'use client';

import { Input, Stack, Text, TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { OrderDeliveryRequest } from "@/types/delivery/OrderDeliveryRequest";
import { IMaskInput } from "react-imask";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

interface SenderStepProps {
  form: UseFormReturnType<OrderDeliveryRequest>;
}

export default function SenderStep({ form }: SenderStepProps) {
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated && user) {
      if (!form.values.sender.firstname) {
        form.setFieldValue('sender.firstname', user.firstname);
      }
      if (!form.values.sender.lastname) {
        form.setFieldValue('sender.lastname', user.lastname);
      }
      if (!form.values.sender.middlename) {
        form.setFieldValue('sender.middlename', user.middlename);
      }
      if (!form.values.sender.phone) {
        form.setFieldValue('sender.phone', user.phone);
      }
    }
  }, [isAuthenticated, user]);
  return (
    <Stack gap="md">
      
      <TextInput
        label="Фамилия"
        placeholder="Фамилия"
        withAsterisk
        {...form.getInputProps('sender.lastname')}
      />
      
      <TextInput
        label="Имя"
        placeholder="Имя"
        withAsterisk
        {...form.getInputProps('sender.firstname')}
      />
      
      <TextInput
        label="Отчество"
        placeholder="Отчество (при наличии)"
        {...form.getInputProps('sender.middlename')}
      />
      
      <Input.Wrapper size="lg" label="Телефон" withAsterisk>
        <Input
          component={IMaskInput} 
          mask="+7 (000) 000-00-00"
          placeholder="+7 (999) 123-45-67"
          {...form.getInputProps('sender.phone')}
        />
        {form.errors['sender.phone'] && (
          <Text size="sm" c="var(--mantine-color-error)" mt={5}>
            {form.errors['sender.phone']}
          </Text>
        )}
      </Input.Wrapper>
    </Stack>
  );
} 