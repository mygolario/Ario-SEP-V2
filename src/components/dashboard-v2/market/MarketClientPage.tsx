'use client';

import {
  generateMarketAnalysis,
  MarketAnalysis,
  MarketInputs,
  Competitor,
  MarketReport,
} from '@/app/actions/market';
import { saveArtifact } from '@/app/actions/artifacts';
import { CompetitorTable } from '@/components/dashboard-v2/market/CompetitorTable';
import { MarketAnalysisView } from '@/components/dashboard-v2/market/MarketAnalysisView';
import { MarketInputForm } from '@/components/dashboard-v2/market/MarketInputForm';
import { ShareDialog } from '@/components/dashboard-v2/share/ShareDialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast';
import { ChevronLeft, Loader2, Save } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { TourButton, useTour } from '@/components/dashboard-v2/help/TourGuide';
import { tourSteps } from '@/components/dashboard-v2/help/tourSteps';

interface Props {
  params: { id: string };
  initialData?: MarketReport;
  version?: number;
  artifactId?: string;
  shareToken?: string;
}

export default function MarketPage({
  params,
  initialData,
  version: initialVersion,
  artifactId,
  shareToken,
}: Props) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [version, setVersion] = useState<number>(initialVersion || 0);

  // Share State
  const [currentShareToken, setCurrentShareToken] = useState<string | null>(shareToken || null);

  // State for the full report
  const [inputs, setInputs] = useState<MarketInputs>(
    initialData?.inputs || { audience: '', region: '', priceRange: '', category: '' }
  );
  const [competitors, setCompetitors] = useState<Competitor[]>(initialData?.competitors || []);
  const [analysis, setAnalysis] = useState<MarketAnalysis>(
    initialData?.analysis || { segments: [], differentiation: [], positioning: '' }
  );
  const [isGenerated, setIsGenerated] = useState(!!initialData);

  const { startTour } = useTour({
    steps: tourSteps.market,
    tourId: 'market-tour-v1',
  });

  const handleGenerate = async (newInputs: MarketInputs) => {
    setLoading(true);
    try {
      // Save inputs immediately? Or just use for generation.
      setInputs(newInputs);
      const report = await generateMarketAnalysis(params.id, newInputs);
      setCompetitors(report.competitors);
      setAnalysis(report.analysis);
      setIsGenerated(true);
      toast('تحلیل بازار انجام شد. لطفا نتایج را بررسی و ذخیره کنید.', 'success');
    } catch {
      toast('خطا در تحلیل بازار', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const report: MarketReport = { inputs, competitors, analysis };
      const res = await saveArtifact(
        params.id,
        'market_competitors',
        report as unknown as Record<string, unknown>
      );
      setVersion(res.version);
      toast(`نسخه ${res.version} با موفقیت ذخیره شد`, 'success');
    } catch {
      toast('خطا در ذخیره‌سازی', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Link
              href={`/dashboard-v2/projects/${params.id}`}
              className="hover:text-primary transition-colors"
            >
              بازگشت به پروژه
            </Link>
            <ChevronLeft className="h-4 w-4" />
            <span className="text-foreground font-medium">تحلیل بازار و رقبا</span>
          </div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight">تحلیل بازار و رقبا</h1>
            <TourButton onClick={startTour} />
          </div>
        </div>
        {isGenerated && (
          <div className="flex items-center gap-4">
            <ShareDialog
              artifactId={artifactId || null}
              currentShareToken={currentShareToken}
              onUpdate={setCurrentShareToken}
            />

            {version > 0 && <span className="text-sm text-muted-foreground">نسخه: {version}</span>}
            <Button onClick={handleSave} disabled={saving}>
              {saving ? (
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="ml-2 h-4 w-4" />
              )}
              ذخیره تحلیل
            </Button>
          </div>
        )}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Col: Inputs */}
        <div className="lg:col-span-1">
          <MarketInputForm initialValues={inputs} onGenerate={handleGenerate} loading={loading} />
        </div>

        {/* Right Col: Output */}
        <div className="lg:col-span-2 space-y-6">
          {isGenerated ? (
            <>
              <MarketAnalysisView analysis={analysis} />
              <CompetitorTable competitors={competitors} onChange={setCompetitors} />
            </>
          ) : (
            <div className="border border-dashed rounded-lg p-12 text-center text-muted-foreground bg-muted/10 h-full flex flex-col items-center justify-center">
              <p>برای شروع، اطلاعات سمت راست را تکمیل و روی دکمه تحلیل کلیک کنید.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
