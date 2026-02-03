"use client";

import { useAssetsByOwnerQuery } from "@/lib/query/useAssetsByOwnerQuery";
import { DEFAULT_PAGE_SIZE } from "@/lib/api/constants";
import { ArtGrid } from "@/components/nft/ArtGrid";

type AssetsByOwnerProps = {
  ownerAddress: string;
};

export function AssetsByOwner({ ownerAddress }: AssetsByOwnerProps) {
  const page = 1;
  const limit = DEFAULT_PAGE_SIZE;

  const query = useAssetsByOwnerQuery(ownerAddress, page, limit);

  return (
    <ArtGrid
      items={query.data?.items ?? []}
      isLoading={query.isLoading}
      isFetching={query.isFetching}
      isError={query.isError}
      error={query.error}
      hasData={Boolean(query.data)}
    />
  );
}
