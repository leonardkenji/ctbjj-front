import { Card } from "../components/Card";
import { useScrollReveal } from "../hooks/useScrollReveal";

export const Programs = () => {
  const headerRef = useScrollReveal()
  const card1Ref = useScrollReveal()
  const card2Ref = useScrollReveal()
  const card3Ref = useScrollReveal()

  return (
    <section id="programs" className="px-6 md:px-8 py-16 border-t border-foreground/8">
      <div ref={headerRef} className="reveal mb-10">
        <p className="text-secondary text-xs font-bold tracking-[0.35em] uppercase mb-3">
          O que treinar?
        </p>
        <h2 className="font-black text-4xl md:text-5xl">PROGRAMAS</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
        <div ref={card1Ref} className="reveal">
          <Card
            image="../src/assets/ctbjj-kids.png"
            location={["Toyota", "Hamamatsu"]}
            programTitle="Jiu Jitsu Kids"
            programDesc="Desenvolvemos disciplina, respeito e autoconfianca através do Jiu-Jitsu em um ambiente seguro e divertido. Uma atividade completa para o desenvolvimento físico e emocional das crianças."
          />
        </div>

        <div ref={card2Ref} className="reveal reveal-delay-200">
          <Card
            image="../src/assets/ctbjj-gi.png"
            location={["Toyota", "Hamamatsu"]}
            programTitle="Jiu Jitsu Adulto Kimono"
            programDesc="Treine o autentico Jiu-Jitsu com kimono em um ambiente de alta performance. Aprenda tecnicas refinadas, estrategias de combate e fundamentos solidos. Prepare-se para superar seus limites."
          />
        </div>

        <div ref={card3Ref} className="reveal reveal-delay-400">
          <Card
            image="../src/assets/ctbjj-no-gi.png"
            location={["Hamamatsu"]}
            programTitle="Jiu Jitsu No Gi"
            programDesc="Treine o estilo mais dinamico e intenso do Jiu-Jitsu moderno. Aprimore reflexos, movimentacao e estrategias de controle sem as pegadas do kimono. Evolua seu jogo para alto nivel."
          />
        </div>
      </div>
    </section>
  )
}
