import type { ReactNode } from "react";

const socialIcons: Record<string, ReactNode> = {
  instagram: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  whatsapp: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2.05 22l5.25-1.38a9.87 9.87 0 0 0 4.73 1.2h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm5.8 14.03c-.24.68-1.4 1.3-1.93 1.38-.5.08-1.12.11-1.8-.11-.42-.13-.95-.31-1.64-.6-2.88-1.24-4.76-4.13-4.9-4.32-.14-.19-1.17-1.56-1.17-2.98 0-1.42.74-2.11 1.01-2.4.26-.29.57-.36.76-.36.19 0 .38 0 .55.01.18.01.41-.07.64.49.24.57.81 1.99.88 2.13.07.14.12.31.02.5-.1.19-.15.31-.29.48-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.75 1.24 1.62 2.01 1.11 1 2.05 1.31 2.34 1.46.29.15.46.13.63-.08.17-.21.72-.84.91-1.13.19-.29.38-.24.63-.14.26.1 1.65.78 1.94.92.29.14.48.21.55.33.07.12.07.68-.17 1.36Z" />
    </svg>
  ),
};

export const Footer = () => {
  return (
    <footer className="bg-black text-white/60 text-sm px-6 md:px-10 py-12 mt-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">

        {/* Brand */}
        <div>
          <p className="text-white font-semibold uppercase tracking-wider text-base mb-3">
            Carlos Toyota BJJ
          </p>
          <p className="text-white/40 leading-relaxed mb-5 max-w-xs">
            Formando campeoes dentro e fora dos tatames. Disciplina, tecnica e respeito em cada treino.
          </p>
          <div className="flex gap-3">
            {[
              { s: "instagram", href: "https://www.instagram.com/ctbjjofficial/" },
              { s: "whatsapp", href: "https://wa.link/882jcb" },
            ].map(({ s, href }) => (
              <a key={s} href={href} target="_blank" rel="noopener noreferrer" className="w-8 h-8 border border-white/20 flex items-center justify-center hover:border-amber-400 hover:text-amber-400 transition-colors">
                {socialIcons[s]}
              </a>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div>
          <p className="text-secondary text-xs uppercase tracking-widest mb-4">Links</p>
          <ul className="space-y-2">
            {[
              { label: "Programas", href: "/#programs" },
              { label: "Sobre", href: "/#about" },
              { label: "Horarios", href: "/#schedule" },
              { label: "Localizacao", href: "/#locations" },
              { label: "Contato", href: "https://wa.link/882jcb" },
            ].map((link) => (
              <li key={link.label}>
                <a href={link.href} className="text-white/50 hover:text-secondary transition-colors">{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="text-secondary text-xs uppercase tracking-widest mb-4">Contato</p>
          <div className="space-y-3 text-white/50">
            <p>157 Academia carlos toyota Shizuoka JP 435-0056, Koikecho, Chuo Ward, Hamamatsu, Shizuoka 435-0056</p>
            <p>+81 90-8188-3937</p>
            <p>Mon–Sun 09:00–21:00</p>
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-white/10 pt-5 flex flex-col md:flex-row md:justify-between gap-3 text-xs text-white/30">
        <span>2026 CTBJJ. All rights reserved.</span>
        <div className="flex gap-5">
          <a href="/legal#privacy-policy" className="hover:text-secondary transition-colors">Privacy policy</a>
          <a href="/legal#terms-of-service" className="hover:text-secondary transition-colors">Terms of service</a>
        </div>
      </div>
    </footer>
  );
};
