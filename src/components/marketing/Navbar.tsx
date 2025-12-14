'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShieldCheck, ArrowLeft, Menu } from 'lucide-react';
import { Logo } from '@/components/brand/Logo';
import { ROUTES } from '@/lib/constants';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';

type NavbarProps = {
  ctaHref: string;
};

const navLinks = [
  { href: '#features', label: 'ویژگی‌ها' },
  { href: '#how-it-works', label: 'روند کار' },
  { href: '#pricing', label: 'تعرفه بتا' },
  { href: '/faq', label: 'سوالات متداول' },
];

export function Navbar({ ctaHref }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div
        className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4"
        dir="rtl"
      >
        <Link href={ROUTES.home} className="flex items-center gap-3 text-right">
          <Logo showText size={40} />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="transition-colors hover:text-primary">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-2 rounded-full bg-secondary/50 px-3 py-1 text-xs text-muted-foreground ring-1 ring-border md:flex">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" />
            میزبانی امن داخلی
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="منو">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72" dir="rtl">
              <nav className="flex flex-col gap-4 pt-8 text-right">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link
                      href={link.href}
                      className="text-lg font-medium text-foreground hover:text-primary transition-colors py-2"
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <Link href={ctaHref}>
                    <Button className="w-full mt-4 rounded-full font-bold">
                      شروع سریع
                      <ArrowLeft className="mr-2 h-4 w-4" />
                    </Button>
                  </Link>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>

          {/* Desktop CTA */}
          <Link href={ctaHref} className="hidden md:block">
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
