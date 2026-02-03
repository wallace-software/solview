import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef } from "react";

type CardProps = ComponentPropsWithoutRef<"div">;
export function Card({ children, className, ...props }: CardProps) {
  return (
    <div className={cn("flex flex-col gap-2 w-50", className)} {...props}>
      {children}
    </div>
  );
}
