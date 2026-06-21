import { QRCodeSVG } from "qrcode.react";

import { useCurrentStudent, useStudentStats } from "../hooks/useStudents";
import { Navbar } from "../layout/Navbar";
import type { EnrollmentStatus } from "../types/models";

const statusStyle: Record<EnrollmentStatus, string> = {
  ACTIVE:    "bg-green-100 text-green-700 ring-1 ring-green-200",
  TRIAL:     "bg-blue-100 text-blue-700 ring-1 ring-blue-200",
  INACTIVE:  "bg-gray-100 text-gray-600 ring-1 ring-gray-200",
  SUSPENDED: "bg-red-100 text-red-700 ring-1 ring-red-200",
};

const statusLabel: Record<EnrollmentStatus, string> = {
  ACTIVE: "Ativo", TRIAL: "Experimental", INACTIVE: "Inativo", SUSPENDED: "Suspenso",
};

const BELT_BG: Record<string, string> = {
  WHITE:  "bg-white text-gray-900 border border-gray-300",
  BLUE:   "bg-blue-600 text-white",
  PURPLE: "bg-purple-600 text-white",
  BROWN:  "bg-amber-800 text-white",
  BLACK:  "bg-gray-900 text-white",
};

const BELT_LABEL: Record<string, string> = {
  WHITE: "Branca", BLUE: "Azul", PURPLE: "Roxa", BROWN: "Marrom", BLACK: "Preta",
};

const CHECKINS_PER_GRADE = 50;

export function StudentDashboardPage() {
  const { data } = useCurrentStudent();
  const { data: stats } = useStudentStats(data?.id);

  if (!data) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="h-8 w-8 rounded-full border-2 border-foreground/20 border-t-secondary animate-spin" />
    </div>
  );

  const total = stats?.totalClasses ?? 0;
  const done = total % CHECKINS_PER_GRADE;
  const remaining = CHECKINS_PER_GRADE - done;
  const progress = (done / CHECKINS_PER_GRADE) * 100;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-20 pb-16">
        <div className="mb-8 pt-4">
          <p className="text-[10px] font-bold tracking-[0.35em] uppercase text-secondary mb-2">
            Área do Aluno
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">{data.name}</h1>
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle[data.enrollmentStatus]}`}>
              {statusLabel[data.enrollmentStatus]}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_260px] gap-4">
          <div className="space-y-4">
            {/* Progress */}
            <div className="rounded-2xl border border-foreground/10 bg-white p-5 sm:p-6 shadow-sm">
              <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-muted mb-5">
                Progresso — próximo grau
              </p>
              <div className="flex items-end justify-between mb-4">
                <div>
                  <span className="text-4xl sm:text-5xl font-black tabular-nums">{done}</span>
                  <span className="text-foreground/40 ml-1.5 text-sm font-semibold">/ {CHECKINS_PER_GRADE} aulas</span>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-muted uppercase tracking-widest font-bold">Faltam</p>
                  <p className="text-3xl font-black text-secondary tabular-nums">{remaining}</p>
                </div>
              </div>
              <div className="h-1.5 rounded-full bg-foreground/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-secondary transition-all duration-700"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3">
              <StatTile label="Total de Aulas" value={String(total)} />
              <StatTile label="Graus" value={String(data.stripes ?? 0)} />
              <div className="rounded-2xl border border-foreground/10 bg-white shadow-sm p-4 flex flex-col items-center justify-center gap-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted">Faixa</p>
                {data.belt ? (
                  <span className={`rounded px-2.5 py-1 text-[10px] font-bold ${BELT_BG[data.belt] ?? "bg-foreground/10 text-foreground"}`}>
                    {BELT_LABEL[data.belt] ?? data.belt}
                  </span>
                ) : (
                  <span className="text-foreground/30 text-sm font-semibold">—</span>
                )}
              </div>
            </div>

            {data.enrollmentDate && (
              <div className="rounded-2xl border border-foreground/10 bg-white shadow-sm px-5 py-4 flex items-center justify-between">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted">Aluno desde</p>
                <p className="text-sm font-semibold">{data.enrollmentDate}</p>
              </div>
            )}
          </div>

          {/* QR Code — first on mobile */}
          {data.qrCodeToken && (
            <div className="rounded-2xl border border-foreground/10 bg-white shadow-sm p-6 flex flex-col items-center justify-center gap-4 order-first md:order-last">
              <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-muted">Meu QR Code</p>
              <div className="bg-white p-2 rounded-xl border border-foreground/10">
                <QRCodeSVG value={data.qrCodeToken} size={164} />
              </div>
              <p className="text-[11px] text-muted text-center leading-relaxed max-w-50">
                Apresente ao professor para registrar sua presença
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function StatTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-foreground/10 bg-white shadow-sm p-4 flex flex-col items-center justify-center gap-1">
      <p className="text-2xl sm:text-3xl font-black tabular-nums">{value}</p>
      <p className="text-[10px] font-bold uppercase tracking-widest text-muted text-center">{label}</p>
    </div>
  );
}
