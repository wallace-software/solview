import { useWalletStore } from "../wallet.store";
import { DEFAULT_OWNER_ADDRESS } from "@/src/lib/api/constants";

describe("WalletStore", () => {
  beforeEach(() => {
    // Reset store to inital state before each test
    useWalletStore.setState({
      activeWallet: DEFAULT_OWNER_ADDRESS,
      recentAddresses: [DEFAULT_OWNER_ADDRESS],
    });
  });

  describe("Initial State", () => {
    it("should have default wallet as active wallet", () => {
      const { activeWallet } = useWalletStore.getState();
      expect(activeWallet).toBe(DEFAULT_OWNER_ADDRESS);
    });

    it("should have default wallet in recent addresses", () => {
      const { recentAddresses } = useWalletStore.getState();
      expect(recentAddresses).toEqual([DEFAULT_OWNER_ADDRESS]);
    });
  });

  describe("setActiveWallet", () => {
    it("should update active wallet", () => {
      const { setActiveWallet } = useWalletStore.getState();
      const newAddress = "new-wallet-address-123";

      setActiveWallet(newAddress);

      expect(useWalletStore.getState().activeWallet).toBe(newAddress);
    });
    it("should not affect recent addresses", () => {
      const { setActiveWallet } = useWalletStore.getState();
      const initialRecent = useWalletStore.getState().recentAddresses;

      setActiveWallet("different-address");

      expect(useWalletStore.getState().recentAddresses).toEqual(initialRecent);
    });
  });

  describe("pushRecentAddress", () => {
    it("should add new address to front of array", () => {
      const { pushRecentAddress } = useWalletStore.getState();
      const newAddress = "address-1";

      pushRecentAddress(newAddress);

      const { recentAddresses } = useWalletStore.getState();
      expect(recentAddresses[0]).toBe(newAddress);
      expect(recentAddresses).toHaveLength(2);
    });

    it("should not add duplicate if already first", () => {
      const { pushRecentAddress } = useWalletStore.getState();
      const newAddress = DEFAULT_OWNER_ADDRESS;

      pushRecentAddress(newAddress);

      const { recentAddresses } = useWalletStore.getState();
      expect(recentAddresses).toEqual([DEFAULT_OWNER_ADDRESS]);
    });
    it("should move existing address to front if it exists elsewhere", () => {
      const { pushRecentAddress } = useWalletStore.getState();

      pushRecentAddress("address-1");
      pushRecentAddress("address-2");
      pushRecentAddress("address-3");

      pushRecentAddress("address-1");

      const { recentAddresses } = useWalletStore.getState();
      expect(recentAddresses).toEqual([
        "address-1",
        "address-3",
        "address-2",
        DEFAULT_OWNER_ADDRESS,
      ]);
    });

    it("should limit to 10 addresses maximum", () => {
      const { pushRecentAddress } = useWalletStore.getState();

      // Add 15 addresses
      for (let i = 0; i < 15; i++) {
        pushRecentAddress(`address-${i}`);
      }

      const { recentAddresses } = useWalletStore.getState();
      expect(recentAddresses).toHaveLength(10);
      expect(recentAddresses[0]).toBe("address-14"); // Most recent
      expect(recentAddresses[9]).toBe("address-5"); // 10th item
    });
  });

  describe("clearRecentAddresses", () => {
    it("should reset to default address only", () => {
      const { pushRecentAddress, clearRecentAddresses } =
        useWalletStore.getState();

      //Add some addresses
      pushRecentAddress("address-1");
      pushRecentAddress("address-2");
      pushRecentAddress("address-3");

      expect(useWalletStore.getState().recentAddresses).toHaveLength(4);

      // Clear
      clearRecentAddresses();

      const { recentAddresses } = useWalletStore.getState();
      expect(recentAddresses).toEqual([DEFAULT_OWNER_ADDRESS]);
      expect(recentAddresses).toHaveLength(1);
    });

    it("should not affect active wallet", () => {
      const { setActiveWallet, clearRecentAddresses } =
        useWalletStore.getState();

      setActiveWallet("active-wallet-1");
      clearRecentAddresses();

      expect(useWalletStore.getState().activeWallet).toBe("active-wallet-1");
    });
  });
});
