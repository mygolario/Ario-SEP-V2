import { createClient } from '@/utils/supabase/server';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';

export default async function PlanPage() {
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
  const canvas = project?.leanCanvas;

  if (!canvas) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
        <div className="p-8 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50">
           <h2 className="text-xl font-bold text-slate-900 mb-2">هنوز طرحی ساخته نشده است</h2>
           <p className="text-slate-500 mb-6 max-w-md">
             برای مشاهده بوم کسب‌وکار، ابتدا باید اطلاعات اولیه استارتاپ خود را وارد کنید تا هوش مصنوعی آن را برای شما تولید کند.
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
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-3xl font-bold text-slate-900">بوم کسب‌وکار ناب (Lean Canvas)</h1>
           <p className="text-slate-500 mt-2">نقشه راه یک‌صفحه‌ای برای {project.businessName}</p>
        </div>
        {/* Export Button could go here */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4" dir="rtl">
        
        {/* ROW 1 */}
        {/* Problem (2 cols) */}
        <CanvasCard 
          title="مشکل (Problem)" 
          content={canvas.problem} 
          className="md:col-span-1 md:row-span-2 bg-red-50/50 border-red-100"
          icon="🔥"
        />

        {/* Solution (1 col) */}
        <CanvasCard 
          title="راه حل (Solution)" 
          content={canvas.solution} 
          className="md:col-span-1 border-blue-100 bg-blue-50/30"
          icon="💡"
        />

        {/* Unique Value Prop (1 col) */}
        <CanvasCard 
          title="ارزش پیشنهادی یکتا (UVP)" 
          content={canvas.uniqueValue} 
          className="md:col-span-1 md:row-span-2 border-indigo-100 bg-indigo-50/30"
          icon="💎"
        />

        {/* Unfair Advantage (1 col) */}
        <CanvasCard 
          title="مزیت رقابتی (Unfair Advantage)" 
          content={canvas.unfairAdvantage} 
          className="md:col-span-1 border-emerald-100 bg-emerald-50/30"
          icon="🛡️"
        />

        {/* Customer Segments (1 col) */}
        <CanvasCard 
          title="بخش‌بندی مشتریان" 
          content={canvas.customerSegments} 
          className="md:col-span-1 md:row-span-2 border-orange-100 bg-orange-50/30"
          icon="👥"
        />

        {/* ROW 2 (Remaining fills) */}
        {/* Key Metrics (Optional - usually shares col with Solution) - Lean Canvas vary. 
            We will follow Standard Lean Canvas:
            1. Problem (Left)
            2. Solution (Left Mid)
            3. UVP (Center)
            4. Unfair (Right Mid)
            5. Customer (Right)
            6. Channels (Below Unfair)
            7. Key Metrics (Below Solution) -> We didn't generate Key Metrics, replaced with common alt or merged.
            Let's stick to the generated fields. 
        */}

        {/* Channels (Under Unfair) */}
        <CanvasCard 
          title="کانال‌های دسترسی (Channels)" 
          content={canvas.channels} 
          className="md:col-span-1 border-purple-100 bg-purple-50/30"
          icon="📢"
        />
        
        {/* Key Metrics - (Not generated, showing placeholder or removing) 
            Wait, I have 7 boxes above?
            Row 1: Problem(RowSpan2), Solution, UVP(RowSpan2), Unfair, Customer(RowSpan2) => 5 cols.
            Row 2: (Problem continues), Key Metrics(MISSING), (UVP continues), Channels, (Customer continues).
            
            My prompt generated: problem, solution, uniqueValue, unfairAdvantage, customerSegments, channels, revenueStream, costStructure.
            Total 8 fields.
            
            Let's adjust layout to be cleaner 5-column grid.
            Col 1: Problem
            Col 2: Solution
            Col 3: UVP
            Col 4: Unfair Advantage
            Col 5: Customer Segments
            
            This is hard to do 3x3 with 5 cols. 
            Standard Lean Canvas is:
            [ Problem ] [ Solution ] [ UVP ] [ Unfair ] [ Customer ]
            [ Problem ] [ Metrics  ] [ UVP ] [ Channels ] [ Customer ]
            [ Cost Structure ] [ Revenue Streams ]
        */}
        
         {/* Since "Key Metrics" is missing from prompt, likely intentional or oversight. 
             I'll put "Solution" spanning 1 row, and maybe just put "Channels" in 2nd row col 2/4.
             Let's use a simplified layout where boxes stack logically if exact strict structure isn't critical.
             
             Let's try to fit the generated fields:
             Row 1 (Top): Problem (Tall), Solution, UVP (Tall), Unfair, Customer (Tall)
             Row 2 (Mid): Channels (Under Unfair), (Under Solution is empty -> maybe stretch Solution or add placeholder?)
             
             Actually, better: 
             Problem (Span 2 Row), Solution, UVP (Span 2 Row), Unfair, Customer (Span 2 Row)
             Channels (Under Unfair)
        */}

      </div>
      
      {/* Bottom Row: Cost & Revenue */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4" dir="rtl">
         <CanvasCard 
          title="ساختار هزینه‌ها (Cost Structure)" 
          content={canvas.costStructure} 
          className="border-red-100 bg-red-50/30 min-h-[150px]"
          icon="💸"
        />
         <CanvasCard 
          title="جریان درآمدی (Revenue Stream)" 
          content={canvas.revenueStream} 
          className="border-green-100 bg-green-50/30 min-h-[150px]"
          icon="💰"
        />
      </div>
    
      {/* Disclaimer / Note */}
       <p className="text-center text-xs text-slate-400 mt-8">
            این بوم توسط هوش مصنوعی و بر اساس اطلاعات اولیه شما تولید شده است. می‌توانید در مراحل بعد آن را ویرایش کنید.
       </p>
    </div>
  );
}

function CanvasCard({ title, content, className, icon }: { title: string, content: string, className?: string, icon?: string }) {
  return (
    <div className={`p-5 rounded-xl border bg-white shadow-sm flex flex-col gap-3 transition-all hover:shadow-md ${className}`}>
      <div className="flex items-center gap-2 mb-1">
        <span className="text-lg opacity-80">{icon}</span>
        <h3 className="text-xs font-bold uppercase text-slate-700 tracking-wider text-right">{title}</h3>
      </div>
      <div className="text-sm text-slate-600 leading-7 text-justify whitespace-pre-wrap">
        {content}
      </div>
    </div>
  );
}
