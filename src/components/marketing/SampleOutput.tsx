import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { samplePlan } from '@/content/samplePlan';
import { CheckCircle2, ClipboardList, LayoutPanelLeft, NotebookText } from 'lucide-react';

export function SampleOutput() {
  return (
    <section id="sample" className="pt-16">
      <div className="mx-auto w-full max-w-6xl px-4 text-right" dir="rtl">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold text-emerald-200">نمونه خروجی</p>
          <h2 className="text-3xl font-black text-white">پلن آماده ارائه در چند کارت خوانا</h2>
          <p className="max-w-3xl text-slate-300">
            قالب نمایش طوری طراحی شده که بتوانید بلافاصله با تیم یا سرمایه‌گذار به اشتراک بگذارید.
            همه نکات، اعداد کلیدی و ریسک‌ها در کارت‌های کوتاه هستند.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Card className="md:col-span-2 border-white/10 bg-white/5 text-slate-100">
            <CardHeader className="space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/40 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-100">
                <LayoutPanelLeft className="h-4 w-4" />
                خلاصه اجرایی
              </div>
              <CardTitle className="text-2xl font-bold text-white">{samplePlan.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-7 text-slate-200">
              {samplePlan.summary}
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-white/5 text-slate-100">
            <CardHeader className="space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
                شاخص‌ها
              </div>
              <CardTitle className="text-lg font-semibold text-white">اعداد کلیدی</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-200">
              {samplePlan.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="flex items-center justify-between border-b border-white/5 pb-2 last:border-0 last:pb-0"
                >
                  <span className="text-slate-300">{metric.label}</span>
                  <span className="font-semibold text-white">{metric.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {samplePlan.sections.map((section) => (
            <Card key={section.title} className="border-white/10 bg-white/5 text-slate-100">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-white">{section.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm leading-7 text-slate-200">
                {section.points.map((point) => (
                  <div key={point} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-1 h-4 w-4 text-emerald-300" />
                    <span>{point}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-4">
          <Card className="border-emerald-300/40 bg-emerald-400/10 text-slate-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <p className="text-xs text-emerald-100">چک‌لیست اقدام</p>
                <CardTitle className="text-xl font-semibold text-white">
                  ۵ کار فوری برای شروع
                </CardTitle>
              </div>
              <ClipboardList className="h-5 w-5 text-emerald-200" />
            </CardHeader>
            <CardContent className="space-y-2 text-sm leading-7 text-slate-100">
              {samplePlan.checklist.map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <NotebookText className="mt-1 h-4 w-4 text-emerald-200" />
                  <span>{item}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
