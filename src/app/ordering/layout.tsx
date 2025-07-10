'use client';

import ProtectedPage from "@/components/Сommon/ProtectedPage";



export default function OrderingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedPage>
      <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh' }}>
        {children}
      </div>
    </ProtectedPage>
  );
} 