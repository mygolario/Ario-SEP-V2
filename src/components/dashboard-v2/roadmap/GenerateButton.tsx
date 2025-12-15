'use client';

import { generateRoadmap } from '@/app/actions/roadmap';
import { Button } from '@/components/ui/button';
import { Loader2, Wand2 } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/components/ui/toast';

interface GenerateButtonProps {
  projectId: string;
  label?: string;
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export function GenerateButton({
  projectId,
  label = 'تولید نقشه راه هوشمند',
  variant = 'default',
  size = 'default',
}: GenerateButtonProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    setLoading(true);
    try {
      await generateRoadmap(projectId);
      toast('برنامه با موفقیت تدوین شد', 'success');
    } catch {
      toast('خطا در تولید برنامه', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleGenerate}
      disabled={loading}
      variant={variant}
      size={size}
      className="w-full sm:w-auto"
    >
      {loading ? (
        <Loader2 className="ml-2 h-4 w-4 animate-spin" />
      ) : (
        <Wand2 className="ml-2 h-4 w-4" />
      )}
      {label}
    </Button>
  );
}
