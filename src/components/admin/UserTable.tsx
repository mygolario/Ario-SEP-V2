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

export interface Profile {
  id: string;
  email: string | null;
  full_name: string | null;
  is_admin: boolean | null;
  created_at: string | null;
}

interface UserTableProps {
  users: Profile[];
}

export function UserTable({ users }: UserTableProps) {
  return (
    <div className="rounded-md border bg-card text-card-foreground shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>نام کامل</TableHead>
            <TableHead>ایمیل</TableHead>
            <TableHead>نقش</TableHead>
            <TableHead>تاریخ عضویت</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.full_name || 'نامشخص'}</TableCell>
              <TableCell>{user.email || '-'}</TableCell>
              <TableCell>
                {user.is_admin ? (
                  <Badge variant="default" className="bg-primary/80">
                    مدیر سیستم
                  </Badge>
                ) : (
                  <Badge variant="secondary">کاربر عادی</Badge>
                )}
              </TableCell>
              <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                <span dir="ltr">
                  {user.created_at
                    ? formatDistanceToNow(new Date(user.created_at), { addSuffix: true })
                    : '-'}
                </span>
              </TableCell>
            </TableRow>
          ))}
          {users.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="h-24 text-center">
                کاربری یافت نشد.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
