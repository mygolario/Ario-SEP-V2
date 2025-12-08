import { createClient } from '@/utils/supabase/server';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle, Globe, Map, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function MarketPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  // Fetch the LATEST project
  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(1);

  const project = projects?.[0]?.business_data;
  const market = project?.marketAnalysis;

  if (!market) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
        <div className="p-8 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50">
           <h2 className="text-xl font-bold text-slate-900 mb-2">هنوز تحلیل بازار انجام نشده است</h2>
           <p className="text-slate-500 mb-6 max-w-md">
             برای مشاهده اندازه بازار و تحلیل رقبا، باید یک طرح جدید بسازید تا هوش مصنوعی آن را محاسبه کند.
           </p>
           <Link href="/start">
             <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8">
               <PlusCircle className="ml-2 h-4 w-4" />
               ساخت طرح جدید
             </Button>
           </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20" dir="rtl">
      <div>
         <h1 className="text-3xl font-bold text-slate-900">تحلیل بازار و رقبا (Market Intelligence)</h1>
         <p className="text-slate-500 mt-2">اندازه بازار و وضعیت رقابتی برای {project.businessName}</p>
      </div>

      {/* Section 1: Market Size */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MarketSizeCard 
            title="کل بازار موجود (TAM)" 
            value={market.tam} 
            icon={<Globe className="w-6 h-6 text-indigo-600" />}
            colorClass="bg-indigo-50 border-indigo-100"
          />
          <MarketSizeCard 
            title="بازار قابل خدمت (SAM)" 
            value={market.sam} 
            icon={<Map className="w-6 h-6 text-emerald-600" />}
            colorClass="bg-emerald-50 border-emerald-100"
          />
          <MarketSizeCard 
            title="سهم بازار هدف (SOM)" 
            value={market.som} 
            icon={<Target className="w-6 h-6 text-rose-600" />}
            colorClass="bg-rose-50 border-rose-100"
          />
      </div>

      {/* Section 2: Competitors */}
      <Card className="border-slate-200 shadow-sm overflow-hidden">
         <CardHeader>
            <CardTitle className="text-lg font-bold text-slate-800">تحلیل رقبای اصلی (War Room)</CardTitle>
         </CardHeader>
         <CardContent className="p-0">
             <div className="overflow-x-auto">
                 <table className="w-full text-right">
                     <thead className="bg-slate-50 border-b border-slate-200">
                         <tr>
                             <th className="px-6 py-4 text-sm font-semibold text-slate-600">نام رقیب</th>
                             <th className="px-6 py-4 text-sm font-semibold text-slate-600">نقطه قوت 💪</th>
                             <th className="px-6 py-4 text-sm font-semibold text-slate-600">نقطه ضعف 🔻</th>
                         </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-100">
                         {market.competitors.map((comp: { name: string; strength: string; weakness: string }, index: number) => (
                             <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                                 <td className="px-6 py-4 font-medium text-slate-900">{comp.name}</td>
                                 <td className="px-6 py-4 text-sm text-slate-600">{comp.strength}</td>
                                 <td className="px-6 py-4 text-sm text-slate-600">{comp.weakness}</td>
                             </tr>
                         ))}
                     </tbody>
                 </table>
             </div>
         </CardContent>
      </Card>
      
       <p className="text-center text-xs text-slate-400 mt-4">
            مقادیر بازار تخمینی هستند و بر اساس داده‌های عمومی محاسبه شده‌اند.
       </p>

    </div>
  );
}

function MarketSizeCard({ title, value, icon, colorClass }: { title: string, value: string, icon: React.ReactNode, colorClass: string }) {
    return (
        <Card className={`border shadow-sm hover:shadow-md transition-shadow ${colorClass}`}>
            <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                <div className="p-3 bg-white rounded-full shadow-sm">
                    {icon}
                </div>
                <div>
                    <h3 className="text-sm font-medium text-slate-500 uppercase tracking-widest mb-1">{title}</h3>
                    <p className="text-2xl font-black text-slate-800 dir-ltr">{value}</p>
                </div>
            </CardContent>
        </Card>
    )
}
