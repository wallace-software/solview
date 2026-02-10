"use client";

import { HeliusAsset } from "@/src/types/api/assets";
import { GridWrapper } from "@/src/components/nft/GridWrapper";
import { ArtTile } from "@/src/components/nft/ArtTile";
import { LoadCard } from "@/src/components/nft/LoadCard";
import { useRef } from "react";
import { useInfiniteScroll } from "@/src/hooks/useInfiniteScroll";

type ArtGridProps = {
  items: HeliusAsset[] | undefined;
  isLoading: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  isError: boolean;
  error: unknown;
  hasData: boolean;
  gridSize: number;
  onLoadMore: () => void;
};

export function ArtGrid({
  items,
  isLoading,
  isFetchingNextPage,
  hasNextPage,
  isError,
  error,
  hasData,
  onLoadMore,
}: ArtGridProps) {
  const showInitialSkeleton = isLoading && !hasData;
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useInfiniteScroll({
    targetRef: sentinelRef,
    enabled: hasNextPage,
    onLoadMore,
    rootMargin: "200px",
  });

  // 1) First load: skeleton grid
  if (showInitialSkeleton) {
    return (
      <GridWrapper>
        {Array.from({ length: 12 }).map((_, i) => (
          <ArtTile key={`skeleton-${i}`} state="loading" />
        ))}
      </GridWrapper>
    );
  }

  // 2) error with no data
  if (isError && !hasData)
    return (
      <GridWrapper>
        <ArtTile
          state="error"
          title="Unable to load"
          description={error instanceof Error ? error.message : "Unknown error"}
        />
      </GridWrapper>
    );

  // 3) success (or error with stale data)
  return (
    <GridWrapper>
      {items &&
        items.map((item) => (
          <ArtTile
            key={item.id}
            state="success"
            isUpdating={isFetchingNextPage}
            src={item?.content?.links?.image}
            name={item?.content?.metadata?.name}
            description={item?.content?.metadata?.description}
          />
        ))}
      {hasNextPage && <LoadCard />}
      {hasNextPage && <div ref={sentinelRef} />}
    </GridWrapper>
  );
}
