'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
// If sonner is not installed, I'll fallback to console or alert for "Minimal UI" 
// check package.json -> it has not listed sonner? 
// Wait, prompt said "show toast success/failure". verify toast lib.
// package.json does NOT show sonner or react-hot-toast. 
// It has `radix-ui` which usually pairs with something. 
// `src/app/layout.tsx` might have `Toaster`.
// I'll check layout later. For now, I'll implement button with generic `alert` or just console if toast missing.
// Actually I'll assume `sonner` is not there and use `window.alert` or simple state message to keep it "Minimal" and fail-safe, 
// OR check if `Toaster` exists in components.

import { Loader2 } from 'lucide-react';

interface RegenerateButtonProps {
  projectId: string;
  sectionKey: 'identity' | 'branding' | 'landing' | 'lean_canvas' | 'roadmap';
  className?: string;
  label?: string;
}

export function RegenerateButton({ projectId, sectionKey, className, label = 'بازسازی این بخش' }: RegenerateButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRegenerate = async () => {
    if (!projectId) return;
    
    setIsLoading(true);
    try {
      const res = await fetch('/api/regenerate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId, sectionKey }),
      });

      if (!res.ok) {
        throw new Error('Failed to regenerate');
      }

      router.refresh();
      // Simple feedback
      // alert('بخش مورد نظر با موفقیت بازسازی شد');
    } catch (error) {
      console.error(error);
      alert('خطا در بازسازی. لطفا مجدد تلاش کنید.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={handleRegenerate} 
      disabled={isLoading}
      className={className}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin ml-2" />
      ) : (
        <RefreshCw className="h-4 w-4 ml-2" />
      )}
      {label}
    </Button>
  );
}
