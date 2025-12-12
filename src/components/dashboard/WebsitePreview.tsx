'use client';

import type { BusinessPlanV1 } from '@/types/businessPlan';
import { Button } from '@/components/ui/button';

export function WebsitePreview({ data }: { data: BusinessPlanV1 }) {
  if (!data) return null;

  const primaryColor = data.colorPalette[0] || '#000000';

  return (
    <div className="w-full h-full flex flex-col border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl overflow-hidden bg-white dark:bg-slate-950 mb-8">
      {/* Browser Bar */}
      <div
        className="h-10 bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center px-4 justify-between"
        dir="ltr"
      >
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
        </div>
        <div className="flex-1 mx-4">
          <div className="bg-white dark:bg-slate-800 rounded-md py-1 px-3 text-xs text-center text-slate-500 font-mono">
            www.{data.businessName.replace(/\s+/g, '-').toLowerCase()}.com
          </div>
        </div>
        <div className="w-16"></div> {/* Spacer for balance */}
      </div>

      {/* Website Body */}
      <div className="relative w-full bg-white text-slate-900 min-h-[500px]" dir="rtl">
        {/* Navbar */}
        <nav className="flex justify-between items-center px-8 py-6 border-b border-gray-100">
          <div className="flex items-center gap-2">
            {data.logoSVG ? (
              <div className="w-10 h-10" dangerouslySetInnerHTML={{ __html: data.logoSVG }} />
            ) : (
              <div className="font-bold text-xl">{data.businessName}</div>
            )}
          </div>

          <div className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
            <span className="hover:text-black cursor-pointer">خانه</span>
            <span className="hover:text-black cursor-pointer">درباره ما</span>
            <span className="hover:text-black cursor-pointer">تماس</span>
          </div>

          <div className="md:hidden">
            {/* Mobile Menu Icon Placeholder */}
            <div className="space-y-1">
              <div className="w-6 h-0.5 bg-gray-600"></div>
              <div className="w-6 h-0.5 bg-gray-600"></div>
              <div className="w-6 h-0.5 bg-gray-600"></div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center text-center px-6 py-24 space-y-8 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
            {data.landingPageCopy.headline}
          </h1>
          <p className="text-xl md:text-2xl text-gray-500 max-w-2xl leading-relaxed">
            {data.landingPageCopy.subheadline}
          </p>
          <div className="pt-4">
            <Button
              size="lg"
              className="text-white px-10 py-6 text-xl rounded-full shadow-xl hover:opacity-90 transition-opacity"
              style={{ backgroundColor: primaryColor }}
            >
              {data.landingPageCopy.cta}
            </Button>
          </div>
        </div>

        {/* Decorative Element */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-50"></div>
      </div>
    </div>
  );
}
