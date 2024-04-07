"use client";

import { ReactNode } from "react";
import { NextUIProvider } from "@nextui-org/react";

export default function Providers({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <NextUIProvider>{children}</NextUIProvider>;
}
