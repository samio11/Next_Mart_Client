"use client";
import { useUser } from "@/context/UseContext";
import React from "react";

export default function HomePage() {
  const user = useUser();

  console.log(user?.user);

  return <div>HomePage - Welcome {user?.user?.name}</div>;
}
