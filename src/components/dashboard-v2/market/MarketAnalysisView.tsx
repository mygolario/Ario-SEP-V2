'use client';

import { MarketAnalysis } from '@/app/actions/market';
import { Card } from '@/components/ui/card';
import { Target, Trophy, Users } from 'lucide-react';
import { ExplainTrigger } from '@/components/dashboard-v2/help/ExplainPanel';

interface Props {
  analysis: MarketAnalysis;
}

export function MarketAnalysisView({ analysis }: Props) {
  if (!analysis.positioning) return null;

  return (
    <div className="grid md:grid-cols-3 gap-4">
      <Card className="p-4 space-y-3 bg-blue-50/50 border-blue-100">
        <div className="flex items-center justify-between font-semibold text-blue-700">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            بخش‌بندی بازار
          </div>
          <ExplainTrigger
            title="بخش‌بندی بازار (Market Segmentation)"
            description="تقسیم بازار هدف به گروه‌های کوچکتر با ویژگی‌های مشترک."
          >
            <p>
              در این بخش، مشتریان احتمالی شما به گروه‌هایی تقسیم شده‌اند که نیازها، علایق یا
              رفتارهای خرید مشابهی دارند. شناخت این بخش‌ها به شما کمک می‌کند تا بازاریابی دقیق‌تری
              داشته باشید.
            </p>
          </ExplainTrigger>
        </div>
        <div className="flex flex-col gap-2">
          {analysis.segments.map((s, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              {s}
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-4 space-y-3 bg-purple-50/50 border-purple-100">
        <div className="flex items-center justify-between font-semibold text-purple-700">
          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            مزیت‌های رقابتی
          </div>
          <ExplainTrigger
            title="مزیت رقابتی (Differentiation)"
            description="آنچه شما را از رقبا متمایز می‌کند."
          >
            <p>
              چرا مشتری باید شما را انتخاب کند؟ این موارد ویژگی‌های منحصر‌به‌فرد محصول یا خدمت شماست
              که در رقبا وجود ندارد یا ضعیف‌تر است.
            </p>
          </ExplainTrigger>
        </div>
        <div className="flex flex-col gap-2">
          {analysis.differentiation.map((d, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              {d}
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-4 space-y-3 bg-amber-50/50 border-amber-100">
        <div className="flex items-center justify-between font-semibold text-amber-700">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            جایگاه‌سازی
          </div>
          <ExplainTrigger
            title="جایگاه‌سازی (Positioning)"
            description="تصویری که از برند شما در ذهن مشتری شکل می‌گیرد."
          >
            <p>
              جایگاه‌سازی استراتژی شما برای اشغال یک مکان خاص در ذهن مشتری است. مثلا
              &quot;ولوو&quot; با &quot;ایمنی&quot; شناخته می‌شود.
            </p>
          </ExplainTrigger>
        </div>
        <p className="text-sm leading-relaxed text-amber-900/80">{analysis.positioning}</p>
      </Card>
    </div>
  );
}
