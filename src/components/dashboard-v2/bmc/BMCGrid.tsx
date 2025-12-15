'use client';

import { saveArtifact } from '@/app/actions/artifacts';
import { ShareDialog } from '@/components/dashboard-v2/share/ShareDialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/components/ui/toast';
import { tourSteps } from '@/components/dashboard-v2/help/tourSteps'; // We will create this
import { TourButton, useTour } from '@/components/dashboard-v2/help/TourGuide';
import { Info, Loader2, Save } from 'lucide-react';
import { useState } from 'react';

// BMC Data Structure: 9 Blocks
const BMC_BLOCKS = [
  {
    key: 'partners',
    title: 'شرکای کلیدی',
    description: 'چه کسانی به شما کمک می‌کنند؟ تامین‌کنندگان، شرکا...',
    gridArea: 'partners',
  },
  {
    key: 'activities',
    title: 'فعالیت‌های کلیدی',
    description: 'چه کارهایی باید انجام دهید؟ تولید، فروش، پلتفرم...',
    gridArea: 'activities',
  },
  {
    key: 'resources',
    title: 'منابع کلیدی',
    description: 'چه دارایی‌هایی نیاز دارید؟ انسانی، مالی، فکری...',
    gridArea: 'resources',
  },
  {
    key: 'propositions',
    title: 'ارزش‌های پیشنهادی',
    description: 'چه مشکلی را حل می‌کنید؟ چرا مشتری شما را انتخاب می‌کند؟',
    gridArea: 'propositions',
  },
  {
    key: 'relationships',
    title: 'ارتباط با مشتری',
    description: 'چگونه مشتری را جذب و حفظ می‌کنید؟',
    gridArea: 'relationships',
  },
  {
    key: 'channels',
    title: 'کانال‌ها',
    description: 'چگونه محصول را به مشتری می‌رسانید؟ فروشگاه، وبسایت...',
    gridArea: 'channels',
  },
  {
    key: 'segments',
    title: 'بخش‌بندی مشتریان',
    description: 'مشتریان شما چه کسانی هستند؟ هدف اصلی کیست؟',
    gridArea: 'segments',
  },
  {
    key: 'cost',
    title: 'ساختار هزینه‌ها',
    description: 'مهم‌ترین هزینه‌های کسب‌وکار چیست؟ ثابت، متغیر...',
    gridArea: 'cost',
  },
  {
    key: 'revenue',
    title: 'جریان‌های درآمدی',
    description: 'چگونه پول درمی‌آورید؟ فروش، اشتراک، تبلیغات...',
    gridArea: 'revenue',
  },
];

interface BMCGridProps {
  projectId: string;
  initialData?: Record<string, string>;
  version?: number;
  readOnly?: boolean;
  artifactId?: string;
  shareToken?: string;
}

export function BMCGrid({
  projectId,
  initialData = {},
  version,
  readOnly = false,
  artifactId,
  shareToken,
}: BMCGridProps) {
  const { toast } = useToast();
  const [data, setData] = useState<Record<string, string>>(initialData);
  const [saving, setSaving] = useState(false);
  const [currentVersion, setCurrentVersion] = useState(version || 1);
  const [currentShareToken, setCurrentShareToken] = useState<string | null>(shareToken || null);

  const { startTour } = useTour({
    steps: tourSteps.bmc,
    tourId: 'bmc-tour-v1',
  });

  const handleChange = (key: string, value: string) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await saveArtifact(projectId, 'bmc', data);
      setCurrentVersion(res.version);
      toast(`نسخه ${res.version} با موفقیت ذخیره شد`, 'success');
    } catch {
      toast('خطا در ذخیره‌سازی', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <div
        className="flex items-center justify-between bg-muted/30 p-4 rounded-lg border"
        id="bmc-header"
      >
        <div className="flex items-center gap-4">
          {!readOnly && (
            <>
              <ShareDialog
                artifactId={artifactId || null}
                currentShareToken={currentShareToken}
                onUpdate={setCurrentShareToken}
              />
              <TourButton onClick={startTour} />
            </>
          )}
          <span className="text-sm font-medium">نسخه فعلی: {currentVersion}</span>
        </div>
        {!readOnly && (
          <Button onClick={handleSave} disabled={saving}>
            {saving ? (
              <Loader2 className="ml-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="ml-2 h-4 w-4" />
            )}
            ذخیره تغییرات
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:grid-rows-3 min-h-[800px]">
        {BMC_BLOCKS.map((block) => {
          let className =
            'border p-4 h-full flex flex-col gap-2 bg-background shadow-sm hover:shadow-md transition-shadow';

          // Layout Logic
          if (block.key === 'partners') className += ' lg:col-span-1 lg:row-span-2';
          if (block.key === 'activities') className += ' lg:col-span-1 lg:row-span-1';
          if (block.key === 'resources') className += ' lg:col-span-1 lg:row-span-1';
          if (block.key === 'propositions') className += ' lg:col-span-1 lg:row-span-2';
          if (block.key === 'relationships') className += ' lg:col-span-1 lg:row-span-1';
          if (block.key === 'channels') className += ' lg:col-span-1 lg:row-span-1';
          if (block.key === 'segments') className += ' lg:col-span-1 lg:row-span-2';
          if (block.key === 'cost') className += ' lg:col-span-2 lg:row-span-1';
          if (block.key === 'revenue') className += ' lg:col-span-3 lg:row-span-1';

          // Correction for bottom row
          if (block.key === 'cost')
            className =
              'border p-4 h-full flex flex-col gap-2 bg-background shadow-sm lg:col-span-2 lg:row-span-1';
          if (block.key === 'revenue')
            className =
              'border p-4 h-full flex flex-col gap-2 bg-background shadow-sm lg:col-span-3 lg:row-span-1';

          return (
            <Card key={block.key} className={className} id={`bmc-block-${block.key}`}>
              <CardHeader className="p-0 pb-2 space-y-0 relative">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-bold">{block.title}</CardTitle>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-3 w-3 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs text-xs">{block.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </CardHeader>
              <CardContent className="p-0 flex-1">
                <Textarea
                  className="h-full min-h-[100px] resize-none border-0 focus-visible:ring-0 p-0 text-sm leading-relaxed"
                  placeholder={readOnly ? '' : 'اینجا بنویسید...'}
                  value={data[block.key] || ''}
                  onChange={(e) => handleChange(block.key, e.target.value)}
                  readOnly={readOnly}
                />
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
