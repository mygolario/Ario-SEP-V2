import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
// Assuming Features and Footer exist or will be placeholders for now based on the request "Features (Bento Grid) + Footer"
// The prompt didn't strictly ask to build Features/Footer totally new, but to "Assemble the Page".
// I will check if they exist or create simple placeholders if not, but the prompt implies "Bento Grid" features might need to be built or at least placed.
// However, looking at the user request "TASK 3: ASSEMBLE THE PAGE", it lists "<Features /> (Bento Grid) + <Footer />".
// I don't have Features/Footer in my plan as explicit "Create" tasks, but I should probably inspect if I can reuse something or better yet, simple placeholders if they don't exist,
// to fulfill "Assemble" without overstepping. I'll make a decision to verify if they exist first.
// Wait, I can't check in the middle of write_to_file.
// I'll write the page assuming they need to be imported or handled.
// Actually, looking at the file list earlier: "src/components" had "ui", "landing", "dashboard", "branding".
// I didn't see a "Features" component. I'll stick to a placeholder for Features and Footer for now to ensure the page compiles,
// or check if I can quickly build them. The user request was specific about Navbar and Hero.
// For Features and Footer, I will just put placeholders to make it buildable, as creating them wasn't explicitly detailed in the "TASK 1" and "TASK 2" breakdown, but mentioned in "TASK 3".
// I'll create inline components for them or basic divs to satisfy the structure.

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-slate-950 selection:bg-indigo-500/30 selection:text-indigo-200">
      <Navbar />
      
      {/* Background Grid Pattern */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute inset-0 bg-slate-950 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,transparent_70%,black)]"></div>
      </div>

      <div className="relative z-10">
        <Hero />
        
        {/* Features Section Placeholder - Bento Grid Style */}
        <section id="features" className="py-24 relative">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">امکانات بی‌نظیر</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">هر آنچه برای موفقیت نیاز دارید، در یک پلتفرم</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[300px]">
                    <div className="md:col-span-2 rounded-xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition duration-300 flex flex-col justify-end">
                        <h3 className="text-xl font-bold text-white mb-2">هوش مصنوعی پیشرفته</h3>
                        <p className="text-slate-400">تحلیل عمیق بازار با استفاده از Gemini 3 و GPT-4</p>
                    </div>
                    <div className="md:col-span-1 rounded-xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition duration-300 flex flex-col justify-end">
                         <h3 className="text-xl font-bold text-white mb-2">سرعت بالا</h3>
                        <p className="text-slate-400">ساخت بیزینس پلن در کمتر از ۶۰ ثانیه</p>
                    </div>
                    <div className="md:col-span-1 rounded-xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition duration-300 flex flex-col justify-end">
                         <h3 className="text-xl font-bold text-white mb-2">صرفه‌جویی</h3>
                        <p className="text-slate-400">کاهش ۹۰ درصدی هزینه‌های اولیه</p>
                    </div>
                    <div className="md:col-span-2 rounded-xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition duration-300 flex flex-col justify-end">
                         <h3 className="text-xl font-bold text-white mb-2">خروجی حرفه‌ای</h3>
                        <p className="text-slate-400">فرمت‌های استاندارد برای ارائه به سرمایه‌گذار</p>
                    </div>
                </div>
            </div>
        </section>

        {/* Footer Placeholder */}
        <footer className="border-t border-white/10 py-12 bg-slate-900/50">
            <div className="container mx-auto px-4 text-center text-slate-500">
                <p>© ۱۴۰۳ بیزینس بیلدر. تمامی حقوق محفوظ است.</p>
            </div>
        </footer>
      </div>
    </main>
  );
}
