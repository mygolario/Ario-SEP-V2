import Link from 'next/link';
import { getProjects } from '@/app/actions/projects';
import { ProjectCard } from '@/components/dashboard-v2/projects/ProjectCard';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">پروژه‌های من</h1>
        <Link href="/dashboard-v2/projects/new">
          <Button>
            <Plus className="ml-2 h-4 w-4" />
            پروژه جدید
          </Button>
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
          <div className="rounded-full bg-muted p-4 mb-4">
            <Plus className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold">هیچ پروژه‌ای یافت نشد</h3>
          <p className="text-muted-foreground mt-2 mb-6">اولین پروژه خود را بسازید و شروع کنید.</p>
          <Link href="/dashboard-v2/projects/new">
            <Button>ایجاد اولین پروژه</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map(
            (project: {
              id: string;
              title: string;
              updated_at: string;
              inputs: Record<string, unknown>;
              status?: string;
            }) => (
              <ProjectCard key={project.id} project={project} />
            )
          )}
        </div>
      )}
    </div>
  );
}
