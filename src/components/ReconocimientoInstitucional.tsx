import ExternalLink from './ExternalLink'
import RevealCard from './RevealCard'
import { reconocimientoInstitucional } from '../data/content'

export default function ReconocimientoInstitucional() {
  return (
    <section id="reconocimiento-institucional" className="px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center font-display text-3xl font-semibold text-cream sm:text-left sm:text-4xl">
          Reconocimiento Institucional
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {reconocimientoInstitucional.map((item, i) => (
            <div key={item.url} className="flex flex-col items-center gap-3">
              <p className="flex min-h-[2rem] items-center text-center font-mono text-xs uppercase tracking-wide text-sage-light">
                {item.label}
              </p>
              <RevealCard
                index={i}
                className="w-full rounded-md border border-navy/10 bg-cream shadow-bevel"
              >
                <iframe
                  src={item.embed.src}
                  title={item.embed.title}
                  width="100%"
                  height={item.embed.height}
                  loading="lazy"
                  allowFullScreen
                  className="block w-full border-0"
                />
              </RevealCard>
              <ExternalLink
                href={item.url}
                className="font-mono text-xs text-rust-light underline-offset-4 transition-colors duration-200 hover:underline"
              >
                Ver en LinkedIn
                <span aria-hidden="true" className="ml-1">
                  ↗
                </span>
              </ExternalLink>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
