import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import { Logo } from '@/components/brand/Logo';

type NavbarProps = {
  ctaHref: string;
};

export function Navbar({ ctaHref }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div
        className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4"
        dir="rtl"
      >
        <Link href="/" className="flex items-center gap-3 text-right">
          <Logo showText size={40} />
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
          <Link href="#features" className="transition-colors hover:text-primary">
            ویژگی‌ها
          </Link>
          <Link href="#how-it-works" className="transition-colors hover:text-primary">
            روند کار
          </Link>
          <Link href="#pricing" className="transition-colors hover:text-primary">
            تعرفه بتا
          </Link>
          <Link href="/faq" className="transition-colors hover:text-primary">
            سوالات متداول
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-2 rounded-full bg-secondary/50 px-3 py-1 text-xs text-muted-foreground ring-1 ring-border md:flex">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" />
            میزبانی امن داخلی
          </div>
          <Link href={ctaHref}>
            <Button className="group rounded-full px-6 font-bold shadow-lg shadow-primary/25">
              شروع سریع
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
