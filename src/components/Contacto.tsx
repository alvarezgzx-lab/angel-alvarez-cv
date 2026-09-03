import ExternalLink from './ExternalLink'
import { persona } from '../data/content'

export default function Contacto() {
  return (
    <section id="contacto" className="bg-navy px-5 py-16 text-cream sm:px-8 sm:py-24">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="font-display text-3xl font-semibold sm:text-4xl">Contacto</h2>
        <p className="mx-auto mt-4 max-w-xl font-body text-cream/80">
          ¿Conversamos sobre una oportunidad en People Analytics, Workforce Enablement o
          Estrategia de Negocio?
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={`mailto:${persona.email}`}
            className="w-full rounded-md bg-rust-ink px-6 py-3 text-center font-body font-semibold text-cream shadow-sm transition-colors duration-200 hover:bg-rust-ink/90 sm:w-auto"
          >
            {persona.email}
          </a>
          <ExternalLink
            href={persona.linkedin}
            className="w-full rounded-md border-2 border-cream px-6 py-3 text-center font-body font-semibold text-cream underline-offset-4 transition-colors duration-200 hover:border-rust-ui hover:underline sm:w-auto"
          >
            LinkedIn
          </ExternalLink>
        </div>
      </div>
    </section>
  )
}
