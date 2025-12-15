'use client';

import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';
import { useReactToPrint } from 'react-to-print';

interface ExportButtonsProps {
  contentRef: React.RefObject<HTMLDivElement>;
}

export function ExportButtons({ contentRef }: ExportButtonsProps) {
  const handlePrint = useReactToPrint({
    contentRef: contentRef,
    documentTitle: 'Business-Plan-Export',
  });

  return (
    <Button variant="outline" size="sm" onClick={() => handlePrint()} className="gap-2">
      <Printer className="h-4 w-4" />
      چاپ / PDF
    </Button>
  );
}
