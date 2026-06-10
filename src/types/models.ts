export type Role = "ADMIN" | "PROFESSOR" | "STUDENT";
export type Belt = "WHITE" | "BLUE" | "PURPLE" | "BROWN" | "BLACK";
export type EnrollmentStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED" | "TRIAL";
export type CheckInMethod = "QR" | "MANUAL";
export type Weekday =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";

export interface AuthUser {
  token: string;
  id: string;
  name: string;
  email: string;
  role: Role;
}

export type AuthResponse = AuthUser;

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  createdAt?: string;
}

export interface PageResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

export interface Student {
  id: string;
  userId: string;
  name: string;
  email: string;
  role: Role;
  phone?: string;
  birthDate?: string;
  belt?: Belt;
  stripes?: number;
  enrollmentStatus: EnrollmentStatus;
  qrCodeToken?: string;
  enrollmentDate?: string;
  notes?: string;
  createdAt?: string;
}

export interface Professor {
  id: string;
  userId: string;
  name: string;
  email: string;
  belt?: Belt;
  stripes?: number;
  bio?: string;
  photoUrl?: string;
  active: boolean;
  displayOrder?: number;
}

export interface ClassType {
  id: string;
  name: string;
  color: string;
  description?: string;
}

export interface Schedule {
  id: string;
  weekday: Weekday;
  startTime: string;
  endTime: string;
  classType: Pick<ClassType, "id" | "name" | "color">;
  professor: { id: string; name: string };
}

export interface CheckIn {
  id: string;
  studentId: string;
  studentName: string;
  checkInTime: string;
  checkOutTime?: string | null;
  method: CheckInMethod;
}

export interface CheckInStats {
  totalClasses: number;
  totalMinutes: number;
  byClassType: {
    classTypeId: string | null;
    classTypeName: string;
    colorHex: string;
    totalClasses: number;
    totalMinutes: number;
  }[];
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface UserPayload extends RegisterPayload {
  role: Role;
}

export interface StudentPayload {
  name: string;
  email: string;
  password?: string;
  phone?: string;
  birthDate?: string;
  belt?: Belt;
  stripes?: number;
  enrollmentStatus: EnrollmentStatus;
  enrollmentDate?: string;
  notes?: string;
}

export interface ProfessorPayload {
  name: string;
  email: string;
  password?: string;
  belt?: Belt;
  stripes?: number;
  bio?: string;
  active: boolean;
  displayOrder: number;
}

export interface SchedulePayload {
  weekday: Weekday;
  startTime: string;
  endTime: string;
  classTypeId: string;
  professorId: string;
}

export interface ClassTypePayload {
  name: string;
  color: string;
  description?: string;
}
