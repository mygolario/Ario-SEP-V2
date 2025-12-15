import Link from 'next/link';
import { getProjects } from '@/app/actions/projects';
import { getRoadmap } from '@/app/actions/roadmap'; // We might need to call generate if empty?
import { RoadmapList } from '@/components/dashboard-v2/roadmap/RoadmapList';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Sparkles } from 'lucide-react';
import { GenerateButton } from '@/components/dashboard-v2/roadmap/GenerateButton'; // Client component for action

interface RoadmapItem {
  id: string;
  version: number;
  status: 'todo' | 'doing' | 'done' | 'archived';
  description?: string;
  title: string;
  priority: 'high' | 'medium' | 'low';
}

export default async function DashboardOverviewPage() {
  const projects = await getProjects();
  const recentProject = projects.length > 0 ? projects[0] : null;

  let roadmapItems: RoadmapItem[] = [];
  if (recentProject) {
    const data = await getRoadmap(recentProject.id);
    // Cast data to RoadmapItem[] (Supabase returns loose types usually)
    roadmapItems = (data || []) as unknown as RoadmapItem[];
  }

  // Filter for latest version only
  const maxVersion = roadmapItems.length > 0 ? Math.max(...roadmapItems.map((i) => i.version)) : 0;
  const activeItems = roadmapItems.filter((i) => i.version === maxVersion);

  // Tasks for "Next Best Action" - just take top 3 todo items
  const nextActions = activeItems.filter((i) => i.status !== 'done').slice(0, 3);
  const doneCount = activeItems.filter((i) => i.status === 'done').length;
  const totalCount = activeItems.length;
  const progress = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">پیشخوان</h1>
        <p className="text-muted-foreground">وضعیت کلی پروژه‌ها و اقدامات بعدی شما.</p>
      </div>

      {/* Main Content Area */}
      {!recentProject ? (
        // Empty State
        <Card className="border-dashed">
          <CardHeader className="text-center">
            <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-xl">به آریو خوش آمدید</CardTitle>
            <CardDescription>
              برای شروع مسیر کارآفرینی، اولین پروژه خود را ایجاد کنید.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center pb-8">
            <Link href="/dashboard-v2/projects/new">
              <Button size="lg">شروع پروژه جدید</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {/* Left Col: Next Actions */}
          <div className="space-y-6">
            <Card className="h-full border-primary/20 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-20 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  اقدامات پیشنهادی
                </CardTitle>
                <CardDescription>
                  برای پیشبرد پروژه
                  <span className="font-semibold text-foreground mx-1">
                    &quot;{recentProject.title}&quot;
                  </span>
                  این گام‌ها را بردارید.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {activeItems.length === 0 ? (
                  <div className="text-center py-8 space-y-4">
                    <p className="text-muted-foreground">
                      هنوز نقشه‌ی راهی برای این پروژه ساخته نشده است.
                    </p>
                    <GenerateButton projectId={recentProject.id} />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <RoadmapList items={nextActions} compact />
                    {nextActions.length === 0 && (
                      <p className="text-green-600 font-medium text-center py-4">
                        همه کارهای فعلی انجام شده‌اند! 🎉
                      </p>
                    )}
                    <div className="pt-2 flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">
                        پیشرفت نسخه {maxVersion}: %{progress}
                      </span>
                      <GenerateButton
                        projectId={recentProject.id}
                        label="بازسازی برنامه"
                        variant="ghost"
                        size="sm"
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Col: Stats / Quick Access */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>دسترسی سریع</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <Link
                  href={`/dashboard-v2/projects/${recentProject.id}`}
                  className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                >
                  <span className="font-medium">ویرایش جزئیات پروژه</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </Link>
                <Link
                  href="/dashboard-v2/projects"
                  className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                >
                  <span className="font-medium">مدیریت همه پروژه‌ها</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
