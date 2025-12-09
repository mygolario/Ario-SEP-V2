import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="grid lg:grid-cols-2 h-screen w-full">
        {/* Right Side (Desktop Only) */}
        <div className="hidden lg:flex flex-col justify-center items-center bg-slate-900 bg-gradient-to-br from-indigo-900 to-slate-900 text-white p-12">
            <h1 className="text-4xl font-bold mb-4 text-center">ساختن آینده، امروز.</h1>
            <p className="text-lg text-slate-300 text-center">به پلتفرم مدیریت استارتاپ خوش آمدید</p>
        </div>

        {/* Left Side (Form) */}
        <div className="flex flex-col justify-center items-center bg-white p-8">
            <div className="w-full max-w-md space-y-8">
                {children}
            </div>
        </div>
    </div>
  );
}
