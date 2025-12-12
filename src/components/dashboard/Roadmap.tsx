'use client';

import { CheckCircle2 } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { RoadmapItem } from '@/types/businessPlan';

interface RoadmapProps {
  roadmap: RoadmapItem[];
}

export function Roadmap({ roadmap }: RoadmapProps) {
  if (!roadmap || roadmap.length === 0) return null;

  return (
    <div className="w-full space-y-8" dir="rtl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-xl">
          <CheckCircle2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            نقشه راه ۳۰ روزه
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            برنامه عملیاتی گام‌به‌گام برای راه‌اندازی
          </p>
        </div>
      </div>

      <div className="relative border-r-2 border-slate-200 dark:border-slate-800 mr-4 md:mr-6 space-y-12 pb-12">
        {roadmap.map((week, idx) => (
          <div key={idx} className="relative pr-8 md:pr-12">
            {/* Timeline Node */}
            <div className="absolute -right-[9px] top-6 w-4 h-4 rounded-full bg-white dark:bg-slate-950 border-4 border-blue-500 shadow-md z-10 transition-transform hover:scale-125"></div>

            <Card className="border-slate-200 dark:border-slate-800 hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-3 bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-3 py-1 rounded-full border border-blue-100 dark:border-blue-900">
                    {week.week}
                  </span>
                  <CardTitle className="text-lg text-slate-800 dark:text-slate-200">
                    {week.focus}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="space-y-3">
                  {week.tasks.map((task, tIdx) => (
                    <li key={tIdx} className="flex items-start gap-3 group cursor-pointer">
                      <div className="w-5 h-5 rounded border-2 border-slate-300 dark:border-slate-700 flex items-center justify-center mt-0.5 group-hover:border-blue-500 transition-colors">
                        {/* Fake Checkbox state for now */}
                        <div className="w-2.5 h-2.5 rounded-sm bg-blue-500 opacity-0 group-hover:opacity-20 transition-opacity" />
                      </div>
                      <span className="text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors text-sm leading-relaxed">
                        {task}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        ))}
        {/* End Cap */}
        <div className="absolute -right-[7px] bottom-0 w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-700"></div>
      </div>
    </div>
  );
}
