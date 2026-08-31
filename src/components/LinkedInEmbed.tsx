import { useState } from 'react'
import type { Embed } from '../data/content'

export default function LinkedInEmbed({ embed }: { embed: Embed }) {
  const [loaded, setLoaded] = useState(false)

  if (loaded) {
    return (
      <div className="w-full max-w-[504px] overflow-hidden rounded-md">
        <iframe
          src={embed.src}
          title={embed.title}
          width="100%"
          height={embed.height}
          allowFullScreen
          className="block w-full border-0"
        />
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={() => setLoaded(true)}
      className="flex w-full max-w-[504px] flex-col items-start gap-2 rounded-md border border-navy/10 bg-navy/[0.03] px-5 py-6 text-left transition-colors duration-200 hover:bg-navy/[0.06]"
      style={{ aspectRatio: `${embed.width} / ${embed.height}` }}
    >
      <span className="font-mono text-xs uppercase tracking-wide text-sage-ink">
        Publicación de LinkedIn
      </span>
      <span className="font-body text-sm font-medium text-navy">{embed.title}</span>
      <span className="mt-auto inline-flex items-center rounded-md bg-rust-ink px-3 py-1.5 font-body text-xs font-semibold text-cream">
        Ver publicación
        <span aria-hidden="true" className="ml-1.5">
          ↗
        </span>
      </span>
    </button>
  )
}
