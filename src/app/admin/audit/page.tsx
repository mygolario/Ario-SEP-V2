import { getAuditLogs } from '@/app/actions/admin';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldAlert } from 'lucide-react';

export default async function AuditPage() {
  const logs = await getAuditLogs();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">لاگ سیستم (Audit Logs)</h2>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <ShieldAlert className="h-5 w-5 text-amber-500" />
            آخرین رویدادهای امنیتی و سیستمی
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full text-sm text-right">
              <thead className="bg-muted/50 text-muted-foreground">
                <tr className="border-b">
                  <th className="p-3 font-medium">زمان</th>
                  <th className="p-3 font-medium">کاربر</th>
                  <th className="p-3 font-medium">عملیات (Action)</th>
                  <th className="p-3 font-medium">آی‌پی</th>
                  <th className="p-3 font-medium">جزئیات</th>
                </tr>
              </thead>
              <tbody>
                {logs?.map((log) => (
                  <tr
                    key={log.id}
                    className="border-b last:border-0 hover:bg-muted/50 transition-colors"
                  >
                    <td className="p-3 font-mono text-xs text-muted-foreground">
                      {new Date(log.created_at).toLocaleString('fa-IR')}
                    </td>
                    <td className="p-3">
                      <div className="flex flex-col">
                        <span className="font-medium">{log.profiles?.full_name || 'Unknown'}</span>
                        <span className="text-xs text-muted-foreground">{log.profiles?.email}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                        {log.action}
                      </span>
                    </td>
                    <td className="p-3 font-mono text-xs text-muted-foreground text-left">
                      {log.ip_address}
                    </td>
                    <td className="p-3 max-w-[300px] truncate" title={JSON.stringify(log.details)}>
                      {JSON.stringify(log.details)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
