import type { StaffCardProps } from "../interface/StaffCardProps"

const BELT_COLORS: Record<string, string> = {
  branca: "bg-white border border-neutral-300 text-neutral-700",
  azul: "bg-blue-600 text-white",
  roxa: "bg-purple-600 text-white",
  marrom: "bg-amber-800 text-white",
  preta: "bg-neutral-900 text-white border border-neutral-600",
  amarela: "bg-yellow-500 text-white",
  laranja: "bg-orange-500 text-white",
}

export const StaffCard = ({
  name,
  role,
  photo,
  belt,
  title,
  achievements,
  bio,
}: StaffCardProps) => {
  const isProfessor = role === "professor"

  return (
    <div className="bg-background border border-foreground/8 rounded-sm overflow-hidden h-full flex flex-col group hover:shadow-lg hover:border-foreground/20 transition-all duration-300">
      <div className="relative overflow-hidden">
        <img
          src={photo}
          alt={name}
          className="w-full h-56 object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />
        <span
          className={`absolute top-3 right-3 text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm ${BELT_COLORS[belt]}`}
        >
          {belt}
        </span>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <p className="text-secondary text-[10px] font-bold tracking-widest uppercase mb-1">
          {isProfessor ? (title ?? "Professor") : "Aluno Campeão"}
        </p>
        <h3 className="text-primary text-lg font-black tracking-tight uppercase mb-3">
          {name}
        </h3>

        {bio && (
          <p className="text-foreground/55 text-xs leading-relaxed mb-4 whitespace-pre-line">{bio}</p>
        )}

        {!isProfessor && achievements && achievements.length > 0 && (
          <ul className="mt-auto space-y-1">
            {achievements.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-foreground/55">
                <span className="text-secondary mt-0.5">▸</span>
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
