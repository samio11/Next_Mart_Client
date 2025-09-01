import React, { ReactNode } from "react";
interface IProps {
  children: ReactNode;
}
export default function DashboardLayout({ children }: IProps) {
  return <div>{children}</div>;
}
