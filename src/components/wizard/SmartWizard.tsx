'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowRight, ArrowLeft, Loader2, Sparkles, User, Briefcase, Home, Gamepad2, Coins } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Data types
type StepData = {
    idea: string;
    audience: string[]; // Changed to array for multiple selection
    budget: number;
    vibe: string;
};

const STEPS = [
    { id: 1, title: 'ایده', label: 'ایده بیزینس' },
    { id: 2, title: 'بازار', label: 'شناخت بازار' },
    { id: 3, title: 'استایل', label: 'هویت بصری' },
];

const AUDIENCE_OPTIONS = [
    { id: 'students', label: 'دانشجویان', icon: <User className="w-6 h-6" /> },
    { id: 'business', label: 'صاحبان کسب‌وکار', icon: <Briefcase className="w-6 h-6" /> },
    { id: 'families', label: 'خانواده‌ها', icon: <Home className="w-6 h-6" /> },
    { id: 'gamers', label: 'گیمرها', icon: <Gamepad2 className="w-6 h-6" /> },
];

const VIBE_OPTIONS = [
    { id: 'minimal', label: 'مینیمال (Clean/White)', color: 'bg-slate-50 border-slate-200' },
    { id: 'luxury', label: 'لوکس (Black/Gold)', color: 'bg-slate-900 border-amber-500 text-white' },
    { id: 'friendly', label: 'دوستانه (Yellow/Blue)', color: 'bg-yellow-50 border-blue-400' },
    { id: 'tech', label: 'تکنولوژی (Dark/Neon)', color: 'bg-slate-950 border-indigo-500 text-indigo-50' },
];

