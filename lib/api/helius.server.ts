import { HeliusError, HeliusRpcResponse } from "@/types/api/status";
import { HeliusMethodName, GetAssetsByOwnerParams } from "@/types/api/params";

// This module is the lowest-level interface to Helius.
// It hides JSON-RPC and HTTP details and guarantees that callers get valid data or a structred error they can safely handle.

// Read api key once
export const HELIUS_API_KEY = process.env.HELIUS_API_KEY;

// Handle api key errors immediately
if (!HELIUS_API_KEY) {
  throw new Error("Missing HELIUS_API_KEY in environment variables.");
}

// Build helius endpoint with api key
export const HELIUS_RPC_ENDPOINT = `https://mainnet.helius-rpc.com/?api-key=${HELIUS_API_KEY}`;

// Helius API request wrapper
export async function heliusRequest<T>(
  method: HeliusMethodName,
  params: GetAssetsByOwnerParams,
  id: string | number = "1",
): Promise<T> {
  // Perform HTTP POST
  const response = await fetch(HELIUS_RPC_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id,
      method,
      params,
    }),
  });

  // Handle HTTP level failures
  if (!response.ok) {
    throw new HeliusError(`Helius HTTP error: ${response.status}`, {
      status: response.status,
    });
  }

  // Parse RPC response
  const data = (await response.json()) as HeliusRpcResponse<T>;

  // Handle RPC level failures
  if ("error" in data) {
    throw new HeliusError(`Helius RPC error: ${data.error.message}`, {
      code: data.error.code,
    });
  }

  // Return succesfull response
  return data.result;
}
