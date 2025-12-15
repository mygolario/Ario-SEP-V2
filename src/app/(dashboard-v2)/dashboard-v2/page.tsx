export default function DashboardV2Page() {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight">خوش آمدید</h3>
        <p className="text-sm text-muted-foreground mt-2">
          به نسخه جدید داشبورد خوش آمدید. این نسخه در حال توسعه است.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
          <div className="text-sm font-medium">پروژه‌های فعال</div>
          <div className="text-2xl font-bold">12</div>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
          <div className="text-sm font-medium">وظایف انجام شده</div>
          <div className="text-2xl font-bold">24</div>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
          <div className="text-sm font-medium">پیام‌های جدید</div>
          <div className="text-2xl font-bold">+573</div>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
          <div className="text-sm font-medium">بازدیدها</div>
          <div className="text-2xl font-bold">89</div>
        </div>
      </div>
    </div>
  );
}
