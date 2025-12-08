'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-white dark:bg-slate-950">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2 items-center">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-sans text-slate-900 dark:text-slate-50">
                Launch Your Dream Business in 60 Seconds.
              </h1>
              <p className="max-w-[600px] text-slate-500 md:text-xl dark:text-slate-400 font-medium">
                The AI Co-Founder that builds your logo, strategy, and website instantly.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" className="px-8 h-12 text-lg font-semibold shadow-lg">
                  Start Building Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </div>
          </div>
          
          {/* Visual / Dashboard Preview */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto w-full max-w-[500px] lg:max-w-none"
          >
            <div className="aspect-video overflow-hidden rounded-xl border border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-900 shadow-xl flex items-center justify-center relative">
              {/* Abstract UI representation */}
              <div className="absolute inset-0 flex flex-col p-4 gap-4 opacity-50">
                 <div className="h-8 w-1/3 bg-slate-300 dark:bg-slate-700 rounded animate-pulse"></div>
                 <div className="flex gap-4 h-full">
                    <div className="w-1/4 h-full bg-slate-200 dark:bg-slate-800 rounded"></div>
                    <div className="w-3/4 h-full bg-slate-200 dark:bg-slate-800 rounded"></div>
                 </div>
              </div>
              <span className="text-slate-400 font-medium z-10">Dashboard Preview</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
