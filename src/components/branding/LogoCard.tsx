'use client';

import { Button } from '@/components/ui/button';
import { Download, Share2 } from 'lucide-react';
import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface LogoCardProps {
  svgContent: string;
}

export function LogoCard({ svgContent }: LogoCardProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    try {
      const blob = new Blob([svgContent], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'logo.svg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Card className="h-full flex flex-col overflow-hidden border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm uppercase text-slate-500 font-bold tracking-wider">لوگو (Logo)</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex items-center justify-center p-8 bg-slate-50/50 min-h-[200px]">
        <div 
          className="w-48 h-48 drop-shadow-xl transition-transform hover:scale-105 duration-300"
          dangerouslySetInnerHTML={{ __html: svgContent }} 
        />
      </CardContent>
      <CardFooter className="bg-slate-50 p-4 flex gap-2 justify-end">
         <Button variant="outline" size="sm" className="hidden">
           <Share2 className="w-4 h-4 ml-2" />
           اشتراک
         </Button>
         <Button onClick={handleDownload} disabled={isDownloading} className="bg-slate-900 text-white hover:bg-slate-800">
           <Download className="w-4 h-4 ml-2" />
           {isDownloading ? 'در حال دانلود...' : 'دانلود فایل SVG'}
         </Button>
      </CardFooter>
    </Card>
  );
}
