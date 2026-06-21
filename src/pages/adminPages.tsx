import { useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useCreateProfessor, useDeleteProfessor, useProfessorsData, useUpdateProfessor } from "../hooks/useProfessorsData";
import { useCreateStudent, useDeleteStudent, useStudent, useStudentHistory, useStudentStats, useStudents, useStudentsStats, useUpdateStudent } from "../hooks/useStudents";
import { Navbar } from "../layout/Navbar";
import { Input } from "../components/ui";
import type { Belt, EnrollmentStatus, Professor, Student } from "../types/models";
import { beltLabels, formatDate, formatDateTime, statusLabels } from "../utils/format";

type Tab = "students" | "professors";

const CHECKINS_PER_GRADE = 50;
const BELT_BG: Record<string, string> = {
  WHITE: "bg-white text-gray-900 border border-gray-300",
  BLUE: "bg-blue-600 text-white",
  PURPLE: "bg-purple-600 text-white",
  BROWN: "bg-amber-800 text-white",
  BLACK: "bg-gray-900 text-white",
};

const STATUS_BG: Record<EnrollmentStatus, string> = {
  ACTIVE: "bg-green-100 text-green-700 ring-1 ring-green-200",
  TRIAL: "bg-blue-100 text-blue-700 ring-1 ring-blue-200",
  INACTIVE: "bg-gray-100 text-gray-600 ring-1 ring-gray-200",
  SUSPENDED: "bg-red-100 text-red-700 ring-1 ring-red-200",
};

export function AdminDashboardPage() {
  const [tab, setTab] = useState<Tab | null>(null);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="px-4 sm:px-6 lg:px-12 pt-20 pb-12">
        <p className="text-[10px] font-bold tracking-[0.35em] uppercase text-secondary mb-2">Gestão</p>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Painel Admin</h1>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            onClick={() => navigate("/checkin")}
            className="rounded-lg bg-primary px-6 py-2.5 font-medium text-primary-foreground hover:opacity-80 transition-opacity"
          >
            Abrir Check-in
          </button>
          <div className="w-px h-6 bg-foreground/20" />
          <button
            onClick={() => setTab("students")}
            className={`rounded-lg px-6 py-2.5 font-medium transition-colors ${
              tab === "students"
                ? "bg-primary text-primary-foreground"
                : "border border-foreground/20 hover:bg-foreground/5"
            }`}
          >
            Alunos
          </button>
          <button
            onClick={() => setTab("professors")}
            className={`rounded-lg px-6 py-2.5 font-medium transition-colors ${
              tab === "professors"
                ? "bg-primary text-primary-foreground"
                : "border border-foreground/20 hover:bg-foreground/5"
            }`}
          >
            Professores
          </button>
        </div>

        <div className="mt-8">
          {tab === "students" && <StudentList />}
          {tab === "professors" && <ProfessorList />}
        </div>
      </div>
    </div>
  );
}

