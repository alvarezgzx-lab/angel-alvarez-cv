import { useEffect, useRef, useState, type ReactNode } from 'react'

const PALETTE = ['bg-rust-ink', 'bg-navy', 'bg-sage-ink'] as const

interface RevealCardProps {
  children: ReactNode
  index?: number
  className?: string
}

export default function RevealCard({ children, index = 0, className = '' }: RevealCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [revealed, setRevealed] = useState(false)
  const color = PALETTE[index % PALETTE.length]

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setRevealed(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {children}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 ${color} transition-transform duration-500 ease-in-out`}
        style={{
          transform: revealed ? 'translateX(101%)' : 'translateX(0)',
          transitionDelay: revealed ? `${index * 90}ms` : '0ms',
        }}
      />
    </div>
  )
}
