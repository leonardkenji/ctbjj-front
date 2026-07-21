import { Card } from "../components/Card";
import { useScrollReveal } from "../hooks/useScrollReveal";
import ctbjjKids from '../assets/ctbjj-kids.png';
import ctbjjGi from '../assets/ctbjj-gi.png';
import ctbjjNoGi from '../assets/ctbjj-no-gi.png';
import mma from '../assets/mma.jpg';

export const Programs = () => {
  const headerRef = useScrollReveal()
  const card1Ref = useScrollReveal()
  const card2Ref = useScrollReveal()
  const card3Ref = useScrollReveal()
  const card4Ref = useScrollReveal()

  return (
    <section id="programs" className="px-6 md:px-8 py-16 border-t border-foreground/8">
      <div ref={headerRef} className="reveal mb-10">
        <p className="text-secondary text-xs font-bold tracking-[0.35em] uppercase mb-3">
          O que treinar?
        </p>
        <h2 className="font-black text-4xl md:text-5xl">PROGRAMAS</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 max-w-5xl mx-auto">
        <div ref={card1Ref} className="reveal">
          <Card
            image={ctbjjKids}
            location={["Toyota", "Hamamatsu"]}
            programTitle="Jiu Jitsu Kids"
            programDesc="Desenvolvemos disciplina, respeito e autoconfiança através do Jiu-Jitsu em um ambiente seguro e divertido. Uma atividade completa para o desenvolvimento físico e emocional das crianças."
          />
        </div>

        <div ref={card2Ref} className="reveal reveal-delay-200">
          <Card
            image={ctbjjGi}
            location={["Toyota", "Hamamatsu"]}
            programTitle="Jiu Jitsu Adulto Kimono"
            programDesc="Treine o autêntico Jiu-Jitsu com kimono em um ambiente de alta performance. Aprenda técnicas refinadas, estratégias de combate e fundamentos sólidos. Prepare-se para superar seus limites."
          />
        </div>

        <div ref={card3Ref} className="reveal reveal-delay-400">
          <Card
            image={ctbjjNoGi}
            location={["Hamamatsu"]}
            programTitle="Jiu Jitsu No Gi"
            programDesc="Treine o estilo mais dinâmico e intenso do Jiu-Jitsu moderno. Aprimore reflexos, movimentação e estratégias de controle sem as pegadas do kimono. Evolua seu jogo para alto nível."
          />
        </div>

        <div ref={card4Ref} className="reveal reveal-delay-400">
          <Card
            image={mma}
            location={["Hamamatsu"]}
            programTitle="Mixed Martial Arts - MMA"
            programDesc="Treine a modalidade mais completa e intensa dos esportes de combate. Desenvolva trocação, quedas, defesa pessoal, condicionamento físico e estratégia em um treino dinâmico que desafia corpo e mente."
          />
        </div>
      </div>
    </section>
  )
}
