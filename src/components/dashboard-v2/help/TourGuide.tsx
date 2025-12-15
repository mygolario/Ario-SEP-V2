'use client';

import { driver, DriveStep } from 'driver.js';
import 'driver.js/dist/driver.css';
import { HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useRef } from 'react';

export interface TourProps {
  steps: DriveStep[];
  tourId: string; // To potentially track if user has seen it (localStorage)
}

export function useTour({ steps }: TourProps) {
  const driverObj = useRef<ReturnType<typeof driver> | null>(null);

  useEffect(() => {
    driverObj.current = driver({
      showProgress: true,
      steps: steps,
      nextBtnText: 'بعدی',
      prevBtnText: 'قبلی',
      doneBtnText: 'پایان',
      // RTL support for driver.js is mainly CSS, but text helps.
      // basic config
    });
  }, [steps]);

  const startTour = () => {
    if (driverObj.current) {
      driverObj.current.drive();
    }
  };

  return { startTour };
}

export function TourButton({ onClick }: { onClick: () => void }) {
  return (
    <Button variant="ghost" size="icon" onClick={onClick} title="راهنمای تعاملی">
      <HelpCircle className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
    </Button>
  );
}
