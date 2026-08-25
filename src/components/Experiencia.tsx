import { experiencia } from '../data/content'

export default function Experiencia() {
  return (
    <section id="experiencia" className="bg-navy/[0.03] px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <h2 className="font-display text-3xl font-semibold text-navy sm:text-4xl">
          Experiencia profesional
        </h2>

        <ol className="mt-10 border-l-2 border-sage/30 pl-6 sm:pl-8">
          {experiencia.map((item) => (
            <li key={`${item.puesto}-${item.organizacion}`} className="relative pb-10 last:pb-0">
              <span
                aria-hidden="true"
                className="absolute -left-[calc(1.5rem+5px)] top-1.5 h-3 w-3 rounded-full border-2 border-rust-ui bg-cream sm:-left-[calc(2rem+5px)]"
              />
              <p className="font-mono text-xs uppercase tracking-wide text-sage-ink">{item.fecha}</p>
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
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
