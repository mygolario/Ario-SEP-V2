import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, FileText, ArrowRight } from 'lucide-react';

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">پیشخوان مدیریت</h1>
        <p className="text-muted-foreground">مدیریت کاربران و نظارت بر سیستم.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">کاربران</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">مدیریت</div>
            <p className="text-xs text-muted-foreground">مشاهده و مدیریت کاربران سیستم</p>
            <div className="mt-4">
              <Link href="/admin/users">
                <Button variant="outline" size="sm" className="w-full">
                  مشاهده لیست کاربران
                  <ArrowRight className="h-3 w-3 mr-2" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">لاگ‌های سیستم</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">بازرسی</div>
            <p className="text-xs text-muted-foreground">مشاهده فعالیت‌های حساس سیستم</p>
            <div className="mt-4">
              <Link href="/admin/audit">
                <Button variant="outline" size="sm" className="w-full">
                  مشاهده لاگ‌ها
                  <ArrowRight className="h-3 w-3 mr-2" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
