import { getLatestArtifact } from '@/app/actions/artifacts';
import { BMCGrid } from '@/components/dashboard-v2/bmc/BMCGrid';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

interface PageProps {
  params: { id: string };
}

export default async function BMCPage({ params }: PageProps) {
  const artifact = await getLatestArtifact(params.id, 'bmc');

  // We strictly should verify project exists and belongs to user too, handled by getLatestArtifact internal policy checks essentially?
  // Actually getLatestArtifact uses RLS, so if it returns data, we are good. If null, it stands.
  // But we might want to check if project simply exists first to differentiate 404 vs empty.

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-muted-foreground text-sm">
        <Link
          href={`/dashboard-v2/projects/${params.id}`}
          className="hover:text-primary transition-colors"
        >
          بازگشت به پروژه
        </Link>
        <ChevronLeft className="h-4 w-4" />
        <span className="text-foreground font-medium">بوم مدل کسب‌وکار</span>
      </div>

      <div>
        <h1 className="text-2xl font-bold tracking-tight mb-2">بوم مدل کسب‌وکار (BMC)</h1>
        <p className="text-muted-foreground">
          نه بخش اصلی کسب‌وکار خود را در این بوم تعاملی طراحی و مدیریت کنید.
        </p>
      </div>

      <BMCGrid
        projectId={params.id}
        initialData={artifact ? (artifact.data as Record<string, string>) : {}}
        version={artifact?.version}
        artifactId={artifact?.id}
        shareToken={artifact?.share_token}
      />
    </div>
  );
}
