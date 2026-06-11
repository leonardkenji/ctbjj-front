import { LocationCard } from "../components/LocationCard"
import { useScrollReveal } from "../hooks/useScrollReveal"
import unidadeHamamatsu from '../assets/unidade-hamamatsu.png'
import unidadeToyota from '../assets/unidade-toyota.png'

export const Locations = () => {
  const headerRef = useScrollReveal()
  const card1Ref = useScrollReveal()
  const card2Ref = useScrollReveal()

  return (
    <section id="locations" className="px-6 md:px-8 py-16 border-t border-foreground/8">
      <div ref={headerRef} className="reveal">
        <p className="text-secondary text-xs font-black tracking-[0.35em] uppercase mb-4">
          Onde treinar?
        </p>
        <h1 className="text-primary text-4xl md:text-5xl font-black tracking-tight mb-8">
          LOCATIONS
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        <div ref={card1Ref} className="reveal">
          <LocationCard
            image={unidadeHamamatsu}
            locationName="Hamamatsu"
            address="157 Academia carlos toyota Shizuoka JP 435-0056, Koikecho, Chuo Ward, Hamamatsu, Shizuoka 435-0056"
            url="https://maps.app.goo.gl/8HKP9ywsbvgHZmBB8"
          />
        </div>
        <div ref={card2Ref} className="reveal reveal-delay-200">
          <LocationCard
            image={unidadeToyota}
            locationName="Toyota"
            address="5 Chome-12-1 Akibacho, Toyota, Aichi 471-0873"
            url="https://maps.app.goo.gl/NaLf58Fh8zDzVbjH8"
          />
        </div>
      </div>
    </section>
  )
}
