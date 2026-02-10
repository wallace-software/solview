"use client";

import { ArtGrid } from "@/src/components/nft/ArtGrid";
import { useAssetsByOwnerInfiniteQuery } from "@/src/lib/query/useAssetsByOwnerQuery";
import { useResponsiveGridSize } from "@/src/hooks/useResponsiveGridSize";
import { useCallback } from "react";

type AssetsByOwnerProps = {
  ownerAddress: string;
};

export function AssetsByOwner({ ownerAddress }: AssetsByOwnerProps) {
  const { gridSize } = useResponsiveGridSize({ rows: 3 });
  // Use dynamic query limit based on grid size
  const query = useAssetsByOwnerInfiniteQuery(ownerAddress, gridSize);
  const { hasNextPage, isFetchingNextPage, fetchNextPage } = query;

  // Infinite query returns pages that need to be flattened
  const items = query.data?.pages.flatMap((p) => p.items) ?? [];
  const hasData = items.length > 0;

  // Used to fetch more data on scroll
  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <ArtGrid
      items={items}
      isLoading={query.isLoading}
      isFetchingNextPage={query.isFetchingNextPage}
      hasNextPage={query.hasNextPage}
      isError={query.isError}
      error={query.error}
      hasData={hasData}
      gridSize={gridSize}
      onLoadMore={loadMore}
    />
  );
}
