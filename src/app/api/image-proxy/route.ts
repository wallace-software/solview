import { NextRequest, NextResponse } from "next/server";

const ALLOWED_PROTOCOLS = ["https:", "http:"];
const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB
const CACHE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const imageUrl = searchParams.get("url");

  if (!imageUrl) {
    return new NextResponse("Missing url parameter", { status: 400 });
  }

  // Validate URL
  let parsedUrl: URL;
  try {
    parsedUrl = new URL(imageUrl);
  } catch {
    return new NextResponse("Invalid URL", { status: 400 });
  }

  // Only allow http/https
  if (!ALLOWED_PROTOCOLS.includes(parsedUrl.protocol)) {
    return new NextResponse("Protocol not allowed", { status: 400 });
  }

  try {
    const response = await fetch(imageUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; SolView/1.0)",
      },
      signal: AbortSignal.timeout(10000), // 10s timeout
    });

    if (!response.ok) {
      console.error(`Failed to fetch image: ${response.status} ${imageUrl}`);
      return new NextResponse("Failed to fetch image", {
        status: response.status,
      });
    }

    const contentType = response.headers.get("content-type");

    // Verify it's actually an image
    if (!contentType?.startsWith("image/")) {
      return new NextResponse("Not an image", { status: 400 });
    }

    // Check size
    const contentLength = response.headers.get("content-length");
    if (contentLength && parseInt(contentLength) > MAX_IMAGE_SIZE) {
      return new NextResponse("Image too large", { status: 413 });
    }

    // Read image into memory as binary data
    const imageBuffer = await response.arrayBuffer();

    // Return image with caching
    return new NextResponse(imageBuffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": `public, max-age=${CACHE_MAX_AGE}, immutable`,
        "CDN-Cache-Control": `public, max-age=${CACHE_MAX_AGE}`,
      },
    });
  } catch (error) {
    console.error("Image proxy error:", error);

    if (error instanceof Error && error.name === "TimeoutError") {
      return new NextResponse("Request timeout", { status: 504 });
    }

    return new NextResponse("Failed to load image", { status: 500 });
  }
}
