import { useEffect, useRef, useState } from 'react'
import RevealCard from './RevealCard'
import { experiencia } from '../data/content'

export default function Experiencia() {
  const listRef = useRef<HTMLOListElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setProgress(1)
      return
    }

    const el = listRef.current
    if (!el) return

    let rafId = 0
    const updateProgress = () => {
      const rect = el.getBoundingClientRect()
      const start = window.innerHeight * 0.85
      const end = window.innerHeight * 0.35
      const total = rect.height + (start - end)
      const scrolled = start - rect.top
      setProgress(Math.min(1, Math.max(0, scrolled / total)))
    }

    const onScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(updateProgress)
    }

    updateProgress()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <section id="experiencia" className="px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center font-display text-3xl font-semibold text-cream sm:text-left sm:text-4xl">
          Experiencia profesional
        </h2>

        <ol ref={listRef} className="relative mt-10 pl-6 sm:pl-8">
          <span aria-hidden="true" className="absolute inset-y-0 left-0 w-0.5 bg-cream/15" />
          <span
            aria-hidden="true"
            className="absolute left-0 top-0 h-full w-0.5 origin-top bg-rust-ui"
            style={{ transform: `scaleY(${progress})` }}
          />
          {experiencia.map((item, i) => (
            <li key={`${item.puesto}-${item.organizacion}`} className="relative pb-6 last:pb-0">
              <span
                aria-hidden="true"
                className="absolute -left-[calc(1.5rem+5px)] top-[1.875rem] h-3 w-3 rounded-full border-2 border-rust-ui bg-cream sm:-left-[calc(2rem+5px)]"
              />
              <RevealCard
                index={i}
                className="rounded-lg border border-navy/10 bg-cream p-6 shadow-bevel"
              >
                <p className="font-mono text-xs uppercase tracking-wide text-sage-ink">
                  {item.fecha}
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold text-navy">
                  {item.puesto}
                </h3>
                <p className="mt-1 font-body font-medium text-rust-ink">{item.organizacion}</p>
                <ul className="mt-3 space-y-1.5">
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="font-body text-navy/80">
                      {bullet}
                    </li>
                  ))}
                </ul>
              </RevealCard>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
