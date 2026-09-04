import { persona } from '../data/content'

export default function Hero() {
  return (
    <section id="inicio" className="px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-mono text-sm uppercase tracking-widest text-sage-light">
          {persona.location}
        </p>
        <h1 className="mt-4 font-display text-4xl italic font-normal leading-tight text-cream sm:text-5xl md:text-6xl">
          {persona.name}
        </h1>
        <p className="mx-auto mt-5 max-w-xl font-display text-lg italic font-normal leading-snug text-cream/80 sm:text-xl">
          {persona.headline}
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href={persona.cvPdf}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-rust-ink px-6 py-3 font-body font-medium text-cream shadow-sm transition-colors duration-200 hover:bg-rust-ink/90"
          >
            Ver CV en PDF
          </a>
          <a
            href="#contacto"
            className="rounded-md border-2 border-cream px-6 py-3 font-body font-medium text-cream underline-offset-4 transition-colors duration-200 hover:border-rust-ui hover:underline"
          >
            Contactar
          </a>
        </div>
      </div>
    </section>
  )
}
