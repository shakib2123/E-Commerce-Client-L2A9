"use client";

import * as React from "react";

// 1. import `NextUIProvider` component
import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import UserProvider from "@/context/user.provider";

const queryClient = new QueryClient();

function Providers({ children }: { children: React.ReactNode }) {
  // 2. Wrap NextUIProvider at the root of your app
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <NextUIProvider>
          <Toaster />
          {children}
        </NextUIProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}
export default Providers;
