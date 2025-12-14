'use client';

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { driver, DriveStep } from 'driver.js';
import 'driver.js/dist/driver.css';
import { analytics } from '@/lib/analytics';

interface TourContextType {
  startTour: () => void;
  hasSeenTour: boolean;
  dismissTour: () => void;
}

const TourContext = createContext<TourContextType | undefined>(undefined);

export const useTour = () => {
  const context = useContext(TourContext);
  if (!context) {
    throw new Error('useTour must be used within a TourProvider');
  }
  return context;
};

const TOUR_STORAGE_KEY = 'karnex_tour_completed';

export function TourProvider({ children }: { children: React.ReactNode }) {
  const [hasSeenTour, setHasSeenTour] = useState(false);
  const driverObj = useRef<ReturnType<typeof driver> | null>(null);

  useEffect(() => {
    // Check local storage on mount
    const seen = localStorage.getItem(TOUR_STORAGE_KEY);
    if (seen === 'true') {
      setHasSeenTour(true);
    }
  }, []);

  const steps: DriveStep[] = [
    {
      element: '#sidebar-logo', // We need to add this ID to Sidebar logo
      popover: {
        title: 'به کارنکس خوش آمدید 👋',
        description: 'اینجا پنل فرماندهی استارتاپ شماست. همه ابزارها در دسترس شما هستند.',
        side: 'left',
        align: 'start',
      },
    },
    {
      element: '#nav-dashboard-home', // Need to add ID
      popover: {
        title: 'نمای کلی',
        description: 'وضعیت کلی پروژه، وظایف و پیشرفت خود را اینجا ببینید.',
        side: 'left',
      },
    },
    {
      element: '#nav-dashboard-deep-plan', // Need to add ID
      popover: {
        title: 'بیزینس پلن جامع',
        description: 'قلب تپنده بیزینس شما. پلن خود را اینجا بسازید و مدیریت کنید.',
        side: 'left',
      },
    },
    {
      element: '#journey-block-list', // Need to add ID to JourneyView list
      popover: {
        title: 'نقشه راه هوشمند',
        description: 'گام‌به‌گام مسیر موفقیت شما، شخصی‌سازی شده برای بازار ایران.',
        side: 'top',
      },
    },
    {
      element: '#help-center-trigger', // Need to add ID to Help Button
      popover: {
        title: 'مرکز راهنما',
        description: 'هر سوالی داشتید یا نیاز به چک‌لیست داشتید، از اینجا کمک بگیرید.',
        side: 'right',
      },
    },
  ];

  const startTour = () => {
    if (!driverObj.current) {
      driverObj.current = driver({
        showProgress: true,
        animate: true,
        steps: steps,
        nextBtnText: 'بعدی',
        prevBtnText: 'قبلی',
        doneBtnText: 'پایان تور',
        allowClose: true, // Allow closing by clicking outside or ESC
        onDestroyStarted: () => {
          // If user closes midway, we can decide to mark as seen or not.
          // Ideally only mark seen if "Done" is clicked or if they explicitly skip.
          // For now, let's track the event.
          analytics.track('tour_skipped', { step: driverObj.current?.getActiveIndex() });
        },
        onHighlightStarted: () => {
          // Track step view?
        },
      });
    }

    analytics.track('tour_started', {});
    driverObj.current.drive();
  };

  const dismissTour = () => {
    setHasSeenTour(true);
    localStorage.setItem(TOUR_STORAGE_KEY, 'true');
    analytics.track('tour_completed', {});
  };

  // Expose a way to mark as seen when destroy happens on last step
  // driver.js configuration `onDestroy` is called when tour finishes OR is closed.
  // We might want to customize config inside startTour to handle "Done" specifically if possible,
  // or just trust the user dismissal.

  // Actually, we should probably set 'seen' after the tour is finished properly.
  // Let's update the driver config above.

  return (
    <TourContext.Provider value={{ startTour, hasSeenTour, dismissTour }}>
      {children}
    </TourContext.Provider>
  );
}
