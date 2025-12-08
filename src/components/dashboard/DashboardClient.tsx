'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Rocket, Palette, ScrollText, CheckCircle2, Layout, ArrowRight, Download } from 'lucide-react';
import { WebsitePreview } from '@/components/dashboard/WebsitePreview';
import { Roadmap } from '@/components/dashboard/Roadmap';
import { useReactToPrint } from 'react-to-print';
import { PrintablePlan } from '@/components/dashboard/PrintablePlan';

interface BusinessData {
  businessName: string;
  tagline: string;
  summary: string;
  colorPalette: string[];
  marketingSteps: string[];
  landingPageCopy: {
    headline: string;
    subheadline: string;
    cta: string;
  };
  logoSVG?: string;
  roadmap?: { week: string; focus: string; tasks: string[] }[];
}

export default function DashboardClient() {
  const [data, setData] = useState<BusinessData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedData = localStorage.getItem('businessData');
    if (storedData) {
      try {
        setData(JSON.parse(storedData));
      } catch (e) {
        console.error("Failed to parse business data", e);
      }
    }
    setLoading(false);
  }, []);

  const componentRef = useRef<HTMLDivElement>(null);
  
  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `BusinessPlan_${new Date().toISOString().split('T')[0]}`,
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <p className="text-slate-500 animate-pulse">در حال بارگذاری...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4 text-center space-y-6" dir="rtl">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">هنوز پروژه‌ای ثبت نکرده‌اید</h1>
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
      <div className="hidden">
           {data && <PrintablePlan ref={componentRef} data={data} />}
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        
        <div className="flex justify-between items-center flex-wrap gap-4">
             <div className="flex flex-col">
                <h1 className="text-2xl font-bold text-slate-400">داشبورد مدیریتی</h1>
             </div>
             <div className="flex gap-3">
                 <Link href="/start">
                  <Button variant="outline" size="sm">پروژه جدید</Button>
                 </Link>
                 <Button 
                    onClick={() => handlePrint()}
                    variant="default" 
                    size="sm" 
                    className="gap-2 bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900"
                  >
                    <Download className="w-4 h-4" />
                    دانلود طرح (PDF)
                 </Button>
             </div>
        </div>

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
              <CardTitle className="text-lg text-slate-700 dark:text-slate-200">هویت بصری</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-6 py-4">
               {/* Logo Preview */}
               <div className="w-full flex justify-center">
                  {data.logoSVG ? (
                    <div 
                      className="w-32 h-32 rounded-xl shadow-inner bg-slate-50 dark:bg-slate-800 p-2 flex items-center justify-center overflow-hidden"
                      dangerouslySetInnerHTML={{ __html: data.logoSVG }} 
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-xl shadow-inner bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                       <span className="text-4xl font-bold text-slate-300">{data.businessName.substring(0,2)}</span>
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
                        <span className="text-[10px] text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity font-mono" dir="ltr">{color}</span>
                    </div>
                  ))}
               </div>
            </CardContent>
          </Card>

          {/* Card C: Strategy (Spans 3 cols) */}
          <Card className="md:col-span-3 border-emerald-100 dark:border-emerald-900/30 bg-emerald-50/50 dark:bg-emerald-950/10">
            <CardHeader className="flex flex-row items-center gap-2">
              <ScrollText className="w-5 h-5 text-emerald-600 dark:text-emerald-500" />
              <CardTitle className="text-xl text-emerald-800 dark:text-emerald-400">برنامه استراتژیک</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed text-emerald-900/80 dark:text-emerald-200/80 text-justify">
                {data.summary}
              </p>
            </CardContent>
          </Card>

          {/* Card D: Marketing */}
          <Card className="md:col-span-1 h-full">
            <CardHeader className="flex flex-row items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-blue-500" />
              <CardTitle className="text-lg text-slate-800 dark:text-slate-200">گام‌های بازاریابی</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {data.marketingSteps.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
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
              <CardTitle className="text-lg text-slate-800 dark:text-slate-200">متن وب‌سایت پیشنهادی</CardTitle>
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
    </div>
  );
}
