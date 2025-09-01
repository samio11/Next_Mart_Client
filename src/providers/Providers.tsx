"use client";
import UserProvider from "@/context/UseContext";
import React from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <UserProvider>{children}</UserProvider>;
}
