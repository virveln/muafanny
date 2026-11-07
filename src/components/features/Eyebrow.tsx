import type { ReactNode } from "react";
import "./Eyebrow.css";

type EyebrowProps = {
  children: ReactNode;
};

export function Eyebrow({ children }: EyebrowProps) {
  return <p className="eyebrow">{children}</p>;
}