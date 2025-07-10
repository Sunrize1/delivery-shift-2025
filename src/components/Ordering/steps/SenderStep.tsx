'use client';

import { Input, Stack, Text, TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { OrderDeliveryRequest } from "@/types/delivery/OrderDeliveryRequest";
import { IMaskInput } from "react-imask";

interface SenderStepProps {
  form: UseFormReturnType<OrderDeliveryRequest>;
}

export default function SenderStep({ form }: SenderStepProps) {
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