"use client";

import { useEffect, useState } from "react";

// Returns size of grid columns based on = rows (params) x columns (screen width)

type GridCols = 1 | 2 | 3 | 4;

// Determine number of columns by breakpoint
const getCols = () => {
  if (typeof window === "undefined") return 3;

  const w = window.innerWidth;

  if (w >= 1280) return 4;
  if (w >= 1024) return 3;
  if (w >= 640) return 2;
  return 1;
};

// Listen to changes on window resizing and return correct columns and page size
export const useResponsiveGridSize = ({ rows = 2 }) => {
  const [cols, setCols] = useState<GridCols>(() => getCols());

  useEffect(() => {
    const onResize = () => setCols(getCols());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return { cols, gridSize: cols * rows, isHydrated: cols !== null };
};
