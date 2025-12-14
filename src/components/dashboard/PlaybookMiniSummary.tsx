import { Playbook } from '@/types/playbook';
import { Layers, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PlaybookMiniSummaryProps {
  playbook: Playbook;
  onClick: () => void;
}

export function PlaybookMiniSummary({ playbook, onClick }: PlaybookMiniSummaryProps) {
  // Default to showing 'standard' level info for the summary
  const content = playbook.contents.standard || playbook.contents.fast;

  return (
    <div
      className="mt-4 p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-between group cursor-pointer hover:border-indigo-300 transition-all"
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <div className="p-2 bg-white dark:bg-slate-800 rounded-lg text-indigo-600 shadow-sm">
          <Layers className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm flex items-center gap-2">
            راهنمای اجرا: {playbook.title}
            <span className="text-[10px] bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full border border-indigo-100 hidden sm:inline-block">
              {Object.keys(playbook.contents).length} سطح
            </span>
          </h4>
          <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
            <span>هزینه: {content.costEstimate}</span>
            <span className="w-1 h-1 bg-slate-300 rounded-full" />
            <span>زمان: {content.timeEstimate}</span>
          </div>
        </div>
      </div>

      <Button
        size="sm"
        variant="ghost"
        className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 gap-1 text-xs px-3 h-8"
      >
        <Zap className="w-3 h-3" />
        <span className="hidden sm:inline">مشاهده</span> راهنما
      </Button>
    </div>
  );
}
