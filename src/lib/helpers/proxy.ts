// Used to interact with image proxy route
export function getProxiedImageUrl(
  src: string | undefined,
  fallback: string,
): string {
  if (!src) return fallback;
  // Don't proxy local images
  if (src.startsWith("/") || src.startsWith("data:")) return src;
  // Proxy all external images
  return `/api/image-proxy?url=${encodeURIComponent(src)}`;
}
