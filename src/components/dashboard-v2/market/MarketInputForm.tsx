'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { MarketInputs } from '@/app/actions/market';

interface Props {
  initialValues?: Partial<MarketInputs>;
  onGenerate: (inputs: MarketInputs) => void;
  loading: boolean;
}

export function MarketInputForm({ initialValues, onGenerate, loading }: Props) {
  const [inputs, setInputs] = useState<MarketInputs>({
    audience: initialValues?.audience || '',
    region: initialValues?.region || '',
    priceRange: initialValues?.priceRange || '',
    category: initialValues?.category || '',
  });

  const handleChange = (k: keyof MarketInputs, v: string) => {
    setInputs((p) => ({ ...p, [k]: v }));
  };

  return (
    <div className="grid gap-4 p-4 border rounded-lg bg-card">
      <h3 className="font-semibold flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-primary" />
        ورودی‌های تحلیل بازار
      </h3>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>دسته‌بندی بازار</Label>
          <Input
            id="market-category"
            placeholder="مثال: فروشگاه آنلاین پوشاک، SaaS..."
            value={inputs.category}
            onChange={(e) => handleChange('category', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>مخاطب هدف</Label>
          <Input
            placeholder="مثال: نوجوانان، مدیران شرکت‌ها..."
            value={inputs.audience}
            onChange={(e) => handleChange('audience', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>منطقه فعالیت</Label>
          <Input
            placeholder="مثال: تهران، کل ایران، جهانی..."
            value={inputs.region}
            onChange={(e) => handleChange('region', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>رنج قیمتی</Label>
          <Input
            placeholder="مثال: اقتصادی، لوکس، متوسط..."
            value={inputs.priceRange}
            onChange={(e) => handleChange('priceRange', e.target.value)}
          />
        </div>
      </div>
      <div className="flex justify-end pt-2">
        <Button
          id="market-generate-btn"
          onClick={() => onGenerate(inputs)}
          disabled={loading || !inputs.category}
        >
          {loading ? (
            <Loader2 className="ml-2 h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="ml-2 h-4 w-4" />
          )}
          تحلیل بازار هوشمند
        </Button>
      </div>
    </div>
  );
}
