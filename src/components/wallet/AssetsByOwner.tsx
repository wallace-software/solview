"use client";

import { DEFAULT_PAGE_SIZE } from "@/src/lib/api/constants";
import { ArtGrid } from "@/src/components/nft/ArtGrid";
import { useAssetsByOwnerInfiniteQuery } from "@/src/lib/query/useAssetsByOwnerQuery";

type AssetsByOwnerProps = {
  ownerAddress: string;
};

export function AssetsByOwner({ ownerAddress }: AssetsByOwnerProps) {
  const limit = DEFAULT_PAGE_SIZE;

  const query = useAssetsByOwnerInfiniteQuery(ownerAddress, limit);

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
