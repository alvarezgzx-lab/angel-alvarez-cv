import { useRef, useState, type MouseEvent, type ReactElement } from 'react'
import ReconocimientoModal from './ReconocimientoModal'
import { reconocimientoInstitucional, type Reconocimiento, type ReconocimientoColor } from '../data/content'

// Badge fills use the -light tokens (calibrated for 4.5:1+ against navy),
// not the -ink ones — -ink is calibrated for text on cream and only clears
// ~2.4:1 against navy, well under the 3:1 non-text contrast minimum.
const BADGE_STYLES: Record<ReconocimientoColor, string> = {
  rust: 'bg-rust-light text-navy',
  sage: 'bg-sage-light text-navy',
  cream: 'bg-cream text-navy',
}

const ICONS: Record<Reconocimiento['icono'], ReactElement> = {
  graduacion: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3 2 8l10 5 10-5-10-5Z" />
      <path d="M6 10.2v4.3c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-4.3" />
      <path d="M21 8v6" />
    </svg>
  ),
  chip: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="7" y="7" width="10" height="10" rx="1.5" />
      <path d="M9 3v4M12 3v4M15 3v4M9 17v4M12 17v4M15 17v4M3 9h4M3 12h4M3 15h4M17 9h4M17 12h4M17 15h4" />
    </svg>
  ),
  certificado: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8.5" r="5" />
      <path d="M9 12.8 7 21l5-3 5 3-2-8.2" />
    </svg>
  ),
}

export default function ReconocimientoInstitucional() {
  const [openItem, setOpenItem] = useState<Reconocimiento | null>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)

  const handleOpen = (item: Reconocimiento, e: MouseEvent<HTMLButtonElement>) => {
    triggerRef.current = e.currentTarget
    setOpenItem(item)
  }

  const handleClose = () => {
    setOpenItem(null)
    triggerRef.current?.focus()
  }

  return (
    <section id="reconocimiento-institucional" className="px-5 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center font-display text-3xl font-semibold text-cream sm:text-left sm:text-4xl">
          Reconocimiento Institucional
        </h2>

        <div className="mt-10 flex flex-wrap justify-center gap-x-10 gap-y-10 sm:gap-x-14">
          {reconocimientoInstitucional.map((item) => (
            <div key={item.url} className="flex w-32 flex-col items-center gap-4 text-center sm:w-44">
              <button
                type="button"
                onClick={(e) => handleOpen(item, e)}
                aria-haspopup="dialog"
                aria-label={`Ver reconocimiento: ${item.titulo}`}
                className={`flex h-20 w-20 items-center justify-center rounded-full shadow-bevel transition-transform duration-200 hover:scale-105 focus-visible:scale-105 sm:h-24 sm:w-24 ${BADGE_STYLES[item.color]}`}
              >
                <span className="h-8 w-8 sm:h-9 sm:w-9">{ICONS[item.icono]}</span>
              </button>
              <p className="font-body text-xs leading-snug text-cream/80 sm:text-sm">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      <ReconocimientoModal item={openItem} onClose={handleClose} />
    </section>
  )
}
