"use client";

import { QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode, useState } from "react";

export default function Providers(props: ProvidersProps) {
  const [queryClient] = useState<QueryClient>(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>
  );
}

export interface ProvidersProps {
  children: ReactNode;
}