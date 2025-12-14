'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { analytics } from '@/lib/analytics';
import { motion, AnimatePresence } from 'framer-motion';

export function ConsentBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check local storage for previous choice
    const choice = localStorage.getItem('cookie-consent');

    if (choice === null) {
      // No choice made, show banner
      setShow(true);
    } else if (choice === 'true') {
      // Previously accepted, ensure we are opted in
      // PostHog likely remembers, but we enforce consistency
      analytics.setConsent(true);
    } else {
      // Previously declined (essential only)
      analytics.setConsent(false);
    }
  }, []);

  const handleAccept = () => {
    analytics.setConsent(true);
    localStorage.setItem('cookie-consent', 'true');
    setShow(false);
  };

  const handleEssential = () => {
    analytics.setConsent(false);
    localStorage.setItem('cookie-consent', 'false');
    setShow(false);
  };

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-4xl"
      >
        <Card
          className="p-4 shadow-xl border-primary/20 bg-background/95 backdrop-blur-sm"
          dir="rtl"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-foreground/90 text-right w-full md:w-auto">
              <p className="font-bold mb-1">مدیریت حریم خصوصی و کوکی‌ها</p>
              <p className="text-muted-foreground">
                ما از کوکی‌ها برای بهبود تجربه شما استفاده می‌کنیم. کوکی‌های ضروری همیشه فعال هستند.
                آیا با فعال‌سازی کوکی‌های تحلیلی برای کمک به بهبود سرویس و تجربه کاربری بهتر موافقت
                دارید؟
              </p>
            </div>
            <div className="flex gap-2 w-full md:w-auto shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={handleEssential}
                className="flex-1 md:flex-none"
              >
                فقط ضروری
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={handleAccept}
                className="flex-1 md:flex-none bg-primary text-primary-foreground"
              >
                قبول همه
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}
