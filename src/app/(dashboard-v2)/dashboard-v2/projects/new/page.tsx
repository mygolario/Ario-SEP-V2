'use client';

import { createProject } from '@/app/actions/projects';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useTransition } from 'react';

export default function NewProjectPage() {
  const [isPending, startTransition] = useTransition();

  const onSubmit = (formData: FormData) => {
    startTransition(() => {
      // Server action calling redirect, so no manual navigation needed usually
      // But we wrap in transition to show loading state
      createProject(formData);
    });
  };

  return (
    <div className="max-w-2xl mx-auto py-10">
      <div className="mb-6">
        <Link href="/dashboard-v2/projects">
          <Button variant="ghost" size="sm">
            <ArrowRight className="ml-2 h-4 w-4" />
            بازگشت به لیست
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>ایجاد پروژه جدید</CardTitle>
          <CardDescription>نام پروژه خود را وارد کنید تا ساختار اولیه ایجاد شود.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                عنوان پروژه
              </label>
              <Input
                id="title"
                name="title"
                placeholder="مثال: استارتاپ هوشمند..."
                required
                minLength={3}
              />
            </div>
            <div className="flex justify-end pt-4">
              <Button type="submit" disabled={isPending}>
                {isPending && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
                شروع ساخت پروژه
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
