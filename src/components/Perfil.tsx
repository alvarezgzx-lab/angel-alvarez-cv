import { perfil } from '../data/content'

export default function Perfil() {
  return (
    <section id="perfil" className="px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <h2 className="font-display text-3xl font-semibold text-navy sm:text-4xl">Perfil</h2>
        <p className="mt-6 font-body text-lg leading-relaxed text-navy/85">{perfil}</p>
      </div>
    </section>
  )
}
