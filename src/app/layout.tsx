import type { Metadata } from "next";
import * as Sentry from "@sentry/nextjs";
import { Vazirmatn } from "next/font/google";
import { PHProvider } from "./providers";
import "./globals.css";

const vazirmatn = Vazirmatn({ subsets: ["arabic", "latin"] });

export function generateMetadata(): Metadata {
  return {
    title: "بیزینس ساز هوشمند | ساخت کسب و کار با هوش مصنوعی",
    description: "ساخت لوگو، استراتژی و وب‌سایت در ۶۰ ثانیه",
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
        <PHProvider>
          {children}
        </PHProvider>
      </body>
    </html>
  );
}