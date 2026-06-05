import type { ReactNode } from "react"

export type ButtonSize = "sm" | "default" | "lg"

export interface ButtonProps{
  className?: string,
  size?: ButtonSize,
  children: ReactNode,
  onClick?: () => void,
  type?: "button" | "submit" | "reset";

}
