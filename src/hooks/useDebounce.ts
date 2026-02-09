import { useEffect, useState } from "react";

// Use timeout to update value after specified time interval

export const useDebounceValue = <T>(value: T, delay: number) => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);

  if (!value) return value;
  return debounced;
};
