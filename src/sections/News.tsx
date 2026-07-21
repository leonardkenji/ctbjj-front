import { useScrollReveal } from "../hooks/useScrollReveal";

const featuredNews = {
  tag: "Campeonato",
  title: "🥋 Shikoku Open Jiu-Jitsu Championship 2026",
  excerpt:
    `No dia 2 de agosto, o tatame do Soyjoy Budokan, em Naruto, Tokushima, receberá atletas de diversas categorias para mais uma grande competição oficial da ASJJF. O Shikoku Open é um evento certificado com duas estrelas, e seus resultados contam pontos para o ranking de atletas da federação. Uma grande oportunidade para competir, testar suas habilidades e representar sua academia!

    🏆🔥 📅 Data: 2 de agosto de 2026
    📍 Local: Soyjoy Budokan — Naruto, Tokushima
    ⏰ Inscrições até: 23 de julho, às 23h59

    Não fique de fora. Prepare o quimono, entre no tatame e venha viver essa experiência!`,
  meta: "Atualizado recentemente",
};

const newsItems = [
  {
    tag: "Atleta CTBJJ",
    title: "🥇 Isabela Kadoguchi é campeã da Dreamgirls Cup!",
    excerpt:
      "Representando a Carlos Toyota BJJ, Isabela brilhou no ART.7 e conquistou o título do torneio feminino Sub-21. Com técnica, determinação e muita personalidade dentro do tatame, ela superou grandes adversárias e mostrou por que é um dos jovens talentos mais promissores do jiu-jítsu. Uma conquista que representa o resultado de muito treino, dedicação e coragem. Parabéns, campeã! 👏🔥.",
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
            <p className="mt-5 max-w-2xl whitespace-pre-line text-sm md:text-base leading-relaxed text-primary-foreground/70">
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
