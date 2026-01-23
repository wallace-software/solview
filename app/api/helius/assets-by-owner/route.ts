import { heliusRequest } from "@/lib/api/helius.server";
import { GetAssetsByOwnerParams } from "@/types/api/params";
import { HeliusError } from "@/types/api/status";
import { NextResponse } from "next/server";

// This route exposes a safe HTTP endpoint for the frontend to request Helius data.
// It handles input validation and error mapping so the client never talks to Helius directly
// or deals with RPC-level concerns

export async function GET(req: Request) {
  // Extract query params from request
  const { searchParams } = new URL(req.url);

  const ownerAddress = searchParams.get("ownerAddress");
  const page = Number(searchParams.get("page") ?? 1);
  const limit = Number(searchParams.get("limit") ?? 100);

  // Validate parameters
  if (!ownerAddress) {
    return NextResponse.json(
      { error: "Missing ownerAddress" },
      { status: 400 },
    );
  }

  // Build typed params for client layer
  const params: GetAssetsByOwnerParams = {
    ownerAddress,
    page,
    limit,
  };

  try {
    // Call helius client
    const result = await heliusRequest("getAssetsByOwner", params);
    return NextResponse.json(result);
  } catch (err) {
    // Translate known errors into http responses
    if (err instanceof HeliusError) {
      return NextResponse.json(
        { error: err.message },
        { status: err.status ?? 500 },
      );
    }

    // Catch unkown errors
    return NextResponse.json({ error: "Unkown server error" }, { status: 500 });
  }
}
