'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight, ArrowLeft } from 'lucide-react';

// Steps Configuration
const STEPS = [
  {
    id: 1,
    title: 'ایده رویایی شما چیست؟',
    placeholder: 'مثلا: می‌خواهم یک سایت فروش لباس...',
    type: 'textarea',
    field: 'idea'
  },
  {
    id: 2,
    title: 'مخاطب شما کیست؟',
    placeholder: 'مثلا: دانشجویان علاقه مند به تکنولوژی...',
    type: 'input',
    field: 'audience'
  },
  {
    id: 3,
    title: 'حس و حال برند شما؟',
    type: 'radio',
    field: 'vibe',
    options: ['مینیمال و ساده', 'لوکس و سنگین', 'پرانرژی']
  },
  {
    id: 4,
    title: 'بودجه شروع کار؟',
    type: 'radio',
    field: 'budget',
    options: ['کم (کمتر از ۱۰ میلیون)', 'متوسط', 'زیاد (سرمایه دارم)']
  },
  {
    id: 5,
    title: 'هدف اصلی؟',
    type: 'radio',
    field: 'goal',
    options: ['فروش سریع', 'جذب سرمایه‌گذار', 'تست بازار']
  }
];

// Animation Variants for RTL
const variants = {
  enter: (direction: number) => ({
    x: direction === 1 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction === 1 ? '-100%' : '100%',
    opacity: 0,
  }),
};

export function OnboardingWizard() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for Next (Move Left), 1 for Back (Move Right)
  const [formData, setFormData] = useState({
    idea: '',
    audience: '',
    vibe: '',
    budget: '',
    goal: ''
  });

  const currentStep = STEPS[step];
  const isFirstStep = step === 0;
  const isLastStep = step === STEPS.length - 1;

  const handleNext = () => {
    if (step < STEPS.length - 1) {
      setDirection(-1); // Entering from Left (Visual), Moving to "Left" Index? No, moving forward.
      // Instruction: "Entering Next Step: Slide in from the Left." -> x: -100% to 0
      // Instruction: "Exiting Current Step: Slide out to the Right." -> x: 0 to 100%
      // My variant logic: 
      // If direction is -1: enter x: -100%, exit x: 100%. Matches instructions.
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setDirection(1); // Reverse
      setStep(step - 1);
    }
  };

  const updateField = (value: string) => {
    setFormData(prev => ({ ...prev, [currentStep.field]: value }));
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4" dir="rtl">
      <Card className="overflow-hidden border-slate-200 dark:border-slate-800 shadow-2xl">
        <CardHeader>
           <div className="flex justify-between items-center text-sm text-slate-500 mb-2">
             <span>مرحله {step + 1} از {STEPS.length}</span>
             <span className="font-bold text-primary">بیزینس ساز هوشمند</span>
           </div>
           <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden" dir="ltr">
             <motion.div 
               className="h-full bg-primary"
               initial={{ width: 0 }}
               animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
               transition={{ duration: 0.3 }}
             />
           </div>
        </CardHeader>

        <CardContent className="relative min-h-[300px] overflow-hidden p-6">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={step}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="absolute inset-0 p-6 flex flex-col justify-center"
            >
              <CardTitle className="text-2xl font-bold mb-6 text-slate-800 dark:text-slate-100 text-right">
                {currentStep.title}
              </CardTitle>

              {currentStep.type === 'textarea' && (
                <Textarea
                  placeholder={currentStep.placeholder}
                  className="rounded-xl border-slate-300 min-h-[120px] text-lg p-4 focus-visible:ring-primary"
                  value={formData.idea}
                  onChange={(e) => updateField(e.target.value)}
                />
              )}

              {currentStep.type === 'input' && (
                <Input
                  placeholder={currentStep.placeholder}
                  className="rounded-xl border-slate-300 h-12 text-lg px-4 focus-visible:ring-primary"
                  value={formData.audience}
                  onChange={(e) => updateField(e.target.value)}
                />
              )}

              {currentStep.type === 'radio' && currentStep.options && (
                <RadioGroup 
                   value={formData[currentStep.field as keyof typeof formData]} 
                   onValueChange={updateField}
                   className="flex flex-col gap-3"
                >
                  {currentStep.options.map((option) => (
                    <div key={option} className="flex items-center space-x-reverse space-x-2">
                      <RadioGroupItem value={option} id={option} className="peer sr-only" />
                      <Label 
                        htmlFor={option}
                        className="flex-1 p-4 rounded-xl border border-slate-200 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 hover:bg-slate-50 cursor-pointer transition-all dark:border-slate-800 dark:hover:bg-slate-900"
                      >
                         {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
            </motion.div>
          </AnimatePresence>
        </CardContent>

        <CardFooter className="flex justify-between items-center bg-slate-50 dark:bg-slate-900/50 p-6">
          <Button 
            variant="ghost" 
            onClick={handleBack} 
            disabled={isFirstStep}
            className={`text-slate-500 hover:text-slate-900 ${isFirstStep ? 'opacity-0 pointer-events-none' : ''}`}
          >
            <ArrowRight className="ml-2 h-4 w-4" />
            قبلی
          </Button>
          
          <Button 
            onClick={handleNext}
            className="bg-slate-900 text-white hover:bg-slate-800 px-8"
          >
            {isLastStep ? 'شروع ساخت' : 'بعدی'}
            {!isLastStep && <ArrowLeft className="mr-2 h-4 w-4" />}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
