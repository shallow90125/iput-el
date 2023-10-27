"use client";

import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <NextUIProvider>
        <ToastContainer
          toastClassName={() =>
            " relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer bg-content1"
          }
          bodyClassName={() => " block p-3"}
        />
        {children}
      </NextUIProvider>
    </SessionProvider>
  );
}
