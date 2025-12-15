import MarketClientPage from '@/components/dashboard-v2/market/MarketClientPage';
import { getLatestArtifact } from '@/app/actions/artifacts';
import { MarketReport } from '@/app/actions/market';

interface PageProps {
  params: { id: string };
}

export default async function MarketPage({ params }: PageProps) {
  const artifact = await getLatestArtifact(params.id, 'market_competitors');

  return (
    <MarketClientPage
      params={params}
      initialData={artifact?.data as unknown as MarketReport}
      version={artifact?.version}
      artifactId={artifact?.id}
      shareToken={artifact?.share_token}
    />
  );
}
