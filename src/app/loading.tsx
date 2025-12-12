export default function Loading() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-4 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100"
      dir="rtl"
    >
      <div
        className="h-12 w-12 rounded-full border-4 border-primary/30 border-t-primary animate-spin"
        aria-label="در حال بارگذاری"
      />
      <div className="text-sm font-medium text-slate-500 dark:text-slate-400">
        در حال آماده‌سازی صفحه...
      </div>
    </div>
  );
}
