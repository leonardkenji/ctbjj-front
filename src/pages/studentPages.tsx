import { QRCodeSVG } from "qrcode.react";

import { useCurrentStudent, useStudentStats } from "../hooks/useStudents";
import { Navbar } from "../layout/Navbar";
import type { EnrollmentStatus } from "../types/models";

const statusStyle: Record<EnrollmentStatus, string> = {
  ACTIVE:    "bg-green-100 text-green-800",
  TRIAL:     "bg-blue-100 text-blue-800",
  INACTIVE:  "bg-gray-100 text-gray-600",
  SUSPENDED: "bg-red-100 text-red-700",
};

const statusLabel: Record<EnrollmentStatus, string> = {
  ACTIVE:    "Ativo",
  TRIAL:     "Experimental",
  INACTIVE:  "Inativo",
  SUSPENDED: "Suspenso",
};

const CHECKINS_PER_GRADE = 50;

export function StudentDashboardPage() {
  const { data } = useCurrentStudent();
  const { data: stats } = useStudentStats(data?.id);

  if (!data) return <div>Loading...</div>

  const total = stats?.totalCheckIns ?? 0;
  const done = total % CHECKINS_PER_GRADE;
  const remaining = CHECKINS_PER_GRADE - done;

  return (
    <>
    <Navbar/>
      <div className="p-32 text-center">
        <p>Bem vindo {data.name}</p>
        <span className={`mt-2 inline-block rounded-full px-3 py-0.5 text-sm font-medium ${statusStyle[data.enrollmentStatus]}`}>
              {statusLabel[data.enrollmentStatus]}
        </span>
        {data.qrCodeToken && (
          <div className="mt-4 flex justify-center">
            <QRCodeSVG value={data.qrCodeToken} size={200} />
          </div>
        )}
      </div>
      <div className="container mx-auto">
        <div className="flex items-start gap-8 px-32 mx-auto">
          <div className="flex-1">
            <p>Aluno desde: {data.enrollmentDate}</p>
            <p>Faixa {data.belt}</p>
            <p>Grau {data.stripes}</p>

          </div>
          <div className="flex flex-col items-center gap-1">
            <p>Aulas Atendidas: {total}</p>
            <span className="text-8xl font-bold leading-none">{remaining}</span>
            <p className="text-sm text-gray-500">aulas para o próximo grau</p>
          </div>
        </div>
      </div>
    </>
 );
}
