# CTBJJ Front

Frontend do sistema de gestão da academia **CTBJJ** (Brazilian Jiu-Jitsu). Permite check-in de alunos via QR Code, acompanhamento de frequência, gerenciamento de turmas e horários, além de uma página pública institucional.

## Tecnologias

- **React 19** + **TypeScript**
- **Vite 8**
- **Tailwind CSS v4**
- **TanStack Query v5** — gerenciamento de estado do servidor
- **React Router v7**
- **Axios** — client HTTP com interceptors de autenticação JWT
- **html5-qrcode** / **qrcode.react** — leitura e geração de QR Codes
- **react-hot-toast** — notificações

## Pré-requisitos

- Node.js 20+
- Backend Spring Boot rodando (ver repositório `ctbjj-back`)

## Configuração

Copie o arquivo de exemplo e ajuste as variáveis:

```bash
cp .env.example .env
```

| Variável | Descrição |
|---|---|
| `VITE_API_URL` | URL base do backend (usada em produção/rede local, ex: `http://192.168.1.10:8080`) |
| `VITE_API_PROXY_TARGET` | Alvo do proxy do Vite em desenvolvimento (padrão: `http://localhost:8080`) |

> Em desenvolvimento, as chamadas para `/api/*` são proxiadas automaticamente pelo Vite para `VITE_API_PROXY_TARGET`. Em produção (build), o Nginx deve fazer o proxy.

## Instalação e execução

```bash
npm install
npm run dev
```

O app estará disponível em `http://localhost:5173`.

## Build para produção

```bash
npm run build
```

Os arquivos gerados ficam em `dist/` e podem ser servidos por qualquer servidor estático (Nginx, etc.).

## Estrutura de pastas

```
src/
├── api/          # Cliente Axios e endpoints (resources.ts)
├── components/   # Componentes reutilizáveis (Button, Card, etc.)
├── contexts/     # Contexto de autenticação (AuthContext)
├── hooks/        # Custom hooks (useAuth, useStudents, useCheckins…)
├── interface/    # Tipos de props dos componentes
├── layout/       # Navbar e Footer
├── pages/        # Agrupamento de páginas por papel (admin, professor, student, public)
├── router/       # AppRouter com proteção de rotas por papel
├── sections/     # Seções da página pública (Hero, About, Programs…)
├── types/        # Modelos de domínio (Student, Professor, Schedule, CheckIn…)
└── utils/        # Utilitários (cn, format, theme)
```

## Papéis e rotas protegidas

| Papel | Rotas acessíveis |
|---|---|
| Público | `/`, `/login`, `/register` |
| `STUDENT` | `/student/dashboard` |
| `PROFESSOR` | `/professor/dashboard`, `/checkin` |
| `ADMIN` | `/admin/dashboard`, `/admin/students/:id`, `/professor/dashboard`, `/checkin` |

A autenticação usa JWT armazenado no `localStorage` (`ctbjj.auth`). Respostas `401` limpam o token e redirecionam para `/login` automaticamente.

## Check-in via QR Code

A rota `/checkin` é um quiosque para professores/admins. O aluno apresenta o QR Code gerado no seu dashboard e o professor escaneia pela câmera para registrar a presença. O check-in também pode ser feito manualmente pelo painel do professor.
