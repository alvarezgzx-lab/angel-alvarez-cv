import { persona, resumenProfesional } from '../data/content'

export default function Perfil() {
  return (
    <section id="perfil" className="px-5 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 rounded-3xl border border-rust/20 bg-rust/10 p-8 text-center shadow-bevel backdrop-blur-sm sm:flex-row sm:gap-8 sm:p-10 sm:text-left">
        <img
          src="/images/angel-photo.webp"
          alt="Retrato de Ángel Álvarez"
          width={480}
          height={480}
          className="h-28 w-28 shrink-0 rounded-full border-4 border-rust-ui object-cover shadow-bevel sm:h-32 sm:w-32"
        />

        <div>
          <h2 className="font-display text-xl italic font-normal leading-snug text-cream sm:text-2xl">
            {persona.fullName}
          </h2>
          <p className="mt-3 font-display text-sm italic font-normal leading-relaxed text-cream/85 sm:text-base">
            {resumenProfesional}
          </p>
        </div>
      </div>
    </section>
  )
}
