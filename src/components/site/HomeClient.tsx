"use client";

import { useEffect, useState } from "react";
import { AddressInput } from "@/src/components/wallet/AddressInput";
import { AssetsByOwner } from "@/src/components/wallet/AssetsByOwner";
import { useWalletStore } from "@/src/lib/store/wallet.store";

// Homepage client to handle front end data management

const DEBOUNCE_MS = 500;

export function HomeClient() {
  // What the API queries (starts with demo wallet)
  const activeWallet = useWalletStore((state) => state.activeWallet);
  const setActiveWallet = useWalletStore((state) => state.setActiveWallet);
  const pushRecentAddress = useWalletStore((state) => state.pushRecentAddress);

  //What the input shows (starts empty)
  const [draftAddress, setDraftAddress] = useState("");
  // Becomes true on first user input
  const [hasUserEdited, setHasUserEdited] = useState(false);

  // Debounced commit only after user begins interaction
  useEffect(() => {
    if (!hasUserEdited) return;

    const trimmed = draftAddress.trim();
    if (!trimmed) return;

    const t = setTimeout(() => {
      setActiveWallet(trimmed);
      pushRecentAddress(trimmed);
    }, DEBOUNCE_MS);

    return () => clearTimeout(t);
  }, [draftAddress, hasUserEdited, setActiveWallet, pushRecentAddress]);

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
    setActiveWallet(trimmed);
    pushRecentAddress(trimmed);
  };

  return (
    <div className="flex flex-col md:items-center gap-12">
      <AddressInput
        value={draftAddress}
        onChange={handleChange}
        onSubmit={commitNow}
      />
      <div className="flex justify-center">
        <AssetsByOwner ownerAddress={activeWallet} />
      </div>
    </div>
  );
}
