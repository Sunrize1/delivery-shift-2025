'use client';

import { Input, Stack, Text, TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { OrderDeliveryRequest } from "@/types/delivery/OrderDeliveryRequest";
import { IMaskInput } from "react-imask";

interface ReceiverStepProps {
  form: UseFormReturnType<OrderDeliveryRequest>;
}

export default function ReceiverStep({ form }: ReceiverStepProps) {
  return (
    <Stack gap="md">
      <TextInput
        label="Фамилия"
        placeholder="Фамилия"
        withAsterisk
        {...form.getInputProps('receiver.lastname')}
      />
      
      <TextInput
        label="Имя"
        placeholder="Имя"
        withAsterisk
        {...form.getInputProps('receiver.firstname')}
      />
      
      <TextInput
        label="Отчество"
        placeholder="Отчество (при наличии)"
        {...form.getInputProps('receiver.middlename')}
      />
      
      <Input.Wrapper size="lg" label="Телефон" withAsterisk>
        <Input
          component={IMaskInput} 
          mask="+7 (000) 000-00-00"
          placeholder="+7 (999) 123-45-67"
          {...form.getInputProps('receiver.phone')}
        />
        {form.errors['receiver.phone'] && (
          <Text size="sm" c="var(--mantine-color-error" mt={5}>
            {form.errors['receiver.phone']}
          </Text>
        )}
      </Input.Wrapper>
    </Stack>
  );
} 