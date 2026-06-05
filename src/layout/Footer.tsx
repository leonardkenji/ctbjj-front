export const Footer = () => {
  return (
    <footer className="bg-black text-white/60 text-sm px-10 py-12 mt-10">
      <div className="grid grid-cols-3 gap-10 mb-10">

        {/* Brand */}
        <div>
          <p className="text-white font-semibold uppercase tracking-wider text-base mb-3">
            CT BJJ
          </p>
          <p className="text-white/40 leading-relaxed mb-5 max-w-xs">
           LoremIpsum
          </p>
          <div className="flex gap-3">
            {["instagram", "x", "youtube", "tiktok"].map((s) => (
              <a key={s} href="#" className="w-8 h-8 border border-white/20 flex items-center justify-center hover:border-amber-400 hover:text-amber-400 transition-colors">
                <i className={`ti ti-brand-${s}`} />
              </a>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div>
          <p className="text-secondary text-xs uppercase tracking-widest mb-4">Navigation</p>
          <ul className="space-y-2">
            {["Our fleet", "About us", "How it works", "FAQ", "Contact"].map((link) => (
              <li key={link}>
                <a href="#" className="text-white/50 hover:text-secondary transition-colors">{link}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="text-secondary text-xs uppercase tracking-widest mb-4">Contact</p>
          <div className="space-y-3 text-white/50">
            <p>📍 Tokyo, Japan</p>
            <p>📞 +81 XX XXXX XXXX</p>
            <p>✉️ hello@gaijintuned.com</p>
            <p>🕐 Mon–Sun 09:00–18:00</p>
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-white/10 pt-5 flex justify-between text-xs text-white/30">
        <span>© 2026 CTBJJ. All rights reserved.</span>
        <div className="flex gap-5">
          <a href="#" className="hover:text-secondary transition-colors">Privacy policy</a>
          <a href="#" className="hover:text-secondary transition-colors">Terms of service</a>
        </div>
      </div>
    </footer>
  );
};
