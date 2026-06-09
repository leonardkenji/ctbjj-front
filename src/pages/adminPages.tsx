import { useState } from "react";
import type { FormEvent, ReactNode } from "react";

import { useCreateProfessor, useDeleteProfessor, useProfessorsData, useUpdateProfessor } from "../hooks/useProfessorsData";
import { useCreateStudent, useDeleteStudent, useStudents, useUpdateStudent } from "../hooks/useStudents";
import { Navbar } from "../layout/Navbar";
import { Input } from "../components/ui";
import type { Belt, EnrollmentStatus, Professor, Student } from "../types/models";

type Tab = "students" | "professors";

export function AdminDashboardPage() {
  const [tab, setTab] = useState<Tab | null>(null);

  return (
    <>
      <Navbar />
      <div className="px-32 py-32">
        <h1 className="text-2xl font-semibold">Painel Admin</h1>

        <div className="mt-8 flex gap-4">
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
    </>
  );
}

// ── Student list ──────────────────────────────────────────────────────────────

function StudentList() {
  const { data, isLoading } = useStudents(0, 100);
  const { mutate: remove } = useDeleteStudent();
  const [target, setTarget] = useState<Student | null | "new">(null);

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
        rows={data?.content ?? []}
        columns={["Nome", "Email", "Faixa", "Status"]}
        renderRow={(s) => [s.name, s.email, s.belt ?? "—", s.enrollmentStatus]}
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
      stripes: fields.stripes ? Number(fields.stripes) : undefined,
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
          className="w-full rounded-2xl border border-foreground/20 bg-transparent px-4 py-3 text-sm outline-none focus:border-primary resize-none"
        />
      </Field>
      <button
        type="submit"
        disabled={isPending}
        className="mt-2 rounded-lg bg-primary py-2.5 text-sm font-medium text-primary-foreground hover:opacity-80 transition-opacity disabled:opacity-50"
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
    photoUrl: initial?.photoUrl ?? "",
    active: initial?.active ?? true,
    displayOrder: String(initial?.displayOrder ?? ""),
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
      stripes: fields.stripes ? Number(fields.stripes) : undefined,
      bio: fields.bio || undefined,
      photoUrl: fields.photoUrl || undefined,
      active: fields.active,
      displayOrder: fields.displayOrder ? Number(fields.displayOrder) : undefined,
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
          className="w-full rounded-2xl border border-foreground/20 bg-transparent px-4 py-3 text-sm outline-none focus:border-primary resize-none"
        />
      </Field>
      <Field label="URL da foto"><Input value={fields.photoUrl} onChange={set("photoUrl")} /></Field>
      <Field label="Ordem de exibição"><Input type="number" min={0} value={fields.displayOrder} onChange={set("displayOrder")} /></Field>
      <Field label="Ativo">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={fields.active}
            onChange={(e) => setFields((prev) => ({ ...prev, active: e.target.checked }))}
            className="h-4 w-4"
          />
          Visível no site
        </label>
      </Field>
      <button
        type="submit"
        disabled={isPending}
        className="mt-2 rounded-lg bg-primary py-2.5 text-sm font-medium text-primary-foreground hover:opacity-80 transition-opacity disabled:opacity-50"
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
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 w-full max-w-lg max-h-[90vh] flex flex-col bg-background rounded-2xl shadow-2xl">
        <div className="flex items-center justify-between border-b border-foreground/10 px-6 py-4">
          <h2 className="font-semibold">{title}</h2>
          <button onClick={onClose} className="text-xl leading-none hover:opacity-60 transition-opacity">×</button>
        </div>
        <div className="overflow-y-auto px-6 py-6">{children}</div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-muted">{label}</label>
      {children}
    </div>
  );
}

function Select({ children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { children: ReactNode }) {
  return (
    <select
      {...props}
      className="w-full rounded-2xl border border-foreground/20 bg-background px-4 py-3 text-sm outline-none focus:border-primary"
    >
      {children}
    </select>
  );
}

interface UserTableProps<T extends { id: string }> {
  rows: T[];
  columns: string[];
  renderRow: (row: T) => string[];
  onDelete: (row: T) => void;
  onEdit: (row: T) => void;
}

function UserTable<T extends { id: string }>({ rows, columns, renderRow, onDelete, onEdit }: UserTableProps<T>) {
  if (rows.length === 0)
    return <p className="text-muted">Nenhum registro encontrado.</p>;

  return (
    <table className="w-full border-collapse text-sm">
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
            <tr key={row.id} className="border-b border-foreground/5 hover:bg-foreground/5">
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
  );
}
