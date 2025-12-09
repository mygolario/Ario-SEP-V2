import { createClient } from '@/utils/supabase/server';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProjectList } from './ProjectList';
import { User, Layers } from 'lucide-react';
import { redirect } from 'next/navigation';

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
    <div className="container mx-auto max-w-4xl py-8">
      <h1 className="text-3xl font-bold text-slate-900 mb-8 px-4 md:px-0">تنظیمات</h1>

      <Tabs defaultValue="projects" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8 h-auto p-1 bg-slate-100 rounded-xl">
            <TabsTrigger value="projects" className="py-3 gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg transition-all">
                <Layers className="h-4 w-4" />
                پروژه‌های من
            </TabsTrigger>
            <TabsTrigger value="profile" className="py-3 gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg transition-all">
                <User className="h-4 w-4" />
                پروفایل کاربری
            </TabsTrigger>
        </TabsList>
        
        <TabsContent value="projects" className="space-y-4 px-4 md:px-0">
             <ProjectList projects={projects || []} />
        </TabsContent>
        
        <TabsContent value="profile" className="px-4 md:px-0">
          <div className="bg-white p-6 rounded-xl border border-slate-200">
             <h3 className="font-bold text-lg mb-4">اطلاعات حساب</h3>
             <div className="space-y-4">
                <div>
                    <label className="text-sm text-slate-500 mb-1 block">ایمیل</label>
                    <div className="p-3 bg-slate-50 rounded-lg text-slate-700 font-mono text-sm border border-slate-200">
                        {user.email}
                    </div>
                </div>
                <div>
                     <label className="text-sm text-slate-500 mb-1 block">شناسه کاربر</label>
                    <div className="p-3 bg-slate-50 rounded-lg text-slate-700 font-mono text-xs border border-slate-200">
                        {user.id}
                    </div>
                </div>
             </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
