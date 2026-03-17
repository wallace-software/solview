import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DEFAULT_OWNER_ADDRESS } from "@/src/lib/api/constants";

type WalletState = {
  activeWallet: string;
  recentAddresses: string[];
  setActiveWallet: (address: string) => void;
  pushRecentAddress: (address: string) => void;
  clearRecentAddresses: () => void;
};

const MAX_RECENT_ADDRESSES = 10;

export const useWalletStore = create<WalletState>()(
  persist(
    (set) => ({
      activeWallet: DEFAULT_OWNER_ADDRESS,
      recentAddresses: [DEFAULT_OWNER_ADDRESS],

      setActiveWallet: (address: string) => set({ activeWallet: address }),

      pushRecentAddress: (address: string) =>
        set((state) => {
          // Don't add if it's already the first item
          if (state.recentAddresses[0] === address) {
            return state;
          }

          // Remove address if it exists elsewhere in the array
          const filtered = state.recentAddresses.filter((a) => a !== address);

          // Add to front and limit to MAX_RECENT_ADDRESSES
          const updated = [address, ...filtered].slice(0, MAX_RECENT_ADDRESSES);

          return { recentAddresses: updated };
        }),

      clearRecentAddresses: () =>
        set({ recentAddresses: [DEFAULT_OWNER_ADDRESS] }),
    }),
    {
      name: "wallet-storage", // localStorage key
    },
  ),
);
