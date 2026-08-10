"use client";

import type { ReactNode } from "react";

import { OnlineOnly, ServiceWorkerRegistration } from "./components";

type PwaRuntimeProps = { children: ReactNode };

export function PwaRuntime({ children }: PwaRuntimeProps) {
  return (
    <>
      <ServiceWorkerRegistration />
      <OnlineOnly>{children}</OnlineOnly>
    </>
  );
}
