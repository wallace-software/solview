import { useEffect, useRef } from "react";

type UseInfiniteScrollArgs = {
  targetRef: React.RefObject<Element | null>;
  enabled: boolean;
  onLoadMore: () => void;
  rootMargin?: string; // prefetch distance before the sentinel is visible
  threshold?: number | number[]; // intersection threshold (0 = any intersection)
};

export const useInfiniteScroll = ({
  targetRef,
  enabled,
  onLoadMore,
  rootMargin = "200px",
  threshold = 0,
}: UseInfiniteScrollArgs) => {
  // Avoid re-creating the observer just because onLoadMore identity changes
  const onLoadMoreRef = useRef(onLoadMore);
  useEffect(() => {
    onLoadMoreRef.current = onLoadMore;
  }, [onLoadMore]);

  useEffect(() => {
    const el = targetRef.current;
    if (!el) return;
    if (!enabled) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onLoadMoreRef.current();
        }
      },
      { rootMargin, threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [targetRef, enabled, rootMargin, threshold]);
};
