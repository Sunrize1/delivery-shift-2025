import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Авторизация - Delivery App",
  description: "Страница авторизации для приложения доставки посылок",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh' }}>
      {children}
    </div>
  );
} 