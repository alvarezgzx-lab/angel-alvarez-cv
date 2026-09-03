import { useEffect, useState } from 'react'
import { navLinks } from '../data/content'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeHref, setActiveHref] = useState('#inicio')

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

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null)

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)
        if (visible.length === 0) return
        const topMost = visible.reduce((a, b) =>
          a.boundingClientRect.top < b.boundingClientRect.top ? a : b,
        )
        setActiveHref(`#${topMost.target.id}`)
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

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
          className="flex items-center gap-2.5 font-display text-lg font-semibold text-cream underline-offset-4 transition-colors duration-200 hover:underline hover:decoration-rust-ui"
        >
          <img
            src="/images/angel-photo.webp"
            alt=""
            width={64}
            height={64}
            className="h-8 w-8 rounded-full border border-cream/30 object-cover"
          />
          Ángel Álvarez
        </a>

        <ul className="hidden items-center gap-6 font-mono text-xs uppercase tracking-wide text-cream/90 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                aria-current={activeHref === link.href ? 'true' : undefined}
                className={`underline-offset-4 transition-colors duration-200 hover:underline hover:decoration-rust-ui ${
                  activeHref === link.href ? 'underline decoration-rust-ui' : ''
                }`}
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

      <div
        className={`grid bg-navy transition-[grid-template-rows] duration-200 md:hidden ${
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <ul
          id="mobile-menu"
          className="overflow-hidden font-mono text-sm uppercase tracking-wide text-cream/90"
        >
          {navLinks.map((link) => (
            <li key={link.href} className="border-t border-cream/10">
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                aria-current={activeHref === link.href ? 'true' : undefined}
                className={`block px-5 py-3 transition-colors duration-200 hover:bg-navy/60 sm:px-8 ${
                  activeHref === link.href ? 'bg-navy/60' : ''
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
