import type { ReactNode } from "react"

export type Location = "Toyota" | "Hamamatsu" | "Nagoya"

export interface LocationCardProps{
  className?: string,
  children?: ReactNode,
  image: string,
  locationName: string,
  address: string,
  url: string
}
