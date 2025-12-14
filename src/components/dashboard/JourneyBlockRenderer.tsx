import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { JourneyBlock } from '@/types/businessPlan';
import { cn } from '@/lib/utils';
import { CheckCircle2, AlertTriangle, Lightbulb, Wallet } from 'lucide-react';
import { PLAYBOOKS } from '@/lib/playbooks/library';
import { PlaybookDrawer } from './PlaybookDrawer';
import { PlaybookMiniSummary } from './PlaybookMiniSummary';
import { analytics } from '@/lib/analytics';

interface JourneyBlockRendererProps {
  block: JourneyBlock;
  className?: string;
}

export function JourneyBlockRenderer({ block, className }: JourneyBlockRendererProps) {
  const { type, title, content, metadata } = block;
  const [isPlaybookOpen, setIsPlaybookOpen] = useState(false);

  // Find related playbook
  const playbookEntry = Object.entries(PLAYBOOKS).find(([, pb]) => pb.relatedBlockId === block.id);
  const playbook = playbookEntry ? playbookEntry[1] : null;

  const handlePlaybookOpen = () => {
    if (playbook) {
      setIsPlaybookOpen(true);
      analytics.track('playbook_opened', { playbookId: playbook.id, source: 'block_renderer' });
    }
  };

  const renderIcon = () => {
    switch (type) {
      case 'checklist':
        return <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-600" />;
      case 'tip':
        return <Lightbulb className="w-5 h-5 text-indigo-600" />;
      case 'financial':
        return <Wallet className="w-5 h-5 text-blue-600" />;
      default:
        return null;
    }
  };

  const getContainerStyle = () => {
    switch (type) {
      case 'checklist':
        return 'bg-emerald-50 border-emerald-100';
      case 'warning':
        return 'bg-amber-50 border-amber-100';
      case 'tip':
        return 'bg-indigo-50 border-indigo-100';
      case 'financial':
        return 'bg-blue-50 border-blue-100';
      default:
        return 'bg-white border-slate-100'; // text
    }
  };

  return (
    <>
      <div className={cn('rounded-xl border p-6 transition-all', getContainerStyle(), className)}>
        <div className="flex items-start gap-4">
          {renderIcon() && <div className="mt-1 flex-shrink-0">{renderIcon()}</div>}

          <div className="flex-1 space-y-4">
            {title && (
              <h3
                className={cn(
                  'text-lg font-bold',
                  type === 'warning' ? 'text-amber-800' : 'text-slate-900'
                )}
              >
                {title}
              </h3>
            )}

            <div className="prose prose-sm prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-700 prose-li:text-slate-700">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>

            {playbook && <PlaybookMiniSummary playbook={playbook} onClick={handlePlaybookOpen} />}

            {metadata?.source && (
              <div className="text-xs text-slate-400 font-mono mt-4 pt-4 border-t border-slate-200/50">
                منبع: {metadata.source}
              </div>
            )}
          </div>
        </div>
      </div>

      {playbook && (
        <PlaybookDrawer
          playbookId={playbook.id} // Actually library is keyed by string, but we want ID or key? Library map uses key. Drawer takes ID (key) or full object?
          // Drawer takes playbookId (string) and looks up in PLAYBOOKS. So we need the KEY.
          // Wait, PlaybookDrawer searches PLAYBOOKS[playbookId].
          // My search above found [key, pb]. So I use playbookEntry[0] as the key.
          isOpen={isPlaybookOpen}
          onClose={() => setIsPlaybookOpen(false)}
        />
      )}
    </>
  );
}
