'use client';
import ChangeToDarkMode from '../../assets/Header/Change_To_Dark_Mode.svg'
import ChangeToLightMode from '../../assets/Header/Change_To_Light_Mode.svg'
import Image from 'next/image'
import { Group, useMantineColorScheme } from "@mantine/core";

export default function ThemeToggle() {
  const {colorScheme, setColorScheme } = useMantineColorScheme();

  const toggleColorScheme = () => {
    setColorScheme(colorScheme === 'light' ? 'dark' : 'light');
  }

  return (
    <Group align={'center'} style={{cursor: 'pointer'}}>
        <Image
            src={colorScheme === 'light' ? ChangeToDarkMode : ChangeToLightMode}
            alt="Change Theme"
            width={24}
            height={24}
            onClick={toggleColorScheme}
        />
    </Group>
  );
}
