import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import './globals.css';
import { ColorSchemeScript, MantineProvider, mantineHtmlProps, createTheme } from '@mantine/core';
import Header from "@/components/Сommon/Header";
import { AuthProvider } from "@/context/AuthContext";
import { Notifications } from "@mantine/notifications";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const theme = createTheme({
  colors: {
    // Основной синий цвет
    blue: [
      '#E6F2FF',
      '#CCE5FF',
      '#99CBFF',
      '#66B2FF',
      '#3398FF',
      '#1975FF', // основной синий
      '#0066E6',
      '#0052CC',
      '#003D99',
      '#002966'
    ],
    // Серые цвета для светлой темы
    lightGray: [
      '#FFFFFF',
      '#F3F4F6',
      '#CED2DA',
      '#97A1AF',
      '#637083',
      '#344051',
      '#141C24',
      '#0F1419',
      '#0A0E13',
      '#05070A'
    ],
    // Серые цвета для темной темы  
    darkGray: [
      '#EFF0F1',
      '#E3E5E5',
      '#CED2DA',
      '#B8BCC4',
      '#A2A6AE',
      '#8C9098',
      '#767A82',
      '#60646C',
      '#4A4E56',
      '#344051'
    ]
  },
  primaryColor: 'blue',
  primaryShade: 5,
  components: {
    Title: {
      defaultProps: {
        c: 'var(--text-primary)'
      }
    },
    Text: {
      defaultProps: {
        c: 'var(--text-primary)'
      }
    },
    Input: {
      defaultProps: {
        size: 'lg',
        radius: 'md',
      }
    },
    TextInput: {
      defaultProps: {
        size: 'lg',
        radius: 'md',
      }
    },
    Select: {
      defaultProps: {
        size: 'lg',
        radius: 'md',
      }
    },
    Button: {
      defaultProps: {
        size: 'xl',
        radius: 'lg',
      }
    }
  },
  headings: {
    sizes: {
      h1: {
        fontSize: '48px',
      },
      h2: { fontSize: '24px' },
    },
  },
  fontSizes: {
    subtitle: '24px'
  }
});

export const metadata: Metadata = {
  title: "Delivery App",
  description: "Приложение доставки посылок",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript/>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`} style={{ margin: 0, minHeight: '100vh' }}>
        <MantineProvider theme={theme}>
          <Notifications />
          <AuthProvider>
            <Header/>
            {children}
          </AuthProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
