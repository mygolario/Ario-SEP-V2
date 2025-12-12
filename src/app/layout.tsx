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
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  let metadataBase: URL | undefined;

  if (siteUrl) {
    try {
      metadataBase = new URL(siteUrl);
    } catch {
      metadataBase = undefined;
    }
  }

  return {
    title: 'آریو | همراه هوشمند برای برنامه‌ریزی کسب‌وکار',
    description:
      'آریو نسخه بتای ایرانی برای ساخت برنامه کسب‌وکار، چک‌لیست اقدام و برآورد مالی اولیه با تکیه بر داده‌های بومی و هوش مصنوعی.',
    metadataBase,
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
      <body className={`${vazirmatn.className} antialiased`}>
        <PHProvider>{children}</PHProvider>
      </body>
    </html>
  );
}
