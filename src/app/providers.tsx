"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { JSX, PropsWithChildren, useState } from "react";

// Create the QueryClient once per browser session.
// useState ensures the client is stable across re-renders.

const Providers = ({ children }: PropsWithChildren): JSX.Element => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            staleTime: 30000,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default Providers;
