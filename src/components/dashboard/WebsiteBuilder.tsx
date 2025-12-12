'use client';

import { useState } from 'react';
import { Download, Globe, Layout, Monitor, Smartphone, Star } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { BusinessPlanV1, LandingPageFeature, Testimonial } from '@/types/businessPlan';

interface WebsiteBuilderProps {
  data: BusinessPlanV1;
}

export function WebsiteBuilder({ data }: WebsiteBuilderProps) {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');

  const { landingPageCopy, logoSVG, colorPalette, businessName } = data;
  const { headline, subheadline, cta, features = [], testimonials = [], footer } = landingPageCopy;
  const brandColors = colorPalette.length > 0 ? colorPalette : ['#4f46e5', '#818cf8', '#c7d2fe'];
  const primaryColor = brandColors[0];

  const handleDownload = () => {
    const code = `
    // This is a simplified React component for your landing page
    // Needs 'lucide-react' and 'tailwindcss'
    
    export default function LandingPage() {
      return (
        <div className="font-sans text-right" dir="rtl">
           {/* Hero */}
           <section className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white py-20 px-6 text-center">
              <h1 className="text-5xl font-bold mb-6">${headline}</h1>
              <p className="text-xl opacity-80 mb-8 max-w-2xl mx-auto">${subheadline}</p>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full font-bold transition">
                 ${cta}
              </button>
           </section>
           
           {/* Features */}
           <section className="py-20 px-6 bg-white">
              <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                 {/* Features Would Go Here */}
              </div>
           </section>
        </div>
      )
    }
    `;

    // Copy to clipboard
    navigator.clipboard.writeText(code);
    alert('کد صفحه لندینگ در کلیپ‌بورد کپی شد! (Code copied to clipboard)');
  };

  const DynamicIcon = ({ name }: { name?: string }) => {
    const iconLibrary = LucideIcons as Record<string, typeof Star>;
    const Icon = (name && iconLibrary[name]) || Star;
    return <Icon className="w-8 h-8 mb-4 text-indigo-600" />;
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Toolbar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm sticky top-4 z-50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
            <Layout className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-slate-800">سازنده وب‌سایت (Website Builder)</h2>
            <p className="text-xs text-slate-500">پیش‌نمایش زنده وب‌سایت شما</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Tabs
            value={viewMode}
            onValueChange={(v: string) => setViewMode(v as 'desktop' | 'mobile')}
          >
            <TabsList>
              <TabsTrigger value="desktop">
                <Monitor className="w-4 h-4 ml-2" /> دسکتاپ
              </TabsTrigger>
              <TabsTrigger value="mobile">
                <Smartphone className="w-4 h-4 ml-2" /> موبایل
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <Button
            onClick={handleDownload}
            variant="outline"
            className="border-indigo-200 text-indigo-700 hover:bg-indigo-50"
          >
            <Download className="w-4 h-4 ml-2" />
            دریافت کد
          </Button>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex justify-center bg-slate-100 p-8 rounded-xl border border-slate-200 overflow-hidden min-h-[800px]">
        <div
          className={`bg-white shadow-2xl transition-all duration-500 overflow-hidden flex flex-col ${viewMode === 'mobile' ? 'w-[375px] rounded-[40px] border-[8px] border-slate-800' : 'w-full rounded-lg border border-slate-200'}`}
        >
          {/* Fake Browser Toolbar */}
          {viewMode === 'desktop' && (
            <div className="bg-slate-50 border-b border-slate-200 p-3 flex items-center gap-4">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="flex-1 bg-white border border-slate-200 rounded-md px-3 py-1 text-xs text-slate-400 font-mono text-center flex items-center justify-center gap-2">
                <Globe className="w-3 h-3" />
                {businessName || 'your-startup'}.com
              </div>
            </div>
          )}

          {/* WEBSITE CONTENT START */}
          <div className="flex-1 overflow-y-auto font-sans text-right" dir="rtl">
            {/* Navigation */}
            <nav className="flex justify-between items-center p-6 border-b border-slate-100">
              <div className="font-bold text-xl flex items-center gap-2">
                {logoSVG ? (
                  <div className="w-8 h-8" dangerouslySetInnerHTML={{ __html: logoSVG }} />
                ) : (
                  <div className="w-8 h-8 bg-indigo-600 rounded-lg"></div>
                )}
                {businessName}
              </div>
              <div className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
                <span>ویژگی‌ها</span>
                <span>نظرات</span>
                <span>تماس</span>
              </div>
              <Button size="sm" style={{ backgroundColor: primaryColor }}>
                ثبت نام
              </Button>
            </nav>

            {/* Hero Section */}
            <header className="py-20 px-6 text-center bg-gradient-to-b from-slate-50 to-white">
              <Badge className="mb-6 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border-indigo-100 px-4 py-1">
                نسخه جدید منتشر شد
              </Badge>
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 leading-tight max-w-4xl mx-auto">
                {headline || 'تیتر جذاب و گیرای محصول شما در اینجا قرار می‌گیرد'}
              </h1>
              <p className="text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
                {subheadline || 'توضیحات تکمیلی که ارزش پیشنهادی شما را به مشتری نشان می‌دهد.'}
              </p>
              <div className="flex flex-col md:flex-row justify-center gap-4">
                <Button
                  size="lg"
                  className="h-14 px-8 text-lg"
                  style={{ backgroundColor: primaryColor }}
                >
                  {cta || 'شروع کنید'}
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg">
                  اطلاعات بیشتر
                </Button>
              </div>
            </header>

            {/* Features Section */}
            <section className="py-24 px-6 bg-white">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold text-slate-900 mb-4">چرا {businessName}؟</h2>
                  <p className="text-slate-500">ویژگی‌هایی که ما را متمایز می‌کند</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  {features.length > 0
                    ? features.map((feature: LandingPageFeature, i: number) => (
                        <div
                          key={i}
                          className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-50/50 hover:bg-slate-50 transition-colors"
                        >
                          <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6">
                            <DynamicIcon name={feature.iconName} />
                          </div>
                          <h3 className="text-xl font-bold mb-3 text-slate-800">{feature.title}</h3>
                          <p className="text-slate-500 leading-7">{feature.description}</p>
                        </div>
                      ))
                    : [1, 2, 3].map((_, i) => (
                        <div key={i} className="h-64 bg-slate-100 rounded-2xl animate-pulse"></div>
                      ))}
                </div>
              </div>
            </section>

            {/* Social Proof Section */}
            <section className="py-24 px-6 bg-slate-900 text-white">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-16">مورد اعتماد بهترین‌های صنعت</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {testimonials.length > 0
                    ? testimonials.map((testimonial: Testimonial, i: number) => (
                        <div
                          key={i}
                          className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 text-right"
                        >
                          <div className="flex text-yellow-400 mb-4">
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current" />
                          </div>
                          <p className="text-lg text-slate-300 mb-6 italic leading-relaxed">
                            &quot;{testimonial.quote}&quot;
                          </p>
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500"></div>
                            <div>
                              <div className="font-bold">{testimonial.name}</div>
                              <div className="text-sm text-slate-400">{testimonial.role}</div>
                            </div>
                          </div>
                        </div>
                      ))
                    : null}
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-6 bg-slate-950 text-slate-400 border-t border-slate-900">
              <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-indigo-600 rounded"></div>
                  <span className="font-bold text-white">{businessName}</span>
                </div>
                <div className="text-sm">
                  {footer?.copyrightText || '© 2024 تمامی حقوق محفوظ است.'}
                </div>
                <div className="flex gap-6">
                  {footer?.socialLinks?.map((link: string, i: number) => (
                    <span key={i} className="hover:text-white cursor-pointer transition-colors">
                      {link}
                    </span>
                  ))}
                </div>
              </div>
            </footer>
          </div>
          {/* WEBSITE CONTENT END */}
        </div>
      </div>
    </div>
  );
}
