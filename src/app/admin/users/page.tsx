import { getUsers } from '@/app/actions/admin';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';
import { AdminToggle } from '@/components/admin/AdminToggle';

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">مدیریت کاربران</h2>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Users className="h-5 w-5 text-blue-500" />
            لیست کاربران ثبت نام شده
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full text-sm text-right">
              <thead className="bg-muted/50 text-muted-foreground">
                <tr className="border-b">
                  <th className="p-3 font-medium">نام کاربر</th>
                  <th className="p-3 font-medium">ایمیل</th>
                  <th className="p-3 font-medium">تاریخ عضویت</th>
                  <th className="p-3 font-medium">نقش</th>
                  <th className="p-3 font-medium">عملیات</th>
                </tr>
              </thead>
              <tbody>
                {users?.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b last:border-0 hover:bg-muted/50 transition-colors"
                  >
                    <td className="p-3 font-medium">{user.full_name || 'بدون نام'}</td>
                    <td className="p-3 text-muted-foreground">{user.email}</td>
                    <td className="p-3 text-muted-foreground">
                      {new Date(user.created_at).toLocaleDateString('fa-IR')}
                    </td>
                    <td className="p-3">
                      {user.is_admin ? (
                        <Badge variant="default" className="bg-purple-600 hover:bg-purple-700">
                          مدیر سیستم
                        </Badge>
                      ) : (
                        <Badge variant="secondary">کاربر عادی</Badge>
                      )}
                    </td>
                    <td className="p-3">
                      <AdminToggle userId={user.id} initialStatus={user.is_admin} />
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
