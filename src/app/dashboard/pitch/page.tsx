import { createClient } from '@/utils/supabase/server';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';
import { PitchDeckViewer } from '@/components/dashboard/PitchDeckViewer';

export default async function PitchPage() {
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
  const hasData = project?.leanCanvas && project?.marketAnalysis;

  if (!hasData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
        <div className="p-8 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50">
           <h2 className="text-xl font-bold text-slate-900 mb-2">اطلاعات کافی برای ساخت ارائه وجود ندارد</h2>
           <p className="text-slate-500 mb-6 max-w-md">
             برای تولید خودکار پیچ‌دک، ابتدا باید بخش‌های &quot;بوم کسب‌وکار&quot; و &quot;تحلیل بازار&quot; را تکمیل کنید.
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
    <div className="space-y-6 pb-20">
      <div>
         <h1 className="text-3xl font-bold text-slate-900">ارائه به سرمایه‌گذار (Pitch Deck)</h1>
         <p className="text-slate-500 mt-2">نسخه اولیه اسلایدهای معرفی {project.businessName}</p>
      </div>

      <PitchDeckViewer data={project} />
      
       <p className="text-center text-xs text-slate-400 mt-8">
            این اسلایدها به صورت خودکار از داده‌های طرح کسب‌وکار شما استخراج شده‌اند.
       </p>
    </div>
  );
}
