import { createClient } from '@/utils/supabase/server';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle, FileText, AlertTriangle, PenTool } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';


export default async function LegalPage() {
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
  
  // Basic validation: Check if we have legal data (even partially)
  // If "legal" key is missing, we show fallback or "generate first"
  const legalData = project?.legal;
  const hasContent = !!legalData;

  if (!hasContent) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
        <div className="p-8 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50">
           <h2 className="text-xl font-bold text-slate-900 mb-2">اسناد حقوقی یافت نشد</h2>
           <p className="text-slate-500 mb-6 max-w-md">
             برای دریافت قراردادهای هوشمند، لطفا ابتدا یک طرح کسب‌وکار ایجاد کنید تا سیستم نیازهای حقوقی شما را تحلیل کند.
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

  const currentDate = new Date().toLocaleDateString('fa-IR');

  return (
    <div className="space-y-6 pb-20 text-right" dir="rtl">
      <div>
         <h1 className="text-3xl font-bold text-slate-900">سپر حقوقی</h1>
         <p className="text-slate-500 mt-2">اسناد و قراردادهای ضروری برای {project.businessName}</p>
      </div>

      <Tabs defaultValue="nda" className="w-full">
         <TabsList className="grid w-full md:w-[400px] grid-cols-2 bg-slate-100 p-1 rounded-xl">
             <TabsTrigger value="nda">قرارداد محرمانگی (NDA)</TabsTrigger>
             <TabsTrigger value="cofounder">توافق‌نامه بنیان‌گذاران</TabsTrigger>
         </TabsList>

         <div className="mt-8">
             {/* NDA TAB */}
             <TabsContent value="nda">
                 <div className="mx-auto max-w-[210mm] min-h-[297mm] bg-white shadow-xl border border-slate-200 p-[20mm] relative">
                     {/* Paper Header */}
                     <div className="border-b-2 border-slate-900 pb-6 mb-8 text-center">
                         <h2 className="text-2xl font-serif font-bold text-slate-900">قرارداد عدم افشای اطلاعات (NDA)</h2>
                         <p className="text-sm text-slate-500 mt-2">تاریخ: {currentDate}</p>
                     </div>

                     {/* Body */}
                     <div className="space-y-6 text-slate-800 leading-8 text-justify font-serif">
                         <p>
                             این قرارداد در تاریخ <strong>{currentDate}</strong> فیمابین:
                             <br/>
                             <strong>۱. شرکت/تیم {project.businessName}</strong> (صاحب اطلاعات)
                             <br/>
                             <strong>۲. گیرنده اطلاعات</strong> (................................)
                             منعقد می‌گردد.
                         </p>

                         <div className="bg-slate-50 p-6 rounded-lg border border-slate-100 text-sm leading-7">
                             <h3 className="font-bold mb-2 flex items-center gap-2">
                                <FileText className="w-4 h-4 text-indigo-600" />
                                خلاصه تعهدات:
                             </h3>
                             <p>{legalData.ndaSummary || 'گیرنده متعهد می‌شود کلیه اطلاعات فنی، مالی و تجاری دریافتی را کاملاً محرمانه نگه داشته و از افشای آن به اشخاص ثالث بدون مجوز کتبی خودداری نماید.'}</p>
                         </div>

                         <p>
                             مدت این قرارداد از تاریخ امضا به مدت ۳ سال معتبر می‌باشد. هرگونه نقض این تعهد موجب پیگرد قانونی و جبران خسارت خواهد بود.
                         </p>
                     </div>

                     {/* Footer / Signatures */}
                     <div className="mt-20 grid grid-cols-2 gap-8">
                         <div className="border-t border-slate-400 pt-4 text-center">
                             <p className="font-bold mb-8">امضای صاحب اطلاعات</p>
                             <div className="h-10"></div>
                         </div>
                         <div className="border-t border-slate-400 pt-4 text-center">
                             <p className="font-bold mb-8">امضای گیرنده اطلاعات</p>
                             <div className="h-10"></div>
                         </div>
                     </div>
                 </div>
             </TabsContent>

             {/* CO-FOUNDER TAB */}
             <TabsContent value="cofounder">
                 <div className="mx-auto max-w-[210mm] min-h-[297mm] bg-white shadow-xl border border-slate-200 p-[20mm] relative">
                     {/* Paper Header */}
                     <div className="border-b-2 border-slate-900 pb-6 mb-8 text-center">
                         <h2 className="text-2xl font-serif font-bold text-slate-900">توافق‌نامه هم‌بنیان‌گذاران</h2>
                         <p className="text-sm text-slate-500 mt-2">تیم {project.businessName}</p>
                     </div>

                     {/* Body */}
                     <div className="space-y-8 text-slate-800 leading-8 text-justify font-serif">
                         
                         {/* Roles */}
                         <section>
                             <h3 className="text-lg font-bold mb-4 flex items-center gap-2 border-b border-slate-100 pb-2">
                                <PenTool className="w-5 h-5 text-indigo-600" />
                                ۱. نقش‌ها و مسئولیت‌ها
                             </h3>
                             <ul className="list-disc pr-6 space-y-3">
                                 {legalData.founderRoles?.length > 0 ? legalData.founderRoles.map((role: string, i: number) => (
                                     <li key={i}>{role}</li>
                                 )) : (
                                     <>
                                         <li>مدیر اجرایی (CEO): مسئولیت استراتژی کلی و جذب سرمایه.</li>
                                         <li>مدیر فنی (CTO): مسئولیت توسعه محصول و زیرساخت تکنولوژی.</li>
                                     </>
                                 )}
                             </ul>
                         </section>

                         {/* Risks */}
                         <section>
                            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 border-b border-slate-100 pb-2 text-amber-700">
                                <AlertTriangle className="w-5 h-5" />
                                ۲. ریسک‌ها و چالش‌های کلیدی
                             </h3>
                             <div className="bg-amber-50 p-6 rounded-lg border border-amber-100">
                                 <ul className="list-disc pr-6 space-y-2 text-sm text-amber-900">
                                     {legalData.riskFactors?.length > 0 ? legalData.riskFactors.map((risk: string, i: number) => (
                                         <li key={i}>{risk}</li>
                                     )) : (
                                         <li>ریسک عدم پذیرش بازار و نیاز به تغییر محصول (Pivot).</li>
                                     )}
                                 </ul>
                             </div>
                         </section>

                         <p>
                             طرفین توافق می‌کنند که تمامی حقوق مالکیت فکری متعلق به شرکت بوده و خروج هر یک از بنیان‌گذاران تابع شرایط وستینگ (Vesting) خواهد بود.
                         </p>
                     </div>

                     {/* Footer / Signatures */}
                     <div className="mt-20 grid grid-cols-2 gap-8">
                         <div className="border-t border-slate-400 pt-4 text-center">
                             <p className="font-bold mb-8">امضای هم‌بنیان‌گذار ۱</p>
                         </div>
                         <div className="border-t border-slate-400 pt-4 text-center">
                             <p className="font-bold mb-8">امضای هم‌بنیان‌گذار ۲</p>
                         </div>
                     </div>
                 </div>
             </TabsContent>
         </div>

      </Tabs>
    </div>
  );
}
