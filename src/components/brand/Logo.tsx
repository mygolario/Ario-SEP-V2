import Image from 'next/image';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string; // Class for the *container*
  size?: number; // Pixel size (square)
  showText?: boolean;
  variant?: 'light' | 'dark'; // Not currently used but good for future
}

export function Logo({ className, size = 40, showText = false }: LogoProps) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div
        className="relative overflow-hidden rounded-2xl shadow-lg shadow-primary/20 bg-white"
        style={{ width: size, height: size }}
      >
        <Image src="/logo.png" alt="Karnex" fill className="object-cover" sizes={`${size}px`} />
      </div>
      {showText && (
        <div className="leading-tight">
          <div className="text-xl font-black text-slate-900 tracking-tight dark:text-white">
            کارنکس
          </div>
          <div className="text-[10px] font-medium text-slate-500">نسخه بتا | Karnex</div>
        </div>
      )}
    </div>
  );
}
