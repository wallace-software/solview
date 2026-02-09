"use client";

import { useAssetsByOwnerQuery } from "@/src/lib/query/useAssetsByOwnerQuery";
import { DEFAULT_PAGE_SIZE } from "@/src/lib/api/constants";
import { ArtGrid } from "@/src/components/nft/ArtGrid";

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
