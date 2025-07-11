"use client";

import {
  Box,
  Center,
  Container,
  Divider,
  Flex,
  Group,
  Text,
  Menu,
  UnstyledButton,
  Burger,
  Drawer,
  Stack,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Logo from "../../assets/Header/Logo_Delivery.svg";
import LogoSecondary from "../../assets/Header/Logo_Delivery_Secondary.svg";
import Etrance from "../../assets/Header/Etrance.svg";
import User from "../../assets/Header/User.svg";
import Time from "../../assets/Header/Time.svg";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const { isAuthenticated, user, logout, isLoading } = useAuth();
  const pathname = usePathname();
  const [opened, { toggle, close }] = useDisclosure();

  const handleLogout = () => {
    logout();
    close();
  };

  const getEntranceIconClass = () => {
    const baseClass = "entrance-icon";
    const shouldBeAccent = !isAuthenticated && (pathname === "/" || pathname === "/auth");
    return shouldBeAccent ? `${baseClass} accent` : baseClass;
  };

  const NavigationItems = () => (
    <>
      {isAuthenticated && (
        <>
          <Link
            href="/profile"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
            }}
            onClick={close}
          >
            <Group>
              <Image 
                src={User} 
                alt="User" 
                width={24} 
                height={24}
                className={`nav-icon ${pathname === "/profile" ? "active" : ""}`}
              />
              <Text c={pathname === "/profile" ? "var(--accent-color)" : "var(--text-primary)"}>
                Профиль
              </Text>
            </Group>
          </Link>

          <Link
            href="/history"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
            }}
            onClick={close}
          >
            <Group>
              <Image 
                src={Time} 
                alt="Time" 
                width={24} 
                height={24}
                className={`nav-icon ${pathname.startsWith("/history") ? "active" : ""}`}
              />
              <Text c={pathname.startsWith("/history") ? "var(--accent-color)" : "var(--text-primary)"}>
                История
              </Text>
            </Group>
          </Link>
        </>
      )}
    </>
  );

  const AuthSection = () => (
    <>
      {!isLoading && (
        <>
          {isAuthenticated ? (
            <Group
              align={"center"}
              gap={"xs"}
              onClick={handleLogout}
              style={{ cursor: "pointer" }}
            >
              <Image
                src={Etrance}
                width={24}
                height={24}
                alt="Entrance"
                className={getEntranceIconClass()}
              />
              <Text c={"var(--text-primary)"} size={"h3"}>
                Выйти
              </Text>
            </Group>
          ) : (
            <Link href="/auth" style={{ textDecoration: "none" }} onClick={close}>
              <Group align={"center"} gap={"xs"}>
                <Image
                  src={Etrance}
                  width={24}
                  height={24}
                  alt="Entrance"
                  className={getEntranceIconClass()}
                />
                <Text c={pathname === "/" || pathname === "/auth" ? "var(--accent-color)" : "var(--text-primary)"} size={"h3"}>
                  Войти
                </Text>
              </Group>
            </Link>
          )}
        </>
      )}
    </>
  );

  return (
    <>
      <header style={{ backgroundColor: "var(--bg-surface)" }}>
        <Container size={"lg"} w={"100%"} p="lg">
          <Group justify={"space-between"} align={"center"}>
            <Group gap="xl" align="center">
              <Link
                href="/"
                style={{
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {pathname === "/" && isAuthenticated ? (
                  <Image 
                    src={LogoSecondary} 
                    alt="Logo" 
                    width={117} 
                    height={32}
                    style={{ width: "auto", height: "auto", maxWidth: "117px", maxHeight: "32px" }}
                  />
                ) : (
                  <Image 
                    src={Logo} 
                    alt="Logo" 
                    width={117} 
                    height={32}
                    style={{ width: "auto", height: "auto", maxWidth: "117px", maxHeight: "32px" }}
                  />
                )}
              </Link>

              <Group gap="xl" visibleFrom="md">
                <NavigationItems />
              </Group>

              <Group gap="md" visibleFrom="sm" hiddenFrom="md">
                {isAuthenticated && (
                  <>
                    <Link
                      href="/profile"
                      style={{
                        textDecoration: "none",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Image 
                        src={User} 
                        alt="User" 
                        width={24} 
                        height={24}
                        className={`nav-icon ${pathname === "/profile" ? "active" : ""}`}
                      />
                    </Link>

                    <Link
                      href="/history"
                      style={{
                        textDecoration: "none",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Image 
                        src={Time} 
                        alt="Time" 
                        width={24} 
                        height={24}
                        className={`nav-icon ${pathname === "/history" ? "active" : ""}`}
                      />
                    </Link>
                  </>
                )}
              </Group>
            </Group>

            <Group gap="sm" align="center">
              <Group gap="xl" align={"center"} visibleFrom="md">
                <AuthSection />
                {pathname === "/" && isAuthenticated ? undefined : <ThemeToggle />}
              </Group>

              <Group gap="sm" align={"center"} visibleFrom="sm" hiddenFrom="md">
                {pathname === "/" && isAuthenticated ? undefined : <ThemeToggle />}
                {!isLoading && (
                  <>
                    {isAuthenticated ? (
                      <Image
                        src={Etrance}
                        width={24}
                        height={24}
                        alt="Entrance"
                        className={getEntranceIconClass()}
                        onClick={handleLogout}
                        style={{ cursor: "pointer" }}
                      />
                    ) : (
                      <Link href="/auth" style={{ textDecoration: "none" }}>
                        <Image
                          src={Etrance}
                          width={24}
                          height={24}
                          alt="Entrance"
                          className={getEntranceIconClass()}
                        />
                      </Link>
                    )}
                  </>
                )}
              </Group>

              <Group gap="xs" hiddenFrom="sm">
                {pathname === "/" && isAuthenticated ? undefined : <ThemeToggle />}
                <Burger opened={opened} onClick={toggle} size="sm" />
              </Group>
            </Group>
          </Group>
        </Container>
        <Divider h={"1px"} color="var(--border-color)" />
      </header>

      <Drawer
        opened={opened}
        onClose={close}
        title="Меню"
        padding="sm"
        size="70%"
        position="right"
        zIndex={1000}
      >
        <Stack gap="lg">
          <NavigationItems />
          {isAuthenticated && <Divider color="var(--border-color)" />}
          <AuthSection />
        </Stack>
      </Drawer>
    </>
  );
}
