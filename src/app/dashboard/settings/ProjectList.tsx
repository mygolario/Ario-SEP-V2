'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Trash2, FolderOpen, Calendar } from 'lucide-react';
import Link from 'next/link';
import { deleteProject } from './actions';
import { useTransition } from 'react';

type Project = {
    id: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    business_data: any;
    created_at: string;
};

export function ProjectList({ projects }: { projects: Project[] }) {
    return (
        <div className="space-y-4">
            {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
            ))}
            {projects.length === 0 && (
                <div className="text-center py-12 text-slate-500 bg-slate-50 rounded-lg border border-dashed border-slate-200">
                    هنوز پروژه‌ای ندارید.
                </div>
            )}
        </div>
    );
}

function ProjectCard({ project }: { project: Project }) {
    const [isPending, startTransition] = useTransition();

    const handleDelete = () => {
        if (confirm('آیا از حذف این پروژه اطمینان دارید؟ این عملیات غیرقابل بازگشت است.')) {
            startTransition(async () => {
                await deleteProject(project.id);
            });
        }
    };

    const businessName = project.business_data?.businessName || 'پروژه بدون نام';
    const createdAt = new Date(project.created_at).toLocaleDateString('fa-IR');

    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-500">
                        {project.business_data?.logoSVG ? (
                            <div className="w-8 h-8" dangerouslySetInnerHTML={{ __html: project.business_data.logoSVG }} />
                        ) : (
                            <FolderOpen className="h-6 w-6" />
                        )}
                    </div>
                    <div>
                        <Link href={`/dashboard?projectId=${project.id}`} className="font-bold text-slate-800 hover:text-indigo-600 transition-colors">
                            {businessName}
                        </Link>
                        <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                            <Calendar className="h-3 w-3" />
                            <span>{createdAt}</span>
                        </div>
                    </div>
                </div>
                <div>
                     <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={handleDelete} 
                        disabled={isPending}
                        className="text-slate-400 hover:text-rose-500 hover:bg-rose-50"
                     >
                        <Trash2 className="h-5 w-5" />
                     </Button>
                </div>
            </CardContent>
        </Card>
    );
}
