'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { BookOpen, FileText, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

const FAQ_ITEMS = [
  {
    q: 'بوم مدل کسب‌وکار چیست؟',
    a: 'ابزاری مدیریتی و کارآفرینانه استراتژیک است که به شما اجازه می‌دهد مدل کسب‌وکار خود را توصیف، طراحی و اختراع کنید.',
  },
  {
    q: 'چگونه می‌توانم خروجی‌ها را ذخیره کنم؟',
    a: "در هر بخش دکمه 'ذخیره' وجود دارد که نسخه فعلی را در تاریخچه پروژه ذخیره می‌کند.",
  },
  {
    q: 'آیا می‌توانم پروژه را به اشتراک بگذارم؟',
    a: 'بله، با استفاده از دکمه اشتراک‌گذاری در بالای هر صفحه می‌توانید لینک مشاهده عمومی ایجاد کنید.',
  },
];

const GLOSSARY_ITEMS = [
  { term: 'ارزش پیشنهادی', def: 'مجموعه‌ای از مزایا که شرکت به مشتریان پیشنهاد می‌دهد.' },
  { term: 'بخش‌بندی بازار', def: 'فرآیند تقسیم بازار به زیرمجموعه‌های متمایز از مشتریان.' },
  { term: 'TAM', def: 'Total Addressable Market - کل بازار قابل دسترس.' },
];

export function HelpCenter() {
  const [search, setSearch] = useState('');

  const filterObj = (item: Record<string, string>) =>
    JSON.stringify(item).toLowerCase().includes(search.toLowerCase());

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="جستجو در راهنما..."
          className="pr-10"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Tabs defaultValue="faq" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="faq">سوالات متداول</TabsTrigger>
          <TabsTrigger value="guides">راهنماها</TabsTrigger>
          <TabsTrigger value="glossary">واژه‌نامه</TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="space-y-4 mt-4">
          <Accordion type="single" collapsible className="w-full">
            {FAQ_ITEMS.filter(filterObj).map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger>{item.q}</AccordionTrigger>
                <AccordionContent>{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>

        <TabsContent value="guides" className="space-y-4 mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
              <CardHeader className="flex flex-row items-center gap-4">
                <FileText className="h-8 w-8 text-blue-500" />
                <div>
                  <CardTitle className="text-base">راهنمای BMC</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                آموزش قدم‌به‌قدم تکمیل بوم مدل کسب‌وکار و استفاده از هوش مصنوعی برای تولید محتوا.
              </CardContent>
            </Card>
            <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
              <CardHeader className="flex flex-row items-center gap-4">
                <BookOpen className="h-8 w-8 text-green-500" />
                <div>
                  <CardTitle className="text-base">تحلیل بازار</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                چگونه رقبا را شناسایی کنیم و تحلیل دقیق‌تری از بازار هدف داشته باشیم.
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="glossary" className="space-y-4 mt-4">
          <div className="grid gap-2">
            {GLOSSARY_ITEMS.filter(filterObj).map((item, i) => (
              <Card key={i}>
                <CardContent className="p-4 flex flex-col md:flex-row gap-2 md:items-center">
                  <span className="font-bold text-primary min-w-[150px]">{item.term}</span>
                  <span className="text-sm text-muted-foreground">{item.def}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
