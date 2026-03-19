/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useWalletStore } from "@/src/lib/store/wallet.store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Mock child components
jest.mock("@/src/components/wallet/AddressInput", () => ({
  AddressInput: ({ value, onChange, onSubmit }: any) => (
    <div>
      <input
        data-testid="address-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button data-testid="submit-btn" onClick={onSubmit}>
        Submit
      </button>
    </div>
  ),
}));
jest.mock("@/src/components/wallet/AssetsByOwner", () => ({
  AssetsByOwner: ({ ownerAddress }: any) => (
    <div data-testid="assets-grid">Assets for: {ownerAddress}</div>
  ),
}));

// Wrapper for React Query
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  Wrapper.displayName = "QueryClientWrapper";

  return Wrapper;
};

describe("HomeClient", () => {
  beforeEach(() => {
    useWalletStore.setState({
      activeWallet: "default-wallet",
      recentAddresses: ["default-wallet"],
    });
  });

  it("should render with default wallet", () => {});
  it("should  update input when the user types", () => {});
  it("should commit address on submit button click", () => {});
  it("should add address to store on submit", () => {});
  it("should not commit empty addresses", () => {});
});
