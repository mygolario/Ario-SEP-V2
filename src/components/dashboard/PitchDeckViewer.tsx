'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ArrowLeft,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  DollarSign,
} from 'lucide-react';

import { sanitizeLogoSvg } from '@/lib/security/sanitizeSvg';
import { Button } from '@/components/ui/button';

interface PitchDeckViewerProps {
  data: {
    businessName: string;
    tagline: string;
    logoSVG: string;
    leanCanvas?: {
      problem: string;
      solution: string;
      revenueStream: string;
      costStructure: string;
    };
    marketAnalysis?: {
      tam: string;
      sam: string;
      som: string;
    };
  };
}

const SLIDE_VARIANTS = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.95,
  }),
};

export function PitchDeckViewer({ data }: PitchDeckViewerProps) {
  const [slide, setSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const safeLogo = sanitizeLogoSvg(data.logoSVG);

  const slides = [
    { type: 'title', title: data.businessName, tagline: data.tagline, logo: safeLogo },
    { type: 'problem', title: 'مشکل (The Problem)', content: data.leanCanvas?.problem },
    { type: 'solution', title: 'راه حل (The Solution)', content: data.leanCanvas?.solution },
    { type: 'market', title: 'اندازه بازار (Market Size)', content: data.marketAnalysis },
    {
      type: 'business',
      title: 'مدل کسب‌وکار (Business Model)',
      revenue: data.leanCanvas?.revenueStream,
      cost: data.leanCanvas?.costStructure,
    },
  ];

  const paginate = (newDirection: number) => {
    const nextSlide = slide + newDirection;
    if (nextSlide >= 0 && nextSlide < slides.length) {
      setDirection(newDirection);
      setSlide(nextSlide);
    }
  };

  const currentSlideData = slides[slide];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-4" dir="rtl">
      {/* Viewer Container */}
      <div className="relative aspect-video w-full bg-slate-900 rounded-xl overflow-hidden shadow-2xl border border-slate-700">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={slide}
            custom={direction}
            variants={SLIDE_VARIANTS}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute inset-0 flex flex-col"
          >
            {/* Slide Content Router */}
            {/* eslint-disable @typescript-eslint/no-explicit-any */}
            {currentSlideData.type === 'title' && <TitleSlide data={currentSlideData as any} />}
            {currentSlideData.type === 'problem' && (
              <SimpleSlide
                data={currentSlideData as any}
                theme="red"
                icon={<AlertTriangle className="w-16 h-16 mb-4 text-red-500" />}
              />
            )}
            {currentSlideData.type === 'solution' && (
              <SimpleSlide
                data={currentSlideData as any}
                theme="green"
                icon={<CheckCircle className="w-16 h-16 mb-4 text-green-500" />}
              />
            )}
            {currentSlideData.type === 'market' && <MarketSlide data={currentSlideData as any} />}
            {currentSlideData.type === 'business' && (
              <BusinessSlide data={currentSlideData as any} />
            )}
            {/* eslint-enable @typescript-eslint/no-explicit-any */}

            {/* Footer */}
            <div className="absolute bottom-6 left-8 text-slate-500 text-sm font-mono z-20">
              Slide {slide + 1} / {slides.length}
            </div>
            {safeLogo && (
              <div
                className="absolute bottom-6 right-8 w-8 h-8 opacity-50 z-20"
                dangerouslySetInnerHTML={{ __html: safeLogo }}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <Button
          variant="ghost"
          onClick={() => paginate(-1)}
          disabled={slide === 0}
          className="hover:bg-slate-100"
        >
          <ArrowRight className="ml-2 w-4 h-4" />
          اسلاید قبلی
        </Button>

        <div className="flex gap-2">
          {slides.map((_, idx) => (
            <div
              key={idx}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${idx === slide ? 'bg-indigo-600 w-6' : 'bg-slate-300'}`}
            />
          ))}
        </div>

        <Button
          onClick={() => paginate(1)}
          disabled={slide === slides.length - 1}
          className="bg-slate-900 text-white hover:bg-slate-800"
        >
          اسلاید بعدی
          <ArrowLeft className="mr-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

// --- Sub-Components for Slides ---

function TitleSlide({ data }: { data: { logo?: string; title: string; tagline: string } }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center p-12 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      {data.logo ? (
        <div
          className="w-32 h-32 mb-8 drop-shadow-2xl"
          dangerouslySetInnerHTML={{ __html: data.logo }}
        />
      ) : (
        <div className="w-32 h-32 mb-8 drop-shadow-2xl rounded-full bg-slate-800" />
      )}
      <h1 className="text-5xl font-black mb-4 tracking-tight leading-tight">{data.title}</h1>
      <p className="text-xl text-slate-400 max-w-2xl font-light">{data.tagline}</p>
    </div>
  );
}

function SimpleSlide({
  data,
  theme = 'blue',
  icon,
}: {
  data: { title: string; content: string };
  theme?: string;
  icon?: React.ReactNode;
}) {
  const isRed = theme === 'red';

  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center p-16 bg-slate-900 text-white relative overflow-hidden">
      {/* Dramatic Background Light */}
      <div
        className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${isRed ? 'from-red-600 via-orange-500 to-red-600' : 'from-green-600 via-emerald-500 to-green-600'}`}
      ></div>

      {icon}
      <h2 className="text-4xl font-bold mb-8">{data.title}</h2>
      <p className="text-xl text-slate-300 leading-9 max-w-3xl whitespace-pre-wrap">
        {data.content}
      </p>
    </div>
  );
}

function MarketSlide({
  data,
}: {
  data: { title: string; content: { tam: string; sam: string; som: string } };
}) {
  const market = data.content;
  return (
    <div className="flex-1 flex flex-col justify-center p-16 bg-slate-900 text-white">
      <h2 className="text-3xl font-bold mb-12 text-center border-b border-slate-800 pb-4">
        {data.title}
      </h2>

      <div className="grid grid-cols-3 gap-8">
        <MarketStat label="TAM" desc="کل بازار موجود" value={market?.tam} color="text-indigo-400" />
        <MarketStat label="SAM" desc="بازار قابل خدمت" value={market?.sam} color="text-blue-400" />
        <MarketStat label="SOM" desc="سهم بازار هدف" value={market?.som} color="text-rose-400" />
      </div>

      <p className="text-center text-slate-500 mt-12 text-sm">
        ارقام تخمینی بر اساس تحلیل اولیه بازار
      </p>
    </div>
  );
}

function MarketStat({
  label,
  desc,
  value,
  color,
}: {
  label: string;
  desc: string;
  value: string;
  color: string;
}) {
  return (
    <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50">
      <span className="text-6xl font-black text-slate-700 mb-2 opacity-30 select-none">
        {label}
      </span>
      <h3 className={`text-3xl font-bold mb-2 ${color} dir-ltr`}>{value || 'N/A'}</h3>
      <p className="text-slate-400">{desc}</p>
    </div>
  );
}

function BusinessSlide({ data }: { data: { title: string; revenue: string; cost: string } }) {
  return (
    <div className="flex-1 flex flex-col justify-center p-16 bg-slate-900 text-white">
      <h2 className="text-3xl font-bold mb-12 text-center border-b border-slate-800 pb-4">
        {data.title}
      </h2>

      <div className="grid grid-cols-2 gap-12">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-red-400 mb-6">
            <TrendingUp className="w-8 h-8" />
            <h3 className="text-2xl font-bold">ساختار هزینه‌ها</h3>
          </div>
          <p className="text-lg text-slate-300 leading-8 text-justify">{data.cost}</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 text-green-400 mb-6">
            <DollarSign className="w-8 h-8" />
            <h3 className="text-2xl font-bold">جریان درآمدی</h3>
          </div>
          <p className="text-lg text-slate-300 leading-8 text-justify">{data.revenue}</p>
        </div>
      </div>
    </div>
  );
}
