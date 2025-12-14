'use client';

import { HelpCenter } from './HelpCenter';
import { Button } from '@/components/ui/button';
import { HelpCircle } from 'lucide-react';

export function HelpButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <HelpCenter>
        <Button
          id="help-center-trigger"
          size="lg"
          className="rounded-full shadow-lg shadow-indigo-500/30 w-12 h-12 p-0 bg-indigo-600 hover:bg-indigo-700 transition-transform hover:scale-105"
        >
          <HelpCircle className="w-6 h-6 text-white" />
        </Button>
      </HelpCenter>
    </div>
  );
}
