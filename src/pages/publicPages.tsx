import { PublicLayout } from "../components/ui";
import { About } from "../sections/About";
import { Hero } from "../sections/Hero";
import { Locations } from "../sections/Locations";
import { Programs } from "../sections/Programs";
import { Schedule as HomeSchedule } from "../sections/Schedule";


export function HomePage() {
  return (
    <PublicLayout>
      <Hero />
      <Programs />
      <Locations />
      <HomeSchedule />
      <About />
    </PublicLayout>
  );
}
