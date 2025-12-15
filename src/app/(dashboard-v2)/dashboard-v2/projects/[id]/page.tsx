import { getProject } from '@/app/actions/projects';
import { ProjectWizard } from '@/components/dashboard-v2/projects/ProjectWizard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function ProjectDetailPage({ params }: { params: { id: string } }) {
  const project = await getProject(params.id);

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 border-b pb-4">
        <Link href="/dashboard-v2/projects">
          <Button variant="ghost" size="icon">
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-xl font-bold">{project.title}</h1>
          <p className="text-xs text-muted-foreground">شناسه: {project.id}</p>
        </div>
      </div>

      <ProjectWizard project={project} />
    </div>
  );
}
