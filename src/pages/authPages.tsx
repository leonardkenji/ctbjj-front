import { useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useAuth } from "../hooks/useAuth";
import type { Role } from "../types/models";

function dashboardPath(role: Role) {
  if (role === "ADMIN") return "/admin/dashboard";
  if (role === "PROFESSOR") return "/professor/dashboard";
  return "/student/dashboard";
}

const inputClass =
  "w-full rounded-xl border border-foreground/20 bg-background px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-foreground/30 focus:border-primary focus:ring-1 focus:ring-primary/10";

function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="flex-none px-4 sm:px-6 py-4 border-b border-foreground/8">
        <Link to="/" className="text-sm font-black tracking-tight hover:opacity-70 transition-opacity">
          CT BJJ
        </Link>
      </header>
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          {children}
        </div>
      </div>
    </div>
  );
}

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const user = await login(form);
      toast.success("Login realizado com sucesso.");
      navigate(dashboardPath(user.role));
    } catch {
      toast.error("E-mail ou senha inválidos.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthLayout>
      <p className="text-xs font-bold tracking-[0.35em] uppercase text-secondary mb-3">Acesso</p>
      <h1 className="text-2xl sm:text-3xl font-black mb-2">Entrar na plataforma</h1>
      <p className="text-sm text-muted mb-8">Use suas credenciais para acessar seu painel.</p>

      <form className="space-y-3" onSubmit={handleSubmit}>
        <input className={inputClass} placeholder="E-mail" type="email"
          autoCapitalize="none" autoCorrect="off" spellCheck={false}
          value={form.email} onChange={(e) => setForm((c) => ({ ...c, email: e.target.value.trim() }))} required />
        <input className={inputClass} placeholder="Senha" type="password"
          autoCapitalize="none" autoCorrect="off"
          value={form.password} onChange={(e) => setForm((c) => ({ ...c, password: e.target.value }))} required />
        <button type="submit" disabled={isSubmitting}
          className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground hover:opacity-80 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed">
          {isSubmitting ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </AuthLayout>
  );
}

export function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      await register(form);
      toast.success("Cadastro realizado com sucesso.");
      navigate("/student/dashboard");
    } catch {
      toast.error("Não foi possível concluir o cadastro.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthLayout>
      <p className="text-xs font-bold tracking-[0.35em] uppercase text-secondary mb-3">Novo cadastro</p>
      <h1 className="text-2xl sm:text-3xl font-black mb-2">Criar conta de aluno</h1>
      <p className="text-sm text-muted mb-8">Cadastre-se para acessar seus check-ins, QR code e histórico.</p>

      <form className="space-y-3" onSubmit={handleSubmit}>
        <input className={inputClass} placeholder="Nome completo"
          value={form.name} onChange={(e) => setForm((c) => ({ ...c, name: e.target.value }))} required />
        <input className={inputClass} placeholder="E-mail" type="email"
          value={form.email} onChange={(e) => setForm((c) => ({ ...c, email: e.target.value }))} required />
        <input className={inputClass} placeholder="Senha" type="password"
          value={form.password} onChange={(e) => setForm((c) => ({ ...c, password: e.target.value }))} required />
        <button type="submit" disabled={isSubmitting}
          className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground hover:opacity-80 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed">
          {isSubmitting ? "Criando conta..." : "Cadastrar"}
        </button>
      </form>

      <p className="mt-6 text-sm text-muted">
        Já possui acesso?{" "}
        <Link to="/login" className="font-semibold text-foreground hover:opacity-70 transition-opacity">
          Fazer login
        </Link>
      </p>
    </AuthLayout>
  );
}
