import { persona } from '../data/content'

export default function Hero() {
  return (
    <section
      id="inicio"
      className="border-b border-navy/10 bg-cream px-5 py-20 sm:px-8 sm:py-28"
    >
      <div className="mx-auto max-w-4xl">
        <p className="font-mono text-sm uppercase tracking-widest text-sage-ink">
          {persona.location}
        </p>
        <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-navy sm:text-5xl md:text-6xl">
          {persona.name}
        </h1>
        <p className="mt-4 max-w-2xl font-body text-lg text-navy/80 sm:text-xl">
          {persona.headline}
        </p>

        <ul className="mt-6 flex flex-wrap gap-2">
          {persona.targetRoles.map((role) => (
            <li
              key={role}
              className="rounded-full border border-sage/40 bg-sage/10 px-3 py-1 font-mono text-xs text-sage-ink"
            >
              {role}
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href={persona.cvPdf}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-rust-ink px-6 py-3 font-body font-semibold text-cream shadow-sm transition-colors duration-200 hover:bg-rust-ink/90"
          >
            Ver CV en PDF
          </a>
          <a
            href="#contacto"
            className="rounded-md border-2 border-navy px-6 py-3 font-body font-semibold text-navy transition-colors duration-200 hover:border-rust-ink hover:text-rust-ink"
          >
            Contactar
          </a>
        </div>
      </div>
    </section>
  )
}
