"use client";

import { useAssetsByOwnerQuery } from "@/lib/query/useAssetsByOwnerQuery";

type AssetsByOwnerProps = {
  ownerAddress: string;
};

export function AssetsByOwner({ ownerAddress }: AssetsByOwnerProps) {
  const page = 1;
  const limit = 100;

  const { data, isLoading, isError, error } = useAssetsByOwnerQuery(
    ownerAddress,
    page,
    limit,
  );

  // Render state explicitly
  if (!ownerAddress) return <div> Enter a wallet address</div>;
  if (isLoading) return <div>Loading assets...</div>;
  if (isError) return <div>Error: {(error as Error).message}</div>;

  return <pre className="text-sm">{JSON.stringify(data, null, 2)}</pre>;
}
