import type { CardProps } from "../interface/CardProps";

export const Card = ({
  image,
  location,
  programTitle,
  programDesc,
}: CardProps) => {
  return (
    <div className="bg-background border border-foreground/8 rounded-sm overflow-hidden h-full flex flex-col group hover:shadow-lg hover:border-foreground/20 transition-all duration-300">
      <div className="overflow-hidden">
        <img
          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
          src={image}
          alt={programTitle}
        />
      </div>

      <div className="p-5 flex flex-col flex-1 text-center">
        <div className="flex flex-wrap gap-2 justify-center mb-4">
          {location.map((loc) => (
            <span
              key={loc}
              className="inline-flex items-center gap-1 text-secondary bg-secondary/8 border border-secondary/20 text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider"
            >
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.8 13.938h-.011a7 7 0 1 0-11.464.144h-.016l.14.171c.1.127.2.251.3.371L12 21l5.13-6.248c.194-.209.374-.429.54-.659l.13-.155Z" />
              </svg>
              {loc}
            </span>
          ))}
        </div>

        <h5 className="text-lg font-black tracking-tight uppercase mb-3 text-primary">
          {programTitle}
        </h5>
        <p className="text-xs leading-relaxed text-foreground/55 mt-auto">
          {programDesc}
        </p>
      </div>
    </div>
  );
};
