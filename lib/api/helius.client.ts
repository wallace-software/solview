import { GetAssetsByOwnerParams } from "@/types/api/params";

// Client helper that calls /api/helius/assets-by-owner
// Returns JSON on success, throws a clean Error on failure

export const fetchAssetsByOwner = async (params: GetAssetsByOwnerParams) => {
  if (!params.ownerAddress) {
    throw new Error("Missing ownerAddress");
  }

  // Set up variables and build url
  const page = params.page ?? 1;
  const limit = params.limit ?? 100;
  const url = `/api/helius/assets-by-owner?ownerAddress${params.ownerAddress}&page=${page}&limit=${limit}`;

  // Fetch the url and handle the response
  const response = await fetch(url);
  const data = await response.json();

  // Handle response failures
  if (!response.ok) {
    const message =
      typeof data?.error === "string" ? data.error : "Request failed";
    throw new Error(message);
  }

  return data;
};
