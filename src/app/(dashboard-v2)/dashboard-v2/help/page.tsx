import { HelpCenter } from '@/components/dashboard-v2/help/HelpCenter';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'مرکز راهنما و آموزش',
  description: 'راهنمای استفاده از داشبورد و مفاهیم کسب‌وکار',
};

export default function HelpPage() {
  return (
    <div className="container max-w-4xl py-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">مرکز راهنما</h1>
        <p className="text-muted-foreground">
          پاسخ به سوالات متداول و آموزش نحوه استفاده از ابزارهای داشبورد.
        </p>
      </div>

      <HelpCenter />
    </div>
  );
}
