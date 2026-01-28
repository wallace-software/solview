import { useQuery } from "@tanstack/react-query";
import { fetchAssetsByOwner } from "@/lib/api/helius.client";

// Query key that caches entry when there's a change in ownerAddress, page, or limt
export const assetsByOwnerKey = (
  ownerAddress: string,
  page: number,
  limit: number,
) => ["helius", "assets-by-owner", ownerAddress, page, limit] as const;

// Query wrapper for assets-by-owner endpoint
export function useAssetsByOwnerQuery(
  ownerAddress: string,
  page = 1,
  limit = 100,
) {
  return useQuery({
    queryKey: assetsByOwnerKey(ownerAddress, page, limit),
    queryFn: () => fetchAssetsByOwner({ ownerAddress, page, limit }),
    enabled: Boolean(ownerAddress), // don't fetch until we have an address
  });
}
