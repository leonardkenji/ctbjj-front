import { useScrollReveal } from "../hooks/useScrollReveal";

const methodologySteps = [
  {
    number: "01",
    title: "Entrada Guiada",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer feugiat, libero vitae ullamcorper congue, velit ligula suscipit lorem, non congue tortor lectus sed justo.",
  },
  {
    number: "02",
    title: "Base Tecnica",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed luctus, orci sed tempor vulputate, nisl lectus aliquam lorem, in ultricies est risus in massa.",
  },
  {
    number: "03",
    title: "Evolucao Modular",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
  },
];

const methodologyTracks = [
  {
    label: "Iniciante",
    subtitle: "Fundamentos e adaptacao",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel erat vitae urna aliquam iaculis quis et mauris.",
  },
  {
    label: "Intermediario",
    subtitle: "Consolidacao tecnica",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas fermentum nisi eu magna sollicitudin, in pulvinar arcu posuere.",
  },
  {
    label: "Avancado",
    subtitle: "Combinacoes e leitura",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam faucibus tortor vel purus congue, ut iaculis tellus elementum.",
  },
  {
    label: "Competicao",
    subtitle: "Treino orientado a performance",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent faucibus mi at urna tincidunt, vitae convallis lacus convallis.",
  },
];

export const Methodology = () => {
  const headerRef = useScrollReveal();
  const introRef = useScrollReveal();
  const stepsRef = useScrollReveal();
  const tracksRef = useScrollReveal();
  const ctaRef = useScrollReveal();

  return (
    <section id="methodology" className="bg-primary text-primary-foreground px-6 md:px-8 py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div ref={headerRef} className="reveal grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="text-secondary text-xs font-black tracking-[0.35em] uppercase mb-4">
              Nossa Metodologia
            </p>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none max-w-3xl">
              UM CAMINHO CLARO PARA EVOLUIR NO JIU JITSU
            </h2>
          </div>

          <div className="rounded-sm border border-white/10 bg-white/5 p-6 lg:p-8">
            <p className="text-primary-foreground/50 text-xs font-black tracking-[0.3em] uppercase mb-3">
              Visao Geral
            </p>
            <p className="text-base md:text-lg leading-relaxed text-primary-foreground/80">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur non velit sed
              odio tincidunt placerat. Nulla facilisi. Integer posuere, lacus eget consequat
              volutpat, justo mauris finibus turpis, vitae bibendum urna nunc non odio.
            </p>
          </div>
        </div>

        <div ref={introRef} className="reveal reveal-delay-100 mt-14 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-sm border border-white/10 bg-secondary text-primary p-8">
            <p className="text-xs font-black tracking-[0.3em] uppercase mb-4">Ponto de Partida</p>
            <h3 className="text-3xl md:text-4xl font-black leading-tight mb-4">
              Progressao estruturada para cada etapa da jornada
            </h3>
            <p className="text-sm md:text-base leading-relaxed text-primary/80">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus faucibus, nulla ut
              feugiat interdum, lectus nibh mattis sem, vel vulputate arcu tortor sit amet purus.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {methodologySteps.map((step) => (
              <article key={step.number} className="rounded-sm border border-white/10 bg-white/5 p-6">
                <p className="text-secondary text-4xl font-black leading-none">{step.number}</p>
                <h3 className="mt-5 text-xl font-black uppercase tracking-[0.15em]">{step.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-primary-foreground/70">{step.text}</p>
              </article>
            ))}
          </div>
        </div>

        <div ref={stepsRef} className="reveal reveal-delay-200 mt-16">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <p className="text-primary-foreground/40 text-xs font-black tracking-[0.3em] uppercase mb-2">
                Modulos
              </p>
              <h3 className="text-3xl md:text-4xl font-black">FASES DE DESENVOLVIMENTO</h3>
            </div>
          </div>

          <div ref={tracksRef} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {methodologyTracks.map((track, index) => (
              <article
                key={track.label}
                className={`rounded-sm border border-white/10 p-6 ${
                  index === 0 ? "bg-white text-primary" : "bg-white/5 text-primary-foreground"
                }`}
              >
                <p
                  className={`text-xs font-black uppercase tracking-[0.3em] ${
                    index === 0 ? "text-primary/50" : "text-primary-foreground/40"
                  }`}
                >
                  {track.label}
                </p>
                <h4 className="mt-4 text-2xl font-black leading-tight">{track.subtitle}</h4>
                <p
                  className={`mt-4 text-sm leading-relaxed ${
                    index === 0 ? "text-primary/70" : "text-primary-foreground/70"
                  }`}
                >
                  {track.text}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div
          ref={ctaRef}
          className="reveal reveal-delay-200 mt-16 rounded-sm border border-white/10 bg-gradient-to-r from-white/8 via-white/4 to-transparent p-8 md:p-10"
        >
          <p className="text-primary-foreground/40 text-xs font-black tracking-[0.3em] uppercase mb-3">
            Proxima Etapa
          </p>
          <h3 className="text-3xl md:text-4xl font-black leading-tight max-w-2xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor.
          </h3>
          <p className="mt-4 max-w-2xl text-sm md:text-base leading-relaxed text-primary-foreground/70">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus porta, lorem sit amet
            rutrum accumsan, leo justo semper lorem, in efficitur sem est sed nisl.
          </p>
          <a
            href="#schedule"
            className="inline-flex items-center mt-6 bg-secondary text-primary text-sm md:text-base font-black tracking-[0.2em] uppercase px-6 py-3 rounded-sm hover:bg-secondary/85 transition-colors"
          >
            Conheca a Rotina
          </a>
        </div>
      </div>
    </section>
  );
};
