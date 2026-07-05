import { PublicLayout } from "../components/ui";

const privacySections = [
  {
    title: "Coleta de Informacoes",
    text: "Esta pagina serve como modelo padrao para a futura politica de privacidade da empresa. Os textos abaixo podem ser ajustados conforme os processos reais de coleta, armazenamento e tratamento de dados pessoais adotados pela academia.",
  },
  {
    title: "Uso dos Dados",
    text: "Os dados informados por usuarios, alunos ou responsaveis poderao ser utilizados para atendimento, matricula, comunicacoes institucionais, organizacao interna e melhoria dos servicos oferecidos, sempre respeitando a legislacao aplicavel.",
  },
  {
    title: "Compartilhamento e Seguranca",
    text: "Informacoes pessoais nao devem ser compartilhadas de forma indevida. A organizacao deve adotar medidas razoaveis para proteger os dados contra acessos nao autorizados, uso incorreto, divulgacao indevida ou alteracoes indevidas.",
  },
];

const termsSections = [
  {
    title: "Aceitacao dos Termos",
    text: "Ao acessar este site, o visitante concorda com estes termos de uso como um modelo inicial. O conteudo definitivo podera ser revisado futuramente para refletir as regras operacionais, comerciais e juridicas da empresa.",
  },
  {
    title: "Uso do Conteudo",
    text: "As informacoes publicadas neste site possuem carater informativo e institucional. Textos, imagens, marcas e demais elementos nao devem ser reproduzidos, modificados ou utilizados sem autorizacao previa quando aplicavel.",
  },
  {
    title: "Responsabilidades",
    text: "A empresa podera atualizar horarios, servicos, unidades, eventos e demais conteudos a qualquer momento. O usuario deve confirmar informacoes importantes por canais oficiais antes de tomar decisoes com base exclusiva neste site.",
  },
];

function LegalBlock({
  id,
  eyebrow,
  title,
  intro,
  sections,
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
  sections: { title: string; text: string }[];
}) {
  return (
    <section id={id} className="scroll-mt-28 rounded-sm border border-foreground/10 bg-foreground/[0.02] p-6 md:p-10">
      <p className="text-secondary text-xs font-black tracking-[0.35em] uppercase mb-3">{eyebrow}</p>
      <h2 className="text-primary text-3xl md:text-5xl font-black tracking-tight">{title}</h2>
      <p className="mt-4 max-w-3xl text-sm md:text-base leading-relaxed text-foreground/65">{intro}</p>

      <div className="mt-8 grid gap-5">
        {sections.map((section) => (
          <article key={section.title} className="border-t border-foreground/10 pt-5">
            <h3 className="text-primary text-lg md:text-xl font-black">{section.title}</h3>
            <p className="mt-2 text-sm md:text-base leading-relaxed text-foreground/65">{section.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function LegalPage() {
  return (
    <PublicLayout>
      <section className="px-6 md:px-8 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <p className="text-secondary text-xs font-black tracking-[0.35em] uppercase mb-4">
              Informacoes Legais
            </p>
            <h1 className="text-primary text-5xl md:text-7xl font-black tracking-tight leading-none">
              TERMOS E PRIVACIDADE
            </h1>
            <p className="mt-5 max-w-3xl text-sm md:text-base leading-relaxed text-foreground/65">
              Esta e uma pagina institucional padrao criada para servir como base inicial. Os textos
              podem ser substituidos posteriormente pelas versoes juridicas definitivas da empresa.
            </p>
          </div>

          <div className="grid gap-6">
            <LegalBlock
              id="privacy-policy"
              eyebrow="Privacidade"
              title="Politica de Privacidade"
              intro="Este conteudo apresenta um modelo simples para explicar como informacoes podem ser tratadas dentro do ambiente digital da academia."
              sections={privacySections}
            />

            <LegalBlock
              id="terms-of-service"
              eyebrow="Uso do Site"
              title="Termos de Uso"
              intro="Este bloco organiza um conjunto basico de diretrizes sobre navegacao, uso do conteudo e responsabilidades relacionadas ao site."
              sections={termsSections}
            />
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
