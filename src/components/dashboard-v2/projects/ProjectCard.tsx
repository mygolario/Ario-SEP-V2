import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    updated_at: string;
    inputs: Record<string, unknown>;
    status?: string;
  };
}

export function ProjectCard({ project }: ProjectCardProps) {
  // Simple completeness check
  const inputs = project.inputs || {};
  const filledKeys = Object.keys(inputs).filter(
    (k) => typeof inputs[k] === 'string' && (inputs[k] as string).length > 0
  ).length;
  // Assuming ~6 key fields for now
  const progress = Math.min(100, Math.round((filledKeys / 6) * 100));

  return (
    <Card className="hover:shadow-md transition-shadow group relative overflow-hidden">
      <Link href={`/dashboard-v2/projects/${project.id}`} className="absolute inset-0 z-10">
        <span className="sr-only">مشاهده پروژه</span>
      </Link>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg line-clamp-1">{project.title}</CardTitle>
          {project.status && <Badge variant="secondary">{project.status}</Badge>}
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground line-clamp-2 h-10">
          {(inputs.description as string) || 'بدون توضیحات'}
        </p>
        <div className="mt-4 h-1.5 w-full rounded-full bg-secondary">
          <div className="h-full rounded-full bg-green-500" style={{ width: `${progress}%` }} />
        </div>
        <div className="mt-1 flex justify-between text-xs text-muted-foreground">
          <span>پیشرفت اطلاعات</span>
          <span>{progress}%</span>
        </div>
      </CardContent>
      <CardFooter className="pt-2 text-xs text-muted-foreground flex items-center gap-1">
        <Clock className="h-3 w-3" />
        <span>به‌روزرسانی: {new Date(project.updated_at).toLocaleDateString('fa-IR')}</span>
      </CardFooter>
    </Card>
  );
}
