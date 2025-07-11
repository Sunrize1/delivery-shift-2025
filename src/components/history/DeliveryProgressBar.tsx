import { Box, Stack, Text, Group, useMantineTheme } from "@mantine/core";
import Image from "next/image";
import ClockIcon from '../../assets/history/Clock.svg';
import BoxIcon from '../../assets/history/Box.svg';
import CarIcon from '../../assets/history/Car.svg';
import CheckIcon from '../../assets/history/Check.svg';

interface DeliveryProgressBarProps {
    currentStatus: number; 
}

interface DeliveryStep {
    id: number;
    label: string;
    icon: any;
}

const deliverySteps: DeliveryStep[] = [
    { id: 0, label: "Создан", icon: ClockIcon },
    { id: 1, label: "Принят", icon: BoxIcon },
    { id: 2, label: "В пути", icon: CarIcon },
    { id: 3, label: "Доставлен", icon: CheckIcon },
];

export default function DeliveryProgressBar({ currentStatus }: DeliveryProgressBarProps) {
    const theme = useMantineTheme();

    const getStepColor = (stepId: number, currentStatus: number) => {
        if (currentStatus === 4) { 
            return theme.colors.red[6];
        }

        if (currentStatus === 3) {
            return theme.colors.green[6];
        }

        if (stepId <= currentStatus) {
            return theme.colors.yellow[6]; 
        } else {
            return theme.colors.gray[4]; 
        }
    };


    return (
        <Stack gap="xl"  w={376}>
            <Group gap={8} w={296} wrap="nowrap">
                {deliverySteps.map((step, index) => (
                    <Group key={step.id} gap={0} wrap="nowrap">
                        <Box
                            w={24}
                            h={24}
                            style={{
                                borderRadius: "50%",
                                backgroundColor: getStepColor(step.id, currentStatus),
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0
                            }}
                        >
                            <Image
                                src={step.icon}
                                alt={step.label}
                                width={16}
                                height={16}
                                style={{
                                    filter: "brightness(0) invert(1)"
                                }}
                            />
                        </Box>

                        {index < deliverySteps.length - 1 && (
                            <Box
                                w={52}
                                h={2}
                                mx={8}
                                style={{
                                    borderTop: `2px dashed ${getStepColor(step.id, currentStatus)}`
                                }}
                            />
                        )}
                    </Group>
                ))}
            </Group>
        </Stack>
    );
} 