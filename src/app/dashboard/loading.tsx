import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SkeletonBlock = ({ className }: { className?: string }) => (
  <div
    className={`animate-pulse rounded-md bg-slate-200/70 dark:bg-slate-800/70 ${className ?? ''}`}
  />
);

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 md:p-12" dir="rtl">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="space-y-2">
            <SkeletonBlock className="h-4 w-40" />
            <SkeletonBlock className="h-3 w-56" />
          </div>
          <div className="flex gap-3">
            <SkeletonBlock className="h-10 w-24 rounded-full" />
            <SkeletonBlock className="h-10 w-28 rounded-full" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex flex-col gap-3">
                <SkeletonBlock className="h-8 w-64" />
                <SkeletonBlock className="h-4 w-48" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <SkeletonBlock className="h-3 w-full" />
              <SkeletonBlock className="h-3 w-4/5" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <SkeletonBlock className="h-4 w-32" />
            </CardHeader>
            <CardContent className="flex gap-3">
              {Array.from({ length: 4 }).map((_, idx) => (
                <SkeletonBlock key={idx} className="h-10 w-10 rounded-full" />
              ))}
            </CardContent>
          </Card>

          <Card className="md:col-span-1">
            <CardHeader>
              <SkeletonBlock className="h-4 w-40" />
            </CardHeader>
            <CardContent className="space-y-2">
              {Array.from({ length: 5 }).map((_, idx) => (
                <SkeletonBlock key={idx} className="h-3 w-full" />
              ))}
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <SkeletonBlock className="h-4 w-48" />
            </CardHeader>
            <CardContent className="space-y-2">
              <SkeletonBlock className="h-10 w-full rounded-lg" />
              <SkeletonBlock className="h-3 w-2/3" />
            </CardContent>
          </Card>

          <Card className="md:col-span-3">
            <CardHeader className="flex justify-between">
              <SkeletonBlock className="h-5 w-40" />
              <SkeletonBlock className="h-5 w-20" />
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, idx) => (
                <SkeletonBlock key={idx} className="h-32 w-full rounded-xl" />
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
