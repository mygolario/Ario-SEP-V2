import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Circle } from 'lucide-react';

export function OnboardingChecklist() {
  // Ideally this state should come from props or a context
  const steps = [
    { id: 1, title: 'تکمیل پروفایل کاربری', done: true },
    { id: 2, title: 'ساخت اولین پروژه', done: true }, // Assuming if they are on dashboard, they might have created one or not? Let's assume this is dynamic later.
    { id: 3, title: 'بررسی راهنمای اجرا (Playbook)', done: false },
    { id: 4, title: 'دریافت خروجی PDF', done: false },
  ];

  const progress = Math.round((steps.filter((s) => s.done).length / steps.length) * 100);

  return (
    <Card className="bg-gradient-to-br from-indigo-50 to-white border-indigo-100 shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base font-bold text-indigo-900">🚀 قدم‌های شروع</CardTitle>
          <span className="text-xs font-bold text-indigo-600 bg-indigo-100 px-2 py-1 rounded-full">
            {progress}% تکمیل
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {steps.map((step) => (
            <div key={step.id} className="flex items-center gap-3">
              {step.done ? (
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
              ) : (
                <Circle className="w-5 h-5 text-slate-300 flex-shrink-0" />
              )}
              <span
                className={`text-sm ${step.done ? 'text-slate-500 line-through' : 'text-slate-700 font-medium'}`}
              >
                {step.title}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
