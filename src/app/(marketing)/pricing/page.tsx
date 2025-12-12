import type { Metadata } from 'next';
import { FAQ } from '@/components/marketing/FAQ';
import { Pricing } from '@/components/marketing/Pricing';
import { createClient } from '@/utils/supabase/server';

export const metadata: Metadata = {
  title: 'تعرفه آریو | نسخه بتا',
  description:
    'قیمت‌گذاری شفاف بتای آریو برای ساخت سریع نسخه اول برنامه کسب‌وکار و پلن مالی اولیه.',
};

export default async function PricingPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const ctaHref = user ? '/dashboard' : '/login';

  return (
    <div className="space-y-16">
      <Pricing ctaHref={ctaHref} />
      <FAQ compact />
    </div>
  );
}
