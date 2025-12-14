import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { samplePlan } from '@/content/samplePlan';
import { CheckCircle2, ClipboardList, LayoutPanelLeft, NotebookText } from 'lucide-react';

export function SampleOutput() {
  return (
    <section id="sample" className="py-24 bg-background border-t border-slate-50 text-foreground">
      <div className="mx-auto w-full max-w-6xl px-4 text-right" dir="rtl">
        <div className="mb-16 text-center md:text-right">
          <p className="mb-3 text-sm font-bold uppercase tracking-wider text-primary">
            نمونه خروجی
          </p>
          <h2 className="text-3xl font-black text-foreground md:text-4xl">
            پلن آماده ارائه در چند کارت خوانا
          </h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-muted-foreground">
            قالب نمایش طوری طراحی شده که بتوانید بلافاصله با تیم یا سرمایه‌گذار به اشتراک بگذارید.
            همه نکات، اعداد کلیدی و ریسک‌ها در کارت‌های کوتاه هستند.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-2 border-border shadow-sm bg-background">
            <CardHeader className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-bold text-primary w-fit">
                <LayoutPanelLeft className="h-4 w-4" />
                خلاصه اجرایی
              </div>
              <CardTitle className="text-2xl font-bold text-foreground tracking-tight">
                {samplePlan.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground leading-7">
              {samplePlan.summary}
            </CardContent>
          </Card>

          <Card className="border-border shadow-sm bg-background">
            <CardHeader className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-bold text-muted-foreground w-fit">
                شاخص‌ها
              </div>
              <CardTitle className="text-lg font-bold text-foreground">اعداد کلیدی</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {samplePlan.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0"
                >
                  <span className="text-muted-foreground text-sm font-medium">{metric.label}</span>
                  <span className="font-bold text-foreground dir-ltr">{metric.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {samplePlan.sections.map((section) => (
            <Card key={section.title} className="border-border shadow-sm bg-background">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-foreground">{section.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm leading-7 text-muted-foreground">
                {section.points.map((point) => (
                  <div key={point} className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-1 h-4 w-4 text-primary shrink-0" />
                    <span className="font-medium">{point}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6">
          <Card className="border-primary/20 bg-primary/5 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <p className="text-xs font-bold text-primary mb-1">چک‌لیست اقدام</p>
                <CardTitle className="text-xl font-bold text-foreground">
                  ۵ کار فوری برای شروع
                </CardTitle>
              </div>
              <ClipboardList className="h-6 w-6 text-primary" />
            </CardHeader>
            <CardContent className="space-y-3 text-foreground/90 leading-7">
              {samplePlan.checklist.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <NotebookText className="mt-1 h-4 w-4 text-primary shrink-0" />
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
