"use client";

import { useAssetsByOwnerQuery } from "@/lib/query/useAssetsByOwnerQuery";
import { DEFAULT_PAGE_SIZE } from "@/lib/api/constants";
import { HeliusAsset } from "@/types/api/assets";
import { Grid } from "@/components/nft/Grid";
import { NftCard } from "@/components/nft/NftCard";
import { LoadCard } from "@/components/nft/LoadCard";

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

type ArtGridProps = {
  items: HeliusAsset[] | undefined;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  error: unknown;
  hasData: boolean;
};

export function ArtGrid({
  items,
  isLoading,
  isFetching,
  // isError,
  // error,
  // hasData,
}: ArtGridProps) {
  // 1) first load
  if (isLoading || isFetching) {
    return (
      <Grid>
        {Array.from({ length: DEFAULT_PAGE_SIZE }).map((_, i) => (
          <LoadCard key={i} />
        ))}
      </Grid>
    );
  }
  // 2) error with no data
  if (!items) return null;
  // 3) success (or error with stale data)
  return (
    <Grid>
      {items.map((item, i) => (
        <NftCard
          key={i}
          src={item?.content?.links?.image}
          name={item?.content?.metadata?.name}
          description={item?.content?.metadata?.description}
        />
      ))}
    </Grid>
  );
}
