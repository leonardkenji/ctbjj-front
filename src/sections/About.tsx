import { StaffCard } from "../components/StaffCard"
import { useScrollReveal } from "../hooks/useScrollReveal"

export const About = () => {
  const headerRef = useScrollReveal()
  const text1Ref = useScrollReveal()
  const text2Ref = useScrollReveal()
  const text3Ref = useScrollReveal()
  const teamTitleRef = useScrollReveal()
  const teamGridRef = useScrollReveal()

  return (
    <section id="about" className="px-6 md:px-8 py-20 max-w-5xl mx-auto">
      <div ref={headerRef} className="reveal mb-10">
        <p className="text-secondary text-xs font-bold tracking-[0.35em] uppercase mb-3">
          Nossa Filosofia
        </p>
        <h1 className="text-primary text-5xl font-black tracking-tight">
          SOBRE NÓS
        </h1>
      </div>

      <div className="space-y-5 text-foreground/60 text-base leading-relaxed font-medium mb-20">
        <p ref={text1Ref} className="reveal">
          Os princípios do Jiu-Jitsu constroem traços de caráter que nos transformam e moldam nossa
          visão de mundo. Eles guiam nossa conduta independente das circunstâncias e definem como
          nos relacionamos com os outros em cada desafio do dia a dia.
        </p>
        <p ref={text2Ref} className="reveal reveal-delay-100">
          Nossos alunos aprendem técnicas, mas acima disso, recebem a oportunidade de aprimorar
          seu caráter. Diante da vitória e da derrota, precisarão tomar decisões que definem quem
          são — celebrando conquistas com humildade, e enfrentando as dificuldades com uma
          mentalidade resiliente que os acompanhará para além dos tatames.
        </p>
        <p ref={text3Ref} className="reveal reveal-delay-200">
          É através do processo de pequenas evoluções diárias que você se torna um artista
          marcial dentro e fora dos tatames.
        </p>
      </div>

      <div>
        <h2 ref={teamTitleRef} className="reveal text-primary text-3xl font-black tracking-tight mb-8">
          Nosso Time
        </h2>
        <div ref={teamGridRef} className="reveal grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          <StaffCard
            name="Carlos Toyota"
            role="professor"
            photo="src/assets/toyota.png"
            belt="preta"
            title="Head Coach"
            bio="Lorem Ipsum"
          />
          <StaffCard
            name="Leandro Hirae"
            role="professor"
            photo="src/assets/lenadro-hirae.png"
            belt="preta"
            title="Coach"
            bio="Lorem Ipsum"
          />
          <StaffCard
            name="Enzo Yamato"
            role="aluno-campeao"
            photo="src/assets/yamato.png"
            belt="roxa"
            title="Atleta"
            bio={`GRAND SLAM 2026 🏆\nWORLD CHAMPION 🥇🌎\nRIZIN Koshien Champ 🏆`}
          />
          <StaffCard
            name="Christian Matsuo"
            role="aluno-campeao"
            photo="src/assets/matsuo.png"
            belt="roxa"
            title="Atleta"
            bio={`🇦🇪🥇 1X ABU DHABI WORLD\n🇺🇸🥉 1X IBJJF PAN\n🇯🇵🥇 5X SJJIF WORLD\n🇯🇵🥇 3X IBJJF ASIAN\n🇯🇵🥇 5X ADCC`}
          />
          <StaffCard
            name="Julia Iwamura"
            role="aluno-campeao"
            photo="src/assets/julia.png"
            belt="amarela"
            title="Atleta"
            bio={`🇦🇪🥇 1X ABU DHABI WORLD\n🥇 1X JAPAN WORLD\n🥈 TOP 2 EUROPEU\n🥈 TOP 2 BRASIL`}
          />
          <StaffCard
            name="Isabela Kadoguchi"
            role="aluno-campeao"
            photo="src/assets/kadoguchi.png"
            belt="laranja"
            title="Atleta"
            bio={`🥇 Asian Kids IBJJF\n🥈 Top 2 Mundial Pankids 2024\n🥇🥇 Word Japan`}
          />
        </div>
      </div>
    </section>
  )
}
