import { Link } from "react-router-dom";

import { Button, Card, PublicLayout } from "../components/ui";

export function ForbiddenPage() {
  return (
    <PublicLayout>
      <div className="mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center px-6">
        <Card className="w-full text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-rose-300/70">403</p>
          <h1 className="mt-3 text-4xl font-semibold text-white">Acesso negado</h1>
          <p className="mt-4 text-slate-400">
            Seu perfil não tem permissão para acessar esta área.
          </p>
          <Link to="/" className="mt-6 inline-block">
            <Button>Voltar para o início</Button>
          </Link>
        </Card>
      </div>
    </PublicLayout>
  );
}

export function NotFoundPage() {
  return (
    <PublicLayout>
      <div className="mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center px-6">
        <Card className="w-full text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-amber-300/70">404</p>
          <h1 className="mt-3 text-4xl font-semibold text-white">Página não encontrada</h1>
          <p className="mt-4 text-slate-400">
            O endereço que você tentou abrir não existe ou foi movido.
          </p>
          <Link to="/" className="mt-6 inline-block">
            <Button>Ir para a home</Button>
          </Link>
        </Card>
      </div>
    </PublicLayout>
  );
}
