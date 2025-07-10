'use client';
import { Box, Button, Flex, Group, Select, Stack, Title } from "@mantine/core";
import MarkerIcon  from '../../assets/UI/Select/marker.svg';
import MailIcon from '../../assets/UI/Select/email.svg';
import PointerIcon from '../../assets/UI/Select/pointer.svg';
import ChevrinIcon from '../../assets/UI/Select/Chevron Down.svg';
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getPoints } from "@/api/delivery/getPoints";
import { getPackagesTypes } from "@/api/delivery/getPackagesTypes";
import { calculateDelivery } from "@/api/delivery/calculateDelivery";
import { Point } from "@/types/delivery/PointsResponse";
import { Package } from "@/types/delivery/PackagesTypesResponse";
import { notifications } from "@mantine/notifications";

export default function CalculateDeliveryForm() {
  const [fromCity, setFromCity] = useState<string | null>(null);
  const [toCity, setToCity] = useState<string | null>(null);
  const [packageSize, setPackageSize] = useState<string | null>(null);
  const [points, setPoints] = useState<Point[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [pointsResponse, packagesResponse] = await Promise.all([
          getPoints(),
          getPackagesTypes()
        ]);

        if (pointsResponse.data.success) {
          setPoints(pointsResponse.data.points);
        }

        if (packagesResponse.data.success) {
          setPackages(packagesResponse.data.packages);
        }
      } catch (error) {
        notifications.show({
          title: 'Ошибка',
          message: 'Не удалось загрузить данные',
          color: 'red',
        });
      }
    };

    loadData();
  }, []);

  const handleCalculateDelivery = async () => {
    if (!fromCity || !toCity || !packageSize) {
      notifications.show({
        title: 'Ошибка',
        message: 'Пожалуйста, заполните все поля',
        color: 'red',
      });
      return;
    }

    setLoading(true);
    try {
      const senderPoint = points.find(p => p.id === fromCity);
      const receiverPoint = points.find(p => p.id === toCity);
      const selectedPackage = packages.find(p => p.id === packageSize);

      if (!senderPoint || !receiverPoint || !selectedPackage) {
        notifications.show({
          title: 'Ошибка',
          message: 'Не удалось найти выбранные данные',
          color: 'red',
        });
        return;
      }

      const response = await calculateDelivery({
        package: selectedPackage,
        senderPoint: {
          latitude: senderPoint.latitude,
          longitude: senderPoint.longitude
        },
        receiverPoint: {
          latitude: receiverPoint.latitude,
          longitude: receiverPoint.longitude
        }
      });

      localStorage.setItem('deliveryCalculation', JSON.stringify({
        options: response.data.options,
        senderPoint: senderPoint,
        receiverPoint: receiverPoint,
        package: selectedPackage
      }));
      
      router.push('/ordering');
    } catch (error) {
      notifications.show({
        title: 'Ошибка',
        message: 'Произошла ошибка при расчете доставки',
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  };

  const cityOptions = points.map(point => ({
    value: point.id,
    label: point.name
  }));

  const packageOptions = packages.map(pkg => ({
    value: pkg.id,
    label: pkg.name
  }));

  const getPopularCities = (excludeId?: string) => {
    return points
      .filter(point => point.id !== excludeId)
      .slice(0, 3)
      .map(point => (
        <a 
          key={point.id}
          className="city-tag" 
          onClick={() => excludeId ? setToCity(point.id) : setFromCity(point.id)}
        >
          {point.name}
        </a>
      ));
  };

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
              {getPopularCities(toCity || undefined)}
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
              {getPopularCities(fromCity || undefined)}
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
              data={packageOptions}
            />
        </Stack>
      </Flex>
      <Group w={'100%'} justify={'flex-end'} mt='xl'>
        <Button
          variant="filled"
          w={{base: '100%', md: '32.5%'}}
          onClick={handleCalculateDelivery}
          loading={loading}
          disabled={!fromCity || !toCity || !packageSize}
        >
          Рассчитать
        </Button>
      </Group>
    </Box>
  );
}
