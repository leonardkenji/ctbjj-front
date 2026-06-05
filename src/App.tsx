import { Footer } from "./layout/Footer"
import { Navbar } from "./layout/Navbar"
import { About } from "./sections/About"
import { Hero } from "./sections/Hero"
import { Locations } from "./sections/Locations"
import { Programs } from "./sections/Programs"
import { Schedule } from "./sections/Schedule"

function App () {
  return (

    <div>
      <Navbar/>
        <Hero/>
        <Programs />
        <Locations/>
        <Schedule/>
        <About/>
      <Footer/>
    </div>
  )
}

export default App
