import { useScrollReveal } from "../hooks/useScrollReveal";

const methodologySteps = [
  {
    number: "01",
    title: "Luz",
    text: ["Criar espaços"],
  },
  {
    number: "02",
    title: "Ferro",
    text: ["Pressão constante"],
  },
  {
    number: "03",
    title: "Atalho",
    text: ["Encurtar caminho"],
  },
  {
    number: "04",
    title: "Vento",
    text: ["Movimentação inteligente"],
  },
  {
    number: "05",
    title: "Fogo",
    text: ["Ataque no momento certo"],
  },
];

const methodologyTracks = [
  {
    label: "Os 5 Pilares Técnicos",
    subtitle: "Fundamentos e adaptacao",
    text: ["1. Quedas", "2. Controle Posicional", "3. Passagem de Guarda", "4. Raspagens" , "5. Finalizações e Defesas"],
  },
  {
    label: "Método CTBJJ de Aprendizagem",
    subtitle: "Aprender, Repetir, Aplicar, Competir, Ensinar",
    text: ["1. Explicação da técnica", "2. Drill técnico", "3. Drill com resistência", "4. Sparring específico", "5. Sparring livre", "6. Revisão"],
  },
  {
    label: "Sistema de Evolução",
    subtitle: "Trajetória",
    text: ["1. Fundamentos", "2. Intermediário", "3. Avançado", "4. Competição" , "5. Professor"],
  },
  {
    label: "Competicao",
    subtitle: "Treino orientado a performance",
    text: ["1. Quedas", "2. Controle Posicional", "3. Passagem de Guarda", "4. Raspagens" , "5. Finalizações e Defesas"],
  },
];

const estruturaAula = [
  {
    number: "01",
    label: "Aquecimento específico",
    text: "Aquecimento antes do treino",
  },
  {
    number: "02",
    label: "Movimento fundamental",
    text: "Movimento básico para a técnica do dia",
  },
  {
    number: "03",
    label: "Técnica do dia",
    text: "Movimentação específica de ataque/defesa",
  },
  {
    number: "04",
    label: "Drills",
    text: "Praticar o movimento",
  },
  {
    number: "05",
    label: "Sparring posicional",
    text: "Praticar o movimento em situação de combate",
  },
  {
    number: "06",
    label: "Sparring",
    text: "Praticar situação de combate",
  },
];

