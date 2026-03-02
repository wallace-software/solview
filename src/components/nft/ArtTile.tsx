"use client";
import { Card } from "@/src/components/nft/Card";
import { LoadCard } from "@/src/components/nft/LoadCard";
import { ErrorCard } from "@/src/components/nft/ErrorCard";
import { cn } from "@/src/lib/utils";
import { useState } from "react";
import { getProxiedImageUrl } from "@/src/lib/helpers/proxy";

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
  const [hasError, setHasError] = useState(false);
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

  // Use fallback if error occurred
  const imageSrc = hasError
    ? FALLBACK_SRC
    : getProxiedImageUrl(src, FALLBACK_SRC);

  return (
    <Card className={cn("group", isUpdating && "opacity-90")}>
      <div className="relative w-full aspect-square rounded-md overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt={name ? `${name} artwork` : "NFT Artwork"}
          className="absolute inset-0 w-full h-full object-cover saturate-40 transition-all duration-300 group-hover:saturate-100"
          onError={() => {
            if (!hasError) {
              console.warn(`Failed to load image: ${src}`);
              setHasError(true);
            }
          }}
        />
      </div>
      <h3 className="truncate pb-1">{name ?? "Untitled"}</h3>
      <p className="text-xs line-clamp-2">{description ?? ""}</p>
    </Card>
  );
}
