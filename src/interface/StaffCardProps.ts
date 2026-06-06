export type StaffRole = "professor" | "aluno-campeao"

export type Belt =
  | "branca"
  | "azul"
  | "roxa"
  | "marrom"
  | "preta"
  | "amarela"
  | "laranja"

export interface StaffCardProps {
  name: string
  role: StaffRole
  photo: string
  belt: Belt
  title?: string
  achievements?: string[]
  bio?: string
}
