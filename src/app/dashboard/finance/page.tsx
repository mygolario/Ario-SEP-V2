'use client';

// Since this page has a lot of interaction, we make the whole page a Client Component for simplicity in this MVP.
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, TrendingUp, Activity } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

export default function FinancePage() {
  const [loading, setLoading] = useState(true);
  
  // State for inputs
  const [price, setPrice] = useState(500000); // Tomans
  const [initialUsers, setInitialUsers] = useState(100);
  const [growthRate, setGrowthRate] = useState(10); // Percent
  const [fixedCosts, setFixedCosts] = useState(50000000); // 50M Tomans/month
  const [variableCost, setVariableCost] = useState(150000); // Per unit
  
  // State for Chart Data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [chartData, setChartData] = useState<any[]>([]);
  const [totalAnnualRevenue, setTotalAnnualRevenue] = useState(0);
  const [breakEvenMonth, setBreakEvenMonth] = useState<number | null>(null);

  // Fetch initial data (simulated for client component access)
  useEffect(() => {
     async function fetchData() {
         const supabase = createClient();
         const { data: { user } } = await supabase.auth.getUser();
         if (user) {
             const { data: projects } = await supabase
                .from('projects')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false })
                .limit(1);
             
             const financials = projects?.[0]?.business_data?.financials;
             if (financials) {
                 setPrice(financials.suggestedPrice || 500000);
                 setVariableCost(financials.costPerUnit || 150000);
                 setInitialUsers(financials.initialUsers || 100);
                 setGrowthRate(financials.monthlyGrowth || 10);
             }
         }
         setLoading(false);
     }
     fetchData();
  }, []);

  // Recalculate Logic
  useEffect(() => {
     const newChartData = [];
     let currentUsers = initialUsers;
     let annualRev = 0;
     let firstProfitMonth = null;

     for (let month = 1; month <= 12; month++) {
         // Growth
         if (month > 1) {
             currentUsers = currentUsers * (1 + (growthRate / 100));
         }

         const revenue = Math.floor(currentUsers * price);
         const totalVariableCost = Math.floor(currentUsers * variableCost);
         const totalCost = fixedCosts + totalVariableCost;
         const profit = revenue - totalCost;

         newChartData.push({
             month: `ماه ${month}`,
             revenue: revenue,
             cost: totalCost,
             profit: profit
         });

         annualRev += revenue;

         if (firstProfitMonth === null && profit > 0) {
             firstProfitMonth = month;
         }
     }

     setChartData(newChartData);
     setTotalAnnualRevenue(annualRev);
     setBreakEvenMonth(firstProfitMonth);

  }, [price, initialUsers, growthRate, fixedCosts, variableCost]);

  const formatCurrency = (val: number) => {
      if (val >= 1000000000) return (val / 1000000000).toFixed(1) + ' B';
      if (val >= 1000000) return (val / 1000000).toFixed(1) + ' M';
      return (val / 1000).toFixed(0) + ' K';
  };

  if (loading) {
      return <div className="p-8 text-center text-slate-500">در حال بارگذاری مدل مالی...</div>;
  }

  return (
    <div className="space-y-6 pb-20 text-right" dir="rtl">
       <div>
         <h1 className="text-3xl font-bold text-slate-900">شبیه‌ساز مالی</h1>
         <p className="text-slate-500 mt-2">پیش‌بینی سود و زیان ۱۲ ماهه آینده</p>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           
           {/* LEFT PANEL: CONTROLS */}
           <div className="lg:col-span-4 space-y-6">
               <Card className="border-slate-200 shadow-sm">
                   <CardHeader className="bg-slate-50 border-b border-slate-100">
                       <CardTitle className="text-lg text-slate-800">تنظیمات مدل</CardTitle>
                   </CardHeader>
                   <CardContent className="p-6 space-y-6">
                       
                       {/* Price */}
                       <div className="space-y-3">
                           <label className="text-sm font-medium text-slate-700">قیمت محصول (تومان)</label>
                           <div className="relative">
                               <DollarSign className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                               <Input 
                                  type="number" 
                                  value={price} 
                                  onChange={(e) => setPrice(Number(e.target.value))}
                                  className="pl-10 text-left dir-ltr font-mono"
                               />
                           </div>
                       </div>

                        {/* Users */}
                       <div className="space-y-3">
                           <label className="text-sm font-medium text-slate-700">تعداد مشتری ماه اول</label>
                           <Input 
                              type="number" 
                              value={initialUsers} 
                              onChange={(e) => setInitialUsers(Number(e.target.value))}
                              className="text-left dir-ltr font-mono"
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
                               max={50} 
                               step={1} 
                               onValueChange={(val) => setGrowthRate(val[0])}
                           />
                       </div>

                       {/* Fixed Costs */}
                       <div className="space-y-3 pt-4 border-t border-slate-100">
                           <label className="text-sm font-medium text-slate-700">هزینه‌های ثابت ماهانه (تومان)</label>
                           <Input 
                              type="number" 
                              value={fixedCosts} 
                              onChange={(e) => setFixedCosts(Number(e.target.value))}
                              className="text-left dir-ltr font-mono bg-slate-50"
                           />
                           <p className="text-xs text-slate-400">شامل اجاره، حقوق، سرور و ...</p>
                       </div>

                   </CardContent>
               </Card>
           </div>

           {/* RIGHT PANEL: VISUALIZATION */}
           <div className="lg:col-span-8 space-y-6">
               
               {/* Summary Cards */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-6 text-white shadow-lg">
                       <div className="flex items-center gap-3 mb-2 opacity-80">
                           <TrendingUp className="w-5 h-5" />
                           <span className="text-sm font-medium">درآمد کل سال اول</span>
                       </div>
                       <div className="text-3xl font-bold dir-ltr text-right">
                           {(totalAnnualRevenue / 1000000).toFixed(0)} <span className="text-lg font-normal opacity-80">میلیون تومان</span>
                       </div>
                   </div>

                   <div className={`rounded-xl p-6 shadow-lg border ${breakEvenMonth ? 'bg-white border-slate-200' : 'bg-rose-50 border-rose-100'}`}>
                       <div className="flex items-center gap-3 mb-2 text-slate-500">
                           <Activity className="w-5 h-5" />
                           <span className="text-sm font-medium">نقطه سر‌به‌سر (Break-even)</span>
                       </div>
                       <div className="text-3xl font-bold text-slate-800">
                           {breakEvenMonth ? `ماه ${breakEvenMonth}` : <span className="text-rose-500 text-xl">زیان‌ده در سال اول</span>}
                       </div>
                   </div>
               </div>

               {/* Chart */}
               <Card className="border-slate-200 shadow-sm h-[400px]">
                   <CardHeader>
                       <CardTitle className="text-sm text-slate-500">نمودار پیش‌بینی درآمد و هزینه</CardTitle>
                   </CardHeader>
                   <CardContent className="h-[320px] w-full dir-ltr">
                       <ResponsiveContainer width="100%" height="100%">
                           <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                               <defs>
                                   <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                       <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                                       <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                   </linearGradient>
                                   <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                                       <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.1}/>
                                       <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                                   </linearGradient>
                               </defs>
                               <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                               <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                               <YAxis 
                                  stroke="#94a3b8" 
                                  fontSize={12} 
                                  tickLine={false} 
                                  axisLine={false} 
                                  tickFormatter={formatCurrency} 
                               />
                               <Tooltip 
                                  formatter={(value: number) => new Intl.NumberFormat('en-US').format(value)}
                                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                               />
                               <Area 
                                  type="monotone" 
                                  dataKey="revenue" 
                                  stroke="#10b981" 
                                  strokeWidth={3}
                                  fillOpacity={1} 
                                  fill="url(#colorRev)" 
                                  name="درآمد (Revenue)"
                               />
                               <Area 
                                  type="monotone" 
                                  dataKey="cost" 
                                  stroke="#f43f5e" 
                                  strokeWidth={2}
                                  fillOpacity={1} 
                                  fill="url(#colorCost)" 
                                  name="هزینه (Cost)"
                               />
                           </AreaChart>
                       </ResponsiveContainer>
                   </CardContent>
               </Card>
           </div>
       </div>
    </div>
  );
}
