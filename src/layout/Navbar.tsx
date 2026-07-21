import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { useAuth } from "../hooks/useAuth";

const navLinks = [
  { href: "/#about", label: "CTBJJ Academy" },
  { href: "/#programs", label: "Sobre as Aulas" },
  { href: "/#locations", label: "Localização" },
];

function dashboardLink(role?: string) {
  if (role === "ADMIN") return "/admin/dashboard";
  if (role === "PROFESSOR") return "/professor/dashboard";
  return "/student/dashboard";
}

export const Navbar = ({ dark = false }: { dark?: boolean }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  const borderColor = dark ? "border-white/8" : "border-foreground/8";
  const bgBlur = dark ? "backdrop-blur-md bg-slate-950/90" : "backdrop-blur-md bg-background/85";
  const textColor = dark ? "text-white" : "text-foreground";
  const mutedText = dark ? "text-white/50 hover:text-white" : "text-foreground/60 hover:text-foreground";
  const mobileBg = dark ? "bg-slate-950" : "bg-background";

  return (
    <header className={`fixed top-0 left-0 w-full z-50 border-b ${borderColor}`}>
      <div className={bgBlur}>
        <nav className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link to="/" className={`text-base md:text-xl font-black tracking-tighter ${textColor}`}>
            CT Brazilian Jiu Jitsu
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center">
            {navLinks.map((link, index) => (
              <a
                href={link.href}
                key={index}
                className={`px-5 py-2 text-sm font-semibold tracking-wide transition-colors duration-200 ${mutedText}`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex gap-3">
            {isAuthenticated ? (
              <>
                <Link to={dashboardLink(user?.role)}>
                  <Button className="bg-secondary text-primary" size="sm">Área do Aluno</Button>
                </Link>
                <Button className="bg-secondary text-primary" size="sm" onClick={logout}>Sair</Button>
              </>
            ) : (
              <>
                <a href="https://wa.link/882jcb">
                  <Button size="sm">Quero Treinar!</Button>
                </a>
                <Link to="/login">
                  <Button className="bg-secondary text-primary" size="sm">Área do Aluno</Button>
                </Link>
              </>
            )}
          </div>

          {/* Hamburger */}
          <button
            className={`md:hidden flex flex-col gap-1.5 p-2 cursor-pointer ${textColor}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-current transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-0.5 bg-current transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-current transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div className={`md:hidden border-t ${borderColor} ${mobileBg} px-6 py-5 flex flex-col gap-2 animate-slide-up`}>
            {navLinks.map((link, index) => (
              <a
                href={link.href}
                key={index}
                onClick={() => setMenuOpen(false)}
                className={`py-2 text-sm font-semibold tracking-wide transition-colors ${mutedText}`}
              >
                {link.label}
              </a>
            ))}
            <div className={`flex flex-col gap-3 pt-4 border-t ${borderColor}`}>
              {isAuthenticated ? (
                <>
                  <Link to={dashboardLink(user?.role)} onClick={() => setMenuOpen(false)}>
                    <Button className="w-full bg-secondary text-primary" size="sm">Área do Aluno</Button>
                  </Link>
                  <Button className="w-full" size="sm" onClick={() => { logout(); setMenuOpen(false); }}>Sair</Button>
                </>
              ) : (
                <>
                  <a href="#programs" onClick={() => setMenuOpen(false)}>
                    <Button className="w-full" size="sm">Quero Treinar!</Button>
                  </a>
                  <Link to="/login" onClick={() => setMenuOpen(false)}>
                    <Button className="w-full bg-secondary text-primary" size="sm">Área do Aluno</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
