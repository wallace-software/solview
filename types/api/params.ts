export type HeliusMethodName = "getAssetsByOwner";

export type GetAssetsByOwnerParams = {
  ownerAddress: string;
  page?: number;
  limit?: number;
};
