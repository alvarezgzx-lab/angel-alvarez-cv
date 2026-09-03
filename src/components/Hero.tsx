import { persona } from '../data/content'

export default function Hero() {
  return (
    <section
      id="inicio"
      className="border-b border-navy/10 bg-cream px-5 py-20 sm:px-8 sm:py-28"
    >
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col items-start gap-8 sm:flex-row">
          <img
            src="/images/angel-photo.webp"
            alt="Retrato de Ángel Álvarez"
            width={480}
            height={480}
            className="h-32 w-32 shrink-0 rounded-full border-4 border-rust-ui object-cover shadow-md sm:order-2 sm:h-40 sm:w-40"
          />

          <div className="flex-1 sm:order-1">
            <p className="font-mono text-sm uppercase tracking-widest text-sage-ink">
              {persona.location}
            </p>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-navy sm:text-5xl md:text-6xl">
              {persona.name}
            </h1>
            <p className="mt-4 max-w-2xl font-body text-lg text-navy/80 sm:text-xl">
              {persona.headline}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
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
        </div>
      </div>
    </section>
  )
}
