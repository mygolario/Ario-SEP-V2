'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns-jalali';

export interface AuditLog {
  id: string;
  action: string;
  details: Record<string, unknown> | null;
  ip_address: string;
  created_at: string;
  profiles?: {
    full_name: string;
    email: string;
  } | null;
}

interface AuditLogTableProps {
  logs: AuditLog[];
}

export function AuditLogTable({ logs }: AuditLogTableProps) {
  return (
    <div className="rounded-md border bg-card text-card-foreground shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>کاربر</TableHead>
            <TableHead>اقدام</TableHead>
            <TableHead>جزئیات</TableHead>
            <TableHead>IP</TableHead>
            <TableHead>زمان</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.map((log) => (
            <TableRow key={log.id}>
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-medium">{log.profiles?.full_name || 'کاربر ناشناس'}</span>
                  <span className="text-xs text-muted-foreground">
                    {log.profiles?.email || '-'}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline">{log.action}</Badge>
              </TableCell>
              <TableCell className="max-w-xs truncate" title={JSON.stringify(log.details, null, 2)}>
                <span className="font-mono text-xs text-muted-foreground">
                  {JSON.stringify(log.details)}
                </span>
              </TableCell>
              <TableCell>
                <span className="font-mono text-xs">{log.ip_address || '-'}</span>
              </TableCell>
              <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                <span dir="ltr">
                  {formatDistanceToNow(new Date(log.created_at), { addSuffix: true })}
                </span>
              </TableCell>
            </TableRow>
          ))}
          {logs.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                موردی یافت نشد.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
