'use client';

import React from 'react';
import { Logo } from '@/components/brand/Logo';
import { motion } from 'framer-motion';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen w-full flex bg-slate-50 dark:bg-slate-950">
      {/* Right Side (Visual) - Desktop Only */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-slate-900 border-l border-slate-800">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 w-full h-full flex flex-col justify-center items-center p-12 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="w-full max-w-lg"
          >
            {/* Glass Card */}
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
              {/* Shine Effect */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

              <div className="relative z-10">
                <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/20 text-white shadow-inner border border-white/30">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold mb-4 leading-tight">
                  ایده‌های بزرگ،
                  <br />
                  <span className="text-indigo-300">مسیرهای روشن.</span>
                </h2>
                <p className="text-lg text-slate-300 leading-relaxed opacity-90">
                  کارنکس دستیار هوشمند شماست تا از پیچیدگی‌های راه‌اندازی استارتاپ عبور کنید و به
                  شفافیت برسید.
                </p>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="mt-12 flex gap-6 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
              {/* Placeholders for logos if needed */}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Left Side (Form) */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 md:p-12 relative">
        <div className="absolute top-6 right-6 lg:top-12 lg:right-12">
          <Logo showText size={40} />
        </div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-md space-y-8"
        >
          {children}
        </motion.div>

        <div className="mt-auto pt-8 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} کارنکس. تمامی حقوق محفوظ است.
        </div>
      </div>
    </div>
  );
}
