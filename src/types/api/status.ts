// Helius api success response
// uses generic to accomodate multiple functions
export type JsonRpcSuccess<T> = {
  jsonrpc: "2.0";
  id: string | number;
  result: T;
};

// Helius api error response
export type JsonRpcError = {
  jsonrpc: "2.0";
  id: string | number;
  error: { code: number; message: string; data?: unknown };
};

// Descriminated union for helius responses, either success or error
export type HeliusRpcResponse<T> = JsonRpcSuccess<T> | JsonRpcError;

// Extend javascript Error class to inherit properties
export class HeliusError extends Error {
  status?: number;
  code?: number;
  // Constructor with human readable error text and optional metadata
  constructor(message: string, opts?: { status?: number; code?: number }) {
    // Calls parent of Error constructor and sets name name, status, and code
    super(message);
    this.name = "HeliusError";
    this.status = opts?.status;
    this.code = opts?.code;
  }
}
