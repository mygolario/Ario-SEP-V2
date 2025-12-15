'use client';

import { useState } from 'react';
import { updateProjectInputs } from '@/app/actions/projects';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/components/ui/toast';
import { ArrowLeft, ArrowRight, Save, CheckCircle2 } from 'lucide-react';

interface ProjectWizardProps {
  project: {
    id: string;
    inputs: Record<string, string>;
    title?: string;
    updated_at?: string;
    status?: string;
  };
}

const STEPS = [
  {
    id: 'basics',
    title: 'اطلاعات پایه',
    description: 'نام و توضیحات کلی پروژه را وارد کنید.',
    fields: ['description', 'goals'],
  },
  {
    id: 'audience',
    title: 'مخاطبان',
    description: 'مخاطبان هدف و نیازهای اصلی آنها را مشخص کنید.',
    fields: ['target_audience', 'pain_points'],
  },
  {
    id: 'technical',
    title: 'فنی',
    description: 'الزامات فنی و پلتفرم‌های مورد نیاز.',
    fields: ['tech_stack', 'platforms'],
  },
];

export function ProjectWizard({ project }: ProjectWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [inputs, setInputs] = useState<Record<string, string>>(project.inputs || {});
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const step = STEPS[currentStep];
  const isLastStep = currentStep === STEPS.length - 1;

  const handleInputChange = (field: string, value: string) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (silent = false) => {
    setSaving(true);
    try {
      await updateProjectInputs(project.id, inputs);
      if (!silent) toast('ذخیره شد', 'success');
    } catch {
      toast('خطا در ذخیره سازی', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleNext = async () => {
    await handleSave(true);
    if (!isLastStep) setCurrentStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  const calculateProgress = () => {
    // Basic completion based on fields filled
    const totalFields = STEPS.flatMap((s) => s.fields).length;
    const filledFields = STEPS.flatMap((s) => s.fields).filter(
      (f) => inputs[f] && inputs[f].length > 0
    ).length;
    return Math.round((filledFields / totalFields) * 100);
  };

  return (
    <div className="grid gap-6 md:grid-cols-[300px_1fr]">
      <aside className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>پیشرفت تکمیل اطلاعات</CardTitle>
            <CardDescription>%{calculateProgress()} تکمیل شده</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-2 w-full rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-primary transition-all duration-300"
                style={{ width: `${calculateProgress()}%` }}
              />
            </div>
            <div className="mt-8 space-y-2">
              {STEPS.map((s, idx) => (
                <div
                  key={s.id}
                  className={`flex items-center gap-2 text-sm ${idx === currentStep ? 'font-bold text-primary' : 'text-muted-foreground'}`}
                >
                  {idx < currentStep || (inputs[s.fields[0]] && inputs[s.fields[1]]) ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  ) : (
                    <div
                      className={`h-4 w-4 rounded-full border ${idx === currentStep ? 'border-primary bg-primary' : 'border-gray-300'}`}
                    />
                  )}
                  {s.title}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </aside>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{step.title}</CardTitle>
            <CardDescription>{step.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {step.id === 'basics' && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium">توضیحات پروژه</label>
                  <Textarea
                    placeholder="توضیحاتی در مورد پروژه..."
                    value={inputs.description || ''}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">اهداف کلیدی</label>
                  <Input
                    placeholder="هدف اصلی پروژه..."
                    value={inputs.goals || ''}
                    onChange={(e) => handleInputChange('goals', e.target.value)}
                  />
                </div>
              </>
            )}

            {step.id === 'audience' && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium">مخاطب هدف</label>
                  <Input
                    placeholder="چه کسانی از این محصول استفاده می‌کنند؟"
                    value={inputs.target_audience || ''}
                    onChange={(e) => handleInputChange('target_audience', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">مشکلات فعلی (Pain Points)</label>
                  <Textarea
                    placeholder="چه مشکلاتی را حل می‌کنید؟"
                    value={inputs.pain_points || ''}
                    onChange={(e) => handleInputChange('pain_points', e.target.value)}
                  />
                </div>
              </>
            )}

            {step.id === 'technical' && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium">تکنولوژی‌های مورد نیاز</label>
                  <Input
                    placeholder="مثال: Next.js, Supabase..."
                    value={inputs.tech_stack || ''}
                    onChange={(e) => handleInputChange('tech_stack', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">پلتفرم‌های هدف</label>
                  <Input
                    placeholder="Web, iOS, Android..."
                    value={inputs.platforms || ''}
                    onChange={(e) => handleInputChange('platforms', e.target.value)}
                  />
                </div>
              </>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handlePrev} disabled={currentStep === 0}>
              <ArrowRight className="ml-2 h-4 w-4" />
              قبلی
            </Button>
            <div className="flex gap-2">
              <Button variant="ghost" onClick={() => handleSave()} disabled={saving}>
                <Save className="ml-2 h-4 w-4" />
                ذخیره موقت
              </Button>
              <Button onClick={handleNext}>
                {isLastStep ? 'پایان' : 'بعدی'}
                {!isLastStep && <ArrowLeft className="mr-2 h-4 w-4" />}
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
