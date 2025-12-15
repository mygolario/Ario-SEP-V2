'use client';

import { generateExpertPlanTemplate } from '@/app/actions/expert-plan';
import { saveArtifact } from '@/app/actions/artifacts';
import { ProGate } from '@/components/dashboard-v2/plan/ProGate';
import { SectionEditor } from '@/components/dashboard-v2/plan/SectionEditor';
import { ShareDialog } from '@/components/dashboard-v2/share/ShareDialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast';
import { ChevronLeft, Loader2, Save, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { TourButton, useTour } from '@/components/dashboard-v2/help/TourGuide';
import { tourSteps } from '@/components/dashboard-v2/help/tourSteps';

interface Props {
  projectId: string;
  isPro: boolean;
  initialData?: Record<string, string>;
  version?: number;
  artifactId?: string;
  shareToken?: string;
}

const SECTIONS = [
  { key: 'executive_summary', title: 'خلاصه مدیریتی (Executive Summary)' },
  { key: 'problem', title: 'بیان مسئله (Problem Statement)' },
  { key: 'solution', title: 'راهکار (Solution)' },
  { key: 'market_analysis', title: 'تحلیل بازار (Market Analysis)' },
  { key: 'gtm_strategy', title: 'استراتژی ورود به بازار (GTM)' },
  { key: 'financials', title: 'برنامه مالی (Financials)' },
  { key: 'risks', title: 'ریسک‌ها (Risks)' },
];

export function ExpertPlanPageClient({
  projectId,
  isPro,
  initialData,
  version: initialVersion,
  artifactId,
  shareToken,
}: Props) {
  const { toast } = useToast();
  const [data, setData] = useState<Record<string, string>>(initialData || {});
  const [version, setVersion] = useState(initialVersion || 0);
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);

  // Share State
  const [currentShareToken, setCurrentShareToken] = useState<string | null>(shareToken || null);

  const { startTour } = useTour({
    steps: tourSteps.plan,
    tourId: 'plan-tour-v1',
  });

  const handleChange = (key: string, val: string) => {
    setData((prev) => ({ ...prev, [key]: val }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await saveArtifact(projectId, 'expert_plan', data);
      setVersion(res.version);
      toast(`نسخه ${res.version} ذخیره شد`, 'success');
    } catch {
      toast('خطا در ذخیره', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleGenerateTemplate = async () => {
    setGenerating(true);
    try {
      const template = await generateExpertPlanTemplate(projectId);
      setData(template);
      toast('قالب هوشمند ایجاد شد', 'success');
    } catch {
      toast('خطا در تولید قالب', 'error');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Link
              href={`/dashboard-v2/projects/${projectId}`}
              className="hover:text-primary transition-colors"
            >
              بازگشت به پروژه
            </Link>
            <ChevronLeft className="h-4 w-4" />
            <span className="text-foreground font-medium">بیزینس پلن جامع</span>
          </div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight">بیزینس پلن جامع (Expert Plan)</h1>
            <TourButton onClick={startTour} />
          </div>
        </div>
        {isPro && (
          <div className="flex items-center gap-4">
            <ShareDialog
              artifactId={artifactId || null}
              currentShareToken={currentShareToken}
              onUpdate={setCurrentShareToken}
            />
            {version > 0 && <span className="text-sm text-muted-foreground">نسخه: {version}</span>}
            <Button variant="outline" onClick={handleGenerateTemplate} disabled={generating}>
              {generating ? (
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="ml-2 h-4 w-4" />
              )}
              تولید با هوش مصنوعی
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? (
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="ml-2 h-4 w-4" />
              )}
              ذخیره تغییرات
            </Button>
          </div>
        )}
      </div>

      <div id="plan-pro-gate">
        <ProGate
          isPro={isPro}
          title="ویرایشگر بیزینس پلن جامع"
          description="امکان نگارش، نقد و بررسی هوشمند و تولید خودکار بیزینس پلن."
        >
          <div className="space-y-6">
            {SECTIONS.map((sec) => (
              <SectionEditor
                key={sec.key}
                sectionKey={sec.key}
                title={sec.title}
                value={data[sec.key] || ''}
                onChange={(v) => handleChange(sec.key, v)}
              />
            ))}
          </div>
        </ProGate>
      </div>
    </div>
  );
}
