import { useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

type ClassType = "kids" | "adult-gi" | "no-gi" | "empty";
type LocationUnit = "Hamamatsu" | "Toyota" | "Ibaraki" | "Hekinan";

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
  colSpan?: number;
}

interface Row {
  time: string;
  end: string;
  cells: Cell[];
}

const days = ["SEG", "TER", "QUA", "QUI", "SEX", "SAB"];

const locationButtons: LocationUnit[] = ["Hamamatsu", "Toyota", "Ibaraki", "Hekinan"];

const scheduleByLocation: Record<LocationUnit, Row[]> = {
  Hamamatsu: [
    {
      time: "18:00",
      end: "19:00",
      cells: [
        { type: "kids", colSpan: 5 },
        { type: "kids" },
      ],
    },
    {
      time: "19:30",
      end: "21:00",
      cells: [
        { type: "adult-gi", colSpan: 5 },
        { type: "adult-gi" },
      ],
    },
    {
      time: "20:30",
      end: "22:00",
      cells: [
        { type: "no-gi", colSpan: 5 },
        { type: "no-gi" },
      ],
    },
  ],
  Toyota: [
    {
      time: "18:00",
      end: "19:00",
      cells: [
        { type: "kids", colSpan: 5 },
        { type: "kids" },
      ],
    },
    {
      time: "19:30",
      end: "21:00",
      cells: [
        { type: "adult-gi", colSpan: 5 },
        { type: "adult-gi" },
      ],
    },
    {
      time: "20:30",
      end: "22:00",
      cells: [
        { type: "empty", colSpan: 5 },
        { type: "no-gi" },
      ],
    },
  ],
  Ibaraki: [],
  Hekinan: [],
};

export const Schedule = () => {
  const headerRef = useScrollReveal();
  const legendRef = useScrollReveal();
  const tableRef = useScrollReveal();
  const [selectedLocation, setSelectedLocation] = useState<LocationUnit>("Hamamatsu");

  const rows = scheduleByLocation[selectedLocation];
  const hasSchedule = rows.length > 0;

  return (
    <section id="schedule" className="bg-primary text-primary-foreground py-16 px-6 md:px-8">
      <div ref={headerRef} className="reveal mb-10">
        <p className="text-secondary text-xs font-black tracking-[0.35em] uppercase mb-4">
          Quando treinar?
        </p>
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
          HORARIOS
        </h2>
        <p className="text-primary-foreground/40 text-sm mt-3 font-semibold tracking-wide">
          Unidade selecionada: {selectedLocation}
        </p>
      </div>

      <div className="flex flex-wrap gap-3 mb-8">
        {locationButtons.map((location) => {
          const isActive = selectedLocation === location;

          return (
            <button
              key={location}
              type="button"
              onClick={() => setSelectedLocation(location)}
              className={`rounded-sm border px-4 py-2 text-xs font-black uppercase tracking-[0.2em] transition-colors ${
                isActive
                  ? "border-secondary bg-secondary text-primary"
                  : "border-white/15 bg-white/5 text-primary-foreground hover:border-white/30 hover:bg-white/10"
              }`}
            >
              {location}
            </button>
          );
        })}
      </div>

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

      <div ref={tableRef} className="reveal reveal-delay-200 overflow-x-auto">
        {hasSchedule ? (
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
                  <td className="px-4 py-4 text-xs font-black tabular-nums tracking-tight whitespace-nowrap border-r border-white/10">
                    <span className="text-primary-foreground">{row.time}</span>
                    <br />
                    <span className="text-primary-foreground/30">{row.end}</span>
                  </td>

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
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="rounded-sm border border-white/10 bg-white/5 px-6 py-10 text-center">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-primary-foreground">
              Horarios em breve
            </p>
            <p className="mt-3 text-sm text-primary-foreground/50">
              Ainda nao ha grade cadastrada para a unidade {selectedLocation}.
            </p>
          </div>
        )}
      </div>

      <p className="mt-6 text-primary-foreground/30 text-xs font-semibold tracking-wide">
        * Horarios sujeitos a alteracao. Confirme com a academia.
      </p>
    </section>
  );
};
