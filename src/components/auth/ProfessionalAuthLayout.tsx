'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Vazirmatn } from 'next/font/google';

const vazir = Vazirmatn({ subsets: ['arabic', 'latin'] });

export const ProfessionalAuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className={`min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white ${vazir.className}`}>
            {/* Right Side - 3D Art & Branding */}
            <div className="hidden md:flex flex-col justify-center items-center relative overflow-hidden bg-gradient-to-br from-indigo-900 via-slate-900 to-black p-12">
                
                {/* Background Blobs */}
                <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none z-0">
                    <div className="absolute top-[10%] left-[20%] w-96 h-96 bg-purple-500/20 rounded-full blur-[100px]" />
                    <div className="absolute bottom-[10%] right-[10%] w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px]" />
                </div>

                {/* Glass Card with Testimonial */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl"
                >
                    <div className="mb-6 flex space-x-2 space-x-reverse text-amber-400">
                        <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                    </div>
                    <blockquote className="text-xl font-medium text-white leading-relaxed mb-6 text-right">
                        "بهترین ابزار برای شروع کسب‌وکارهای ایرانی. تنها در عرض چند دقیقه توانستیم ساختار اولیه استارتاپ خود را شکل دهیم."
                    </blockquote>
                    <div className="flex items-center justify-end">
                        <div className="text-right">
                            <div className="font-bold text-white">رضا محمدی</div>
                            <div className="text-indigo-200 text-sm">مدیرعامل تپ‌سی (مثال)</div>
                        </div>
                        <div className="ml-4 w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                            R
                        </div>
                    </div>
                </motion.div>
                
                 <div className="absolute bottom-10 text-white/20 text-sm">
                    Business Builder AI © 2024
                </div>
            </div>

            {/* Left Side - Form Container */}
            <div className="flex flex-col justify-center items-center p-6 md:p-12 relative">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md space-y-8"
                >
                    {children}
                </motion.div>

                 {/* Mobile Background Decoration */}
                 <div className="md:hidden absolute -z-10 top-0 left-0 w-full h-full bg-gradient-to-b from-indigo-50/50 to-white pointer-events-none" />
            </div>
        </div>
    );
};
