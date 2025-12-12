'use client';

import React, { forwardRef } from 'react';

import { sanitizeLogoSvg } from '@/lib/security/sanitizeSvg';
import type { BusinessPlanV1 } from '@/types/businessPlan';

export const PrintablePlan = forwardRef<HTMLDivElement, { data: BusinessPlanV1 }>(
  ({ data }, ref) => {
    const safeLogo = sanitizeLogoSvg(data.logoSVG);
    return (
      <div
        ref={ref}
        className="w-full bg-white p-12 text-slate-900"
        dir="rtl"
        style={{ direction: 'rtl' }}
      >
        {/* A4 Format styles usually handled by @media print, but here we setup structure */}
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header */}
          <header className="border-b-4 border-slate-900 pb-8 flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-extrabold mb-2">{data.businessName}</h1>
              <p className="text-xl text-slate-600 font-medium">{data.tagline}</p>
            </div>
            {safeLogo && (
              <div className="w-24 h-24" dangerouslySetInnerHTML={{ __html: safeLogo }} />
            )}
          </header>

          {/* Section 1: Executive Summary */}
          <section>
            <h2 className="text-2xl font-bold border-b-2 border-slate-200 pb-2 mb-4">
              خلاصه مدیریتی
            </h2>
            <div className="bg-slate-50 p-6 rounded-lg border border-slate-100 text-justify leading-relaxed text-lg">
              {data.summary}
            </div>
          </section>

          {/* Section 2: Visual Identity */}
          <section>
            <h2 className="text-2xl font-bold border-b-2 border-slate-200 pb-2 mb-4">هویت بصری</h2>
            <div className="flex gap-8 items-center">
              <div>
                <span className="block mb-2 font-bold text-sm text-slate-500">پالت رنگی:</span>
                <div className="flex gap-4">
                  {data.colorPalette.map((color, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-2">
                      <div
                        className="w-16 h-16 rounded-full border-2 border-slate-200 shadow-sm"
                        style={{ backgroundColor: color, printColorAdjust: 'exact' }}
                      />
                      <span className="font-mono text-sm" dir="ltr">
                        {color}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Brand Message */}
          <section>
            <h2 className="text-2xl font-bold border-b-2 border-slate-200 pb-2 mb-4">پیام برند</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-slate-700">تیتر اصلی:</h3>
                <p className="text-lg">{data.landingPageCopy.headline}</p>
              </div>
              <div>
                <h3 className="font-bold text-slate-700">زیرعنوان:</h3>
                <p className="text-lg text-slate-600">{data.landingPageCopy.subheadline}</p>
              </div>
            </div>
          </section>

          {/* Section 4: Marketing Plan */}
          <section>
            <h2 className="text-2xl font-bold border-b-2 border-slate-200 pb-2 mb-4">
              برنامه بازاریابی
            </h2>
            <ul className="list-decimal list-inside space-y-2 text-lg">
              {data.marketingSteps.map((step, idx) => (
                <li key={idx} className="pl-4">
                  {step}
                </li>
              ))}
            </ul>
          </section>

          {/* Section 5: Roadmap */}
          {data.roadmap && (
            <section className="break-inside-avoid">
              <h2 className="text-2xl font-bold border-b-2 border-slate-200 pb-2 mb-4">
                نقشه راه اجرایی (۳۰ روزه)
              </h2>
              <div className="grid grid-cols-1 gap-6">
                {data.roadmap.map((week, idx) => (
                  <div key={idx} className="border border-slate-200 rounded-lg p-4 bg-white">
                    <h3 className="font-bold text-lg mb-2 text-blue-800">
                      {week.week}: {week.focus}
                    </h3>
                    <ul className="list-disc list-inside space-y-1 text-slate-700">
                      {week.tasks.map((task, tIdx) => (
                        <li key={tIdx}>{task}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          <footer className="pt-12 text-center text-slate-400 text-sm border-t border-slate-100 mt-12">
            <p>تولید شده توسط دستیار هوشمند آریو</p>
          </footer>
        </div>
      </div>
    );
  }
);

PrintablePlan.displayName = 'PrintablePlan';
