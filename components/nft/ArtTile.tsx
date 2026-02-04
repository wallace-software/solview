"use client";
import { Card } from "@/components/nft/Card";
import { LoadCard } from "@/components/nft/LoadCard";
import { ErrorCard } from "@/components/nft/ErrorCard";
import { cn } from "@/lib/utils";

type ArtTileProps =
  | { state: "loading" }
  | {
      state: "success";
      src?: string;
      name?: string;
      description?: string;
      isUpdating?: boolean;
    }
  | { state: "error"; title?: string; description?: string };

const FALLBACK_SRC = "/images/assets-by-owner/fetching-image.svg";

export function ArtTile(props: ArtTileProps) {
  //Loading
  if (props.state === "loading") {
    return <LoadCard />;
  }

  // Error
  if (props.state === "error") {
    return (
      <ErrorCard
        title={props?.title ?? "Error"}
        description={props?.description ?? "Something went wrong."}
      />
    );
  }

  // Success
  const { src, name, description, isUpdating } = props;
  return (
    <Card className={cn("group", isUpdating && "opacity-90")}>
      <div className="relative w-full aspect-square rounded-md overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src ?? FALLBACK_SRC}
          alt={name ? `${name} artwork` : "NFT Artwork"}
          className="absolute inset-0 w-full h-full object-cover saturate-40 transition-all duration-300 group-hover:saturate-100"
          onError={(e) => {
            e.currentTarget.src = FALLBACK_SRC;
          }}
        />
      </div>
      <h3 className="truncate pb-1">{name ?? "Untitled"}</h3>
      <p className="text-xs line-clamp-2">{description ?? ""}</p>
    </Card>
  );
}

// <Card className="animate-pulse">
//   <div className="w-full aspect-square rounded-md bg-white/5" />
//   <div className="h-5 w-2/3 rounded bg-white/5" />
//   <div className="h-4 w-full rounded bg-white/5" />
// </Card>;