export function SmartWizard() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [isGenerating, setIsGenerating] = useState(false);
    const [data, setData] = useState<StepData>({
        idea: '',
        audience: [],
        budget: 50, // Default 50M
        vibe: ''
    });

    const totalSteps = 3;
    const progress = (step / totalSteps) * 100;

    const handleNext = () => {
        if (step < totalSteps) setStep(step + 1);
        else handleSubmit();
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleSubmit = async () => {
        setIsGenerating(true);
        try {
            // Mapping data to the API expectation (updating existing endpoint structure if needed)
            const payload = {
                idea: data.idea,
                audience: data.audience.join(', '),
                budget: `${data.budget} Million Tomans`,
                vibe: data.vibe,
                goal: 'Startup Launch' // Default goal
            };

            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                 if (response.status === 401) {
                    router.push('/login');
                    return;
                }
                throw new Error('Failed to generate');
            }

            await response.json();
            router.refresh();
            router.push('/dashboard');

        } catch (error) {
            console.error(error);
            setIsGenerating(false);
        }
    };

    if (isGenerating) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
                 <div className="relative mb-8">
                    <div className="absolute inset-0 bg-indigo-500/30 rounded-full blur-2xl animate-pulse"></div>
                    <Sparkles className="w-16 h-16 text-indigo-600 animate-spin-slow relative z-10" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">در حال ساخت امپراتوری شما...</h2>
                <p className="text-slate-500">هوش مصنوعی در حال تحلیل بازار و تدوین استراتژی است</p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-3xl mx-auto p-4 md:p-8" dir="rtl">
            {/* Progress Bar */}
            <div className="mb-8">
                <div className="flex justify-between text-sm font-medium text-slate-500 mb-2 px-1">
                    {STEPS.map((s) => (
                        <span key={s.id} className={s.id === step ? 'text-indigo-600' : ''}>
                             {s.label}
                        </span>
                    ))}
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden dir-ltr">
                    <motion.div 
                        className="h-full bg-indigo-600 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                    />
                </div>
            </div>

            <Card className="border-slate-200 shadow-xl overflow-hidden bg-white/80 backdrop-blur-sm min-h-[500px] flex flex-col">
                <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
                     <div className="flex items-center space-x-2 space-x-reverse text-indigo-600 mb-1">
                        <Sparkles className="w-5 h-5" />
                        <span className="font-bold">بیزینس بیلدِر AI</span>
                     </div>
                     <h1 className="text-2xl font-bold text-slate-900">
                        {step === 1 && "کسب‌وکار شما چیست؟"}
                        {step === 2 && "مشتریان و بودجه"}
                        {step === 3 && "شخصیت برند (Vibe)"}
                     </h1>
                </CardHeader>

                <CardContent className="flex-1 p-6 md:p-8 relative">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-6"
                            >
                                <div className="space-y-2">
                                    <Label className="text-lg">ایده خام خود را بنویسید</Label>
                                    <Textarea 
                                        placeholder="مثلاً: فروش قهوه تخصصی با ارسال سریع در تهران..."
                                        className="min-h-[200px] text-lg p-4 resize-none focus-visible:ring-indigo-500"
                                        value={data.idea}
                                        onChange={(e) => setData({ ...data, idea: e.target.value })}
                                        autoFocus
                                    />
                                    <p className="text-sm text-slate-400">
                                        💡 هرچقدر دقیق‌تر بنویسید، هوش مصنوعی نقشه راه بهتری تولید می‌کند.
                                    </p>
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-8"
                            >
                                <div className="space-y-4">
                                    <Label className="text-lg block">مشتریان اصلی شما چه کسانی هستند؟</Label>
                                    <div className="grid grid-cols-2 gap-4">
                                        {AUDIENCE_OPTIONS.map((opt) => (
                                            <button
                                                key={opt.id}
                                                onClick={() => {
                                                    const newAudience = data.audience.includes(opt.id)
                                                        ? data.audience.filter(id => id !== opt.id)
                                                        : [...data.audience, opt.id];
                                                    setData({ ...data, audience: newAudience });
                                                }}
                                                className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-2 h-32
                                                    ${data.audience.includes(opt.id) 
                                                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700' 
                                                        : 'border-slate-100 bg-white hover:border-slate-200 text-slate-600'}`}
                                            >
                                                {opt.icon}
                                                <span className="font-medium">{opt.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between">
                                        <Label className="text-lg">بودجه تقریبی اولیه</Label>
                                        <span className="font-bold text-indigo-600">{data.budget} میلیون تومان</span>
                                    </div>
                                    <input 
                                        type="range" 
                                        min="10" 
                                        max="1000" 
                                        step="10"
                                        value={data.budget}
                                        onChange={(e) => setData({ ...data, budget: parseInt(e.target.value) })}
                                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                                    />
                                    <div className="flex justify-between text-xs text-slate-400 px-1">
                                        <span>۱۰ میلیون</span>
                                        <span>۱ میلیارد</span>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-6"
                            >
                                <div className="space-y-4">
                                    <Label className="text-lg block">شخصیت و ظاهر برند شما</Label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {VIBE_OPTIONS.map((opt) => (
                                            <button
                                                key={opt.id}
                                                onClick={() => setData({ ...data, vibe: opt.id })}
                                                className={`p-6 rounded-xl border-2 text-right transition-all
                                                    ${data.vibe === opt.id ? 'ring-2 ring-indigo-500 ring-offset-2' : ''}
                                                    ${opt.color}
                                                `}
                                            >
                                                <div className="font-bold text-lg mb-1">{opt.label.split('(')[0]}</div>
                                                <div className="text-xs opacity-70 font-sans">{opt.label.split('(')[1]?.replace(')', '')}</div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 text-indigo-800 text-sm">
                                    <h4 className="font-bold mb-1">جالب است بدانید:</h4>
                                    انتخاب هویت بصری مناسب می‌تواند اعتماد مشتریان را تا ۴۰٪ افزایش دهد. هوش مصنوعی بر اساس انتخاب شما، پالت رنگی و استایل پیشنهادی را تولید می‌کند.
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </CardContent>

                <CardFooter className="bg-white p-6 border-t border-slate-100 flex justify-between">
                    <Button 
                        variant="ghost" 
                        onClick={handleBack} 
                        className={`text-slate-500 ${step === 1 ? 'opacity-0 pointer-events-none' : ''}`}
                    >
                        <ArrowRight className="ml-2 w-4 h-4" />
                        قبلی
                    </Button>
                    <Button 
                        onClick={handleNext}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-6 h-auto text-lg rounded-xl shadow-lg shadow-indigo-200"
                        disabled={
                            (step === 1 && data.idea.length < 5) || 
                            (step === 2 && data.audience.length === 0) ||
                            (step === 3 && !data.vibe)
                        }
                    >
                        {step === 3 ? 'ساخت امپراتوری 🚀' : 'مرحله بعد'}
                        {step !== 3 && <ArrowLeft className="mr-2 w-4 h-4" />}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
