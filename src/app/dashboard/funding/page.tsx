import { createClient } from '@/utils/supabase/server';
import { DollarSign, Users, Briefcase } from 'lucide-react';
import { ValuationCalculator } from '@/components/dashboard/ValuationCalculator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export default async function FundingPage() {
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
  
  // Basic logic to guess current stage based on budget
  // Note: In a real app we would have explicit "currentStage" field.
  // Budget mapping: Low -> Pre-Seed, Medium -> Seed, High -> Series A
  const budget = project?.budget || 'Medium';
  
  const getStageHighlight = (stageName: string) => {
      const stageMap: Record<string, string> = { 'Pre-Seed': 'Low', 'Seed': 'Medium', 'Series A': 'High' };
      return stageMap[stageName] === budget;
  };

  return (
    <div className="space-y-8 pb-20">
      <div>
         <h1 className="text-3xl font-bold text-slate-900">نقشه راه جذب سرمایه</h1>
         <p className="text-slate-500 mt-2">مسیر مالی {project?.businessName || 'استارتاپ شما'} و محاسبه ارزش</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 dir-rtl">
          
          {/* COLUMN 1: TIMELINE */}
          <div className="space-y-6">
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-indigo-600" />
                  مراحل جذب سرمایه
              </h2>
              
              <div className="space-y-4">
                  
                  {/* Pre-Seed */}
                  <TimelineCard 
                      title="Pre-Seed (پیش‌بذری)"
                      active={getStageHighlight('Pre-Seed')}
                      budgetRange="۱۰ هزار تا ۵۰ هزار دلار"
                      icon={<Users className="w-5 h-5" />}
                      description="سرمایه اولیه از دوستان، خانواده و پس‌انداز شخصی برای ساخت MVP."
                  />

                  {/* Seed */}
                  <TimelineCard 
                      title="Seed (بذری)"
                      active={getStageHighlight('Seed')}
                      budgetRange="۱۰۰ هزار تا ۵۰۰ هزار دلار"
                      icon={<DollarSign className="w-5 h-5" />}
                      description="ورود فرشتگان سرمایه‌گذار (Angels) برای تکمیل محصول و ورود اولیه به بازار."
                  />

                  {/* Series A */}
                  <TimelineCard 
                      title="Series A (سری آ)"
                      active={getStageHighlight('Series A')}
                      budgetRange="۱ میلیون دلار به بالا"
                      icon={<Briefcase className="w-5 h-5" />}
                      description="سرمایه‌گذاری صندوق‌های جسورانه (VCs) برای رشد سریع و مقیاس‌پذیری."
                  />

              </div>

              <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl text-sm text-indigo-800 leading-6">
                  <strong>نکته مهم:</strong> {budget === 'Low' ? 'با توجه به بودجه کم، شما در مرحله Pre-Seed هستید.' : budget === 'Medium' ? 'بودجه متوسط شما نشان‌دهنده آمادگی برای مرحله Seed است.' : 'بودجه بالا نشان‌گر هدف‌گذاری برای جذب سرمایه کلان است.'}
                  <br/>
                  برای موفقیت، روی ساخت محصول اولیه (MVP) تمرکز کنید.
              </div>
          </div>

          {/* COLUMN 2: CALCULATOR */}
          <div>
              <ValuationCalculator />
          </div>

      </div>
    </div>
  );
}

function TimelineCard({ title, active, budgetRange, icon, description }: { title: string; active: boolean; budgetRange: string; icon: React.ReactNode; description: string }) {
    return (
        <Card className={cn("transition-all duration-300", active ? "border-indigo-500 shadow-md ring-1 ring-indigo-500 bg-indigo-50/10" : "border-slate-200 opacity-80 hover:opacity-100")}>
            <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className={cn("p-2 rounded-lg", active ? "bg-indigo-100 text-indigo-600" : "bg-slate-100 text-slate-500")}>
                            {icon}
                        </div>
                        <CardTitle className={cn("text-lg", active ? "text-indigo-700" : "text-slate-700")}>
                            {title}
                        </CardTitle>
                    </div>
                    {active && <Badge variant="default" className="bg-indigo-600">مرحله فعلی</Badge>}
                </div>
            </CardHeader>
            <CardContent>
                 <p className="text-slate-600 text-sm leading-6 mb-3">{description}</p>
                 <div className="flex items-center gap-2 text-xs font-mono text-slate-500 bg-slate-50 px-3 py-2 rounded-md border border-slate-100">
                    <DollarSign className="w-3 h-3" />
                    بودجه معمول: {budgetRange}
                 </div>
            </CardContent>
        </Card>
    )
}

function Badge({ children, className }: { children: React.ReactNode; variant?: string; className?: string }) {
    // Simple inline badge for server component simplicity, or import UI Badge
    return (
        <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-semibold", className)}>
            {children}
        </span>
    )
}
