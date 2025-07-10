'use client';
import { Box, Button, Card, Container, Flex, Group, Loader, Progress, Stack, Text, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CalculateDeliveryOption } from "@/types/delivery/CalculateDeliveryResponse";
import { Point } from "@/types/delivery/PointsResponse";
import { Package } from "@/types/delivery/PackagesTypesResponse";
import ChooseOptionForm from "@/components/Ordering/ChooseOptionForm";



export default function OrderingPage() {

  return (
    <Container size="lg" py="xl">
      <Stack mt={'100px'} gap={'xl'} w={464}>
        <Title order={2}>Способ отправки</Title>
        <Stack p={'0px'} gap={'xs'}>
            <Text>Шаг 1 из 7</Text>
            <Progress color="green" size={'sm'} radius={'xl'} value={15}/>
        </Stack>
        <ChooseOptionForm pickedOption={''} onOptionChange={() => {}}/>
      </Stack>
    </Container>
  );
}
