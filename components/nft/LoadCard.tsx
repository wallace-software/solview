import { Card } from "@/components/nft/Card";
import Image from "next/image";

export function LoadCard() {
  return (
    <Card>
      <Image
        src="/images/assets-by-owner/loading-image.svg"
        width={200}
        height={200}
        alt={"Image loading container"}
        className="animate-pulse"
      />
      <Image
        src="/images/assets-by-owner/loading-text-1.svg"
        width={125}
        height={23}
        alt={"Title loading container"}
        className="animate-pulse pt-1 pb-3"
      />
      <Image
        src="/images/assets-by-owner/loading-text-2.svg"
        width={175}
        height={24}
        alt={"Desciption loading container"}
        className="animate-pulse"
      />
    </Card>
  );
}