export function AdminStudentViewPage() {
  const navigate = useNavigate();
  const { studentId } = useParams<{ studentId: string }>();
  const { data: student, isLoading: isLoadingStudent } = useStudent(studentId);
  const { data: stats, isLoading: isLoadingStats } = useStudentStats(studentId);
  const { data: history, isLoading: isLoadingHistory } = useStudentHistory(studentId, 0);

  if (isLoadingStudent || isLoadingStats || isLoadingHistory) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="px-4 sm:px-6 lg:px-12 pt-24 pb-12">
          <p className="text-muted">Carregando aluno...</p>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="px-4 sm:px-6 lg:px-12 pt-24 pb-12 space-y-4">
          <p className="text-muted">Aluno não encontrado.</p>
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="rounded-lg border border-foreground/20 px-4 py-2 text-sm font-medium hover:bg-foreground/5 transition-colors"
          >
            Voltar ao painel
          </button>
        </div>
      </div>
    );
  }

  const totalClasses = stats?.totalClasses ?? 0;
  const totalMinutes = stats?.totalMinutes ?? 0;
  const done = totalClasses % CHECKINS_PER_GRADE;
  const remaining = CHECKINS_PER_GRADE - done;
  const progress = (done / CHECKINS_PER_GRADE) * 100;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-16">
        <div className="pt-4 mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <button
              onClick={() => navigate("/admin/dashboard")}
              className="mb-4 rounded-lg border border-foreground/20 px-4 py-2 text-sm font-medium hover:bg-foreground/5 transition-colors"
            >
              Voltar para alunos
            </button>
            <p className="text-[10px] font-bold tracking-[0.35em] uppercase text-secondary mb-2">
              Gestão do Aluno
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight">{student.name}</h1>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${STATUS_BG[student.enrollmentStatus]}`}>
                {statusLabels[student.enrollmentStatus]}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_0.9fr] gap-4">
          <div className="space-y-4">
            <div className="rounded-2xl border border-foreground/10 bg-white p-5 sm:p-6 shadow-sm">
              <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-muted mb-5">
                Progresso para o próximo grau
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

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <StatTile label="Total de Aulas" value={String(totalClasses)} />
              <StatTile label="Graus" value={String(student.stripes ?? 0)} />
              <StatTile label="Minutos" value={String(totalMinutes)} />
              <div className="rounded-2xl border border-foreground/10 bg-white shadow-sm p-4 flex flex-col items-center justify-center gap-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted">Faixa</p>
                {student.belt ? (
                  <span className={`rounded px-2.5 py-1 text-[10px] font-bold ${BELT_BG[student.belt] ?? "bg-foreground/10 text-foreground"}`}>
                    {beltLabels[student.belt]}
                  </span>
                ) : (
                  <span className="text-foreground/30 text-sm font-semibold">—</span>
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-foreground/10 bg-white shadow-sm p-5 sm:p-6">
              <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-muted mb-4">
                Histórico recente
              </p>
              <div className="space-y-3">
                {(history?.content ?? []).length === 0 ? (
                  <p className="text-sm text-muted">Nenhum check-in registrado ainda.</p>
                ) : (
                  (history?.content ?? []).slice(0, 8).map((entry) => (
                    <div key={entry.id} className="flex items-center justify-between gap-4 rounded-xl border border-foreground/10 px-4 py-3">
                      <div>
                        <p className="text-sm font-semibold">{formatDateTime(entry.checkInTime)}</p>
                        <p className="text-xs uppercase tracking-wider text-muted">Método: {entry.method}</p>
                      </div>
                      <p className="text-xs text-right text-muted">
                        {entry.checkOutTime ? `Checkout ${formatDateTime(entry.checkOutTime)}` : "Sem checkout"}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-foreground/10 bg-white shadow-sm p-5 sm:p-6">
              <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-muted mb-4">
                Dados do aluno
              </p>
              <InfoRow label="Email" value={student.email} />
              <InfoRow label="Telefone" value={student.phone || "—"} />
              <InfoRow label="Nascimento" value={formatDate(student.birthDate)} />
              <InfoRow label="Matrícula" value={formatDate(student.enrollmentDate)} />
              <InfoRow label="Criado em" value={formatDate(student.createdAt)} />
            </div>

            <div className="rounded-2xl border border-foreground/10 bg-white shadow-sm p-5 sm:p-6">
              <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-muted mb-4">
                Observações
              </p>
              <p className="text-sm leading-relaxed text-foreground/80">
                {student.notes?.trim() ? student.notes : "Nenhuma observação cadastrada."}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// ── Student list ──────────────────────────────────────────────────────────────

function StudentList() {
  const { data, isLoading } = useStudents(0, 100);
  const { mutate: remove } = useDeleteStudent();
  const [target, setTarget] = useState<Student | null | "new">(null);
  const students = data?.content ?? [];
  const { data: totalClassesByStudent, isLoading: isLoadingStats } = useStudentsStats(
    students.map((student) => student.id),
  );

  if (isLoading || isLoadingStats) return <p className="text-muted">Carregando...</p>;

  return (
    <>
      <div className="mb-4 flex justify-end">
        <button
          onClick={() => setTarget("new")}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-80 transition-opacity"
        >
          Novo
        </button>
      </div>

      <UserTable
        rows={students}
        columns={["Nome", "Email", "Faixa", "Progress", "Status"]}
        renderRow={(s) => {
          const totalClasses = totalClassesByStudent?.[s.id] ?? 0;
          const done = totalClasses % CHECKINS_PER_GRADE;
          const remaining = CHECKINS_PER_GRADE - done;

          return [
            <Link
              key={`${s.id}-name`}
              to={`/admin/students/${s.id}`}
              className="font-semibold text-primary hover:underline underline-offset-4"
            >
              {s.name}
            </Link>,
            s.email,
            s.belt ? beltLabels[s.belt] : "—",
            `${remaining} faltam`,
            statusLabels[s.enrollmentStatus],
          ];
        }}
        onEdit={(s) => setTarget(s)}
        onDelete={(s) => { if (window.confirm(`Remover ${s.name}?`)) remove(s.id); }}
      />

      <Modal
        open={target !== null}
        title={target === "new" ? "Novo aluno" : "Editar aluno"}
        onClose={() => setTarget(null)}
      >
        <StudentForm
          initial={target === "new" ? null : target}
          onSuccess={() => setTarget(null)}
        />
      </Modal>
    </>
  );
}

function StudentForm({ initial, onSuccess }: { initial: Student | null; onSuccess: () => void }) {
  const { mutate: create, isPending: creating } = useCreateStudent();
  const { mutate: update, isPending: updating } = useUpdateStudent();
  const isPending = creating || updating;

  const [fields, setFields] = useState({
    name: initial?.name ?? "",
    email: initial?.email ?? "",
    password: "",
    phone: initial?.phone ?? "",
    birthDate: initial?.birthDate ?? "",
    belt: (initial?.belt ?? "") as Belt | "",
    stripes: String(initial?.stripes ?? ""),
    enrollmentStatus: (initial?.enrollmentStatus ?? "ACTIVE") as EnrollmentStatus,
    enrollmentDate: initial?.enrollmentDate ?? "",
    notes: initial?.notes ?? "",
  });

  const set = (k: keyof typeof fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setFields((prev) => ({ ...prev, [k]: e.target.value }));

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const payload = {
      name: fields.name,
      email: fields.email,
      ...(fields.password ? { password: fields.password } : {}),
      phone: fields.phone || undefined,
      birthDate: fields.birthDate || undefined,
      belt: (fields.belt || undefined) as Belt | undefined,
      stripes: Number(fields.stripes) || 0,
      enrollmentStatus: fields.enrollmentStatus,
      enrollmentDate: fields.enrollmentDate || undefined,
      notes: fields.notes || undefined,
    };

    if (initial) {
      update({ id: initial.id, payload }, { onSuccess });
    } else {
      create(payload, { onSuccess });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Field label="Nome"><Input required value={fields.name} onChange={set("name")} /></Field>
      <Field label="Email"><Input required type="email" value={fields.email} onChange={set("email")} /></Field>
      <Field label={initial ? "Nova senha (opcional)" : "Senha"}>
        <Input type="password" required={!initial} value={fields.password} onChange={set("password")} />
      </Field>
      <Field label="Telefone"><Input value={fields.phone} onChange={set("phone")} /></Field>
      <Field label="Data de nascimento"><Input type="date" value={fields.birthDate} onChange={set("birthDate")} /></Field>
      <Field label="Faixa">
        <Select value={fields.belt} onChange={set("belt")}>
          <option value="">—</option>
          {(["WHITE", "BLUE", "PURPLE", "BROWN", "BLACK"] as Belt[]).map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </Select>
      </Field>
      <Field label="Graus">
        <Select value={fields.stripes} onChange={set("stripes")}>
          {[0, 1, 2, 3, 4].map((n) => <option key={n} value={n}>{n}</option>)}
        </Select>
      </Field>
      <Field label="Status">
        <Select required value={fields.enrollmentStatus} onChange={set("enrollmentStatus")}>
          {(["ACTIVE", "TRIAL", "INACTIVE", "SUSPENDED"] as EnrollmentStatus[]).map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </Select>
      </Field>
      <Field label="Data de matrícula"><Input type="date" value={fields.enrollmentDate} onChange={set("enrollmentDate")} /></Field>
      <Field label="Observações">
        <textarea
          value={fields.notes}
          onChange={set("notes")}
          rows={3}
          className="w-full rounded-xl border border-foreground/20 bg-background text-foreground px-4 py-3 text-sm outline-none focus:border-primary transition-colors resize-none"
        />
      </Field>
      <button
        type="submit"
        disabled={isPending}
        className="mt-2 rounded-xl bg-primary py-2.5 text-sm font-bold text-primary-foreground hover:opacity-80 transition-opacity disabled:opacity-50"
      >
        {isPending ? "Salvando..." : "Salvar"}
      </button>
    </form>
  );
}

// ── Professor list ────────────────────────────────────────────────────────────

function ProfessorList() {
  const { data, isLoading } = useProfessorsData();
  const { mutate: remove } = useDeleteProfessor();
  const [target, setTarget] = useState<Professor | null | "new">(null);

  if (isLoading) return <p className="text-muted">Carregando...</p>;

  return (
    <>
      <div className="mb-4 flex justify-end">
        <button
          onClick={() => setTarget("new")}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-80 transition-opacity"
        >
          Novo
        </button>
      </div>

      <UserTable
        rows={data ?? []}
        columns={["Nome", "Email", "Faixa"]}
        renderRow={(p) => [p.name, p.email, p.belt ?? "—"]}
        onEdit={(p) => setTarget(p)}
        onDelete={(p) => { if (window.confirm(`Remover ${p.name}?`)) remove(p.id); }}
      />

      <Modal
        open={target !== null}
        title={target === "new" ? "Novo professor" : "Editar professor"}
        onClose={() => setTarget(null)}
      >
        <ProfessorForm
          initial={target === "new" ? null : target}
          onSuccess={() => setTarget(null)}
        />
      </Modal>
    </>
  );
}

function ProfessorForm({ initial, onSuccess }: { initial: Professor | null; onSuccess: () => void }) {
  const { mutate: create, isPending: creating } = useCreateProfessor();
  const { mutate: update, isPending: updating } = useUpdateProfessor();
  const isPending = creating || updating;

  const [fields, setFields] = useState({
    name: initial?.name ?? "",
    email: initial?.email ?? "",
    password: "",
    belt: (initial?.belt ?? "") as Belt | "",
    stripes: String(initial?.stripes ?? ""),
    bio: initial?.bio ?? "",
  });

  const set = (k: keyof typeof fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setFields((prev) => ({ ...prev, [k]: e.target.value }));

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const payload = {
      name: fields.name,
      email: fields.email,
      ...(fields.password ? { password: fields.password } : {}),
      belt: (fields.belt || undefined) as Belt | undefined,
      stripes: Number(fields.stripes) || 0,
      bio: fields.bio || undefined,
      active: initial?.active ?? true,
      displayOrder: initial?.displayOrder ?? 0,
    };

    if (initial) {
      update({ id: initial.id, payload }, { onSuccess });
    } else {
      create(payload, { onSuccess });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Field label="Nome"><Input required value={fields.name} onChange={set("name")} /></Field>
      <Field label="Email"><Input required type="email" value={fields.email} onChange={set("email")} /></Field>
      <Field label={initial ? "Nova senha (opcional)" : "Senha"}>
        <Input type="password" required={!initial} value={fields.password} onChange={set("password")} />
      </Field>
      <Field label="Faixa">
        <Select value={fields.belt} onChange={set("belt")}>
          <option value="">—</option>
          {(["WHITE", "BLUE", "PURPLE", "BROWN", "BLACK"] as Belt[]).map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </Select>
      </Field>
      <Field label="Graus">
        <Select value={fields.stripes} onChange={set("stripes")}>
          {[0, 1, 2, 3, 4].map((n) => <option key={n} value={n}>{n}</option>)}
        </Select>
      </Field>
      <Field label="Bio">
        <textarea
          value={fields.bio}
          onChange={set("bio")}
          rows={3}
          className="w-full rounded-xl border border-foreground/20 bg-background text-foreground px-4 py-3 text-sm outline-none focus:border-primary transition-colors resize-none"
        />
      </Field>
      <button
        type="submit"
        disabled={isPending}
        className="mt-2 rounded-xl bg-primary py-2.5 text-sm font-bold text-primary-foreground hover:opacity-80 transition-opacity disabled:opacity-50"
      >
        {isPending ? "Salvando..." : "Salvar"}
      </button>
    </form>
  );
}

// ── Shared UI ─────────────────────────────────────────────────────────────────

function Modal({ open, title, onClose, children }: { open: boolean; title: string; onClose: () => void; children: ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative z-10 w-full max-w-lg max-h-[90vh] flex flex-col bg-background border border-foreground/10 rounded-2xl shadow-2xl">
        <div className="flex items-center justify-between border-b border-foreground/10 px-6 py-4">
          <h2 className="font-semibold">{title}</h2>
          <button onClick={onClose} className="text-xl leading-none text-foreground/40 hover:text-foreground transition-colors">×</button>
        </div>
        <div className="overflow-y-auto px-6 py-6">{children}</div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold uppercase tracking-wider text-muted">{label}</label>
      {children}
    </div>
  );
}

function Select({ children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { children: ReactNode }) {
  return (
    <select
      {...props}
      className="w-full rounded-xl border border-foreground/20 bg-background text-foreground px-4 py-3 text-sm outline-none focus:border-primary transition-colors"
    >
      {children}
    </select>
  );
}

interface UserTableProps<T extends { id: string }> {
  rows: T[];
  columns: string[];
  renderRow: (row: T) => ReactNode[];
  onDelete: (row: T) => void;
  onEdit: (row: T) => void;
}

function UserTable<T extends { id: string }>({ rows, columns, renderRow, onDelete, onEdit }: UserTableProps<T>) {
  if (rows.length === 0)
    return <p className="text-muted">Nenhum registro encontrado.</p>;

  return (
    <div className="overflow-x-auto -mx-1">
    <table className="w-full border-collapse text-sm min-w-[480px]">
      <thead>
        <tr className="border-b border-foreground/10 text-left text-muted">
          {columns.map((col) => (
            <th key={col} className="pb-3 pr-6 font-medium">{col}</th>
          ))}
          <th className="pb-3 font-medium">Ações</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => {
          const cells = renderRow(row);
          return (
            <tr key={row.id} className="border-b border-foreground/8 hover:bg-foreground/3 transition-colors">
              {cells.map((cell, i) => (
                <td key={i} className="py-3 pr-6">{cell}</td>
              ))}
              <td className="py-3">
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(row)}
                    className="rounded px-3 py-1 text-xs border border-foreground/20 hover:bg-foreground/5 transition-colors"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => onDelete(row)}
                    className="rounded px-3 py-1 text-xs border border-red-500/40 text-red-600 hover:bg-red-500/10 transition-colors"
                  >
                    Remover
                  </button>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 py-3 border-b border-foreground/10 last:border-b-0 last:pb-0 first:pt-0">
      <p className="text-[10px] font-bold uppercase tracking-widest text-muted">{label}</p>
      <p className="text-sm font-semibold text-right">{value}</p>
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
