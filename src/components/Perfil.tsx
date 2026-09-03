import { useInView } from '../hooks/useInView'
import { perfil, objetivo } from '../data/content'

// text-shadow only takes x y blur + color (no spread, unlike box-shadow)
const floatShadow = '0 14px 22px rgba(5, 12, 22, 0.55)'

export default function Perfil() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2, rootMargin: '0px 0px -15% 0px' })

  return (
    <section id="perfil" aria-label="Perfil" className="px-5 py-16 sm:px-8 sm:py-24">
      <div ref={ref} className="mx-auto max-w-4xl [perspective:1000px]">
        <p
          className="font-display text-xl italic leading-snug text-cream transition-all duration-700 ease-out sm:text-2xl"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView
              ? 'translateY(0) rotateX(0deg)'
              : 'translateY(20px) rotateX(-6deg)',
            textShadow: inView ? floatShadow : 'none',
          }}
        >
          {perfil}
        </p>

        <p
          className="mt-8 font-mono text-xs uppercase tracking-widest text-sage-light transition-opacity duration-700 ease-out"
          style={{ opacity: inView ? 1 : 0, transitionDelay: '150ms' }}
        >
          Objetivo profesional
        </p>
        <p
          className="mt-3 font-display text-lg italic leading-snug text-cream/90 transition-all duration-700 ease-out sm:text-xl"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView
              ? 'translateY(0) rotateX(0deg)'
              : 'translateY(20px) rotateX(-6deg)',
            textShadow: inView ? floatShadow : 'none',
            transitionDelay: '150ms',
          }}
        >
          {objetivo}
        </p>
      </div>
    </section>
  )
}
