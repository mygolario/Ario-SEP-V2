import { getAuditLogs } from '@/lib/admin';
import { AuditLogTable, type AuditLog } from '@/components/admin/AuditLogTable';
import { FileText } from 'lucide-react';

export default async function AuditLogsPage() {
  // TODO: Add pagination support
  const { data: logs } = await getAuditLogs(1, 100);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">لاگ‌های سیستم</h1>
        <p className="text-muted-foreground">مشاهده تمام فعالیت‌های ثبت شده در سیستم.</p>
      </div>

      <div className="rounded-md border p-4 bg-background">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="text-primary h-5 w-5" />
          <h2 className="text-lg font-semibold">آخرین فعالیت‌ها</h2>
        </div>
        <AuditLogTable logs={logs as unknown as AuditLog[]} />
      </div>
    </div>
  );
}
