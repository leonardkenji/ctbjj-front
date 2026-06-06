import type { LocationCardProps } from "../interface/LocationCardProps";

export const LocationCard = ({
  image,
  locationName,
  address,
  url,
}: LocationCardProps) => {
  return (
    <div className="relative h-72 md:h-130 overflow-hidden group">
      <img
        src={image}
        alt={locationName}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-black/35 group-hover:bg-black/45 transition-colors" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-6 text-center">
        <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight">
          {locationName}
        </h3>

        <p className="mt-6 max-w-xs text-xs font-bold uppercase tracking-[0.18em] leading-6">
          {address}
        </p>

        <a
          href={url}
          className="mt-4 text-xs font-black uppercase tracking-widest border-b border-white pb-1 hover:opacity-70 transition-opacity"
        >
          Veja no Mapa
        </a>
      </div>
    </div>
  );
};
