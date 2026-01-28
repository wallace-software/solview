"use client";

import { fetchAssetsByOwner } from "@/lib/api/helius.client";
import { GetAssetsByOwnerParams } from "@/types/api/params";
import { AssetsByOwnerProps, ViewState } from "@/types/component/props";
import { useEffect, useState } from "react";

export function AssetsByOwner({ ownerAddress }: AssetsByOwnerProps) {
  // View state that details API status
  const [view, setView] = useState<ViewState>({ status: "idle" });

  useEffect(() => {
    if (!ownerAddress) return;

    // Build request parameters
    const params: GetAssetsByOwnerParams = {
      ownerAddress,
      page: 1,
      limit: 100,
    };

    // Request data and handle view state
    const loadAssets = async () => {
      setView({ status: "loading" });

      try {
        const data = await fetchAssetsByOwner(params);
        setView({ status: "success", data });
      } catch (e: unknown) {
        setView({
          status: "error",
          message: e instanceof Error ? e.message : "Unknown error",
        });
      }
    };

    loadAssets();
  }, [ownerAddress]);

  // Render state explicitly
  if (view.status === "idle") return <div> Enter a wallet address</div>;
  if (view.status === "loading") return <div>Loading assets...</div>;
  if (view.status === "error") return <div> Error: {view.message}</div>;

  if (view.status === "success") {
    return <pre className="text-sm">{JSON.stringify(view.data, null, 2)}</pre>;
  }

  return null;
}
