import RevealCard from './RevealCard'
import { perfil, objetivo } from '../data/content'

export default function Perfil() {
  return (
    <section id="perfil" className="px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <h2 className="font-display text-3xl font-semibold text-cream sm:text-4xl">Perfil</h2>

        <RevealCard
          index={0}
          className="mt-6 rounded-lg border border-navy/10 bg-cream p-6 shadow-bevel sm:p-8"
        >
          <p className="font-body text-lg leading-relaxed text-navy/85">{perfil}</p>
        </RevealCard>

        <RevealCard
          index={1}
          className="mt-6 rounded-lg border border-navy/10 bg-cream p-6 shadow-bevel sm:p-8"
        >
          <p className="font-mono text-xs uppercase tracking-wide text-sage-ink">
            Objetivo profesional
          </p>
          <p className="mt-2 font-body text-lg leading-relaxed text-navy/85">{objetivo}</p>
        </RevealCard>
      </div>
    </section>
  )
}
