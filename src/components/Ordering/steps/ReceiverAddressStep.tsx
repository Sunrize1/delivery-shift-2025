'use client';

import { Stack, Text, TextInput, Textarea, Checkbox, Group, HoverCard } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { OrderDeliveryRequest } from "@/types/delivery/OrderDeliveryRequest";
import InfoIcon from '../../../assets/Ordering/Info.svg'
import Image from "next/image";

interface ReceiverAddressStepProps {
  form: UseFormReturnType<OrderDeliveryRequest>;
}

export default function ReceiverAddressStep({ form }: ReceiverAddressStepProps) {
  return (
    <Stack gap="md">

      
      <TextInput
        label="Улица"
        placeholder="Улица"
        withAsterisk
        {...form.getInputProps('receiverAddress.street')}
      />
      
      <TextInput
        label="Дом"
        placeholder="Дом"
        withAsterisk
        {...form.getInputProps('receiverAddress.house')}
      />
      
      <TextInput
        label="Квартира"
        placeholder="Квартира"
        {...form.getInputProps('receiverAddress.apartment')}
      />
      
      <TextInput
        label="Заметка"
        placeholder="Заметка для курьера"
        {...form.getInputProps('receiverAddress.comment')}
      />
      
      <Group>
        <Checkbox
          label="Оставить заказ у двери"
          size="md"
          {...form.getInputProps('receiverAddress.isNonContact', { type: 'checkbox' })}
        />
        <HoverCard width={340}  position="bottom-start" withArrow shadow="md">
          <HoverCard.Target>
            <Image style={{cursor: 'pointer'}} src={InfoIcon} alt="Info" width={24} height={24} />
          </HoverCard.Target>
          <HoverCard.Dropdown>
            <Stack gap={'xs'}>
              <Text>Бесконтактная доставка</Text>
            <Text c="var(--text-secondary)">
            Курьер привозит заказ, оставляет его у двери и уходит, а вам приходит уведомление на телефон о том, что заказ доставлен
            </Text>
            </Stack>
          </HoverCard.Dropdown>
        </HoverCard>
      </Group>
    </Stack>
  );
} 