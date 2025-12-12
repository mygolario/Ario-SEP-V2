import { FAQ } from '@/components/marketing/FAQ';
import { FeatureGrid } from '@/components/marketing/FeatureGrid';
import { Hero } from '@/components/marketing/Hero';
import { HowItWorks } from '@/components/marketing/HowItWorks';
import { Pricing } from '@/components/marketing/Pricing';
import { SampleOutput } from '@/components/marketing/SampleOutput';
import { createClient } from '@/utils/supabase/server';

export default async function MarketingHomePage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const ctaHref = user ? '/dashboard' : '/login';

  return (
    <div className="space-y-20">
      <Hero ctaHref={ctaHref} />
      <FeatureGrid />
      <HowItWorks />
      <SampleOutput />
      <Pricing ctaHref={ctaHref} />
      <FAQ compact />
    </div>
  );
}
