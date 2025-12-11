'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
    ArrowRight, 
    ArrowLeft, 
    Sparkles, 
    GraduationCap, 
    Briefcase, 
    Users, 
    Gamepad2, 
    Laptop, 
    Utensils, 
    Glasses, 
    Dumbbell 
} from 'lucide-react';
import { useRouter } from 'next/navigation';

// Data types
type StepData = {
    idea: string;
    audience: string[]; 
    customAudience: string;
    budget: number;
    vibe: string;
};

const STEPS = [
    { id: 1, title: 'ایده', label: 'ایده بیزینس' },
    { id: 2, title: 'بازار', label: 'شناخت بازار' },
    { id: 3, title: 'استایل', label: 'هویت بصری' },
];

const AUDIENCE_OPTIONS = [
    { id: 'students', label: 'دانشجویان', icon: <GraduationCap className="w-6 h-6" /> },
    { id: 'business', label: 'کسب‌وکارهای B2B', icon: <Briefcase className="w-6 h-6" /> },
    { id: 'families', label: 'خانواده‌ها', icon: <Users className="w-6 h-6" /> },
    { id: 'gamers', label: 'گیمرها', icon: <Gamepad2 className="w-6 h-6" /> },
    { id: 'tech', label: 'علاقه‌مندان تکنولوژی', icon: <Laptop className="w-6 h-6" /> },
    { id: 'housewives', label: 'خانه‌داران', icon: <Utensils className="w-6 h-6" /> },
    { id: 'seniors', label: 'سالمندان', icon: <Glasses className="w-6 h-6" /> },
    { id: 'athletes', label: 'ورزشکاران', icon: <Dumbbell className="w-6 h-6" /> },
];

const VIBE_OPTIONS = [
    { 
        id: 'minimal', 
        label: 'مینیمال و ساده', 
        description: 'سفید، خاکستری، مشکی',
        colors: ['bg-white border-2 border-slate-200', 'bg-slate-200', 'bg-slate-900'],
        container: 'bg-white border-slate-200 text-slate-900'
    },
    { 
        id: 'luxury', 
        label: 'لوکس و سنگین', 
        description: 'مشکی، طلایی، سربی',
        colors: ['bg-slate-950 border-2 border-slate-800', 'bg-amber-500', 'bg-slate-700'],
        container: 'bg-slate-900 border-amber-500/50 text-white'
    },
    { 
        id: 'friendly', 
        label: 'صمیمی و دوستانه', 
        description: 'زرد، آبی، سفید',
        colors: ['bg-yellow-400', 'bg-blue-500', 'bg-white border-2 border-blue-100'],
        container: 'bg-yellow-50 border-blue-200 text-slate-900'
    },
    { 
        id: 'corporate', 
        label: 'رسمی و شرکتی', 
        description: 'سرمه‌ای، سفید، خاکستری',
        colors: ['bg-indigo-900', 'bg-white border-2 border-slate-200', 'bg-slate-400'],
        container: 'bg-indigo-50 border-indigo-200 text-indigo-900'
    },
    { 
        id: 'energetic', 
        label: 'پرانرژی و جوان', 
        description: 'قرمز، نارنجی، سفید',
        colors: ['bg-red-500', 'bg-orange-500', 'bg-white border-2 border-red-100'],
        container: 'bg-orange-50 border-red-200 text-red-900'
    },
    { 
        id: 'eco', 
        label: 'طبیعی و ارگانیک', 
        description: 'سبز، کرم، قهوه‌ای',
        colors: ['bg-green-600', 'bg-[#F5F5DC] border-2 border-green-100', 'bg-[#8B4513]'],
        container: 'bg-green-50 border-green-200 text-green-900'
    },
];

export function SmartWizard() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [isGenerating, setIsGenerating] = useState(false);
    const [data, setData] = useState<StepData>({
        idea: '',
        audience: [],
        customAudience: '',
        budget: 50,
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
            // Combine selected audiences with custom input
            const selectedLabels = data.audience
                .map(id => AUDIENCE_OPTIONS.find(opt => opt.id === id)?.label)
                .filter(Boolean);
            
            if (data.customAudience.trim()) {
                selectedLabels.push(data.customAudience.trim());
            }

            const payload = {
                idea: data.idea,
                audience: selectedLabels.join(', '),
                budget: `${data.budget} Million Tomans`,
                vibe: data.vibe,
                goal: 'Startup Launch'
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
            router.refresh(); // Refresh data 
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
        <div className="w-full max-w-4xl mx-auto p-4 md:p-8" dir="rtl">
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
                                    <Label className="text-lg block">مشتریان خود را انتخاب کنید (چند مورد)</Label>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                        {AUDIENCE_OPTIONS.map((opt) => (
                                            <button
                                                key={opt.id}
                                                onClick={() => {
                                                    const newAudience = data.audience.includes(opt.id)
                                                        ? data.audience.filter(id => id !== opt.id)
                                                        : [...data.audience, opt.id];
                                                    setData({ ...data, audience: newAudience });
                                                }}
                                                className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-2 h-28
                                                    ${data.audience.includes(opt.id) 
                                                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-inner' 
                                                        : 'border-slate-100 bg-white hover:border-slate-200 text-slate-600 hover:shadow-sm'}`}
                                            >
                                                {opt.icon}
                                                <span className="font-medium text-sm text-center">{opt.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                    <div className="relative">
                                        <Input 
                                            placeholder="یا گروه دیگری را بنویسید..."
                                            value={data.customAudience}
                                            onChange={(e) => setData({ ...data, customAudience: e.target.value })}
                                            className="pr-4 border-slate-200 focus-visible:ring-indigo-500"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4 pt-4 border-t border-slate-100">
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
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {VIBE_OPTIONS.map((opt) => (
                                            <button
                                                key={opt.id}
                                                onClick={() => setData({ ...data, vibe: opt.id })}
                                                className={`p-5 rounded-2xl border-2 text-right transition-all relative overflow-hidden group
                                                    ${data.vibe === opt.id 
                                                        ? 'ring-2 ring-indigo-500 ring-offset-2 scale-[1.02] shadow-lg' 
                                                        : 'hover:scale-[1.01] hover:shadow-md'}
                                                    ${opt.container}
                                                `}
                                            >
                                                <div className="flex justify-between items-start mb-3">
                                                    <div className="font-bold text-lg">{opt.label}</div>
                                                    {data.vibe === opt.id && <div className="bg-indigo-600 text-white text-[10px] px-2 py-0.5 rounded-full">انتخاب شد</div>}
                                                </div>
                                                
                                                {/* Color Palette Preview */}
                                                <div className="flex gap-2 mb-2">
                                                    {opt.colors.map((colorClass, i) => (
                                                        <div key={i} className={`w-6 h-6 rounded-full shadow-sm ${colorClass}`}></div>
                                                    ))}
                                                </div>
                                                
                                                <div className="text-xs opacity-70 font-sans mt-2">{opt.description}</div>
                                            </button>
                                        ))}
                                    </div>
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
                            (step === 2 && data.audience.length === 0 && !data.customAudience) ||
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
