import {
  Box,
  Center,
  Container,
  Flex,
  Stack,
  Title,
  useMantineTheme,
  Text,
  Group,
} from "@mantine/core";
import BoxIcon from "../assets/Main/package-open.svg";
import BoxImage from "../assets/Main/Box_Image.svg";
import QRCode from "../assets/Main/QR_koronapay.svg";
import AdImage from "../assets/Main/adImage.svg";
import Image from "next/image";
import CalculateDeliveryForm from "@/components/Сommon/CalculateDeliveryForm";
import TrackPackageForm from "@/components/Сommon/TrackPackageForm";

export default function HomePage() {
  return (
    <Container pos={"relative"} size="lg" py={113} >
      <Stack gap={80}>
        <Group align="center" justify="space-between">
          <Stack gap="xl">
            <Stack gap="md">
              <Title order={1}>Мы доставим ваш заказ</Title>
              <Text size="subtitle" c="var(--text-secondary)">
                Отправляйте посылки в приложении Шифт Delivery
              </Text>
            </Stack>

            <Box
              p="md"
              bg="var(--bg-surface)"
              w={{ base: "100%", lg: 500 }}
              style={{ borderRadius: 16 }}
            >
              <Group gap="md">
                <Image src={BoxIcon} alt="Коробка" width={64} height={64} />
                <Image src={QRCode} alt="QR Код" width={64} height={64} className="qr-adaptive" />
                <Text size="lg" c="var(--text-secondary)" flex={1}>
                  Наведите камеру телефона на QR‑код
                </Text>
              </Group>
            </Box>
          </Stack>

          <Box visibleFrom="lg">
            <Box
              style={{
                position: "absolute",
                top: -1,
                right: -80,
                zIndex: 1,
              }}
            >
              <Image src={BoxImage} alt="Коробка" width={500} height={500} />
            </Box>
          </Box>
        </Group>
        <CalculateDeliveryForm />
        <Flex direction={{ base: "column", sm: "row" }} gap={"xl"} align={{ base: "flex-start", md: "center" }}>
          <TrackPackageForm />
          <Image
            src={AdImage}
            alt="Реклама"
            style={{
              width: "100%",
              height: "auto",
            }}
          />
        </Flex>
      </Stack>
    </Container>
  );
}
