"use client";

import { useAssetsByOwnerQuery } from "@/lib/query/useAssetsByOwnerQuery";
import { OWNER_ASSETS_LIMIT } from "@/lib/api/constants";

type AssetsByOwnerProps = {
  ownerAddress: string;
};

export function AssetsByOwner({ ownerAddress }: AssetsByOwnerProps) {
  const page = 1;
  const limit = OWNER_ASSETS_LIMIT;

  const { data, isLoading, isError, error } = useAssetsByOwnerQuery(
    ownerAddress,
    page,
    limit,
  );

  console.log(data);

  // Render state explicitly
  if (!ownerAddress) return <div> Enter a wallet address</div>;
  if (isLoading) return <div>Loading assets...</div>;
  if (isError) return <div>Error: {(error as Error).message}</div>;

  return <pre className="text-sm">{}</pre>;
}
