import { persona } from '../data/content'

export default function Footer() {
  return (
    <footer className="bg-navy px-5 py-6 text-center sm:px-8">
      <p className="font-mono text-xs text-cream/60">
        © {new Date().getFullYear()} {persona.name} · {persona.location}
      </p>
    </footer>
  )
}
