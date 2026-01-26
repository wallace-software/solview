"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { JSX, PropsWithChildren, useState } from "react";

// Create the QueryClient once per browser session.
// useState ensures the client is stable across re-renders.
const Providers = ({ children }: PropsWithChildren): JSX.Element => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default Providers;
