import type { ReactNode } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { AppLayout } from "../components/ui";
import { useAuth } from "../hooks/useAuth";
import { AdminDashboardPage, AdminStudentViewPage } from "../pages/adminPages";
import { LoginPage, RegisterPage } from "../pages/authPages";
import { CheckinKioskPage, ProfessorDashboardPage } from "../pages/professorPages";
import { HomePage } from "../pages/publicPages";
import { StudentDashboardPage } from "../pages/studentPages";
import { ForbiddenPage, NotFoundPage } from "../pages/systemPages";
import type { Role } from "../types/models";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate replace to="/login" />;
}

export function RoleGuard({ roles, children }: { roles: Role[]; children: ReactNode }) {
  const { user } = useAuth();
  if (!user) return <Navigate replace to="/login" />;
  return roles.includes(user.role) ? children : <Navigate replace to="/403" />;
}

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/403" element={<ForbiddenPage />} />

      <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
        <Route
          path="/student/dashboard"
          element={
            <RoleGuard roles={["STUDENT"]}>
              <StudentDashboardPage />
            </RoleGuard>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <RoleGuard roles={["ADMIN"]}>
              <AdminDashboardPage />
            </RoleGuard>
          }
        />
        <Route
          path="/admin/students/:studentId"
          element={
            <RoleGuard roles={["ADMIN"]}>
              <AdminStudentViewPage />
            </RoleGuard>
          }
        />
        <Route
          path="/professor/dashboard"
          element={
            <RoleGuard roles={["PROFESSOR", "ADMIN"]}>
              <ProfessorDashboardPage />
            </RoleGuard>
          }
        />
      </Route>

      <Route
        path="/checkin"
        element={
          <ProtectedRoute>
            <RoleGuard roles={["PROFESSOR", "ADMIN"]}>
              <CheckinKioskPage />
            </RoleGuard>
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
