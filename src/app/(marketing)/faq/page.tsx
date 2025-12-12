import type { Metadata } from 'next';
import { FAQ } from '@/components/marketing/FAQ';
import { createClient } from '@/utils/supabase/server';
import { Pricing } from '@/components/marketing/Pricing';

export const metadata: Metadata = {
  title: 'سوالات متداول آریو',
  description: 'پاسخ به سوالات رایج درباره نسخه بتا، داده‌های بازار ایران و امنیت اطلاعات در آریو.',
};

export default async function FAQPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const ctaHref = user ? '/dashboard' : '/login';

  return (
    <div className="space-y-16">
      <FAQ />
      <Pricing ctaHref={ctaHref} />
    </div>
  );
}
