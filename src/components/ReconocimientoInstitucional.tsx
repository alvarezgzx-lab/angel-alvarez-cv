import ExternalLink from './ExternalLink'
import { reconocimientoInstitucional } from '../data/content'

export default function ReconocimientoInstitucional() {
  return (
    <section
      id="reconocimiento-institucional"
      className="bg-navy/[0.03] px-5 py-16 sm:px-8 sm:py-24"
    >
      <div className="mx-auto max-w-4xl">
        <h2 className="font-display text-3xl font-semibold text-navy sm:text-4xl">
          Reconocimiento Institucional
        </h2>

        <div className="mt-8 flex flex-wrap justify-center gap-8">
          {reconocimientoInstitucional.map((item) => (
            <div key={item.url} className="flex w-full max-w-[504px] flex-col items-center gap-3">
              <p className="text-center font-mono text-xs uppercase tracking-wide text-sage-ink">
                {item.label}
              </p>
              <div className="w-full overflow-hidden rounded-md border border-navy/10 bg-cream shadow-sm">
                <iframe
                  src={item.embed.src}
                  title={item.embed.title}
                  width="100%"
                  height={item.embed.height}
                  loading="lazy"
                  allowFullScreen
                  className="block w-full border-0"
                />
              </div>
              <ExternalLink
                href={item.url}
                className="font-mono text-xs text-rust-ink underline-offset-4 transition-colors duration-200 hover:underline"
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
