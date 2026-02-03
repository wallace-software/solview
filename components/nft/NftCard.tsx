import { Card } from "@/components/nft/Card";

type NftCardProps = {
  src: string | undefined;
  name: string | undefined;
  description: string | undefined;
};
export function NftCard({ src, name, description }: NftCardProps) {
  const placeholderSrc = "/images/assets-by-owner/fetching-image.svg";
  return (
    <Card>
      {/* <Image
        src={src ?? placeholderSrc}
        width={200}
        height={200}
        alt="NFT artwork"
        placeholder="blur"
        blurDataURL={placeholderSrc}
        className="animate-pulse"
      /> */}
      <img
        src={src ?? placeholderSrc}
        width={200}
        height={200}
        alt="NFT artwork"
        className="object-cover rounded-md"
        onError={(e) => {
          e.currentTarget.src = placeholderSrc;
        }}
      />
      <h3 className="truncate">{name}</h3>
      <p className="text-sm line-clamp-2">{description}</p>
    </Card>
  );
}