export const Methodology = () => {
  const headerRef = useScrollReveal();
  const introRef = useScrollReveal();
  const stepsRef = useScrollReveal();
  const tracksRef = useScrollReveal();
  const aulaRef = useScrollReveal();
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
              Como Nasceu a Metodologia CTBJJ
            </h2>
          </div>

        </div>
        <div className="rounded-sm border border-white/10 bg-white/5 p-6 lg:p-8 mt-12 space-y-6">
            <p className="text-primary-foreground/50 text-xs font-black tracking-[0.3em] uppercase mb-3">
              Visao Geral
            </p>
            <p className="text-base md:text-lg leading-relaxed text-primary-foreground/80">
              A Metodologia CTBJJ não foi criada em uma sala de reuniões. Ela foi construída diariamente no tatame, ao longo de anos ensinando crianças, adultos, atletas de alto rendimento e praticantes que buscavam o Jiu-Jítsu como ferramenta para transformar suas vidas.</p>

            <p className="text-base md:text-lg leading-relaxed text-primary-foreground/80">
              Nossa história começa com os ensinamentos do meu mestre, Grande Mestre Osvaldo Alves, cuja visão técnica e pedagógica formou gerações de faixas-pretas e influenciou profundamente a maneira como entendemos o Jiu-Jítsu. Quando fundei a Carlos Toyota Brazilian Jiu-Jitsu (CTBJJ) no Japão, enfrentei um grande desafio: ensinar alunos de diferentes idades, culturas, idiomas e objetivos. Havia quem quisesse competir em alto nível, quem buscasse defesa pessoal, condicionamento físico ou apenas desenvolver disciplina e confiança. Percebi que apenas conhecer muitas técnicas não era suficiente.
            </p>
            <p className="text-base md:text-lg leading-relaxed text-primary-foreground/80">
              Era necessário criar um método de ensino simples, organizado e eficiente, que permitisse a qualquer aluno evoluir de forma consistente e a qualquer professor transmitir o conhecimento com o mesmo padrão de qualidade. Foi assim que começamos a observar cada detalhe do treinamento: o que acelerava a aprendizagem, quais erros eram mais frequentes, como os campeões resolviam problemas durante as lutas e quais princípios se repetiam independentemente da técnica utilizada. Depois de milhares de horas de aulas, seminários, competições e formação de atletas campeões, identificamos padrões que deram origem aos cinco conceitos que hoje definem a identidade da CTBJJ: Luz, Ferro, Atalho, Vento e Fogo. Esses conceitos resumem a essência do nosso Jiu-Jítsu e servem como uma linguagem comum para professores e alunos.
            </p>
            <p className="text-base md:text-lg leading-relaxed text-primary-foreground/80">
              A metodologia também foi estruturada sobre cinco pilares técnicos      fundamentais: Quedas, Controle Posicional, Passagem de Guarda, Raspagens e Finalizações, organizados em uma sequência lógica de aprendizagem que permite ao aluno construir uma base sólida antes de avançar para técnicas mais complexas. Mais do que formar campeões, a Metodologia CTBJJ existe para formar pessoas. Acreditamos que disciplina, respeito, coragem, humildade e perseverança são valores tão importantes quanto qualquer medalha conquistada. Cada treino, cada graduação e cada competição fazem parte de um processo maior: desenvolver pessoas fortes física, técnica e mentalmente.
            </p>
            <p className="text-base md:text-lg leading-relaxed text-primary-foreground/80">
              Essa é a essência da CTBJJ.
            </p>
            <p className="text-base md:text-lg leading-relaxed text-primary-foreground/80">
              Não ensinamos apenas golpes.
            </p>
            <p className="text-base md:text-lg leading-relaxed text-primary-foreground/80">
              Ensinamos uma maneira de pensar, de lutar e de viver.
            </p>
            <p className="text-base md:text-lg leading-relaxed text-primary-foreground/80">
              CTBJJ – Forjados na Pressão.
            </p>
          </div>

        <div ref={introRef} className="reveal reveal-delay-100 mt-14 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-sm border border-white/10 bg-secondary text-primary p-8">
            <p className="text-xs font-black tracking-[0.3em] uppercase mb-4">0. Base</p>
            <h3 className="text-3xl md:text-4xl font-black leading-tight mb-4">
              “Do fundamento à excelência.”
            </h3>
            <ul className="text-sm md:text-base leading-relaxed text-primary/80">
              <li>Disciplina</li>
              <li>Respeito</li>
              <li>Espírito de equipe</li>
              <li>Fé, humildade e perseverança</li>
            </ul>
            <p className="text-sm md:text-base leading-relaxed font-black text-primary/80 mt-12">
              Lema
            </p>
            <h3 className="text-3xl md:text-4xl font-black leading-tight mb-4">
              “FORJADOS NA PRESSÃO.
              A ORDEM É PRA PEGAR.”
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {methodologySteps.map((step) => (
              <article key={step.number} className="rounded-sm border border-white/10 bg-white/5 p-6">
                <p className="text-secondary text-4xl font-black leading-none">{step.number}</p>
                <h3 className="mt-5 text-xl font-black uppercase tracking-[0.15em]">{step.title}</h3>
                <ul className="mt-4 text-sm leading-relaxed text-primary-foreground/70">{step.text.map((content =>
                  <li key={content}>{content}</li>
                ))}</ul>
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
                <ul
                  className={`mt-4 text-sm leading-relaxed ${
                    index === 0 ? "text-primary/70" : "text-primary-foreground/70"
                  }`}
                >
                  {track.text.map((track =>
                    <li key={track}>{track}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>

        <div ref={aulaRef} className="reveal reveal-delay-100 mt-16">
          <div className="mb-6">
            <p className="text-primary-foreground/40 text-xs font-black tracking-[0.3em] uppercase mb-2">
              Rotina
            </p>
            <h3 className="text-3xl md:text-4xl font-black">ESTRUTURA DA AULA</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {estruturaAula.map((aula) => (
              <article key={aula.number} className="rounded-sm border border-white/10 bg-white/5 p-6">
                <p className="text-secondary text-4xl font-black leading-none">{aula.number}</p>
                <h3 className="mt-5 text-xl font-black uppercase tracking-[0.15em]">{aula.label}</h3>
                <p className="mt-4 text-sm leading-relaxed text-primary-foreground/70">{aula.text}
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
            Filosofia CTBJJ
          </p>
          <h3 className="text-3xl md:text-4xl font-black leading-tight max-w-2xl">
            “Treinamos para vencer, mas também para formar pessoas disciplinadas, resilientes e preparadas para qualquer desafio dentro e fora do tatame.”
          </h3>
         </div>
      </div>
    </section>
  );
};
