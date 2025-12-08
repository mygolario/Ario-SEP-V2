import { createClient } from '@/utils/supabase/server';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle, MessageCircle, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { CopyButton } from '@/components/dashboard/CopyButton'; // We need to create this mini client component or use inline logic

export default async function ValidatorPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(1);

  const project = projects?.[0]?.business_data;
  const validator = project?.validator;

  if (!validator) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
        <div className="p-8 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50">
           <h2 className="text-xl font-bold text-slate-900 mb-2">ابزار اعتبارسنجی یافت نشد</h2>
           <p className="text-slate-500 mb-6 max-w-md">
             برای تولید اسکریپت مصاحبه، باید یک طرح جدید ایجاد کنید.
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
    <div className="space-y-8 pb-20 text-right" dir="rtl">
      <div>
         <h1 className="text-3xl font-bold text-slate-900">اعتبارسنجی ایده</h1>
         <p className="text-slate-500 mt-2">اسکریپت مصاحبه و تحلیل سیگنال‌های مشتری</p>
      </div>

      {/* Section 1: The Script */}
      <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-indigo-600" />
              سوالات مصاحبه (The Mom Test Style)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {validator.interviewScript?.map((q: string, i: number) => (
                  <Card key={i} className="border-l-4 border-l-indigo-500 shadow-sm hover:shadow-md transition-shadow">
                      <CardContent className="p-6 flex justify-between items-start gap-4">
                          <p className="text-lg font-medium text-slate-800 leading-relaxed">&quot;{q}&quot;</p>
                          <CopyButton text={q} />
                      </CardContent>
                  </Card>
              ))}
          </div>
      </section>

      {/* Section 2: The Decoder */}
      <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-800">تحلیل پاسخ‌ها</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Good Signs */}
              <div className="border-2 border-emerald-100 bg-emerald-50/30 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-emerald-800 mb-4 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5" />
                      نشانه‌های مثبت (ادامه دهید)
                  </h3>
                  <ul className="space-y-3">
                      {validator.goodSigns?.map((sign: string, i: number) => (
                          <li key={i} className="flex items-start gap-3 text-slate-700">
                              <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></div>
                              <span>{sign}</span>
                          </li>
                      ))}
                  </ul>
              </div>

              {/* Bad Signs */}
              <div className="border-2 border-rose-100 bg-rose-50/30 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-rose-800 mb-4 flex items-center gap-2">
                      <XCircle className="w-5 h-5" />
                      نشانه‌های منفی (توقف/تغییر مسیر)
                  </h3>
                  <ul className="space-y-3">
                      {validator.badSigns?.map((sign: string, i: number) => (
                          <li key={i} className="flex items-start gap-3 text-slate-700">
                              <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0"></div>
                              <span>{sign}</span>
                          </li>
                      ))}
                  </ul>
              </div>

          </div>
      </section>

      {/* Section 3: The Danger Zone */}
      <section className="space-y-4">
          <Alert variant="destructive" className="bg-amber-50 border-amber-200 text-amber-900">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <AlertTitle className="text-lg font-bold mr-2 text-amber-800">ریسک‌های قرمز (Red Flags)</AlertTitle>
              <AlertDescription className="mt-2 mr-6 text-amber-800/90 font-medium">
                  <ul className="list-disc pr-4 space-y-1">
                      {validator.redFlags?.map((flag: string, i: number) => (
                          <li key={i}>{flag}</li>
                      ))}
                  </ul>
              </AlertDescription>
          </Alert>
      </section>

    </div>
  );
}
