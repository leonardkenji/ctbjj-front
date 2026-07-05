import { PublicLayout } from "../components/ui";
import { About } from "../sections/About";
import { Hero } from "../sections/Hero";
import { Locations } from "../sections/Locations";
import { Methodology } from "../sections/Methodology";
import { News } from "../sections/News";
import { Programs } from "../sections/Programs";
import { Schedule as HomeSchedule } from "../sections/Schedule";


export function HomePage() {
  return (
    <PublicLayout>
      <Hero />
      <Programs />
      <Methodology />
      <Locations />
      <HomeSchedule />
      <About />
      <News />
    </PublicLayout>
  );
}
