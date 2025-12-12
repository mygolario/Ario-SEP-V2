import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sparkles, ShieldCheck, ArrowLeft } from 'lucide-react';

type NavbarProps = {
  ctaHref: string;
};

export function Navbar({ ctaHref }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div
        className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4"
        dir="rtl"
      >
        <Link href="/" className="flex items-center gap-3 text-right">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400/30 via-cyan-400/20 to-slate-800 text-emerald-200 ring-1 ring-emerald-400/30">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <div className="text-lg font-bold text-white">آریو</div>
            <div className="text-xs text-slate-400">نسخه بتا ویژه بازار ایران</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-100 md:flex">
          <Link href="#features" className="transition-colors hover:text-emerald-300">
            ویژگی‌ها
          </Link>
          <Link href="#how-it-works" className="transition-colors hover:text-emerald-300">
            روند کار
          </Link>
          <Link href="#pricing" className="transition-colors hover:text-emerald-300">
            تعرفه بتا
          </Link>
          <Link href="/faq" className="transition-colors hover:text-emerald-300">
            سوالات متداول
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-full bg-slate-900/60 px-3 py-1 text-xs text-slate-300 ring-1 ring-white/5 md:flex">
            <ShieldCheck className="h-4 w-4 text-emerald-300" />
            میزبانی امن در ایران
          </div>
          <Link href={ctaHref}>
            <Button className="group rounded-full bg-emerald-400 px-5 text-slate-900 hover:bg-emerald-300">
              شروع سریع
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
