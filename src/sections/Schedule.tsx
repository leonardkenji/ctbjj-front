type ClassType = "kids" | "adult-gi" | "no-gi" | "empty";

const CLASS_CONFIG: Record<Exclude<ClassType, "empty">, { label: string; bg: string; text: string }> = {
  kids: {
    label: "Kids BJJ",
    bg: "bg-amber-400",
    text: "text-amber-950",
  },
  "adult-gi": {
    label: "Adult Gi",
    bg: "bg-sky-500",
    text: "text-white",
  },
  "no-gi": {
    label: "No-Gi",
    bg: "bg-zinc-600",
    text: "text-zinc-100",
  },
};

interface Cell {
  type: ClassType;
  locations?: string[];
  colSpan?: number;
}

const rows: { time: string; end: string; cells: Cell[] }[] = [
  {
    time: "18:00",
    end: "19:00",
    cells: [
      { type: "kids", locations: ["Toyota", "Hamamatsu"], colSpan: 5 },
      { type: "kids", locations: ["Toyota", "Hamamatsu"] },
    ],
  },
  {
    time: "19:30",
    end: "21:00",
    cells: [
      { type: "adult-gi", locations: ["Toyota", "Hamamatsu"], colSpan: 5 },
      { type: "adult-gi", locations: ["Toyota", "Hamamatsu"] }
    ],
  },
  {
    time: "20:30",
    end: "22:00",
    cells: [
      { type: "no-gi", locations: ["Hamamatsu"], colSpan: 5 },
      { type: "no-gi", locations: ["Toyota", "Hamamatsu"] },
    ],
  },
];

const days = ["SEG", "TER", "QUA", "QUI", "SEX", "SAB"];

import { useScrollReveal } from "../hooks/useScrollReveal";

export const Schedule = () => {
  const headerRef = useScrollReveal()
  const legendRef = useScrollReveal()
  const tableRef = useScrollReveal()

  return (
    <section id="schedule" className="bg-primary text-primary-foreground py-16 px-6 md:px-8">

      {/* Header */}
      <div ref={headerRef} className="reveal mb-10">
        <p className="text-secondary text-xs font-black tracking-[0.35em] uppercase mb-4">
          Quando treinar?
        </p>
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
          HORÁRIOS
        </h2>
        <p className="text-primary-foreground/40 text-sm mt-3 font-semibold tracking-wide">
          Segunda a Sabado — Toyota & Hamamatsu
        </p>
      </div>

      {/* Legend */}
      <div ref={legendRef} className="reveal reveal-delay-100 flex flex-wrap gap-3 mb-8">
        {(Object.entries(CLASS_CONFIG) as [Exclude<ClassType, "empty">, typeof CLASS_CONFIG[Exclude<ClassType, "empty">]][]).map(
          ([key, config]) => (
            <span
              key={key}
              className={`${config.bg} ${config.text} px-3 py-1 text-xs font-black uppercase tracking-wider rounded-sm`}
            >
              {config.label}
            </span>
          )
        )}
      </div>

      {/* Table */}
      <div ref={tableRef} className="reveal reveal-delay-200 overflow-x-auto">
        <table className="w-full min-w-140 border-collapse text-sm">
          <thead>
            <tr>
              <th className="bg-white/10 text-primary-foreground/60 px-4 py-3 text-xs font-black uppercase tracking-widest text-left w-24 border-b border-white/10">
                HORA
              </th>
              {days.map((day) => (
                <th
                  key={day}
                  className="bg-white/10 text-primary-foreground/60 px-3 py-3 text-xs font-black uppercase tracking-widest text-center border-b border-b-white/10 border-l border-l-white/5"
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b border-white/8">
                {/* Time column */}
                <td className="px-4 py-4 text-xs font-black tabular-nums tracking-tight whitespace-nowrap border-r border-white/10">
                  <span className="text-primary-foreground">{row.time}</span>
                  <br />
                  <span className="text-primary-foreground/30">{row.end}</span>
                </td>

                {/* Class cells */}
                {row.cells.map((cell, j) => {
                  if (cell.type === "empty") {
                    return (
                      <td
                        key={j}
                        colSpan={cell.colSpan}
                        className="px-2 py-4 border-l border-white/5 bg-white/3"
                      />
                    );
                  }

                  const config = CLASS_CONFIG[cell.type];
                  return (
                    <td
                      key={j}
                      colSpan={cell.colSpan}
                      className="px-2 py-3 border-l border-white/5"
                    >
                      <div className={`${config.bg} ${config.text} rounded-sm px-3 py-2 text-center`}>
                        <p className="font-black text-xs uppercase tracking-wider leading-tight">
                          {config.label}
                        </p>
                        {cell.locations && (
                          <p className="text-[10px] font-semibold opacity-70 mt-0.5 tracking-wide">
                            {cell.locations.join(" · ")}
                          </p>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer note */}
      <p className="mt-6 text-primary-foreground/30 text-xs font-semibold tracking-wide">
        * Horarios sujeitos a alteracao. Confirme com a academia.
      </p>
    </section>
  );
};
