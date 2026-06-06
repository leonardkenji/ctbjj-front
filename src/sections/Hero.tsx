export const Hero = () => {
  return (
    <section id="hero" className="relative min-h-[calc(100vh-64px)] flex items-center bg-background overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-15"
        style={{ backgroundImage: `url('src/assets/banner.png')` }}
      />

      {/* Content */}
      <div className="relative z-10 w-full flex items-center">
        <div className="w-full px-6 md:p-10">
          <p className="text-xs font-black text-center tracking-[0.35em] uppercase text-secondary mb-6 animate-fade-in">
            Fábrica de Campeões
          </p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl text-center font-black text-primary leading-none mb-6 animate-fade-in animation-delay-150">
            World Class Jiu Jitsu
            <br />
            <span className="text-2xl sm:text-3xl md:text-4xl">Disciplina, Honra e União</span>
          </h1>

          <div className="mx-auto flex max-w-2xl flex-col items-center justify-center text-center">
            <p className="mx-auto mb-10 max-w-md text-center text-base md:text-lg leading-relaxed text-foreground/80 animate-fade-in animation-delay-300">
              Formando campeões dentro e fora dos tatames.
              Disciplina, técnica e respeito em cada treino.
              Uma família unida pela arte suave.
            </p>

            <div className="flex flex-wrap justify-center gap-4 animate-fade-in animation-delay-300">
              <a
                href="#programs"
                className="inline-flex items-center bg-secondary text-muted-foreground text-base md:text-2xl font-black tracking-[0.2em] uppercase px-6 md:px-8 py-3 md:py-4 hover:bg-secondary/80 transition-colors rounded-sm"
              >
                QUERO TREINAR!
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
