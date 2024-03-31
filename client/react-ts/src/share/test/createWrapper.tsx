import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const createWrapper = (queryClient?:QueryClient)=>{
  const client = queryClient || new QueryClient();
  return ({ children }: { children: React.ReactNode; }) => (
  <QueryClientProvider client={client}>{children}</QueryClientProvider>
)};
