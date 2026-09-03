import RevealCard from './RevealCard'
import { licenciasCertificaciones } from '../data/content'

export default function Certificaciones() {
  return (
    <section id="certificaciones" className="px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center font-display text-3xl font-semibold text-cream sm:text-left sm:text-4xl">
          Licencias y Certificaciones
        </h2>

        <div className="mt-8 flex flex-wrap justify-center gap-6">
          {licenciasCertificaciones.map((cert, i) => (
            <RevealCard
              key={cert.src}
              index={i}
              className="w-full max-w-[504px] rounded-md border border-navy/10 shadow-bevel"
            >
              <iframe
                src={cert.src}
                title={cert.title}
                width="100%"
                height={cert.height}
                loading="lazy"
                allowFullScreen
                className="block w-full border-0"
              />
            </RevealCard>
          ))}
        </div>
      </div>
    </section>
  )
}
