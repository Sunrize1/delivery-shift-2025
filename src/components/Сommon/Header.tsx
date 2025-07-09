import { Box, Center, Container, Divider, Flex, Group, Text } from "@mantine/core"
import Logo from '../../assets/Header/Logo_Delivery.svg'
import Etrance from '../../assets/Header/Etrance.svg'
import Image from 'next/image'
import ThemeToggle from "./ThemeToggle"
import Link from "next/link"

export default function Header () {

    return (
       <header style={{backgroundColor: 'var(--bg-surface)'}}>
        <Container size={'lg'} w={'100%'} p={'lg'}>
            <Group  justify={'space-between'} align={'center'}>
            <Image
                src={Logo}
                alt="Logo"
                width={117}
                height={32}
            />
            <Group gap={'xl'} align={'center'}>
                <Group align={'center'} gap={'xs'}>
                    <Image
                        src={Etrance}
                        width={24}
                        height={24}
                        alt="Entrance"
                    />
                    <Link href={'/auth'} style={{textDecoration: 'none'}}>
                        <Text c={'var(--accent-color)'} size={'h3'}>Войти</Text>
                    </Link>
                </Group>
                <ThemeToggle/>
            </Group>
        </Group>
        </Container>
        <Divider h={'1px'} color="var(--border-color)"/>
       </header>
    )
}
