import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, PlayCircle } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-500/20 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto px-4 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          نسخه ۳.۰ جمینای در دسترس است
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-tight animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
          ایده خام بدهید،{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
            امپراتوری
          </span>{' '}
          تحویل بگیرید.
        </h1>

        {/* Subtext */}
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
          ساخت بیزینس پلن، قرارداد حقوقی و وب‌سایت کامل با هوش مصنوعی Gemini 3.
          بدون نیاز به دانش فنی، فقط با چند کلیک.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
          <Link href="/signup">
            <Button size="lg" className="h-12 px-8 text-base bg-white text-slate-900 hover:bg-slate-100 hover:text-slate-900 border-0 shadow-xl shadow-white/10">
              شروع رایگان
              <ArrowLeft className="mr-2 h-5 w-5" />
            </Button>
          </Link>
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg blur opacity-50 group-hover:opacity-100 transition duration-200"></div>
            <Button size="lg" variant="outline" className="relative h-12 px-8 text-base bg-slate-950 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-900">
              <PlayCircle className="ml-2 h-5 w-5" />
              مشاهده دمو
            </Button>
          </div>
        </div>

        {/* 3D Perspective Visual */}
        <div className="relative mx-auto w-full max-w-5xl perspective-1000 animate-in fade-in zoom-in-50 duration-1000 delay-500">
          <div className="relative rounded-xl bg-slate-900 border border-white/10 shadow-2xl shadow-indigo-500/10 p-2 transform rotate-x-12 hover:rotate-x-0 transition-transform duration-700 ease-out">
            <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
            <div className="bg-slate-950 rounded-lg h-[400px] md:h-[600px] w-full flex items-center justify-center overflow-hidden relative">
              
              {/* Fake UI Elements */}
              <div className="absolute inset-0 bg-grid-slate-800/[0.2]" />
              
              <div className="z-10 text-center">
                <div className="w-20 h-20 bg-indigo-500/20 rounded-2xl mx-auto mb-6 flex items-center justify-center border border-indigo-500/30">
                   <div className="w-10 h-10 bg-indigo-500 rounded-lg shadow-lg shadow-indigo-500/50" />
                </div>
                <h3 className="text-xl font-medium text-slate-200 mb-2">داشبورد هوشمند</h3>
                <p className="text-slate-500">نمایی از پنل مدیریت کسب‌وکار شما</p>
              </div>

              {/* Decorative gradients */}
              <div className="absolute -left-20 top-20 w-60 h-60 bg-purple-500/10 rounded-full blur-[50px]" />
              <div className="absolute -right-20 bottom-20 w-60 h-60 bg-indigo-500/10 rounded-full blur-[50px]" />
            </div>
          </div>
          
          {/* Reflection */}
          <div className="absolute -bottom-20 left-4 right-4 h-20 bg-gradient-to-b from-indigo-500/10 to-transparent blur-xl transform scale-x-90" />
        </div>
      </div>
    </section>
  );
}
