import Link from 'next/link';
import { PlusCircle } from 'lucide-react';

import { WebsiteBuilder } from '@/components/dashboard/WebsiteBuilder';
import { BusinessPlanV1Schema } from '@/lib/validators/businessPlan';
import type { BusinessPlanV1 } from '@/types/businessPlan';
import { Button } from '@/components/ui/button';
import { createClient } from '@/utils/supabase/server';

export default async function WebsitePage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  // Fetch the LATEST project
  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(1);

  const project = projects?.[0]?.business_data;
  const parsedProject = project ? BusinessPlanV1Schema.safeParse(project) : null;
  const businessPlan: BusinessPlanV1 | null = parsedProject?.success ? parsedProject.data : null;
  const hasContent = businessPlan?.landingPageCopy?.headline;

  if (!businessPlan || !hasContent) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
        <div className="p-8 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50">
          <h2 className="text-xl font-bold text-slate-900 mb-2">محتوای وب‌سایت یافت نشد</h2>
          <p className="text-slate-500 mb-6 max-w-md">
            برای ساخت خودکار لندینگ پیج، ابتدا باید یک طرح جدید ایجاد کنید تا هوش مصنوعی محتوا را
            تولید کند.
          </p>
          <Link href="/start">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8">
              <PlusCircle className="ml-2 h-4 w-4" />
              ساخت طرح جدید
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      <WebsiteBuilder data={businessPlan} />
    </div>
  );
}
