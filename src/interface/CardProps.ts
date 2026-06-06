import type { ReactNode } from "react"

export type Location = "Toyota" | "Hamamatsu" | "Nagoya"

export interface CardProps{
  className?: string,
  children?: ReactNode,
  image: string,
  location: Location[],
  programTitle: string,
  programDesc: string
}
