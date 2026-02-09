// Union Heilus API methods used
export type HeliusMethodName = "getAssetsByOwner";

// API params for GetAssetsByOwner
export type GetAssetsByOwnerParams = {
  ownerAddress: string;
  page?: number;
  limit?: number;
};
