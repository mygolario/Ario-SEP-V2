'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DashboardPage() {
  const [data, setData] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem('businessData');
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-8" dir="rtl">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-50">
          داشبورد مدیریتی شما
        </h1>
        
        {!data ? (
           <p className="text-slate-500">در حال بارگذاری اطلاعات...</p>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>اطلاعات خام (Raw JSON)</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-auto max-h-[500px] text-left" dir="ltr">
                {JSON.stringify(data, null, 2)}
              </pre>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
