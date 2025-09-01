import { getUserInfo } from "@/services/auth";
import React from "react";

export default async function HomePage() {
  const user = await getUserInfo();
  console.log(user);

  return <div>HomePage</div>;
}
