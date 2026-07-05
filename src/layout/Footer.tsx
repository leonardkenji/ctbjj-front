import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-black text-white/60 text-sm px-6 md:px-10 py-12 mt-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">

        {/* Brand */}
        <div>
          <p className="text-white font-semibold uppercase tracking-wider text-base mb-3">
            Carlos TToyota BJJ
          </p>
          <p className="text-white/40 leading-relaxed mb-5 max-w-xs">
            Formando campeoes dentro e fora dos tatames. Disciplina, tecnica e respeito em cada treino.
          </p>
          <div className="flex gap-3">
            <a
              href="https://www.instagram.com/ctbjjofficial/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram CTBJJ Official"
              className="w-8 h-8 border border-white/20 flex items-center justify-center hover:border-amber-400 hover:text-amber-400 transition-colors"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="w-4 h-4 fill-current"
              >
                <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5ZM17.5 6.25a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <p className="text-secondary text-xs uppercase tracking-widest mb-4">Links</p>
          <ul className="space-y-2">
            {["Programas", "Sobre", "Horarios", "Localizacao", "Contato"].map((link) => (
              <li key={link}>
                <a href="#" className="text-white/50 hover:text-secondary transition-colors">{link}</a>
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
          <Link to="/legal#privacy-policy" className="hover:text-secondary transition-colors">Privacy policy</Link>
          <Link to="/legal#terms-of-service" className="hover:text-secondary transition-colors">Terms of service</Link>
        </div>
      </div>
    </footer>
  );
};
