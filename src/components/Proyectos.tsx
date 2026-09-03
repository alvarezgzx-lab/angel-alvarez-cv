import ExternalLink from './ExternalLink'
import { proyectosPublicaciones } from '../data/content'

export default function Proyectos() {
  return (
    <section id="proyectos" className="px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <h2 className="font-display text-3xl font-semibold text-navy sm:text-4xl">
          Proyectos y Publicaciones
        </h2>

        <ul className="mt-8 space-y-8">
          {proyectosPublicaciones.map((proyecto) => (
            <li
              key={proyecto.titulo}
              className="rounded-lg border border-navy/10 bg-cream p-6 shadow-sm sm:p-8"
            >
              <p className="font-mono text-xs uppercase tracking-wide text-sage-ink">
                {proyecto.fecha}
              </p>
              <h3 className="mt-2 font-display text-xl font-semibold text-navy sm:text-2xl">
                {proyecto.titulo}
              </h3>
              <p className="mt-3 font-body text-navy/80">{proyecto.descripcion}</p>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <ExternalLink
                  href={proyecto.enlacePrincipal.url}
                  className="inline-flex items-center rounded-md bg-rust-ink px-4 py-2 font-body text-sm font-semibold text-cream transition-colors duration-200 hover:bg-rust-ink/90"
                >
                  {proyecto.enlacePrincipal.label}
                  <span aria-hidden="true" className="ml-1.5">
                    ↗
                  </span>
                </ExternalLink>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
