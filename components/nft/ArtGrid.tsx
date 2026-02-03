import { HeliusAsset } from "@/types/api/assets";
import { GridWrapper } from "@/components/nft/GridWrapper";
import { ArtTile } from "@/components/nft/ArtTile";
import { DEFAULT_PAGE_SIZE } from "@/lib/api/constants";

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
  isError,
  error,
  hasData,
}: ArtGridProps) {
  const showInitialSkeleton = isLoading && !hasData;

  // 1) First load: skeleton grid
  if (showInitialSkeleton) {
    return (
      <GridWrapper>
        {Array.from({ length: DEFAULT_PAGE_SIZE }).map((_, i) => (
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
            isUpdating={isFetching}
            src={item?.content?.links?.image}
            name={item?.content?.metadata?.name}
            description={item?.content?.metadata?.description}
          />
        ))}
    </GridWrapper>
  );
}
