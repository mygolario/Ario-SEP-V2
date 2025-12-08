import { createClient } from '@/utils/supabase/server';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle, Type } from 'lucide-react';
import { LogoCard } from '@/components/branding/LogoCard';
import { ColorPalette } from '@/components/branding/ColorPalette';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function BrandingPage() {
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
  
  // Handling empty state where data might be missing or older generation
  if (!project || !project.logoSVG) {
     return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
          <div className="p-8 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50">
             <h2 className="text-xl font-bold text-slate-900 mb-2">هنوز هویت بصری ساخته نشده است</h2>
             <p className="text-slate-500 mb-6 max-w-md">
               برای دریافت لوگو و پالت رنگی اختصاصی، باید یک طرح جدید بسازید. (اگر طرح قدیمی دارید، ممکن است شامل این اطلاعات نباشد)
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

  const { logoSVG, colorPalette, vibe, businessName } = project;
  // If colorPalette is missing/undefined in older runs, mock it or show empty
  const safeColors = colorPalette || ['#000000', '#FFFFFF']; 

  return (
    <div className="space-y-6 pb-20">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-3xl font-bold text-slate-900">هویت بصری (Branding Kit)</h1>
           <p className="text-slate-500 mt-2">تمام دارایی‌های بصری برند {businessName || 'شما'} در یک نگاه.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6" dir="rtl">
        
        {/* COL 1 (Take 1/3): Logo */}
        <div className="md:col-span-1">
          <LogoCard svgContent={logoSVG} />
        </div>

        {/* COL 2 & 3 (Take 2/3): Everything else */}
        <div className="md:col-span-2 space-y-6">
            
            {/* Colors */}
            <ColorPalette colors={safeColors} />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 {/* Vibe */}
                <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader>
                        <CardTitle className="text-sm uppercase text-slate-500 font-bold tracking-wider">شخصیت برند (Brand Vibe)</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100 mb-4 text-indigo-700 font-medium text-lg text-center">
                             {vibe || 'تعریف نشده'}
                         </div>
                         <p className="text-slate-500 text-sm leading-6 text-justify">
                            این شخصیت برند، حسی است که مشتریان در اولین برخورد با کسب‌وکار شما دریافت می‌کنند. تمام متون و تبلیغات باید با این لحن سازگار باشند.
                         </p>
                    </CardContent>
                </Card>

                {/* Typography */}
                <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader>
                        <CardTitle className="text-sm uppercase text-slate-500 font-bold tracking-wider">تایپوگرافی (Typography)</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-slate-300 transition-colors">
                            <div className="w-10 h-10 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xl">
                                <Type className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 text-lg">وزیرمتن (Vazirmatn)</h4>
                                <p className="text-xs text-slate-500">فونت اصلی فارسی</p>
                            </div>
                         </div>

                         <div className="space-y-2 p-4 bg-slate-50 rounded-xl border-slate-100 border text-right">
                             <h1 className="text-2xl font-bold text-slate-900">تیترهای اصلی و جذاب</h1>
                             <p className="text-base text-slate-600 leading-relaxed">
                                متن بدنه باید خوانا، ساده و روان باشد تا کاربر به راحتی بتواند محتوا را مطالعه کند. این یک نمونه متن با وزن نرمال است.
                             </p>
                         </div>
                    </CardContent>
                </Card>
            </div>
        </div>

      </div>
    </div>
  );
}
