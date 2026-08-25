import { formacion } from '../data/content'

export default function Formacion() {
  return (
    <section id="formacion" className="bg-navy/[0.03] px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <h2 className="font-display text-3xl font-semibold text-navy sm:text-4xl">Formación</h2>

        <ul className="mt-8 space-y-6">
          {formacion.map((item) => (
            <li
              key={item.titulo}
              className="rounded-lg border border-navy/10 bg-cream p-6 shadow-sm"
            >
              <p className="font-mono text-xs uppercase tracking-wide text-sage-ink">{item.fecha}</p>
              <h3 className="mt-2 font-display text-xl font-semibold text-navy">
                {item.titulo}
              </h3>
              <p className="mt-1 font-body text-navy/80">{item.institucion}</p>
              {item.nota && (
                <p className="mt-3 font-body text-sm text-navy/70">{item.nota}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
