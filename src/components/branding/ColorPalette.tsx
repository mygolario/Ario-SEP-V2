'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ColorPaletteProps {
  colors: string[];
}

export function ColorPalette({ colors }: ColorPaletteProps) {
  return (
    <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="text-sm uppercase text-slate-500 font-bold tracking-wider">پالت رنگی (Color Palette)</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {colors.map((color, index) => (
          <ColorItem key={`${color}-${index}`} color={color} />
        ))}
      </CardContent>
    </Card>
  );
}

function ColorItem({ color }: { color: string }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(color);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button 
      onClick={copyToClipboard}
      className="group relative flex flex-col rounded-xl overflow-hidden border border-slate-100 transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      <div 
        className="h-24 w-full relative" 
        style={{ backgroundColor: color }}
      >
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10">
           {copied ? <Check className="text-white w-6 h-6" /> : <Copy className="text-white w-6 h-6" />}
        </div>
      </div>
      <div className="p-3 bg-white w-full text-left flex justify-between items-center">
        <span className="text-sm font-mono text-slate-600 font-bold">{color}</span>
        {copied && <span className="text-[10px] text-emerald-600 font-bold">کپی شد!</span>}
      </div>
    </button>
  );
}
