import { useEffect, useState } from 'react'
import { navLinks } from '../data/content'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-colors duration-200 ${
        scrolled ? 'bg-navy/95 backdrop-blur shadow-md' : 'bg-navy'
      }`}
    >
      <nav
        aria-label="Navegación principal"
        className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8"
      >
        <a
          href="#inicio"
          className="font-display text-lg font-semibold text-cream underline-offset-4 transition-colors duration-200 hover:underline hover:decoration-rust-ui"
        >
          Ángel Álvarez
        </a>

        <ul className="hidden items-center gap-6 font-mono text-xs uppercase tracking-wide text-cream/90 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="underline-offset-4 transition-colors duration-200 hover:underline hover:decoration-rust-ui"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="flex flex-col gap-1.5 p-2 md:hidden"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`block h-0.5 w-6 bg-cream transition-transform duration-200 ${
              open ? 'translate-y-2 rotate-45' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-cream transition-opacity duration-200 ${
              open ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-cream transition-transform duration-200 ${
              open ? '-translate-y-2 -rotate-45' : ''
            }`}
          />
        </button>
      </nav>

      <ul
        id="mobile-menu"
        className={`grid overflow-hidden bg-navy font-mono text-sm uppercase tracking-wide text-cream/90 transition-[grid-template-rows] duration-200 md:hidden ${
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          {navLinks.map((link) => (
            <li key={link.href} className="border-t border-cream/10">
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block px-5 py-3 transition-colors duration-200 hover:bg-navy/60 sm:px-8"
              >
                {link.label}
              </a>
            </li>
          ))}
        </div>
      </ul>
    </header>
  )
}
