"use client";

import { useAssetsByOwnerQuery } from "@/lib/query/useAssetsByOwnerQuery";
import { DEFAULT_PAGE_SIZE } from "@/lib/api/constants";
import { HeliusAsset } from "@/types/api/assets";
import { ReactNode } from "react";
import Image from "next/image";

type AssetsByOwnerProps = {
  ownerAddress: string;
};

export function AssetsByOwner({ ownerAddress }: AssetsByOwnerProps) {
  const page = 1;
  const limit = DEFAULT_PAGE_SIZE;

  const query = useAssetsByOwnerQuery(ownerAddress, page, limit);

  return (
    <ArtGrid
      items={query.data?.items ?? []}
      isLoading={query.isLoading}
      isFetching={query.isFetching}
      isError={query.isError}
      error={query.error}
      hasData={Boolean(query.data)}
    />
  );
}

type ArtGridProps = {
  items: HeliusAsset[] | undefined;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  error: unknown;
  hasData: boolean;
};

export function ArtGrid({
  items,
  isLoading,
  isFetching,
  isError,
  error,
  hasData,
}: ArtGridProps) {
  // 1) first load
  if (isLoading || isFetching) {
    return (
      <Grid>
        {Array.from({ length: DEFAULT_PAGE_SIZE }).map((_, i) => (
          <LoadCard key={i} />
        ))}
      </Grid>
    );
  }
  // 2) error with no data
  if (!items) return null;
  // 3) success (or error with stale data)
  return (
    <Grid>
      {items.map((item, i) => (
        <GridCard
          key={i}
          src={item?.content?.links?.image}
          name={item?.content?.metadata?.name}
          description={item?.content?.metadata?.description}
        />
      ))}
    </Grid>
  );
}

type GridCardProps = {
  src: string | undefined;
  name: string | undefined;
  description: string | undefined;
};
function GridCard({ src, name, description }: GridCardProps) {
  const placeholderSrc = "/images/assets-by-owner/fetching-image.svg";
  return (
    <CardParent>
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
    </CardParent>
  );
}

function LoadCard() {
  return (
    <CardParent>
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
        className="animate-pulse"
      />
      <Image
        src="/images/assets-by-owner/loading-text-2.svg"
        width={175}
        height={24}
        alt={"Desciption loading container"}
        className="animate-pulse"
      />
    </CardParent>
  );
}

function Grid({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
      {/* <div className="flex flex-wrap gap-6 sm:gap-10 items-center justify-center"> */}
      {children}
    </div>
  );
}

function CardParent({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-2 w-50">{children}</div>;
}
