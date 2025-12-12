import type { Metadata } from 'next';
import * as Sentry from '@sentry/nextjs';
import localFont from 'next/font/local';
import { PHProvider } from './providers';
import './globals.css';

const vazirmatn = localFont({
  src: [
    { path: './fonts/Vazirmatn-Regular.woff2', weight: '400', style: 'normal' },
    { path: './fonts/Vazirmatn-Bold.woff2', weight: '700', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-vazirmatn',
});

export function generateMetadata(): Metadata {
  return {
    title: 'بیزینس ساز هوشمند | ساخت کسب و کار با هوش مصنوعی',
    description: 'ساخت لوگو، استراتژی و وب‌سایت در ۶۰ ثانیه',
    other: {
      ...Sentry.getTraceData(),
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={vazirmatn.className}>
        <PHProvider>{children}</PHProvider>
      </body>
    </html>
  );
}
