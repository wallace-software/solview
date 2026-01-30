"use client";

import { Hero } from "@/components/site/Hero";
import { AssetsByOwner } from "@/components/wallet/AssetsByOwner";

const DEFAULT_OWNER_ADDRESS = "if6RZbX2pJEsxaBDH1aFWvAaWUb3dLcouZ2onNXkj1F";

export default function Home() {
  return (
    <div className="flex items-center justify-center">
      <main className="flex w-full max-w-3xl flex-col items-center justify-start py-32 px-16 ">
        <Hero />
      </main>
    </div>
  );
}
