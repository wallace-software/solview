import { Card } from "@/components/nft/Card";
import Image from "next/image";

type ErrorCardProps = {
  title?: string;
  description?: string;
};
export function ErrorCard({ title, description }: ErrorCardProps) {
  return (
    <Card>
      <Image
        src="/images/assets-by-owner/error-image.svg"
        width={200}
        height={200}
        alt={"Image loading container"}
        className="animate-pulse"
      />
      <h3 className="truncate pb-1 text-theme-error">{title}</h3>
      <p className="text-xs line-clamp-2 opacity-80">{description}</p>
    </Card>
  );
}
