import { useState } from "react";
import { Button } from "../components/Button";

const navLinks = [
  { href: "#about", label: "CTBJJ Academy" },
  { href: "#programs", label: "Sobre as Aulas" },
  { href: "#locations", label: "Localização" },
];

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b border-foreground/8">
      <div className="backdrop-blur-md bg-background/85">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex text-base md:text-xl font-black tracking-tighter">
            CT Brazilian Jiu Jitsu
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center">
            {navLinks.map((link, index) => (
              <a
                href={link.href}
                key={index}
                className="px-5 py-2 text-sm font-semibold text-foreground/60 hover:text-foreground tracking-wide transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex gap-4">
            <Button size="sm">Quero Treinar!</Button>
            <Button className="bg-secondary text-primary" size="sm">Area do Aluno</Button>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-0.5 bg-foreground transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block w-6 h-0.5 bg-foreground transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-6 h-0.5 bg-foreground transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-foreground/8 px-6 py-5 flex flex-col gap-2 animate-slide-up">
            {navLinks.map((link, index) => (
              <a
                href={link.href}
                key={index}
                onClick={() => setMenuOpen(false)}
                className="py-2 text-sm font-semibold text-foreground/60 hover:text-foreground tracking-wide transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="flex flex-col gap-3 pt-4 border-t border-foreground/8">
              <Button size="sm">Quero Treinar!</Button>
              <Button className="bg-secondary text-primary" size="sm">Area do Aluno</Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
