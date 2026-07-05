import { useScrollReveal } from "../hooks/useScrollReveal";

const featuredNews = {
  tag: "Destaque",
  title: "Equipe conquista resultados expressivos em campeonato regional",
  excerpt:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Curabitur euismod, libero quis facilisis hendrerit, augue libero ultrices augue, sed hendrerit odio velit non neque.",
  meta: "Atualizado recentemente",
};

const newsItems = [
  {
    tag: "Campeonatos",
    title: "Atletas confirmados para a proxima competicao nacional",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse potenti. Aenean luctus elit sed orci feugiat, sit amet interdum sapien maximus.",
  },
  {
    tag: "Empresa",
    title: "Nova iniciativa fortalece a comunidade dentro e fora do tatame",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at arcu nec mauris condimentum bibendum sit amet ac sem.",
  },
  {
    tag: "Highlights",
    title: "Semana de treinos especiais com foco em tecnica e performance",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fermentum, sem non tempus dictum, justo purus pretium tortor, at posuere arcu lectus vel nibh.",
  },
];

export const News = () => {
  const headerRef = useScrollReveal();
  const featuredRef = useScrollReveal();
  const gridRef = useScrollReveal();

  return (
    <section id="news" className="px-6 md:px-8 py-20 border-t border-foreground/8 bg-background">
      <div className="max-w-6xl mx-auto">
        <div ref={headerRef} className="reveal mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-secondary text-xs font-black tracking-[0.35em] uppercase mb-3">
              Ultimas Novidades
            </p>
            <h2 className="text-primary text-4xl md:text-6xl font-black tracking-tight leading-none">
              NEWS & HIGHLIGHTS
            </h2>
          </div>
          <p className="max-w-xl text-sm md:text-base leading-relaxed text-foreground/60 font-medium">
            Espaco pensado para anuncios da equipe, resultados de campeonatos, destaques da semana
            e noticias importantes da academia.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.3fr_0.7fr]">
          <article
            ref={featuredRef}
            className="reveal rounded-sm border border-foreground/10 bg-primary text-primary-foreground p-8 md:p-10"
          >
            <p className="text-secondary text-xs font-black tracking-[0.3em] uppercase mb-4">
              {featuredNews.tag}
            </p>
            <h3 className="text-3xl md:text-5xl font-black leading-tight max-w-3xl">
              {featuredNews.title}
            </h3>
            <p className="mt-5 max-w-2xl text-sm md:text-base leading-relaxed text-primary-foreground/70">
              {featuredNews.excerpt}
            </p>
          </article>

          <div ref={gridRef} className="reveal reveal-delay-100 grid gap-5">
            {newsItems.map((item) => (
              <article key={item.title} className="rounded-sm border border-foreground/10 bg-foreground/[0.03] p-6">
                <p className="text-secondary text-[11px] font-black tracking-[0.25em] uppercase mb-3">
                  {item.tag}
                </p>
                <h3 className="text-primary text-xl font-black leading-snug">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/60 font-medium">
                  {item.excerpt}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
