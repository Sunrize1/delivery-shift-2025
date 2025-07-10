'use client';

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader, Center, Stack } from "@mantine/core";

interface ProtectedPageProps {
  children: React.ReactNode;
  redirectTo?: string;
  showLoader?: boolean;
}

export default function ProtectedPage({ 
  children, 
  redirectTo = '/auth',
  showLoader = true 
}: ProtectedPageProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isLoading, isAuthenticated, router, redirectTo]);

  if (isLoading && showLoader) {
    return (
      <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh' }}>
        <Center h="100vh">
          <Stack align="center" gap="md">
            <Loader size="lg" color="var(--accent-color)" />
          </Stack>
        </Center>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
} 