'use client';

import { updateRoadmapItemStatus } from '@/app/actions/roadmap';
import { Badge } from '@/components/ui/badge';

import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

import { useToast } from '@/components/ui/toast';

interface RoadmapItem {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'doing' | 'done' | 'archived';
  priority: 'high' | 'medium' | 'low';
  version: number;
}

interface RoadmapListProps {
  items: RoadmapItem[];
  compact?: boolean; // For overview page small view
}

export function RoadmapList({ items, compact = false }: RoadmapListProps) {
  const { toast } = useToast();
  const [updating, setUpdating] = useState<string | null>(null);

  const handleStatusChange = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'done' ? 'todo' : 'done';
    setUpdating(id);
    try {
      await updateRoadmapItemStatus(id, newStatus);
      toast('وضعیت به‌روز شد', 'success');
    } catch {
      toast('خطا در بروزرسانی', 'error');
    } finally {
      setUpdating(null);
    }
  };

  if (items.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">هنوز برنامه‌ای ایجاد نشده است.</div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div
          key={item.id}
          className={cn(
            'flex items-start gap-4 rounded-lg border p-3 transition-colors hover:bg-muted/50',
            item.status === 'done' && 'bg-muted/30 opacity-60'
          )}
        >
          <div className="pt-1">
            {updating === item.id ? (
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
            ) : (
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary accent-primary"
                checked={item.status === 'done'}
                onChange={() => handleStatusChange(item.id, item.status)}
              />
            )}
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <span className={cn('font-medium', item.status === 'done' && 'line-through')}>
                {item.title}
              </span>
              {!compact && (
                <Badge
                  variant={item.priority === 'high' ? 'destructive' : 'secondary'}
                  className="text-[10px] h-5 px-1.5"
                >
                  {item.priority === 'high' ? 'فوری' : item.priority === 'medium' ? 'مهم' : 'عادی'}
                </Badge>
              )}
            </div>
            {!compact && item.description && (
              <p className="text-sm text-muted-foreground">{item.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
