'use client';

import { useState } from 'react';
import { ProjectList } from './ProjectList';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface ProjectManagerProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  projects: any[];
}

export function ProjectManager({ projects }: ProjectManagerProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProjects = projects.filter(project => {
    const name = project.business_data?.businessName || '';
    return name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="space-y-6 max-w-4xl">
       <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <Input 
            placeholder="جستجو در پروژه‌ها..." 
            className="pl-4 pr-10 h-11 bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
       </div>
       
       <ProjectList projects={filteredProjects} />
    </div>
  );
}
