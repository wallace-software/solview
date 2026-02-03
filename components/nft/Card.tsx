import { ReactNode } from "react";

export function Card({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-2 w-50">{children}</div>;
}
