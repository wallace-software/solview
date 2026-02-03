"use client";

import { useEffect, useState } from "react";

import { Heading } from "@/components/site/Heading";
import { AddressInput } from "@/components/wallet/AddressInput";
import { AssetsByOwner } from "@/components/wallet/AssetsByOwner";

// Homepage client to handle front end data management

//if6RZbX2pJEsxaBDH1aFWvAaWUb3dLcouZ2onNXkj1F
//61ngvyn6YACpbMhtnEYrV6fgMFkBVTX21CdPQJ2X45Lp
const DEFAULT_OWNER_ADDRESS = "APKq87wYJxDEJPmWujDGPF779QwV9N8wkvJxAc9QiT9K";
const DEBOUNCE_MS = 500;

export function HomeClient() {
  // What the API queries (starts with demo wallet)
  const [activeAddress, setActiveAddress] = useState(DEFAULT_OWNER_ADDRESS);
  //What the input shows (starts empty)
  const [draftAddress, setDraftAddress] = useState("");
  // Becomes true on first user input
  const [hasUserEdited, setHasUserEdited] = useState(false);

  // Debounced commit only after user begins interaction
  useEffect(() => {
    if (!hasUserEdited) return;

    const trimmed = draftAddress.trim();
    if (!trimmed) return;

    const t = setTimeout(() => setActiveAddress(trimmed), DEBOUNCE_MS);

    return () => clearTimeout(t);
  }, [draftAddress, hasUserEdited]);

  // hands draftAddress change
  const handleChange = (next: string) => {
    if (!hasUserEdited) setHasUserEdited(true);
    setDraftAddress(next);
  };

  // Commits draftAddress to activeAddress which is used to trigger API
  const commitNow = () => {
    const trimmed = draftAddress.trim();
    if (!trimmed) return;

    setHasUserEdited(true);
    setActiveAddress(trimmed);
  };

  return (
    <div className="flex flex-col md:items-center gap-12">
      <Heading
        header="Enter a wallet below"
        subheader="Paste a sol address below to view the stored art"
      />
      <AddressInput
        value={draftAddress}
        onChange={handleChange}
        onSubmit={commitNow}
      />
      <AssetsByOwner ownerAddress={activeAddress} />
    </div>
  );
}
