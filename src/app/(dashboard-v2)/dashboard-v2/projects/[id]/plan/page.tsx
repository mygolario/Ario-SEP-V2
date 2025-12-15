import { isProUser } from '@/lib/subscription';
import { ExpertPlanPageClient } from '@/components/dashboard-v2/plan/ExpertPlanPageClient';
import { getLatestArtifact } from '@/app/actions/artifacts';

interface PageProps {
  params: { id: string };
}

export default async function ExpertPlanPage({ params }: PageProps) {
  const isPro = await isProUser();
  const artifact = await getLatestArtifact(params.id, 'expert_plan');

  return (
    <ExpertPlanPageClient
      projectId={params.id}
      isPro={isPro}
      initialData={artifact?.data as Record<string, string>}
      version={artifact?.version}
      artifactId={artifact?.id}
      shareToken={artifact?.share_token}
    />
  );
}
