'use client';

import { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calculator, PieChart } from 'lucide-react';

export function ValuationCalculator() {
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(0);
  const [growthRate, setGrowthRate] = useState<number>(10);
  const [fundingNeeded, setFundingNeeded] = useState<number>(0);
  
  const [valuation, setValuation] = useState<number>(0);
  const [equitySold, setEquitySold] = useState<number>(0);

  useEffect(() => {
    // Formula: (Revenue * 12) * (Growth Rate / 10 + 2)
    // Basic multiplier model: Annual Revenue * Multiplier (where multiplier is boosted by growth)
    const annualRunRate = monthlyRevenue * 12;
    const multiplier = (growthRate / 10) + 2; 
    // Example: 10% growth -> 3x multiplier. 50% growth -> 7x multiplier.
    
    const val = annualRunRate * multiplier;
    setValuation(val);
  }, [monthlyRevenue, growthRate]);

  useEffect(() => {
    if (valuation > 0) {
      const equity = (fundingNeeded / valuation) * 100;
      setEquitySold(Math.min(equity, 100));
    } else {
      setEquitySold(0);
    }
  }, [fundingNeeded, valuation]);

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000000) {
      return (amount / 1000000000).toFixed(1) + ' میلیارد تومان';
    }
    if (amount >= 1000000) {
      return (amount / 1000000).toFixed(0) + ' میلیون تومان';
    }
    return amount.toLocaleString() + ' تومان';
  };

  return (
    <Card className="border-slate-200 shadow-md">
       <CardHeader className="bg-slate-50 border-b border-slate-100">
          <div className="flex items-center gap-2">
             <Calculator className="w-5 h-5 text-indigo-600" />
             <CardTitle className="text-lg font-bold text-slate-800">ماشین حساب ارزش‌گذاری</CardTitle>
          </div>
       </CardHeader>
       <CardContent className="p-6 space-y-8">
          
          {/* Revenue Input */}
          <div className="space-y-3">
             <label className="text-sm font-medium text-slate-700">درآمد ماهانه پیش‌بینی شده (تومان)</label>
             <Input 
                type="number" 
                placeholder="مثلاً ۵۰,۰۰۰,۰۰۰" 
                className="text-left dir-ltr"
                value={monthlyRevenue || ''}
                onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
             />
          </div>

          {/* Growth Slider */}
          <div className="space-y-4">
             <div className="flex justify-between">
                <label className="text-sm font-medium text-slate-700">نرخ رشد ماهانه</label>
                <span className="text-sm font-bold text-indigo-600 dir-ltr">{growthRate}%</span>
             </div>
             <Slider 
                value={[growthRate]} 
                max={100} 
                step={1} 
                onValueChange={(val) => setGrowthRate(val[0])}
                className="py-4"
             />
             <div className="text-xs text-slate-500 flex justify-between">
                <span>کند</span>
                <span>بسیار سریع</span>
             </div>
          </div>

          {/* Result Display */}
          <div className="bg-slate-900 rounded-xl p-6 text-center text-white space-y-2">
             <h3 className="text-sm text-slate-400 uppercase tracking-widest">ارزش حدودی استارتاپ شما</h3>
             <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 dir-rtl">
                {valuation === 0 ? '---' : formatCurrency(valuation)}
             </div>
             <p className="text-xs text-slate-500 mt-2">بر اساس فرمول ضریب درآمد سالانه</p>
          </div>

          <div className="border-t border-slate-100 pt-6 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                 <PieChart className="w-5 h-5 text-rose-500" />
                 <h4 className="font-bold text-slate-800">محاسبه سهام واگذاری</h4>
              </div>
              
              <div className="space-y-3">
                 <label className="text-sm font-medium text-slate-700">چقدر سرمایه نیاز دارید؟ (تومان)</label>
                 <Input 
                    type="number" 
                    className="text-left dir-ltr"
                    value={fundingNeeded || ''}
                    onChange={(e) => setFundingNeeded(Number(e.target.value))}
                 />
              </div>

              {valuation > 0 && fundingNeeded > 0 && (
                  <div className="p-4 bg-rose-50 border border-rose-100 rounded-lg flex items-center justify-between">
                      <span className="text-sm text-rose-800">سهام پیشنهادی برای فروش:</span>
                      <Badge variant="destructive" className="text-lg px-3 py-1 dir-ltr">
                          {equitySold.toFixed(1)}%
                      </Badge>
                  </div>
              )}
          </div>

       </CardContent>
    </Card>
  );
}
