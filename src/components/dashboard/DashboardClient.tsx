'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  Download,
  FileText,
  Layout,
  Palette,
  RefreshCcw,
  Rocket,
  ScrollText,
} from 'lucide-react';
import { useReactToPrint } from 'react-to-print';

import { Roadmap } from '@/components/dashboard/Roadmap';
import { PrintablePlan } from '@/components/dashboard/PrintablePlan';
import { WebsitePreview } from '@/components/dashboard/WebsitePreview';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { sanitizeLogoSvg } from '@/lib/security/sanitizeSvg';
import type { BusinessPlanV1 } from '@/types/businessPlan';

interface DashboardClientProps {
  initialData: BusinessPlanV1 | null;
  projectId?: string;
  versionId?: string;
}

export default function DashboardClient({
  initialData,
  projectId: initialProjectId,
  versionId: initialVersionId,
}: DashboardClientProps) {
  const [data, setData] = useState<BusinessPlanV1 | null>(initialData);
  const [projectId, setProjectId] = useState<string | undefined>(initialProjectId);
  const [versionId, setVersionId] = useState<string | undefined>(initialVersionId);
  const [regeneratingOnePagePlan, setRegeneratingOnePagePlan] = useState(false);
  const [regenerateError, setRegenerateError] = useState<string | null>(null);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackError, setFeedbackError] = useState<string | null>(null);
  const [feedbackSubmitting, setFeedbackSubmitting] = useState(false);
  const [feedbackSuccess, setFeedbackSuccess] = useState<string | null>(null);
  const safeLogo = sanitizeLogoSvg(data?.logoSVG);

  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `BusinessPlan_${new Date().toISOString().split('T')[0]}`,
  });

  const handleRegenerateOnePagePlan = async () => {
    if (!projectId) {
      setRegenerateError('Project ID not available.');
      return;
    }

    setRegeneratingOnePagePlan(true);
    setRegenerateError(null);

    try {
      const response = await fetch('/api/regenerate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projectId, sectionKey: 'one_page_plan' }),
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error((json as { error?: string })?.error || 'Failed to regenerate');
      }

      const {
        projectId: returnedProjectId,
        versionId: returnedVersionId,
        ...plan
      } = (json || {}) as Record<string, unknown>;

      setProjectId(typeof returnedProjectId === 'string' ? returnedProjectId : projectId);
      setVersionId(typeof returnedVersionId === 'string' ? returnedVersionId : versionId);
      setData(plan as BusinessPlanV1);
    } catch (error) {
      console.error('Regenerate one-page plan failed:', error);
      setRegenerateError(error instanceof Error ? error.message : 'Failed to regenerate');
    } finally {
      setRegeneratingOnePagePlan(false);
    }
  };

  const handleSubmitFeedback = async () => {
    if (!feedbackMessage.trim()) {
      setFeedbackError('متن بازخورد را وارد کنید.');
      return;
    }

    setFeedbackSubmitting(true);
    setFeedbackError(null);
    setFeedbackSuccess(null);

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: feedbackMessage.trim(),
          projectId,
          versionId,
        }),
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error((json as { error?: string })?.error || 'ارسال بازخورد ناموفق بود.');
      }

      setFeedbackSuccess('بازخورد شما ارسال شد.');
      setFeedbackMessage('');
      setFeedbackOpen(false);
    } catch (error) {
      console.error('Submit feedback failed:', error);
      setFeedbackError(error instanceof Error ? error.message : 'ارسال بازخورد ناموفق بود.');
    } finally {
      setFeedbackSubmitting(false);
    }
  };

  const renderBullets = (title: string, items: string[]) => (
    <div className="space-y-2">
      <p className="text-sm font-semibold text-slate-600 dark:text-slate-200">{title}</p>
      <ul
        className="list-disc pr-5 space-y-1 text-sm text-slate-700 dark:text-slate-300 leading-relaxed"
        dir="rtl"
      >
        {items.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );

  if (!data) {
    return (
      <div
        className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4 text-center space-y-6"
        dir="rtl"
      >
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
          هنوز پروژه‌ای ثبت نکرده‌اید
        </h1>
        <p className="text-slate-500">برای دیدن جادوی هوش مصنوعی، ابتدا ایده خود را ثبت کنید.</p>
        <Link href="/start">
          <Button className="gap-2">
            ساخت پروژه جدید
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 md:p-12" dir="rtl">
      {/* Hidden Print Component */}
      <div className="hidden">{data && <PrintablePlan ref={componentRef} data={data} />}</div>

      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-slate-400">Ø¯Ø§Ø´Ø¨ÙØ±Ø¯ Ù Ø¯ÛØ±ÛØªÛ</h1>
          </div>
          <div className="flex gap-3">
            <Button
              variant="secondary"
              size="sm"
              className="gap-2"
              onClick={() => {
                setFeedbackError(null);
                setFeedbackSuccess(null);
                setFeedbackOpen(true);
              }}
            >
              <FileText className="w-4 h-4" />
              Ø§Ø±Ø³Ø§Ù Ø¨Ø§Ø²Ø®ÙØ±Ø¯
            </Button>
            <Link href="/start">
              <Button variant="outline" size="sm">
                Ù¾Ø±ÙÚÙ Ø¬Ø¯ÛØ¯
              </Button>
            </Link>
            <Button
              onClick={() => handlePrint()}
              variant="default"
              size="sm"
              className="gap-2 bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900"
            >
              <Download className="w-4 h-4" />
              Ø¯Ø§ÙÙÙØ¯ Ø·Ø±Ø­ (PDF)
            </Button>
          </div>
        </div>
        {feedbackSuccess && (
          <p className="text-sm text-green-600 dark:text-green-400">{feedbackSuccess}</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card A: Identity (Spans 2 cols) */}
          <Card className="md:col-span-2 border-indigo-100 dark:border-indigo-900 bg-white dark:bg-slate-900 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-indigo-500"></div>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-4xl font-extrabold text-indigo-600 dark:text-indigo-400">
                {data.businessName}
              </CardTitle>
              <Rocket className="w-8 h-8 text-indigo-500 opacity-20" />
            </CardHeader>
            <CardContent>
              <p className="text-xl text-slate-600 dark:text-slate-300 font-medium">
                {data.tagline}
              </p>
            </CardContent>
          </Card>

          {/* Card B: Visuals */}
          <Card className="md:col-span-1 shadow-md">
            <CardHeader className="flex flex-row items-center gap-2 pb-2">
              <Palette className="w-5 h-5 text-slate-500" />
              <CardTitle className="text-lg text-slate-700 dark:text-slate-200">
                هویت بصری
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-6 py-4">
              {/* Logo Preview */}
              <div className="w-full flex justify-center">
                {safeLogo ? (
                  <div
                    className="w-32 h-32 rounded-xl shadow-inner bg-slate-50 dark:bg-slate-800 p-2 flex items-center justify-center overflow-hidden"
                    dangerouslySetInnerHTML={{ __html: safeLogo }}
                  />
                ) : (
                  <div className="w-32 h-32 rounded-xl shadow-inner bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                    <span className="text-4xl font-bold text-slate-300">
                      {data.businessName.substring(0, 2)}
                    </span>
                  </div>
                )}
              </div>

              {/* Color Palette */}
              <div className="flex gap-3">
                {data.colorPalette.map((color, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-1 group">
                    <div
                      className="w-8 h-8 rounded-full border border-white shadow-sm ring-1 ring-slate-200 dark:ring-slate-700 transition-transform hover:scale-110"
                      style={{ backgroundColor: color }}
                    />
                    <span
                      className="text-[10px] text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity font-mono"
                      dir="ltr"
                    >
                      {color}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Card C: Strategy (Spans 3 cols) */}
          <Card className="md:col-span-3 border-emerald-100 dark:border-emerald-900/30 bg-emerald-50/50 dark:bg-emerald-950/10">
            <CardHeader className="flex flex-row items-center gap-2">
              <ScrollText className="w-5 h-5 text-emerald-600 dark:text-emerald-500" />
              <CardTitle className="text-xl text-emerald-800 dark:text-emerald-400">
                برنامه استراتژیک
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed text-emerald-900/80 dark:text-emerald-200/80 text-justify">
                {data.summary}
              </p>
            </CardContent>
          </Card>

          {/* One-Page Plan */}
          <Card className="md:col-span-3 border-amber-100 dark:border-amber-900/40 bg-amber-50/40 dark:bg-amber-950/10">
            <CardHeader className="flex flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                <CardTitle className="text-lg text-amber-800 dark:text-amber-200">
                  One-Page Plan
                </CardTitle>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="gap-2"
                onClick={handleRegenerateOnePagePlan}
                disabled={regeneratingOnePagePlan || !projectId}
              >
                <RefreshCcw className="w-4 h-4" />
                {data.onePagePlan ? 'ØªÙÙÛØ¯ Ø¯ÙØ¨Ø§Ø±Ù' : 'ØªÙÙÛØ¯ One-Page Plan'}
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.onePagePlan ? (
                <>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                      {data.onePagePlan.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 text-justify">
                      {data.onePagePlan.elevatorPitch}
                    </p>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="md:col-span-2 grid md:grid-cols-2 gap-3 text-sm text-slate-700 dark:text-slate-200">
                      <div>
                        <p className="font-semibold">ÙØ³Ø§ÙÙ</p>
                        <p className="text-slate-600 dark:text-slate-300">
                          {data.onePagePlan.problem}
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold">Ø±Ø§Ù‌Ø­Ù</p>
                        <p className="text-slate-600 dark:text-slate-300">
                          {data.onePagePlan.solution}
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold">ÙØ´ØªØ±Û ÙØ¯Ù</p>
                        <p className="text-slate-600 dark:text-slate-300">
                          {data.onePagePlan.targetCustomer}
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold">Ø§Ø±Ø²Ø´ ÙØªÙØ§ÛØ²</p>
                        <p className="text-slate-600 dark:text-slate-300">
                          {data.onePagePlan.uniqueValue}
                        </p>
                      </div>
                      <div className="md:col-span-2">
                        <p className="font-semibold">ÙØ¯Ù Ú©Ø³Ø¨‌ÙÚ©Ø§Ø±</p>
                        <p className="text-slate-600 dark:text-slate-300">
                          {data.onePagePlan.businessModel}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      {renderBullets(
                        'Ø¨Ø±ÙØ§ÙÙ ÙØ±ÙØ¯ Ø¨Ù Ø¨Ø§Ø²Ø§Ø±',
                        data.onePagePlan.goToMarket
                      )}
                      {renderBullets('Ø´Ø§Ø®Øµ‌ÙØ§Û Ú©ÙÛØ¯Û', data.onePagePlan.keyMetrics)}
                      {renderBullets('Ø±ÛØ³Ú©‌ÙØ§', data.onePagePlan.risks)}
                      {renderBullets('Û· Ø±ÙØ² Ø¢ÛÙØ¯Ù', data.onePagePlan.next7Days)}
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col gap-3 p-4 rounded-lg border border-dashed border-amber-300 dark:border-amber-800 bg-white/60 dark:bg-amber-950/10">
                  <p className="text-slate-700 dark:text-slate-200">
                    ÙÙÙØ² One-Page Plan Ø¨Ø±Ø§Û Ø§ÛÙ Ù¾Ø±ÙÚÙ ÙØ¬ÙØ¯ ÙØ¯Ø§Ø±Ø¯. Ø¨Ø±Ø§Û ÙÙØ§ÛØ´ Ø§ÛÙ
                    Ø¨Ø®Ø´Ø ØªÙÙÛØ¯ ÙØ¬Ø¯Ø¯ Ø±Ø§ Ø§Ø¬Ø±Ø§ Ú©ÙÛØ¯.
                  </p>
                  <div className="flex gap-3">
                    <Button
                      className="gap-2"
                      onClick={handleRegenerateOnePagePlan}
                      disabled={regeneratingOnePagePlan || !projectId}
                    >
                      <RefreshCcw className="w-4 h-4" />
                      ØªÙÙÛØ¯ One-Page Plan
                    </Button>
                    {!projectId && (
                      <span className="text-sm text-slate-500 dark:text-slate-400">
                        Ø§Ø¨ØªØ¯Ø§ Ù¾Ø±ÙÚÙ Ø±Ø§ Ø°Ø®ÛØ±Ù Ú©ÙÛØ¯.
                      </span>
                    )}
                  </div>
                </div>
              )}
              {regenerateError && (
                <p className="text-sm text-red-600 dark:text-red-400">{regenerateError}</p>
              )}
            </CardContent>
          </Card>

          {/* Card D: Marketing */}
          <Card className="md:col-span-1 h-full">
            <CardHeader className="flex flex-row items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-blue-500" />
              <CardTitle className="text-lg text-slate-800 dark:text-slate-200">
                گام‌های بازاریابی
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {data.marketingSteps.map((step, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300"
                  >
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 text-xs font-bold shrink-0">
                      {idx + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Card E: Website Copy */}
          <Card className="md:col-span-2 flex flex-col justify-center border-slate-200 dark:border-slate-800">
            <CardHeader className="flex flex-row items-center gap-2">
              <Layout className="w-5 h-5 text-slate-500" />
              <CardTitle className="text-lg text-slate-800 dark:text-slate-200">
                متن وب‌سایت پیشنهادی
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center space-y-4">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {data.landingPageCopy.headline}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-lg">
                  {data.landingPageCopy.subheadline}
                </p>
                <div className="pt-4">
                  <Button size="lg" className="bg-primary text-primary-foreground shadow-xl">
                    {data.landingPageCopy.cta}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Website Simulator (Spans Full Width) */}
          <div className="md:col-span-3 mt-8">
            <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <Layout className="w-6 h-6 text-indigo-500" />
              پیش‌نمایش زنده وب‌سایت
            </h2>
            <WebsitePreview data={data} />
          </div>

          {/* Roadmap (Spans Full Width) */}
          {data.roadmap && (
            <div className="md:col-span-3 mt-8">
              <Roadmap roadmap={data.roadmap} />
            </div>
          )}
        </div>
      </div>
      {feedbackOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <Card className="w-full max-w-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                ارسال بازخورد
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                rows={5}
                placeholder="نظر یا پیشنهاد خود را بنویسید..."
                value={feedbackMessage}
                onChange={(e) => setFeedbackMessage(e.target.value)}
              />
              {feedbackError && (
                <p className="text-sm text-red-600 dark:text-red-400">{feedbackError}</p>
              )}
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setFeedbackOpen(false)}
                  disabled={feedbackSubmitting}
                >
                  انصراف
                </Button>
                <Button
                  onClick={handleSubmitFeedback}
                  disabled={feedbackSubmitting}
                  className="gap-2"
                >
                  {feedbackSubmitting ? 'در حال ارسال...' : 'ارسال'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
