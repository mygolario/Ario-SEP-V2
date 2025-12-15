'use client';

import { BMCGrid } from '@/components/dashboard-v2/bmc/BMCGrid';
import { MarketAnalysisView } from '@/components/dashboard-v2/market/MarketAnalysisView';
import { ExportButtons } from '@/components/dashboard-v2/share/ExportButtons';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRef } from 'react';
import { MarketAnalysis } from '@/app/actions/market';

interface ArtifactData {
  type: string;
  data: unknown;
  version: number;
  created_at: string;
  project_title: string;
}

export default function ClientPage({ artifact }: { artifact: ArtifactData }) {
  const printRef = useRef<HTMLDivElement>(null);

  const renderContent = () => {
    switch (artifact.type) {
      case 'bmc':
        return (
          <BMCGrid
            projectId={''}
            initialData={artifact.data as Record<string, string>}
            version={artifact.version}
            readOnly
          />
        );
      case 'market_analysis':
        return <MarketAnalysisView analysis={artifact.data as MarketAnalysis} />;
      case 'expert_plan':
        return (
          <div className="space-y-6">
            {Object.entries(artifact.data as Record<string, string>).map(([key, value]) => (
              <Card key={key} className="break-inside-avoid">
                <CardHeader>
                  <CardTitle className="capitalize text-lg border-b pb-2 mb-2">
                    {key.replace(/_/g, ' ')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="whitespace-pre-wrap leading-relaxed">{value}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        );
      default:
        return <div>نوع محتوا پشتیبانی نمی‌شود.</div>;
    }
  };

  return (
    <>
      <ExportButtons contentRef={printRef} />
      <div
        className="mt-8 bg-white dark:bg-slate-950 p-8 rounded-xl shadow-sm border min-h-[50vh]"
        ref={printRef}
      >
        <div className="mb-6 border-b pb-4">
          <h1 className="text-2xl font-bold mb-2">
            {artifact.type === 'bmc' && 'بوم مدل کسب‌وکار (BMC)'}
            {artifact.type === 'market_analysis' && 'تحلیل بازار و رقبا'}
            {artifact.type === 'expert_plan' && 'بیزنس پلن جامع'}
          </h1>
          <p className="text-sm text-muted-foreground">
            نسخه: {artifact.version} | ایجاد شده در:{' '}
            {new Date(artifact.created_at).toLocaleDateString('fa-IR')}
          </p>
        </div>

        {renderContent()}
      </div>
    </>
  );
}
