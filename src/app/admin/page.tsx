import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Users, FileText, Activity } from 'lucide-react';
import { getAuditLogs, getUsers } from '@/app/actions/admin';

export default async function AdminDashboard() {
  const users = await getUsers();
  const logs = await getAuditLogs();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">پیشخوان مدیریت</h1>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">کل کاربران</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users?.length || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              فعالیت‌های ثبت شده
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{logs?.length || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">وضعیت سرور</CardTitle>
            <Activity className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">پایدار</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
