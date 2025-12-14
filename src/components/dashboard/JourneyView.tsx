'use client';

import React, { useState } from 'react';
import { JourneyPlan } from '@/types/businessPlan';
import { JourneyBlockRenderer } from './JourneyBlockRenderer';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, RefreshCw, Download } from 'lucide-react';
import { analytics } from '@/lib/analytics';
import { motion, AnimatePresence } from 'framer-motion';

interface JourneyViewProps {
  journey: JourneyPlan;
}

export function JourneyView({ journey }: JourneyViewProps) {
  // Initialize state with default collapsed state from standard definition
  const [sections, setSections] = useState(
    journey.sections.map((s) => ({ ...s, isCollapsed: s.isCollapsed ?? true }))
  );

  const toggleSection = (sectionId: string) => {
    setSections((prev) =>
      prev.map((s) => {
        if (s.id === sectionId) {
          const newState = !s.isCollapsed;
          analytics.track('module_toggled', { sectionId, collapsed: newState });
          return { ...s, isCollapsed: newState };
        }
        return s;
      })
    );
  };

  const handleRegenerate = (sectionId: string) => {
    analytics.track('section_regenerated', { sectionId });
    // TODO: Implement actual regeneration logic (server action preferred)
    console.log('قابلیت بازتولید بخش در فاز بعدی فعال خواهد شد.');
  };

  const handleExport = () => {
    analytics.track('output_exported', { journeyId: journey.id });
    window.print();
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            نقشه راه اختصاصی کارنکس
          </h1>
          <p className="text-slate-500 mt-2 text-lg">
            طراحی شده برای{' '}
            {journey.userProfile.industry !== 'general'
              ? journey.userProfile.industry
              : 'کسب‌وکار شما'}{' '}
            در {journey.userProfile.city}
          </p>
        </div>
        <Button variant="outline" onClick={handleExport} className="gap-2">
          <Download className="w-4 h-4" />
          دریافت فایل
        </Button>
      </div>

      {/* Sections */}
      <div className="space-y-6" id="journey-block-list">
        {sections.map((section) => (
          <div
            key={section.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all hover:border-indigo-200"
          >
            {/* Section Header */}
            <div
              className="p-6 flex items-center justify-between cursor-pointer bg-slate-50/50 hover:bg-slate-50"
              onClick={() => toggleSection(section.id)}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`p-2 rounded-lg ${!section.isCollapsed ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-500'}`}
                >
                  {section.isCollapsed ? (
                    <ChevronDown className="w-5 h-5" />
                  ) : (
                    <ChevronUp className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">{section.title}</h2>
                  {section.description && (
                    <p className="text-slate-500 text-sm mt-1">{section.description}</p>
                  )}
                </div>
              </div>

              {/* Controls (stop propagation) */}
              <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-slate-400 hover:text-indigo-600"
                  onClick={() => handleRegenerate(section.id)}
                  title="بازتولید این بخش"
                >
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Content */}
            <AnimatePresence>
              {!section.isCollapsed && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="p-6 pt-0 space-y-6 border-t border-slate-100 mt-6">
                    {section.blocks.map((block) => (
                      <JourneyBlockRenderer key={block.id} block={block} />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
