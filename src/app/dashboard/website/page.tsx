import Link from 'next/link';
import { PlusCircle } from 'lucide-react';

import { WebsiteBuilder } from '@/components/dashboard/WebsiteBuilder';
import { assemblePlan } from '@/lib/plan/assemblePlan';
import { sanitizeLogoSvg } from '@/lib/security/sanitizeSvg';
import { BusinessPlanV1Schema } from '@/lib/validators/businessPlan';
import type { BusinessPlanV1 } from '@/types/businessPlan';
import type { SectionKey } from '@/types/sections';
import { Button } from '@/components/ui/button';
import { createClient } from '@/utils/supabase/server';

export default async function WebsitePage({
  searchParams,
}: {
  searchParams: { projectId?: string };
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  let businessPlan: BusinessPlanV1 | null = null;
  let projectId = searchParams.projectId;

  if (!projectId) {
    const { data: projects } = await supabase
      .from('projects')
      .select('id')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false, nullsFirst: false })
      .limit(1);
    projectId = projects?.[0]?.id;
  }

  if (projectId) {
    const { data: latestVersion } = await supabase
      .from('project_versions')
      .select('id')
      .eq('project_id', projectId)
      .order('version', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (latestVersion?.id) {
      const { data: sections } = await supabase
        .from('project_sections')
        .select('section_key, content')
        .eq('version_id', latestVersion.id);

      if (sections && sections.length > 0) {
        try {
          const normalized = sections.map((section) => ({
            section_key: section.section_key as SectionKey,
            content: section.content as unknown,
          }));
          businessPlan = assemblePlan(normalized);
        } catch {
          businessPlan = null;
        }
      }
    }

    if (!businessPlan) {
      const { data: legacy } = await supabase
        .from('projects')
        .select('business_data')
        .eq('id', projectId)
        .eq('user_id', user.id)
        .single();

      const parsedProject = legacy?.business_data
        ? BusinessPlanV1Schema.safeParse(legacy.business_data)
        : null;
      businessPlan = parsedProject?.success
        ? { ...parsedProject.data, logoSVG: sanitizeLogoSvg(parsedProject.data.logoSVG) }
        : null;
    }
  }

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
      <WebsiteBuilder data={businessPlan} projectId={projectId} />
    </div>
  );
}
