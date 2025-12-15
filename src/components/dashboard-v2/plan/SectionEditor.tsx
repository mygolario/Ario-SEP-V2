'use client';

import { AIReviewResult, reviewSection } from '@/app/actions/expert-plan';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/toast';
import { AlertTriangle, CheckCircle2, Loader2, Wand2 } from 'lucide-react';
import { useState } from 'react';

interface Props {
  sectionKey: string;
  title: string;
  value: string;
  onChange: (val: string) => void;
}

export function SectionEditor({ sectionKey, title, value, onChange }: Props) {
  const { toast } = useToast();
  const [reviewing, setReviewing] = useState(false);
  const [review, setReview] = useState<AIReviewResult | null>(null);

  const handleReview = async () => {
    if (!value || value.length < 10) {
      toast('لطفا ابتدا متنی بنویسید', 'error');
      return;
    }
    setReviewing(true);
    try {
      const result = await reviewSection(sectionKey, value);
      setReview(result);
      toast('بررسی هوشمند انجام شد', 'success');
    } catch {
      toast('خطا در بررسی متن. شاید اشتراک ندارید؟', 'error');
    } finally {
      setReviewing(false);
    }
  };

  return (
    <Card className="border-l-4 border-l-primary/50">
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">{title}</h3>
          <Button variant="outline" size="sm" onClick={handleReview} disabled={reviewing}>
            {reviewing ? (
              <Loader2 className="ml-2 h-4 w-4 animate-spin" />
            ) : (
              <Wand2 className="ml-2 h-4 w-4 text-purple-600" />
            )}
            بررسی هوشمند
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className={review ? 'md:col-span-2' : 'md:col-span-3'}>
            <Textarea
              className="min-h-[200px] text-base leading-relaxed"
              placeholder={`متن مربوط به ${title} را اینجا بنویسید...`}
              value={value}
              onChange={(e) => onChange(e.target.value)}
            />
          </div>

          {review && (
            <div className="md:col-span-1 space-y-4 bg-muted/30 p-4 rounded-lg border animate-in slide-in-from-right-4">
              <div className="flex items-center justify-between border-b pb-2">
                <span className="text-sm font-medium text-muted-foreground">امتیاز کیفی</span>
                <span
                  className={`text-lg font-bold ${review.score > 80 ? 'text-green-600' : review.score > 50 ? 'text-amber-500' : 'text-red-500'}`}
                >
                  {review.score}/100
                </span>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-semibold text-muted-foreground uppercase flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  نقد و بررسی
                </span>
                <ul className="text-sm space-y-1 list-disc list-inside text-foreground/80">
                  {review.critique.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-semibold text-muted-foreground uppercase flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  پیشنهادات
                </span>
                <ul className="text-sm space-y-1 list-disc list-inside text-foreground/80">
                  {review.suggestions.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
