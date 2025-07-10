'use client';

import { Radio, Stack, Text } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { OrderDeliveryRequest, payer } from "@/types/delivery/OrderDeliveryRequest";

interface PayerStepProps {
  form: UseFormReturnType<OrderDeliveryRequest>;
}

export default function PayerStep({ form }: PayerStepProps) {
  return (
    <Stack gap="md">
      
      <Radio.Group
        {...form.getInputProps('payer')}
        label="Плательщик"
        withAsterisk
      >
        <Stack gap="sm" mt="sm">
          <Radio
            value={payer.SENDER}
            label="Отправитель"
          />
          <Radio
            value={payer.RECEIVER}
            label="Получатель"
          />
        </Stack>
      </Radio.Group>
    </Stack>
  );
} 