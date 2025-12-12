'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Project {
  id: string;
  title: string;
}

interface ProjectSwitcherProps {
  projects: Project[];
}

export function ProjectSwitcher({ projects }: ProjectSwitcherProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentProjectId = searchParams.get('projectId');

  // Default to first project if none selected, or handle in parent.
  // We prefer to show placeholder or current selection.
  // If we have projects and no currentId, usually Layout/Page handles default,
  // but for UI we might want to show the one being viewed.

  const handleValueChange = (projectId: string) => {
    // preserve other params? usually just switch project
    const params = new URLSearchParams(searchParams.toString());
    params.set('projectId', projectId);
    router.push(`?${params.toString()}`);
  };

  if (projects.length === 0) return null;

  return (
    <div className="w-[200px]">
      <Select
        onValueChange={handleValueChange}
        defaultValue={currentProjectId || undefined}
        value={currentProjectId || undefined}
      >
        <SelectTrigger className="w-full h-9 bg-slate-50 border-slate-200">
          <SelectValue placeholder="انتخاب پروژه" />
        </SelectTrigger>
        <SelectContent>
          {projects.map((p) => (
            <SelectItem key={p.id} value={p.id} className="text-right" dir="rtl">
              {p.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
