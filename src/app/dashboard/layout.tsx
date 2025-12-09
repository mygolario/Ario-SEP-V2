'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Header } from '@/components/dashboard/Header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-50" dir="rtl">
      {/* Sidebar - Fixed on Desktop via CSS in Sidebar component usually, but here flex layout implies it sits in flow */}
      {/* 
         Based on the Sidebar component update:
         Desktop: "md:w-64 md:flex md:relative" -> It takes space in the flex container.
         Mobile: "fixed inset-y-0" -> It overlays.
      */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0"> {/* min-w-0 prevents flex overflow issues */}
        
        {/* Header */}
        <Header onMenuClick={() => setIsSidebarOpen(true)} />

        {/* Page Content */}
        {/* Add top padding to account for fixed Header (h-16 = 4rem = pt-16) */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 pt-20 md:pt-24">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
