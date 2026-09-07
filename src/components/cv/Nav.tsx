import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/lib/language";

export default function Nav() {
  const { lang, copy, toggle } = useLanguage();
  const [open, setOpen] = useState(false);

  const LangToggle = (
    <button
      type="button"
      onClick={toggle}
      aria-label={copy.languageToggleLabel}
      className="shrink-0 border border-cream/25 px-3 py-1 font-mono text-[0.65rem] tracking-[0.2em] text-cream/70 transition-colors hover:border-rust-ui"
    >
      <span className={lang === "es" ? "text-rust-light" : ""}>ES</span>
      <span aria-hidden="true" className="px-1 text-cream/40">
        ·
      </span>
      <span className={lang === "en" ? "text-rust-light" : ""}>EN</span>
    </button>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-cream/20 bg-navy/92 backdrop-blur">
      <nav
        aria-label={copy.navAriaLabel}
        className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-3 sm:px-8"
      >
        <a
          href="#inicio"
          className="shrink-0 whitespace-nowrap font-display text-lg italic tracking-tight text-cream"
        >
          Ángel Álvarez
        </a>

        <ul className="hidden flex-wrap items-center gap-x-5 gap-y-1 lg:flex">
          {copy.navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-cream/60 underline-offset-4 transition-colors hover:text-rust-light"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {LangToggle}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? copy.closeMenu : copy.openMenu}
            className="rounded-md p-2 text-cream lg:hidden"
          >
            {open ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>


      {open ? (
        <ul id="mobile-nav" className="border-t border-cream/10 px-5 pb-4 lg:hidden">
          {copy.navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block border-b border-cream/10 py-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-cream/70 hover:text-rust-light"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </header>
  );
}
