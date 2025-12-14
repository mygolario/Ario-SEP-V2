import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { HelpCircle, Book, MessageCircle, CheckSquare, PlayCircle } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useTour } from './TourProvider';

interface HelpCenterProps {
  children?: React.ReactNode; // For the trigger button
}

export function HelpCenter({ children }: HelpCenterProps) {
  const { startTour } = useTour();

  const handleStartTour = () => {
    // Close sheet here if possible, but sheet is controlled by trigger.
    // We might need to control open state if we want to auto-close sheet when tour starts.
    // For now, let's just start the tour, driver.js usually layers on top.
    startTour();
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        {children || (
          <Button variant="ghost" size="icon">
            <HelpCircle />
          </Button>
        )}
      </SheetTrigger>
      <SheetContent side="left" className="w-[400px] sm:w-[540px] flex flex-col p-0">
        <div className="p-6 border-b border-slate-100 bg-white">
          <SheetHeader className="text-right">
            <SheetTitle className="flex items-center gap-2 text-xl font-bold text-slate-900">
              <HelpCircle className="w-6 h-6 text-indigo-600" />
              مرکز راهنما
            </SheetTitle>
            <SheetDescription>پاسخ سوالات شما و ابزارهای کمکی</SheetDescription>
          </SheetHeader>
        </div>

        <Tabs defaultValue="checklist" className="flex-1 flex flex-col overflow-hidden" dir="rtl">
          <div className="px-6 border-b bg-white">
            <TabsList className="w-full justify-start h-12 bg-transparent p-0 gap-6">
              <TabsTrigger
                value="checklist"
                className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 px-0 gap-2"
              >
                <CheckSquare className="w-4 h-4" />
                چک‌لیست شروع
              </TabsTrigger>
              <TabsTrigger
                value="faq"
                className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 px-0 gap-2"
              >
                <Book className="w-4 h-4" />
                سوالات متداول
              </TabsTrigger>
              <TabsTrigger
                value="support"
                className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 px-0 gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                پشتیبانی
              </TabsTrigger>
            </TabsList>
          </div>

          <ScrollArea className="flex-1 bg-slate-50/50">
            <div className="p-6 pb-24 space-y-6">
              <TabsContent value="checklist" className="space-y-4 m-0">
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-bold text-slate-800">مسیر پیشنهادی ما</h3>
                  <div className="space-y-3">
                    {/* Static Checklist for now, could be dynamic later */}
                    {[
                      { title: 'پروفایل خود را تکمیل کنید', done: true },
                      { title: 'اولین بیزینس پلن را بسازید', done: false },
                      { title: 'بخش‌های "هزینه" و "بازار" را بررسی کنید', done: false },
                      { title: 'خروجی PDF بگیرید', done: false },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center border ${item.done ? 'bg-green-500 border-green-500 text-white' : 'border-slate-300 bg-white'}`}
                        >
                          {item.done && <CheckSquare className="w-3 h-3" />}
                        </div>
                        <span
                          className={`text-sm ${item.done ? 'text-slate-400 line-through' : 'text-slate-700'}`}
                        >
                          {item.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={handleStartTour}
                  variant="outline"
                  className="w-full gap-2 border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                >
                  <PlayCircle className="w-4 h-4" />
                  شروع مجدد تور آموزشی
                </Button>
              </TabsContent>

              <TabsContent value="faq" className="space-y-4 m-0">
                <div className="space-y-4">
                  {[
                    {
                      q: 'چگونه خروجی PDF بگیرم؟',
                      a: 'در صفحه "بوم کسب‌وکار" دکمه چاپ/PDF در بالای صفحه قرار دارد.',
                    },
                    {
                      q: 'آیا اطلاعات من امن است؟',
                      a: 'بله، تمام اطلاعات شما به صورت رمزنگاری شده ذخیره می‌شود و تنها شما به آن دسترسی دارید.',
                    },
                    {
                      q: 'تفاوت طرح‌ها چیست؟',
                      a: 'طرح رایگان محدودیت تعداد پروژه دارد. طرح حرفه‌ای امکانات کامل و پشتیبانی اولویت‌دار را ارائه می‌دهد.',
                    },
                  ].map((faq, i) => (
                    <div key={i} className="bg-white p-4 rounded-xl border border-slate-200">
                      <h4 className="font-bold text-slate-800 text-sm mb-2">{faq.q}</h4>
                      <p className="text-sm text-slate-600 leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="support" className="space-y-4 m-0">
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 mb-2">
                    نیاز به راهنمایی بیشتر دارید؟
                  </h3>
                  <p className="text-slate-500 text-sm mb-6 max-w-xs mx-auto">
                    تیم پشتیبانی ما آماده پاسخگویی به سوالات شماست.
                  </p>
                  <Button className="w-full max-w-xs">ارسال تیکت پشتیبانی</Button>
                </div>
              </TabsContent>
            </div>
          </ScrollArea>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
