'use client';

import React from 'react';

export const Pricing = () => {
    return (
        <section className="py-24 relative overflow-hidden">
             {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[20%] right-[10%] w-72 h-72 bg-purple-500/10 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[10%] left-[10%] w-72 h-72 bg-blue-500/10 rounded-full blur-[100px]"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">تعرفه‌ها</h2>
                    <p className="text-slate-400 text-lg">بهترین پلن را برای کسب‌وکار خود انتخاب کنید</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {/* Free Card */}
                    <div className="rounded-2xl bg-white/5 border border-white/10 p-8 flex flex-col hover:border-white/20 transition-all duration-300">
                        <h3 className="text-xl font-bold text-white mb-4">رایگان</h3>
                        <div className="text-4xl font-bold text-white mb-6">
                            0 <span className="text-lg text-slate-400 font-normal">Toman</span>
                        </div>
                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="flex items-center text-slate-300">
                                <CheckIcon />
                                <span className="mr-3">One-Page Plan</span>
                            </li>
                            <li className="flex items-center text-slate-300">
                                <CheckIcon />
                                <span className="mr-3">Basic AI</span>
                            </li>
                        </ul>
                        <button className="w-full py-3 rounded-lg border border-white/20 text-white hover:bg-white/5 transition-colors font-medium">
                            Start Now
                        </button>
                    </div>

                    {/* Pro Card (Highlighted) */}
                    <div className="rounded-2xl bg-gradient-to-b from-indigo-500/10 to-purple-500/10 border border-indigo-500/50 p-8 flex flex-col relative transform hover:scale-105 transition-all duration-300 shadow-2xl shadow-indigo-500/10">
                         <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                            Popular
                        </div>
                        <h3 className="text-xl font-bold text-white mb-4 text-indigo-400">حرفه‌ای</h3>
                        <div className="text-4xl font-bold text-white mb-6">
                            990,000 <span className="text-lg text-slate-400 font-normal">Toman/mo</span>
                        </div>
                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="flex items-center text-white">
                                <CheckIcon className="text-indigo-400" />
                                <span className="mr-3">Deep Plan</span>
                            </li>
                            <li className="flex items-center text-white">
                                <CheckIcon className="text-indigo-400" />
                                <span className="mr-3">Legal Contracts</span>
                            </li>
                            <li className="flex items-center text-white">
                                <CheckIcon className="text-indigo-400" />
                                <span className="mr-3">Financial Sim</span>
                            </li>
                            <li className="flex items-center text-white">
                                <CheckIcon className="text-indigo-400" />
                                <span className="mr-3">Priority Support</span>
                            </li>
                        </ul>
                        <button className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500 transition-colors font-bold shadow-lg shadow-indigo-500/25">
                            Get Pro
                        </button>
                    </div>

                    {/* Enterprise Card */}
                    <div className="rounded-2xl bg-white/5 border border-white/10 p-8 flex flex-col hover:border-white/20 transition-all duration-300">
                        <h3 className="text-xl font-bold text-white mb-4">سازمانی</h3>
                        <div className="text-4xl font-bold text-white mb-6">
                            Contact Us
                        </div>
                        <ul className="space-y-4 mb-8 flex-1">
                             <li className="flex items-center text-slate-300">
                                <CheckIcon />
                                <span className="mr-3">Custom Solutions</span>
                            </li>
                             <li className="flex items-center text-slate-300">
                                <CheckIcon />
                                <span className="mr-3">Dedicated Support</span>
                            </li>
                             <li className="flex items-center text-slate-300">
                                <CheckIcon />
                                <span className="mr-3">SLA</span>
                            </li>
                        </ul>
                        <button className="w-full py-3 rounded-lg border border-white/20 text-white hover:bg-white/5 transition-colors font-medium">
                            Contact Sales
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

const CheckIcon = ({ className = "text-emerald-400" }: { className?: string }) => (
    <svg className={`w-5 h-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
);
