import { Card } from "@/components/nft/Card";

type NftCardProps = {
  src: string | undefined;
  name: string | undefined;
  description: string | undefined;
};

export function NftCard({ src, name, description }: NftCardProps) {
  const placeholderSrc = "/images/assets-by-owner/fetching-image.svg";
  return (
    <Card className="group">
      {/* <Image
        src={src ?? placeholderSrc}
        width={200}
        height={200}
        alt="NFT artwork"
        placeholder="blur"
        blurDataURL={placeholderSrc}
        className="animate-pulse"
      /> */}
      <div className="relative w-full aspect-square rounded-md overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src ?? placeholderSrc}
          alt="NFT artwork"
          className="absolute inset-0 w-full h-full object-cover saturate-40 transition-all duration-300 group-hover:saturate-100"
          onError={(e) => {
            e.currentTarget.src = placeholderSrc;
          }}
        />
      </div>
      <h3 className="truncate pb-1">{name}</h3>
      <p className="text-xs line-clamp-2">{description}</p>
    </Card>
  );
}
