import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchAssetsByOwner } from "@/src/lib/api/helius.client";
import { DEFAULT_PAGE_SIZE } from "@/src/lib/api/constants";
import { AssetsByOwnerResponse } from "@/src/types/api/assets";

// Query key that caches entry when there's a change in ownerAddress, page, or limt
export const assetsByOwnerKey = (ownerAddress: string, limit: number) =>
  ["helius", "assets-by-owner", ownerAddress, limit] as const;

// Query wrapper for assets-by-owner endpoint
export function useAssetsByOwnerInfiniteQuery(
  ownerAddress: string,
  limit = DEFAULT_PAGE_SIZE,
) {
  return useInfiniteQuery<
    AssetsByOwnerResponse,
    Error,
    AssetsByOwnerResponse,
    ReturnType<typeof assetsByOwnerKey>,
    number
  >({
    queryKey: assetsByOwnerKey(ownerAddress, limit),
    queryFn: ({ pageParam }) =>
      fetchAssetsByOwner({ ownerAddress, page: pageParam, limit }),
    enabled: Boolean(ownerAddress), // don't fetch until we have an address

    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      // stop when API returns fewer than requested
      if (lastPage.items.length < limit) return undefined;
      return allPages.length + 1;
    },
  });
}
