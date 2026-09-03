import RevealCard from './RevealCard'
import { habilidades, idiomas } from '../data/content'

export default function Habilidades() {
  const categorias = Object.entries(habilidades)

  return (
    <section id="habilidades" className="px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center font-display text-3xl font-semibold text-cream sm:text-left sm:text-4xl">
          Habilidades
        </h2>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {categorias.map(([categoria, items], i) => (
            <RevealCard
              key={categoria}
              index={i}
              className="rounded-lg border border-navy/10 bg-cream p-6 shadow-bevel"
            >
              <h3 className="font-body text-sm font-semibold uppercase tracking-wide text-navy">
                {categoria}
              </h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {items.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full bg-navy/[0.06] px-3 py-1 font-mono text-xs text-navy/80"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </RevealCard>
          ))}
        </div>

        <RevealCard
          index={categorias.length}
          className="mt-6 rounded-lg border border-navy/10 bg-cream p-6 shadow-bevel"
        >
          <h3 className="font-body text-sm font-semibold uppercase tracking-wide text-navy">
            Idiomas
          </h3>
          <ul className="mt-3 flex flex-wrap gap-4">
            {Object.entries(idiomas).map(([idioma, nivel]) => (
              <li key={idioma} className="font-body text-navy/80">
                <span className="font-medium text-navy">{idioma}</span>{' '}
                <span className="font-mono text-xs text-sage-ink">· {nivel}</span>
              </li>
            ))}
          </ul>
        </RevealCard>
      </div>
    </section>
  )
}
