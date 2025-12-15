'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { ReactNode } from 'react';

interface ProGateProps {
  isPro: boolean;
  children: ReactNode;
  title?: string;
  description?: string;
}

export function ProGate({
  isPro,
  children,
  title = 'دسترسی ویژه',
  description = 'این بخش مخصوص کاربران حرفه‌ای (Pro) است.',
}: ProGateProps) {
  if (isPro) {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      <div className="absolute inset-0 z-10 bg-background/80 backdrop-blur-sm flex items-center justify-center p-6">
        <Card className="max-w-md w-full border-primary/20 shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">
              <Lock className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent text-xl">
              {title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <p className="text-muted-foreground">
              {description}
              <br />
              برای استفاده از قابلیت‌های هوش مصنوعی پیشرفته و ابزارهای تخصصی، طرح خود را ارتقا دهید.
            </p>
            <Link href="/dashboard-v2/settings" className="block">
              <Button className="w-full gap-2 font-bold" size="lg">
                <Sparkles className="h-4 w-4" />
                ارتقا به طرح حرفه‌ای
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
      {/* Render children blurrily or hidden underneath to give context (optional, safer to just hide or disable) */}
      <div className="opacity-20 pointer-events-none select-none filter blur-sm h-[400px] overflow-hidden">
        {children}
      </div>
    </div>
  );
}
