'use client';

import { useState, useMemo } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';



interface Week {
  week: string;
  focus: string;
  tasks: string[];
}

interface RoadmapChecklistProps {
  roadmap: Week[];
}

export function RoadmapChecklist({ roadmap }: RoadmapChecklistProps) {
  // We'll use a simple set of checked task indices "weekIndex-taskIndex" for client-state
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  // Flatten tasks to count total for progress
  const totalTasks = useMemo(() => roadmap.reduce((acc, week) => acc + week.tasks.length, 0), [roadmap]);
  const checkedCount = checkedItems.size;
  const progress = totalTasks > 0 ? Math.round((checkedCount / totalTasks) * 100) : 0;

  const toggleTask = (weekIndex: number, taskIndex: number) => {
    const id = `${weekIndex}-${taskIndex}`;
    const newChecked = new Set(checkedItems);
    if (newChecked.has(id)) {
      newChecked.delete(id);
    } else {
      newChecked.add(id);
    }
    setCheckedItems(newChecked);
  };

  return (
    <div className="space-y-8" dir="rtl">
      {/* Gamified Header / Progress Bar */}
      <Card className="border-indigo-100 bg-indigo-50/50 shadow-sm">
        <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
           <div className="p-4 bg-white rounded-full shadow-sm text-indigo-600">
              <Trophy className="w-8 h-8" />
           </div>
           <div className="flex-1 w-full space-y-2">
              <div className="flex justify-between items-center text-sm font-bold text-indigo-900">
                <span>وضعیت پیشرفت شما در برنامه ۳۰ روزه</span>
                <span className="dir-ltr">{progress}%</span>
              </div>
              <div className="h-4 w-full bg-indigo-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-indigo-600 transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-indigo-600/80">
                {progress === 0 ? 'هنوز شروع نکرده‌اید! اولین قدم را بردارید.' : 
                 progress === 100 ? 'تبریک! شما قهرمان اجرای استارتاپ هستید!' : 
                 'عالی! با همین فرمان ادامه دهید.'}
              </p>
           </div>
        </CardContent>
      </Card>

      {/* Vertical Stepper Timeline */}
      <div className="relative border-r-2 border-slate-200 mr-4 space-y-12">
        {roadmap.map((week, weekIdx) => (
          <div key={weekIdx} className="relative pr-8">
            {/* Timeline Dot */}
            <div className="absolute -right-[9px] top-0 w-4 h-4 rounded-full bg-slate-300 border-2 border-white ring-4 ring-slate-50" />
            
            {/* Week Card */}
            <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-3 border-b border-slate-50 bg-slate-50/50">
                 <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                       <Calendar className="w-5 h-5 text-slate-400" />
                       <CardTitle className="text-lg font-bold text-slate-900">{week.week}</CardTitle>
                    </div>
                    <Badge variant="secondary" className="bg-white border-slate-200 text-slate-600">
                       تمرکز: {week.focus}
                    </Badge>
                 </div>
              </CardHeader>
              <CardContent className="pt-4 space-y-3">
                 {week.tasks.map((task, taskIdx) => {
                   const isChecked = checkedItems.has(`${weekIdx}-${taskIdx}`);
                   return (
                     <div 
                        key={taskIdx} 
                        className={cn(
                          "flex items-start gap-3 p-3 rounded-lg transition-all cursor-pointer hover:bg-slate-50",
                          isChecked ? "opacity-60 bg-slate-50/80" : ""
                        )}
                        onClick={() => toggleTask(weekIdx, taskIdx)}
                     >
                       <Checkbox 
                          checked={isChecked} 
                          className="mt-1 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                       />
                       <label className={cn(
                         "text-sm leading-6 cursor-pointer select-none text-slate-700",
                         isChecked && "line-through text-slate-400"
                       )}>
                         {task}
                       </label>
                     </div>
                   );
                 })}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
