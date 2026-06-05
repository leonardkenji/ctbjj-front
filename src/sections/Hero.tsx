export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-background overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url('src/assets/banner.png')` }}
      />

      {/* Content */}
      <div className="relative z-10 w-full flex items-center">
        <div className="w-full p-10">
          <p className="text-xs font-black text-center tracking-[0.35em] uppercase text-secondary mb-6 animate-fade-in">
            Fábrica de Campeões
          </p>
          <h1 className="text-7xl text-center font-black text-primary leading-none mb-6 animate-fade-in animation-delay-150">
            World Class Jiu Jitsu
            <br />
            <span className=" text-4xl">Disciplina, Honra e União</span>
          </h1>

          <div className="mx-auto flex max-w-2xl flex-col items-center justify-center text-center">
            <p className="mx-auto mb-10 max-w-md text-center text-lg leading-relaxed text-foreground/55 animate-fade-in animation-delay-300">
              Hand-picked Japanese performance cars for enthusiasts who demand
              authenticity, power, and style.
            </p>

            <div className="flex flex-wrap justify-center gap-4 animate-fade-in animation-delay-300">
              <a
                href="#cars"
                className="inline-flex items-center bg-secondary text-muted-foreground text-2xl font-black tracking-[0.2em] uppercase px-8 py-4 hover:bg-secondary/80 transition-colors rounded-sm"
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
