"use client";

import { ArtGrid } from "@/src/components/nft/ArtGrid";
import { useAssetsByOwnerInfiniteQuery } from "@/src/lib/query/useAssetsByOwnerQuery";
import { useCallback } from "react";

type AssetsByOwnerProps = {
  ownerAddress: string;
};

export function AssetsByOwner({ ownerAddress }: AssetsByOwnerProps) {
  const QUERY_LIMIT = 12;

  // Use dynamic query limit based on grid size
  const query = useAssetsByOwnerInfiniteQuery(ownerAddress, QUERY_LIMIT);
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
    <div suppressHydrationWarning>
      <ArtGrid
        items={items}
        isLoading={query.isLoading}
        isFetchingNextPage={query.isFetchingNextPage}
        hasNextPage={query.hasNextPage}
        isError={query.isError}
        error={query.error}
        hasData={hasData}
        onLoadMore={loadMore}
      />
    </div>
  );
}
