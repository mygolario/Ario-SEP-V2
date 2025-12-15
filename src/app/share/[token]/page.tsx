import { getSharedArtifact } from '@/app/actions/artifacts';
import { notFound } from 'next/navigation';
import SharedClientPage from './SharedClientPage';

interface Props {
  params: {
    token: string;
  };
}

export default async function SharedArtifactPage({ params }: Props) {
  const artifact = await getSharedArtifact(params.token);

  if (!artifact) {
    return notFound();
  }

  // We move the client-side logic to a wrapper client component
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-4 md:p-8 font-vazir">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Logo - assuming we have one, or just text */}
            <div className="font-bold text-2xl text-primary">Ario SEP</div>
            <div className="h-6 w-px bg-slate-300 mx-2" />
            <div className="text-sm text-muted-foreground">
              اشتراک‌گذاری شده از پروژه:{' '}
              <span className="font-medium text-foreground">{artifact.project_title}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Client Side Wrapper for Buttons which need refs */}
            {/* We just render the client page which handles content + export buttons */}
          </div>
        </div>

        <SharedClientPage artifact={artifact} />
      </div>
    </div>
  );
}
