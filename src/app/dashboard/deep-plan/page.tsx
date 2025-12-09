'use client';

import { Button } from '@/components/ui/button';
import { Printer, Box, AlertCircle } from 'lucide-react';
import { useRef } from 'react';
// import { useReactToPrint } from 'react-to-print';
import { useSearchParams } from 'next/navigation';
// In a real scenario, we would fetch data here. 
// For this task, I will mock the data display structure to satisfy the UI requirement, 
// as I don't have the full context of how data is passed (e.g. from a store or context).
// However, I can try to read from local storage or expect a mock for now if no ID is present, 
// or simpler: just design the layout.

// Mock data for visualization if real data isn't fetched (or to type the prop)
type DeepPlan = {
    executiveSummary: string;
    companyOverview: string;
    marketAnalysis: string;
    marketingStrategy: string;
    operationalPlan: string;
    financialPlan: string;
};

export default function DeepPlanPage() {
    const componentRef = useRef<HTMLDivElement>(null);
    const searchParams = useSearchParams();
    const projectId = searchParams.get('id');

    // Simple print handler
    const handlePrint = () => {
        window.print();
    };

    // Placeholder content - In real app, fetch this using projectId
    const deepPlan: DeepPlan = {
        executiveSummary: "این طرح کسب‌وکار برای ارائه یک پلتفرم جامع هوش مصنوعی طراحی شده است. هدف ما تسهیل فرآیند راه‌اندازی استارتاپ‌ها برای کارآفرینان ایرانی است. با استفاده از مدل‌های زبانی پیشرفته، ما زمان نگارش بیزینس پلن را از چند هفته به چند دقیقه کاهش می‌دهیم. این پلتفرم نه تنها در هزینه‌ها صرفه‌جویی می‌کند، بلکه کیفیت خروجی را با استفاده از استانداردهای جهانی تضمین می‌نماید...",
        companyOverview: "شرکت ما با ماموریت دموکراتیزه کردن کارآفرینی تاسیس شده است. چشم‌انداز ما ایجاد بزرگترین اکوسیستم استارتاپی در خاورمیانه است که در آن هر فردی با یک ایده بتواند به سادگی کسب‌وکار خود را شروع کند. ما تیمی از متخصصان هوش مصنوعی، توسعه‌دهندگان نرم‌افزار و مشاوران کسب‌وکار هستیم...",
        marketAnalysis: "بازار خدمات استارتاپی در ایران با رشد ۲۰ درصدی سالانه روبرو است. با توجه به افزایش نفوذ اینترنت و تمایل جوانان به کارآفرینی، تقاضا برای ابزارهای تسهیل‌گر به شدت رو به افزایش است. رقبای سنتی عمدتاً شرکت‌های مشاوره با هزینه‌های بالا هستند، در حالی که رقبای دیجیتال هنوز راه‌حلی جامع ارائه نکرده‌اند...",
        marketingStrategy: "استراتژی ما بر ۴ محور اصلی استوار است: محصول با کیفیت و رابط کاربری آسان، قیمت‌گذاری رقابتی و مدل فریمیوم، توزیع دیجیتال از طریق وب‌سایت و اپلیکیشن، و تبلیغات هدفمند در شبکه‌های اجتماعی و همکاری با شتاب‌دهنده‌ها...",
        operationalPlan: "دفتر مرکزی ما در تهران مستقر است و تیم فنی به صورت ریموت فعالیت می‌کند. زیرساخت‌های ما بر روی سرورهای ابری قدرتمند بنا شده تا پایداری سرویس را تضمین کند. ما از تکنولوژی‌های روز مانند Next.js و Supabase برای توسعه استفاده می‌کنیم...",
        financialPlan: "برای شروع، ما نیاز به سرمایه‌گذاری اولیه معادل ۵ میلیارد تومان داریم که صرف توسعه محصول، بازاریابی و هزینه‌های جاری خواهد شد. پیش‌بینی ما این است که در سال اول به ۱۰۰۰ کاربر فعال و درآمد ماهانه ۵۰۰ میلیون تومان دست یابیم..."
    };

    return (
        <div className="min-h-screen bg-slate-100 p-8 print:p-0 font-sans" dir="rtl">
            {/* Action Bar */}
            <div className="max-w-4xl mx-auto mb-8 flex justify-between items-center print:hidden">
                <h1 className="text-2xl font-bold text-slate-800">برنامه جامع کسب‌وکار</h1>
                <Button onClick={handlePrint} className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2">
                    <Printer className="h-4 w-4" />
                    چاپ / خروجی PDF
                </Button>
            </div>

            {/* Document Container */}
            <div 
                ref={componentRef}
                className="max-w-4xl mx-auto bg-white shadow-xl min-h-[29.7cm] p-12 md:p-16 relative print:shadow-none print:w-full print:max-w-none print:mx-0"
            >
                {/* Header */}
                <div className="border-b-2 border-slate-900 pb-8 mb-12 flex justify-between items-end">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Box className="h-8 w-8 text-indigo-600" />
                            <span className="text-xl font-bold text-slate-900">بیزینس بیلدر</span>
                        </div>
                        <div className="text-sm text-slate-500">شماره سند: DP-{Math.floor(Math.random() * 10000)}</div>
                    </div>
                    <div className="text-right">
                        <h2 className="text-3xl font-bold text-slate-900 mb-1">برنامه کسب‌وکار</h2>
                        <div className="text-slate-500 text-sm">نسخه جامع ۱.۰</div>
                    </div>
                </div>

                {/* Table of Contents (Optional/Visual) */}
                <div className="bg-slate-50 p-6 rounded-lg mb-12 print:bg-transparent print:p-0 print:border print:border-slate-200">
                    <h3 className="font-bold text-lg mb-4 text-slate-900">فهرست مطالب</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-slate-700">
                        <li>۱. خلاصه مدیریتی</li>
                        <li>۲. معرفی شرکت و چشم‌انداز</li>
                        <li>۳. تحلیل بازار و رقبا</li>
                        <li>۴. استراتژی بازاریابی (4P)</li>
                        <li>۵. برنامه عملیاتی و فنی</li>
                        <li>۶. برنامه مالی و سرمایه‌گذاری</li>
                    </ul>
                </div>

                {/* Content Chapters */}
                <div className="space-y-12">
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4 border-r-4 border-indigo-500 pr-3">۱. خلاصه مدیریتی</h2>
                        <p className="text-slate-700 leading-8 text-justify">
                            {deepPlan.executiveSummary}
                        </p>
                    </section>
                    
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4 border-r-4 border-indigo-500 pr-3">۲. معرفی شرکت و چشم‌انداز</h2>
                        <p className="text-slate-700 leading-8 text-justify">
                            {deepPlan.companyOverview}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4 border-r-4 border-indigo-500 pr-3">۳. تحلیل بازار</h2>
                        <p className="text-slate-700 leading-8 text-justify">
                            {deepPlan.marketAnalysis}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4 border-r-4 border-indigo-500 pr-3">۴. استراتژی بازاریابی</h2>
                        <p className="text-slate-700 leading-8 text-justify">
                            {deepPlan.marketingStrategy}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4 border-r-4 border-indigo-500 pr-3">۵. برنامه عملیاتی</h2>
                        <p className="text-slate-700 leading-8 text-justify">
                            {deepPlan.operationalPlan}
                        </p>
                    </section>

                    <div className="break-inside-avoid">
                         <h2 className="text-2xl font-bold text-slate-900 mb-4 border-r-4 border-indigo-500 pr-3">۶. برنامه مالی</h2>
                        <p className="text-slate-700 leading-8 text-justify">
                            {deepPlan.financialPlan}
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-24 pt-8 border-t border-slate-200 text-center text-slate-400 text-sm flex justify-between items-center">
                    <span>تولید شده توسط هوش مصنوعی بیزینس بیلدر</span>
                    <span>محرمانه</span>
                </div>
            </div>
        </div>
    );
}
