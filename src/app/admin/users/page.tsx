import { getAllUsers } from '@/lib/admin';
import { UserTable, type Profile } from '@/components/admin/UserTable';
import { Users } from 'lucide-react';

export default async function UsersPage() {
  const { data: users } = await getAllUsers(1, 100);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">مدیریت کاربران</h1>
        <p className="text-muted-foreground">لیست تمام کاربران ثبت‌نام شده در سامانه.</p>
      </div>

      <div className="rounded-md border p-4 bg-background">
        <div className="flex items-center gap-2 mb-4">
          <Users className="text-primary h-5 w-5" />
          <h2 className="text-lg font-semibold">لیست کاربران</h2>
        </div>
        <UserTable users={users as unknown as Profile[]} />
      </div>
    </div>
  );
}
