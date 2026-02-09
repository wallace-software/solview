import { ReactNode } from "react";

export function GridWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-10 max-w-50 sm:max-w-none items-center">
      {children}
    </div>
  );
}
