import { useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { Button, Card, Input, PublicLayout } from "../components/ui";
import { useAuth } from "../hooks/useAuth";
import type { Role } from "../types/models";

function dashboardPath(role: Role) {
  if (role === "ADMIN") return "/admin/dashboard";
  if (role === "PROFESSOR") return "/professor/dashboard";
  return "/student/dashboard";
}

function AuthFormShell({
  title,
  subtitle,
  footer,
  children,
}: {
  title: string;
  subtitle: string;
  footer: ReactNode;
  children: ReactNode;
}) {
  return (
    <PublicLayout>
      <div className="mx-auto flex min-h-[calc(100vh-80px)] max-w-6xl items-center px-6 py-16">
          <Card className="mx-auto">
            <p className="text-sm uppercase tracking-[0.35em] text-primary">Acesso</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">{title}</h2>
            <p className="mt-3 text-sm text-slate-400">{subtitle}</p>
            <div className="mt-8">{children}</div>
            <div className="mt-6 text-sm text-slate-400">{footer}</div>
          </Card>
      </div>
    </PublicLayout>
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
    <AuthFormShell
      title="Entrar na plataforma"
      subtitle="Use suas credenciais para acessar seu painel."
      footer={
        <>
          Ainda não tem conta?{" "}
          <Link to="/register" className="font-semibold text-primary">
            Criar conta
          </Link>
        </>
      }
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input
          placeholder="E-mail"
          type="email"
          value={form.email}
          onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
          required
        />
        <Input
          placeholder="Senha"
          type="password"
          value={form.password}
          onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
          required
        />
        <Button className="w-full py-3" disabled={isSubmitting} type="submit">
          {isSubmitting ? "Entrando..." : "Entrar"}
        </Button>
      </form>
    </AuthFormShell>
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
    <AuthFormShell
      title="Criar conta de aluno"
      subtitle="Cadastre-se para acessar seus check-ins, QR code e histórico."
      footer={
        <>
          Já possui acesso?{" "}
          <Link to="/login" className="font-semibold text-primary">
            Fazer login
          </Link>
        </>
      }
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input
          placeholder="Nome completo"
          value={form.name}
          onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
          required
        />
        <Input
          placeholder="E-mail"
          type="email"
          value={form.email}
          onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
          required
        />
        <Input
          placeholder="Senha"
          type="password"
          value={form.password}
          onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
          required
        />
        <Button className="w-full py-3" disabled={isSubmitting} type="submit">
          {isSubmitting ? "Criando conta..." : "Cadastrar"}
        </Button>
      </form>
    </AuthFormShell>
  );
}
