import { useEffect } from 'react'
import { persona } from '../data/content'

export default function Contacto() {
  useEffect(() => {
    // Loaded on mount (not as a static <script> in index.html) so LinkedIn's
    // badge script scans the DOM *after* React has rendered the badge div —
    // it only enhances markup present at load time and won't pick up
    // elements added later, which a static script tag would miss entirely.
    const script = document.createElement('script')
    script.src = 'https://platform.linkedin.com/badges/js/profile.js'
    script.async = true
    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <section id="contacto" className="bg-navy px-5 py-16 text-cream sm:px-8 sm:py-24">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="font-display text-3xl font-semibold sm:text-4xl">Contacto</h2>
        <p className="mx-auto mt-4 max-w-xl font-body text-cream/80">
          ¿Conversamos sobre una oportunidad en People Analytics, Workforce Enablement o
          Estrategia de Negocio?
        </p>

        <div className="mt-10 flex flex-col items-center gap-8">
          <a
            href={`mailto:${persona.email}`}
            className="rounded-md bg-rust-ink px-8 py-3 text-center font-body font-semibold text-cream shadow-sm transition-colors duration-200 hover:bg-rust-ink/90"
          >
            Email
          </a>

          <div
            className="badge-base LI-profile-badge"
            data-locale="es_ES"
            data-size="medium"
            data-theme="light"
            data-type="HORIZONTAL"
            data-vanity="angelalvarezg97"
            data-version="v1"
          >
            <a
              className="badge-base__link LI-simple-link"
              href="https://mx.linkedin.com/in/angelalvarezg97?trk=profile-badge"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ángel Álvarez G.
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
