'use client';
import { Box, Button, Flex, Group, Select, Stack, Title } from "@mantine/core";
import MarkerIcon  from '../../assets/UI/Select/marker.svg';
import MailIcon from '../../assets/UI/Select/email.svg';
import PointerIcon from '../../assets/UI/Select/pointer.svg';
import ChevrinIcon from '../../assets/UI/Select/Chevron Down.svg';
import Image from "next/image";
import { useState } from "react";


export default function CalculateDeliveryForm() {
  const [fromCity, setFromCity] = useState<string | null>(null);
  const [toCity, setToCity] = useState<string | null>(null);
  const [packageSize, setPackageSize] = useState<string | null>(null);

  const cityOptions = [
    { value: 'moscow', label: 'Москва' },
    { value: 'spb', label: 'Санкт-Петербург' },
    { value: 'novosibirsk', label: 'Новосибирск' },
    { value: 'tomsk', label: 'Томск' },
  ];
  return (
    <Box bg="var(--bg-surface)" p="xl" style={{ borderRadius: 16 }}>
      <Title order={3}>Рассчитать доставку</Title>
      <Flex  direction={{base: 'column', sm: 'row'}} w={'100%'} gap={'md'} mt='lg' >
        <Stack w={'100%'}>
          <Select
              label="Город отправки"
              placeholder="Выберите город"
              radius={'md'}
              size="md"
              value={fromCity}
              onChange={setFromCity}
              leftSection={<Image src={MarkerIcon} alt="Marker Icon" />}
              rightSection={<Image src={ChevrinIcon} alt="Chevron Icon" />}
              data={cityOptions}
            />
            <Group>
              <a className="city-tag" onClick={() => setFromCity('spb')}>
                Санкт-Петербург
              </a>
              <a className="city-tag" onClick={() => setFromCity('novosibirsk')}>
                Новосибирск
              </a>
              <a className="city-tag" onClick={() => setFromCity('tomsk')}>
                Томск
              </a>
            </Group>
        </Stack>
        <Stack w={'100%'}>
          <Select
              label="Город назначения"
              placeholder="Выберите город"
              radius={'md'}
              size="md"
              value={toCity}
              onChange={setToCity}
              leftSection={<Image src={PointerIcon} alt="Pointer Icon" />}
              rightSection={<Image src={ChevrinIcon} alt="Chevron Icon" />}
              data={cityOptions}
            />
            <Group>
              <a className="city-tag" onClick={() => setToCity('moscow')}>
                Москва
              </a>
              <a className="city-tag" onClick={() => setToCity('novosibirsk')}>
                Новосибирск
              </a>
              <a className="city-tag" onClick={() => setToCity('tomsk')}>
                Томск
              </a>
            </Group>

        </Stack>
        <Stack w={'100%'}>
          <Select
              label="Размер посылки"
              placeholder="Выберите размер"
              radius={'md'}
              size="md"
              value={packageSize}
              onChange={setPackageSize}
              leftSection={<Image src={MailIcon} alt="Mail Icon" />}
              rightSection={<Image src={ChevrinIcon} alt="Chevron Icon" />}
              data={[
                { value: 'envelope', label: 'Конверт' },
                { value: 'small_box', label: 'Маленькая коробка' },
                { value: 'medium_box', label: 'Средняя коробка' },
                { value: 'large_box', label: 'Большая коробка' },
              ]}
            />
        </Stack>

      </Flex>
      <Group w={'100%'} justify={'flex-end'} mt='xl'>
        <Button
        variant="filled"
        radius={'lg'}
        size='xl'
        color={'blue'}
        w={{base: '100%', md: '32.5%'}}>
            Рассчитать
        </Button>
      </Group>
    </Box>
  );
}
