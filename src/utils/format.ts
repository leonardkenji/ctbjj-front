import type { Belt, EnrollmentStatus, Role, Weekday } from "../types/models";

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "medium",
});

const dateTimeFormatter = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "short",
  timeStyle: "short",
});

const timeFormatter = new Intl.DateTimeFormat("pt-BR", {
  hour: "2-digit",
  minute: "2-digit",
});

export const weekdayLabels: Record<Weekday, string> = {
  MONDAY: "Segunda",
  TUESDAY: "Terça",
  WEDNESDAY: "Quarta",
  THURSDAY: "Quinta",
  FRIDAY: "Sexta",
  SATURDAY: "Sábado",
  SUNDAY: "Domingo",
};

export const roleLabels: Record<Role, string> = {
  ADMIN: "Admin",
  PROFESSOR: "Professor",
  STUDENT: "Aluno",
};

export const beltLabels: Record<Belt, string> = {
  WHITE: "Branca",
  BLUE: "Azul",
  PURPLE: "Roxa",
  BROWN: "Marrom",
  BLACK: "Preta",
};

export const statusLabels: Record<EnrollmentStatus, string> = {
  ACTIVE: "Ativo",
  INACTIVE: "Inativo",
  SUSPENDED: "Suspenso",
  TRIAL: "Experimental",
};

export function formatDate(value?: string | null) {
  if (!value) return "-";
  return dateFormatter.format(new Date(value));
}

export function formatDateTime(value?: string | null) {
  if (!value) return "-";
  return dateTimeFormatter.format(new Date(value));
}

export function formatTime(value?: string | null) {
  if (!value) return "-";
  const isIsoDate = value.includes("T");
  return isIsoDate ? timeFormatter.format(new Date(value)) : value.slice(0, 5);
}

export function isToday(value?: string | null) {
  if (!value) return false;
  const date = new Date(value);
  const now = new Date();
  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  );
}
