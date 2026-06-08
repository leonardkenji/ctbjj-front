import type { Belt, EnrollmentStatus, Role } from "../types/models";

export const roleTone: Record<Role, string> = {
  ADMIN: "bg-violet-500/15 text-violet-200 ring-violet-400/40",
  PROFESSOR: "bg-sky-500/15 text-sky-200 ring-sky-400/40",
  STUDENT: "bg-emerald-500/15 text-emerald-200 ring-emerald-400/40",
};

export const beltTone: Record<Belt, string> = {
  WHITE: "bg-slate-100 text-slate-900 ring-slate-300",
  BLUE: "bg-blue-500/15 text-blue-200 ring-blue-400/40",
  PURPLE: "bg-purple-500/15 text-purple-200 ring-purple-400/40",
  BROWN: "bg-amber-700/20 text-amber-100 ring-amber-600/40",
  BLACK: "bg-slate-900 text-slate-100 ring-slate-700",
};

export const statusTone: Record<EnrollmentStatus, string> = {
  ACTIVE: "bg-emerald-500/15 text-emerald-200 ring-emerald-400/40",
  INACTIVE: "bg-slate-500/15 text-slate-200 ring-slate-400/40",
  SUSPENDED: "bg-rose-500/15 text-rose-200 ring-rose-400/40",
  TRIAL: "bg-amber-500/15 text-amber-100 ring-amber-300/40",
};
