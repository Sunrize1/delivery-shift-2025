'use client';

import { Stack, Text, TextInput, Textarea } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { OrderDeliveryRequest } from "@/types/delivery/OrderDeliveryRequest";

interface SenderAddressStepProps {
  form: UseFormReturnType<OrderDeliveryRequest>;
}

export default function SenderAddressStep({ form }: SenderAddressStepProps) {
  return (
    <Stack gap="md">

      
      <TextInput
        label="Улица"
        placeholder="Улица"
        withAsterisk
        {...form.getInputProps('senderAddress.street')}
      />
      
      <TextInput
        label="Дом"
        placeholder="Дом"
        withAsterisk
        {...form.getInputProps('senderAddress.house')}
      />
      
      <TextInput
        label="Квартира"
        placeholder="Квартира"
        {...form.getInputProps('senderAddress.apartment')}
      />
      
      <TextInput
        label="Заметка"
        placeholder="Заметка для курьера"
        {...form.getInputProps('senderAddress.comment')}
      />
    </Stack>
  );
} 