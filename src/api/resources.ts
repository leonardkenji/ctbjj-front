import { api } from "./api";
import type {
  AuthResponse,
  CheckIn,
  CheckInStats,
  ClassType,
  ClassTypePayload,
  LoginPayload,
  PageResponse,
  Professor,
  ProfessorPayload,
  RegisterPayload,
  Schedule,
  SchedulePayload,
  Student,
  StudentPayload,
  User,
  UserPayload,
} from "../types/models";

export const authApi = {
  login: async (payload: LoginPayload) => (await api.post<AuthResponse>("/api/auth/login", payload)).data,
  register: async (payload: RegisterPayload) => (await api.post<AuthResponse>("/api/auth/register", payload)).data,
};

export const usersApi = {
  list: async () => (await api.get<User[]>("/api/users")).data,
  show: async (id: string) => (await api.get<User>(`/api/users/${id}`)).data,
  byEmail: async (email: string) => (await api.get<User>("/api/users/by-email", { params: { email } })).data,
  create: async (payload: UserPayload) => (await api.post<User>("/api/users", payload)).data,
};

export const studentsApi = {
  me: async () => (await api.get<Student>("/api/students/me")).data,
  list: async (page = 0, size = 20) =>
    (await api.get<PageResponse<Student>>("/api/students", { params: { page, size } })).data,
  show: async (id: string) => (await api.get<Student>(`/api/students/${id}`)).data,
  search: async (name: string) => (await api.get<Student[]>("/api/students/search", { params: { name } })).data,
  create: async (payload: StudentPayload) => (await api.post<Student>("/api/students", payload)).data,
  update: async (id: string, payload: StudentPayload) => (await api.put<Student>(`/api/students/${id}`, payload)).data,
  updateStatus: async (id: string, status: Student["enrollmentStatus"]) =>
    (await api.patch<Student>(`/api/students/${id}/status`, { status })).data,
  remove: async (id: string) => api.delete(`/api/students/${id}`),
};

export const professorsApi = {
  list: async () => (await api.get<Professor[]>("/api/professors")).data,
  show: async (id: string) => (await api.get<Professor>(`/api/professors/${id}`)).data,
  create: async (payload: ProfessorPayload) => (await api.post<Professor>("/api/professors", payload)).data,
  update: async (id: string, payload: ProfessorPayload) => (await api.put<Professor>(`/api/professors/${id}`, payload)).data,
  remove: async (id: string) => api.delete(`/api/professors/${id}`),
};

export const schedulesApi = {
  list: async () => (await api.get<Schedule[]>("/api/schedules")).data,
  today: async () => (await api.get<Schedule[]>("/api/schedules/today")).data,
  show: async (id: string) => (await api.get<Schedule>(`/api/schedules/${id}`)).data,
  create: async (payload: SchedulePayload) => (await api.post<Schedule>("/api/schedules", payload)).data,
  update: async (id: string, payload: SchedulePayload) => (await api.put<Schedule>(`/api/schedules/${id}`, payload)).data,
  remove: async (id: string) => api.delete(`/api/schedules/${id}`),
};

export const classTypesApi = {
  list: async () => (await api.get<ClassType[]>("/api/class-types")).data,
  create: async (payload: ClassTypePayload) => (await api.post<ClassType>("/api/class-types", payload)).data,
  update: async (id: string, payload: ClassTypePayload) =>
    (await api.put<ClassType>(`/api/class-types/${id}`, payload)).data,
  remove: async (id: string) => api.delete(`/api/class-types/${id}`),
};

export const checkinsApi = {
  qrCheckin: async (qrCodeToken: string) => (await api.post<CheckIn>("/api/checkins/qr", { qrCodeToken })).data,
  manualCheckin: async (studentId: string) =>
    (await api.post<CheckIn>("/api/checkins/manual", { studentId })).data,
  checkout: async (id: string) => (await api.post<CheckIn>(`/api/checkins/${id}/checkout`)).data,
  stats: async (studentId: string) =>
    (await api.get<CheckInStats>(`/api/checkins/student/${studentId}/stats`)).data,
  history: async (studentId: string, page = 0) =>
    (await api.get<PageResponse<CheckIn>>(`/api/checkins/student/${studentId}/history`, { params: { page } })).data,
};
