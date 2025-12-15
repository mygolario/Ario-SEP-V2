'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from '@/components/ui/sheet';
import { HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  title: string;
  description: string;
  children?: React.ReactNode;
}

export function ExplainTrigger({ title, description, children }: Props) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0 rounded-full hover:bg-muted">
          <HelpCircle className="h-4 w-4 text-muted-foreground" />
          <span className="sr-only">توضیح</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[400px] sm:w-[540px]">
        <SheetHeader className="text-right">
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription className="text-right">{description}</SheetDescription>
        </SheetHeader>
        <div className="mt-6 text-sm leading-relaxed text-right">{children}</div>
      </SheetContent>
    </Sheet>
  );
}
