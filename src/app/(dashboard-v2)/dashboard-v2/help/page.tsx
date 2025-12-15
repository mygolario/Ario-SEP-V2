export default function HelpPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">راهنما و پشتیبانی</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <h3 className="font-semibold mb-2">مستندات</h3>
          <p className="text-sm text-muted-foreground">
            برای یادگیری نحوه استفاده از پلتفرم، مستندات ما را مطالعه کنید.
          </p>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <h3 className="font-semibold mb-2">تماس با ما</h3>
          <p className="text-sm text-muted-foreground">
            در صورت بروز مشکل با تیم پشتیبانی تماس بگیرید.
          </p>
        </div>
      </div>
    </div>
  );
}
