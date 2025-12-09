import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-slate-950/50 backdrop-blur-xl">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between" dir="rtl">
        {/* Right: Brand Logo */}
        <div className="flex items-center gap-2">
          <div className="bg-indigo-500/10 p-2 rounded-lg">
            <Sparkles className="h-5 w-5 text-indigo-400" />
          </div>
          <span className="font-bold text-lg text-slate-100">بیزینس بیلدر</span>
        </div>

        {/* Center: Navigation Links (Hidden on mobile) */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          <Link href="#features" className="hover:text-indigo-400 transition-colors">
            امکانات
          </Link>
          <Link href="#pricing" className="hover:text-indigo-400 transition-colors">
            قیمت‌گذاری
          </Link>
          <Link href="#about" className="hover:text-indigo-400 transition-colors">
            درباره ما
          </Link>
        </div>

        {/* Left: Auth Buttons */}
        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-white/5">
              ورود
            </Button>
          </Link>
          <Link href="/start">
            <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/25 border-0">
              شروع رایگان
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
