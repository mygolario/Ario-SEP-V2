'use client';

import { useState, useEffect } from 'react';
import { PlaybookLevel } from '@/types/playbook';
import { PLAYBOOKS } from '@/lib/playbooks/library';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { AlertTriangle, CheckCircle2, Copy, FileText, Layers, Zap } from 'lucide-react';
import { analytics } from '@/lib/analytics';

interface PlaybookDrawerProps {
  playbookId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PlaybookDrawer({ playbookId, isOpen, onClose }: PlaybookDrawerProps) {
  const [level, setLevel] = useState<PlaybookLevel>('standard');
  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean>>({});

  const playbook = playbookId ? PLAYBOOKS[playbookId] : null;

  useEffect(() => {
    if (playbookId && isOpen) {
      analytics.track('playbook_opened', { playbookId, level });
    }
  }, [playbookId, isOpen, level]);

  const handleLevelChange = (newLevel: PlaybookLevel) => {
    setLevel(newLevel);
    analytics.track('depth_changed', { playbookId, level: newLevel });
  };

  const toggleStep = (stepId: string) => {
    const newState = !checkedSteps[stepId];
    setCheckedSteps((prev) => ({ ...prev, [stepId]: newState }));
    if (newState) {
      analytics.track('step_checked', { playbookId, stepId });
    }
  };

  const copyTemplate = (text: string) => {
    navigator.clipboard.writeText(text);
    analytics.track('template_copied', { playbookId });
  };

  if (!playbook) return null;

  const content = playbook.contents[level];

  return (
    <Sheet open={isOpen} onOpenChange={(open: boolean) => !open && onClose()}>
      <SheetContent
        side="left"
        className="w-full sm:max-w-xl p-0 flex flex-col h-full bg-slate-50 dark:bg-slate-950"
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <SheetHeader className="text-right space-y-4">
            <div className="flex items-center justify-between">
              <Badge
                variant="outline"
                className="px-3 py-1 border-indigo-200 bg-indigo-50 text-indigo-700"
              >
                راهنمای اجرا
              </Badge>
              <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
                <Button
                  size="sm"
                  variant={level === 'fast' ? 'secondary' : 'ghost'}
                  className={`h-7 px-3 text-xs ${level === 'fast' ? 'shadow-sm text-indigo-600 font-bold' : 'text-slate-500'}`}
                  onClick={() => handleLevelChange('fast')}
                >
                  <Zap className="w-3 h-3 ml-1" />
                  سریع
                </Button>
                <Button
                  size="sm"
                  variant={level === 'standard' ? 'secondary' : 'ghost'}
                  className={`h-7 px-3 text-xs ${level === 'standard' ? 'shadow-sm text-indigo-600 font-bold' : 'text-slate-500'}`}
                  onClick={() => handleLevelChange('standard')}
                >
                  <Layers className="w-3 h-3 ml-1" />
                  استاندارد
                </Button>
                <Button
                  size="sm"
                  variant={level === 'deep' ? 'secondary' : 'ghost'}
                  className={`h-7 px-3 text-xs ${level === 'deep' ? 'shadow-sm text-indigo-600 font-bold' : 'text-slate-500'}`}
                  onClick={() => handleLevelChange('deep')}
                >
                  <FileText className="w-3 h-3 ml-1" />
                  عمیق
                </Button>
              </div>
            </div>

            <div>
              <SheetTitle className="text-2xl font-bold text-slate-900">
                {playbook.title}
              </SheetTitle>
              <SheetDescription className="text-slate-500 mt-2 text-sm leading-relaxed">
                {playbook.description}
              </SheetDescription>
            </div>

            <div className="flex gap-4 text-xs text-slate-500 mt-2">
              <div className="flex items-center gap-1">
                <span className="font-semibold text-slate-700">هزینه:</span>
                {content.costEstimate}
              </div>
              <div className="flex items-center gap-1">
                <span className="font-semibold text-slate-700">زمان:</span>
                {content.timeEstimate}
              </div>
            </div>
          </SheetHeader>
        </div>

        {/* Content Tabs */}
        <div className="flex-1 overflow-hidden flex flex-col" dir="rtl">
          <Tabs defaultValue="steps" className="flex-1 flex flex-col h-full">
            <div className="px-6 border-b bg-white dark:bg-slate-900">
              <TabsList className="w-full justify-start h-12 bg-transparent p-0 gap-6">
                <TabsTrigger
                  value="steps"
                  className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 px-0"
                >
                  مراحل اجرا
                </TabsTrigger>
                <TabsTrigger
                  value="options"
                  className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 px-0"
                >
                  گزینه‌ها
                </TabsTrigger>
                <TabsTrigger
                  value="mistakes"
                  className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 px-0"
                >
                  اشتباهات رایج
                </TabsTrigger>
                <TabsTrigger
                  value="templates"
                  className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 px-0"
                >
                  قالب‌ها
                </TabsTrigger>
                <TabsTrigger
                  value="dod"
                  className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 px-0"
                >
                  تحویل (DoD)
                </TabsTrigger>
              </TabsList>
            </div>

            <ScrollArea className="flex-1 bg-slate-50/50" dir="rtl">
              <div className="p-6 pb-24 space-y-6">
                {/* Steps Tab */}
                <TabsContent value="steps" className="space-y-4 m-0">
                  {content.steps.map((step, idx) => (
                    <div
                      key={step.id}
                      className="flex items-start gap-4 p-4 bg-white rounded-xl border border-slate-200 shadow-sm transition-all hover:bg-white/80"
                    >
                      <Checkbox
                        id={step.id}
                        checked={checkedSteps[step.id] || false}
                        onCheckedChange={() => toggleStep(step.id)}
                        className="mt-1"
                      />
                      <div className="space-y-1">
                        <Label
                          htmlFor={step.id}
                          className="text-base font-bold text-slate-800 cursor-pointer"
                        >
                          {idx + 1}. {step.title}
                        </Label>
                        <p className="text-sm text-slate-600 leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </TabsContent>

                {/* Options Tab */}
                <TabsContent value="options" className="space-y-4 m-0">
                  {content.options?.map((opt, idx) => (
                    <Card
                      key={idx}
                      className={`overflow-hidden ${opt.recommendation === 'recommended' ? 'border-indigo-500 ring-1 ring-indigo-500/20' : ''}`}
                    >
                      <CardHeader className="bg-slate-50/50 pb-3">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-base font-bold">{opt.title}</CardTitle>
                          {opt.recommendation === 'recommended' && (
                            <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200">
                              پیشنهاد کارنکس
                            </Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="pt-4 space-y-4">
                        <p className="text-sm text-slate-600">{opt.description}</p>
                        <div className="grid grid-cols-2 gap-4 text-xs">
                          <div>
                            <span className="font-bold text-green-600 block mb-2">مزایا:</span>
                            <ul className="list-disc list-inside space-y-1 text-slate-600">
                              {opt.pros.map((p, i) => (
                                <li key={i}>{p}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <span className="font-bold text-red-500 block mb-2">معایب:</span>
                            <ul className="list-disc list-inside space-y-1 text-slate-600">
                              {opt.cons.map((c, i) => (
                                <li key={i}>{c}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {!content.options?.length && (
                    <div className="text-center text-slate-400 py-10">
                      گزینه‌ای برای این بخش ثبت نشده است.
                    </div>
                  )}
                </TabsContent>

                {/* Mistakes Tab */}
                <TabsContent value="mistakes" className="space-y-4 m-0">
                  {content.mistakes?.map((mistake, idx) => (
                    <div
                      key={idx}
                      className="flex gap-4 p-4 rounded-xl border border-orange-200 bg-orange-50"
                    >
                      <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-orange-800 text-sm mb-1">{mistake.title}</h4>
                        <p className="text-sm text-orange-700 leading-relaxed">
                          {mistake.description}
                        </p>
                      </div>
                    </div>
                  ))}
                  {!content.mistakes?.length && (
                    <div className="text-center text-slate-400 py-10">مورد خاصی ثبت نشده است.</div>
                  )}
                </TabsContent>

                {/* Templates Tab */}
                <TabsContent value="templates" className="space-y-4 m-0">
                  {content.templates?.map((tmpl, idx) => (
                    <Card key={idx} className="overflow-hidden">
                      <CardHeader className="bg-slate-50/50 pb-3 flex flex-row items-center justify-between">
                        <CardTitle className="text-base font-bold">{tmpl.title}</CardTitle>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 gap-2"
                          onClick={() => copyTemplate(tmpl.content)}
                        >
                          <Copy className="w-3.5 h-3.5" />
                          کپی
                        </Button>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <pre
                          className="bg-slate-900 text-slate-50 p-4 rounded-lg text-xs overflow-x-auto"
                          dir="ltr"
                        >
                          <code>{tmpl.content}</code>
                        </pre>
                      </CardContent>
                    </Card>
                  ))}
                  {!content.templates?.length && (
                    <div className="text-center text-slate-400 py-10">
                      قالبی برای این بخش وجود ندارد.
                    </div>
                  )}
                </TabsContent>

                {/* DoD Tab */}
                <TabsContent value="dod" className="space-y-4 m-0">
                  <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
                    <h3 className="font-bold text-green-800 flex items-center gap-2 mb-4">
                      <CheckCircle2 className="w-5 h-5" />
                      شرط اتمام (Definition of Done)
                    </h3>
                    <ul className="space-y-3">
                      {content.definitionOfDone.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-sm text-green-800">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>
              </div>
            </ScrollArea>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
}
