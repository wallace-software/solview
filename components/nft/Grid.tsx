import { ReactNode } from "react";

export function Grid({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-10">
      {/* <div className="flex flex-wrap gap-6 sm:gap-10 items-center justify-center"> */}
      {children}
    </div>
  );
}
