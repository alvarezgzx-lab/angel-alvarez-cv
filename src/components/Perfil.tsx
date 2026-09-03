import { useInView } from '../hooks/useInView'
import { perfil, objetivo } from '../data/content'

export default function Perfil() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2, rootMargin: '0px 0px -15% 0px' })

  return (
    <section id="perfil" aria-label="Perfil" className="px-5 py-16 sm:px-8 sm:py-24">
      <div
        ref={ref}
        className="mx-auto max-w-2xl rounded-3xl border border-rust/20 bg-rust/10 p-8 text-center shadow-bevel backdrop-blur-sm transition-all duration-700 ease-out sm:p-12"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(24px)',
        }}
      >
        <img
          src="/images/angel-photo.webp"
          alt="Retrato de Ángel Álvarez"
          width={480}
          height={480}
          className="mx-auto h-24 w-24 rounded-full border-4 border-rust-ui object-cover shadow-bevel transition-all duration-700 ease-out sm:h-28 sm:w-28"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'rotate(0deg) scale(1)' : 'rotate(180deg) scale(0.4)',
            transitionDelay: '100ms',
          }}
        />

        <p
          className="mt-6 font-display text-lg italic font-normal leading-snug text-cream transition-opacity duration-700 ease-out sm:text-xl"
          style={{ opacity: inView ? 1 : 0, transitionDelay: '200ms' }}
        >
          {perfil}
        </p>

        <p
          className="mt-8 font-mono text-xs uppercase tracking-widest text-sage-light transition-opacity duration-700 ease-out"
          style={{ opacity: inView ? 1 : 0, transitionDelay: '300ms' }}
        >
          Objetivo profesional
        </p>
        <p
          className="mt-3 font-display text-base italic font-normal leading-snug text-cream/90 transition-opacity duration-700 ease-out sm:text-lg"
          style={{ opacity: inView ? 1 : 0, transitionDelay: '300ms' }}
        >
          {objetivo}
        </p>
      </div>
    </section>
  )
}
