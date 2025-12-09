import { createClient } from '@/utils/supabase/server';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProjectManager } from './ProjectManager';
import { ProfileContent } from './ProfileContent';
import { User, Layers, CreditCard, Sparkles } from 'lucide-react';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

export default async function SettingsPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  return (
    <div className="container mx-auto max-w-5xl py-8">
      <h1 className="text-3xl font-bold text-slate-900 mb-8 px-4 md:px-0">تنظیمات</h1>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="flex items-center justify-start w-full overflow-x-auto mb-8 bg-transparent border-b border-slate-200 rounded-none h-auto p-0 space-x-8 space-x-reverse scrollbar-hide">
            <TabsTrigger 
              value="profile" 
              className="pb-4 px-2 bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 rounded-none text-slate-500 data-[state=active]:text-indigo-600 transition-all font-medium text-base gap-2"
            >
                <User className="h-4 w-4" />
                پروفایل
            </TabsTrigger>
            <TabsTrigger 
              value="projects" 
              className="pb-4 px-2 bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 rounded-none text-slate-500 data-[state=active]:text-indigo-600 transition-all font-medium text-base gap-2"
            >
                <Layers className="h-4 w-4" />
                مدیریت پروژه‌ها
            </TabsTrigger>
             <TabsTrigger 
              value="billing" 
              className="pb-4 px-2 bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 rounded-none text-slate-500 data-[state=active]:text-indigo-600 transition-all font-medium text-base gap-2"
            >
                <CreditCard className="h-4 w-4" />
                اشتراک
            </TabsTrigger>
        </TabsList>
        
        {/* Tab 1: Profile */}
        <TabsContent value="profile" className="px-4 md:px-0 outline-none">
           <ProfileContent user={user} />
        </TabsContent>

        {/* Tab 2: Projects */}
        <TabsContent value="projects" className="px-4 md:px-0 outline-none">
             <ProjectManager projects={projects || []} />
        </TabsContent>
        
        {/* Tab 3: Billing */}
        <TabsContent value="billing" className="px-4 md:px-0 outline-none">
           <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm max-w-3xl">
              <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
                 <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">طرح فعلی شما: رایگان</h3>
                    <p className="text-slate-500">شما از نسخه محدود سیستم استفاده می‌کنید.</p>
                 </div>
                 <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/20 px-6 h-12 text-base gap-2">
                    <Sparkles className="h-4 w-4" />
                    ارتقا به نسخه حرفه‌ای
                 </Button>
              </div>
              <div className="p-8 bg-slate-50/50">
                 <h4 className="font-bold text-slate-900 mb-6">ویژگی‌های نسخه فعلی:</h4>
                 <div className="grid md:grid-cols-2 gap-4">
                     {[
                        'ساخت ۳ پروژه',
                        'خروجی PDF ساده',
                        'دسترسی به بوم کسب‌وکار',
                        'پشتیبانی ایمیلی'
                     ].map((feature) => (
                        <div key={feature} className="flex items-center gap-3 text-slate-700">
                           <div className="h-6 w-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                             <Check className="h-3.5 w-3.5 text-emerald-600" />
                           </div>
                           {feature}
                        </div>
                     ))}
                 </div>
              </div>
           </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
