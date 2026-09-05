import { useEffect, useRef, useState } from 'react'
import ExternalLink from './ExternalLink'
import type { Reconocimiento } from '../data/content'

interface ReconocimientoModalProps {
  item: Reconocimiento | null
  onClose: () => void
}

export default function ReconocimientoModal({ item, onClose }: ReconocimientoModalProps) {
  const [visible, setVisible] = useState(false)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!item) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true)
      return
    }
    // A short setTimeout (not requestAnimationFrame) so the opening
    // transition still fires reliably even if the tab is backgrounded —
    // rAF is fully paused for hidden documents, but timers aren't.
    const timeout = setTimeout(() => setVisible(true), 10)
    return () => clearTimeout(timeout)
  }, [item])

  useEffect(() => {
    if (!item) {
      setVisible(false)
      return
    }
    closeButtonRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
    }
  }, [item, onClose])

  if (!item) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
      <div
        className="absolute inset-0 bg-navy/80 backdrop-blur-sm transition-opacity duration-300 ease-out"
        style={{ opacity: visible ? 1 : 0 }}
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={item.titulo}
        className="relative z-10 flex max-h-[85vh] w-full max-w-md flex-col overflow-hidden rounded-2xl bg-cream shadow-bevel transition-all duration-300 ease-out"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.96)',
        }}
      >
        <div className="flex items-center justify-between border-b border-navy/10 px-5 py-4">
          <h3 className="font-display text-lg font-semibold text-navy">{item.titulo}</h3>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="rounded-full p-1.5 text-navy/60 transition-colors duration-200 hover:bg-navy/5 hover:text-navy"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="overflow-y-auto px-5 py-4">
          <p className="font-body text-sm text-navy/70">{item.label}</p>

          <div className="mt-4">
            {item.embed ? (
              <iframe
                src={item.embed.src}
                title={item.embed.title}
                width="100%"
                height={item.embed.height}
                loading="lazy"
                allowFullScreen
                className="block w-full rounded-md border border-navy/10"
              />
            ) : (
              <iframe
                src={item.url}
                title={`Vista previa de la constancia — ${item.titulo}`}
                width="100%"
                height={440}
                className="block w-full rounded-md border border-navy/10"
              />
            )}
          </div>

          <ExternalLink
            href={item.url}
            className="mt-4 inline-block font-mono text-xs text-rust-ink underline-offset-4 transition-colors duration-200 hover:underline"
          >
            {item.linkText}
            <span aria-hidden="true" className="ml-1">
              ↗
            </span>
          </ExternalLink>
        </div>
      </div>
    </div>
  )
}
