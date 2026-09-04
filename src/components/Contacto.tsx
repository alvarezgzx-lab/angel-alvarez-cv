import { useEffect, useState } from 'react'
import { persona } from '../data/content'

export default function Contacto() {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timeout = setTimeout(() => setCopied(false), 2500)
    return () => clearTimeout(timeout)
  }, [copied])

  const handleEmailClick = () => {
    // mailto: only opens something if the browser/OS has a default mail
    // client registered — very common not to (e.g. Gmail used only via
    // browser). Copy the address too so the button is useful either way,
    // without printing it as page text (kept out per the earlier request
    // to not expose it as plain, scrapeable text).
    navigator.clipboard?.writeText(persona.email).then(
      () => setCopied(true),
      () => {},
    )
  }

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
    <section id="contacto" className="bg-navy px-5 py-12 text-cream sm:px-8 sm:py-16">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="font-display text-3xl font-semibold sm:text-4xl">Contacto</h2>
        <p className="mx-auto mt-4 max-w-xl font-body text-cream/80">
          ¿Conversamos sobre una oportunidad en People Analytics, Workforce Enablement o
          Estrategia de Negocio?
        </p>

        <div className="mt-10 flex flex-col items-center gap-8">
          <div className="flex flex-col items-center gap-2">
            <a
              href={`mailto:${persona.email}`}
              onClick={handleEmailClick}
              className="rounded-md bg-rust-ink px-8 py-3 text-center font-body font-semibold text-cream shadow-sm transition-colors duration-200 hover:bg-rust-ink/90"
            >
              Email
            </a>
            <p
              role="status"
              aria-live="polite"
              className="font-mono text-xs text-sage-light transition-opacity duration-300"
              style={{ opacity: copied ? 1 : 0 }}
            >
              {copied ? 'Correo copiado — puedes pegarlo donde prefieras escribirme' : ''}
            </p>
          </div>

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
