import { useEffect, useRef, useState } from "react";
import { Award, Cpu, ExternalLink, GraduationCap, Search, X } from "lucide-react";
import { persona, type Insignia } from "@/data/content";
import { useLanguage } from "@/lib/language";

/* ---------- editorial primitives ---------- */

function Shell({ children, id }: { children: React.ReactNode; id: string }) {
  return (
    <section id={id} className="border-t border-cream/12 px-5 py-14 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-5xl">{children}</div>
    </section>
  );
}

function Masthead({ num, children }: { num: string; children: React.ReactNode }) {
  return (
    <div className="mb-10 grid gap-3 sm:grid-cols-[7.5rem_1fr] sm:items-baseline sm:gap-6">
      <span className="font-mono text-xs tracking-[0.3em] text-rust-light">{num}</span>
      <div>
        <h2 className="font-display text-3xl font-normal italic leading-none text-cream sm:text-[2.75rem]">
          {children}
        </h2>
        <span aria-hidden="true" className="mt-4 block h-px w-full bg-cream/20" />
      </div>
    </div>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="sm:grid sm:grid-cols-[7.5rem_1fr] sm:gap-6">{children}</div>;
}

function Aside({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-sage-light">
      {children}
    </p>
  );
}

/* ---------- hero ---------- */

export function Hero() {
  const { copy } = useLanguage();
  return (
    <section id="inicio" className="px-5 pb-14 pt-10 sm:px-8 sm:pb-20 sm:pt-14">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-center justify-between gap-3 border-y border-cream/20 py-2 font-mono text-[0.65rem] uppercase tracking-[0.28em] text-cream/55">
          <span>{copy.location}</span>
          <span aria-hidden="true" className="hidden sm:inline">
            —
          </span>
          <span>{new Date().getFullYear()}</span>
        </div>

        <div className="mt-10 grid items-end gap-10 md:grid-cols-[1.35fr_1fr]">
          <div>
            <h1 className="font-display text-[3.25rem] font-normal italic leading-[0.92] tracking-tight text-cream sm:text-[5rem] md:text-[6rem]">
              {persona.name}
            </h1>
            <span aria-hidden="true" className="mt-6 block h-px w-24 bg-rust-ui" />
            <p className="mt-6 max-w-md font-body text-base leading-relaxed text-cream/75 sm:text-lg">
              {copy.headline}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href={copy.cvPdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-rust-ink px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-cream transition-colors hover:bg-rust-ui"
              >
                {copy.ctaCv}
              </a>
              <a
                href="#contacto"
                className="border-b border-cream/40 pb-1 font-mono text-xs uppercase tracking-[0.2em] text-cream/80 transition-colors hover:border-rust-ui hover:text-cream"
              >
                {copy.ctaContact}
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-48 sm:w-64 md:mx-0 md:justify-self-end">
            <span
              aria-hidden="true"
              className="absolute -bottom-3 -right-3 h-full w-full rounded-full border border-rust-ui/60"
            />
            <img
              src={persona.photo}
              alt={copy.photoAlt}
              width={480}
              height={480}
              className="relative aspect-square w-full rounded-full object-cover grayscale-[15%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- profile ---------- */

export function Perfil() {
  const { copy } = useLanguage();
  return (
    <Shell id="perfil">
      <Grid>
        <Aside>{copy.navLinks.find((l) => l.href === "#perfil")?.label ?? ""}</Aside>
        <div className="mt-4 sm:mt-0">
          <p className="font-display text-xl font-normal italic leading-relaxed text-cream/90 first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-display first-letter:text-6xl first-letter:not-italic first-letter:leading-[0.8] first-letter:text-rust-light sm:text-2xl">
            {copy.resumenProfesional}
          </p>
          <p className="mt-6 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-cream/45">
            {persona.fullName}
          </p>
        </div>
      </Grid>
    </Shell>
  );
}

/* ---------- education ---------- */

export function Formacion() {
  const { copy } = useLanguage();
  return (
    <Shell id="formacion">
      <Masthead num="01">{copy.headings.formacion}</Masthead>
      <ul className="divide-y divide-cream/12">
        {copy.formacion.map((item) => (
          <li key={item.titulo} className="py-7 first:pt-0 sm:grid sm:grid-cols-[7.5rem_1fr] sm:gap-6">
            <Aside>{item.fecha}</Aside>
            <div className="mt-2 sm:mt-0">
              <h3 className="font-display text-xl font-normal italic text-cream sm:text-2xl">
                {item.titulo}
              </h3>
              <p className="mt-1 font-body text-sm text-cream/60">{item.institucion}</p>
              {item.nota ? (
                <p className="mt-4 max-w-2xl border-l-2 border-rust-ui/70 pl-4 font-body text-sm leading-relaxed text-cream/75">
                  {item.nota}
                </p>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </Shell>
  );
}

/* ---------- shared: icon badge grid + modal (certifications & recognition) ---------- */

const icons = {
  graduacion: GraduationCap,
  chip: Cpu,
  certificado: Award,
};

const badgeSurfaces: Record<string, string> = {
  rust: "bg-rust text-cream",
  sage: "bg-sage text-navy",
  cream: "bg-cream text-navy",
};

function BadgeSection({
  sectionId,
  num,
  heading,
  hint,
  items,
  ariaLabel,
}: {
  sectionId: string;
  num: string;
  heading: string;
  hint?: string;
  items: Insignia[];
  ariaLabel: (titulo: string) => string;
}) {
  const { copy } = useLanguage();
  const [active, setActive] = useState<Insignia | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!active) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActive(null);
        triggerRef.current?.focus();
      }
      if (e.key === "Tab" && dialogRef.current) {
        const nodes = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button, iframe, [tabindex]:not([tabindex="-1"])',
        );
        if (nodes.length === 0) return;
        const first = nodes[0]!;
        const last = nodes[nodes.length - 1]!;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [active]);

  const close = () => {
    setActive(null);
    triggerRef.current?.focus();
  };

  // Only PDFs (or an explicit `embed`) render inline — arbitrary third-party
  // pages (e.g. Coursera share links) commonly block being framed, so those
  // fall back to description + external link only.
  const isPreviewablePdf = active ? active.url.toLowerCase().endsWith(".pdf") : false;

  return (
    <Shell id={sectionId}>
      <Masthead num={num}>{heading}</Masthead>
      {hint ? <Aside>{hint}</Aside> : null}

      <ul className={`flex flex-wrap justify-center gap-10 ${hint ? "mt-10" : ""}`}>
        {items.map((item) => {
          const Icon = icons[item.icono];
          return (
            <li key={item.titulo} className="flex w-48 flex-col items-center text-center">
              <button
                type="button"
                aria-label={ariaLabel(item.titulo)}
                onClick={(e) => {
                  triggerRef.current = e.currentTarget;
                  setActive(item);
                }}
                className={`relative flex h-24 w-24 items-center justify-center rounded-full transition-transform hover:scale-105 ${badgeSurfaces[item.color]}`}
              >
                <Icon className="h-9 w-9" aria-hidden="true" />
                <span className="absolute bottom-0 right-0 rounded-full bg-navy p-1.5 text-cream ring-1 ring-cream/25">
                  <Search className="h-3 w-3" aria-hidden="true" />
                </span>
              </button>
              {item.fecha ? (
                <p className="mt-4 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-sage-light">
                  {item.fecha}
                </p>
              ) : null}
              <h3 className="mt-2 font-display text-base font-normal italic text-cream">
                {item.titulo}
              </h3>
              <p className="mt-2 max-w-xs font-body text-sm leading-relaxed text-cream/65">
                {item.label}
              </p>
            </li>
          );
        })}
      </ul>

      {active ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy/85 p-4"
          onClick={close}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={active.titulo}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] w-full max-w-lg overflow-auto bg-cream p-5 text-navy"
          >
            <div className="flex items-start justify-between gap-4 border-b border-navy/15 pb-3">
              <h3 className="font-display text-lg font-normal italic">{active.titulo}</h3>
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                aria-label={copy.close}
                className="p-1 text-navy hover:bg-navy/10"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <p className="mt-3 font-body text-sm leading-relaxed text-navy/80">{active.label}</p>
            {active.embed || isPreviewablePdf ? (
              <div className="mt-4">
                {active.embed ? (
                  <iframe
                    src={active.embed.src}
                    title={active.embed.title}
                    height={active.embed.height}
                    width={active.embed.width}
                    loading="lazy"
                    className="w-full max-w-full"
                    allowFullScreen
                  />
                ) : (
                  <iframe src={active.url} title={active.titulo} className="h-[60vh] w-full" />
                )}
              </div>
            ) : null}
            <a
              href={active.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-rust-ink underline-offset-4 hover:underline"
            >
              {active.linkText}
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      ) : null}
    </Shell>
  );
}

/* ---------- certifications ---------- */

export function Certificaciones() {
  const { copy } = useLanguage();
  return (
    <BadgeSection
      sectionId="certificaciones"
      num="02"
      heading={copy.headings.certificaciones}
      items={copy.licenciasCertificaciones}
      ariaLabel={copy.reconocimientoAria}
    />
  );
}

/* ---------- recognition ---------- */

export function ReconocimientoInstitucional() {
  const { copy } = useLanguage();
  return (
    <BadgeSection
      sectionId="reconocimiento-institucional"
      num="03"
      heading={copy.headings.reconocimiento}
      hint={copy.reconocimientoHint}
      items={copy.reconocimientoInstitucional}
      ariaLabel={copy.reconocimientoAria}
    />
  );
}

/* ---------- projects ---------- */

export function Proyectos() {
  const { copy } = useLanguage();
  return (
    <Shell id="proyectos">
      <Masthead num="04">{copy.headings.proyectos}</Masthead>
      <Aside>{copy.proyectosHint}</Aside>
      <ul className="mt-10 divide-y divide-cream/12">
        {copy.proyectosPublicaciones.map((p, i) => (
          <li key={p.titulo} className="py-8 first:pt-0 sm:grid sm:grid-cols-[7.5rem_1fr] sm:gap-6">
            <div>
              <span className="font-display text-3xl italic text-rust-light">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-1 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-sage-light">
                {p.fecha}
              </p>
            </div>
            <div className="mt-3 sm:mt-0">
              <span className="inline-block rounded-full border border-rust-light/40 px-2.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-rust-light">
                {p.tipo}
              </span>
              <h3 className="mt-2 font-display text-xl font-normal italic text-cream sm:text-2xl">
                {p.titulo}
              </h3>
              <p className="mt-3 max-w-2xl font-body text-sm leading-relaxed text-cream/75">
                {p.descripcion}
              </p>
              {p.enlacePrincipal ? (
                <a
                  href={p.enlacePrincipal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-rust-light underline-offset-4 hover:underline"
                >
                  {p.enlacePrincipal.label}
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </Shell>
  );
}

/* ---------- experience ---------- */

export function Experiencia() {
  const { copy } = useLanguage();
  return (
    <Shell id="experiencia">
      <Masthead num="05">{copy.headings.experiencia}</Masthead>
      <ul className="divide-y divide-cream/12">
        {copy.experiencia.map((e) => (
          <li key={e.puesto} className="py-8 first:pt-0 sm:grid sm:grid-cols-[7.5rem_1fr] sm:gap-6">
            <Aside>{e.fecha}</Aside>
            <div className="mt-2 sm:mt-0">
              <h3 className="font-display text-xl font-normal italic text-cream sm:text-2xl">
                {e.puesto}
              </h3>
              <p className="mt-1 font-body text-sm text-cream/60">{e.organizacion}</p>
              <ul className="mt-4 max-w-2xl space-y-2">
                {e.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex gap-3 font-body text-sm leading-relaxed text-cream/75"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1 w-4 shrink-0 bg-rust-ui/80"
                    />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </Shell>
  );
}

/* ---------- skills ---------- */

export function Habilidades() {
  const { copy } = useLanguage();
  return (
    <Shell id="habilidades">
      <Masthead num="06">{copy.headings.habilidades}</Masthead>
      <div className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
        {Object.entries(copy.habilidades).map(([group, items]) => (
          <div key={group}>
            <h3 className="border-b border-cream/15 pb-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-sage-light">
              {group}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {items.map((item) => (
                <li
                  key={item}
                  className="border border-cream/20 px-3 py-1 font-body text-xs text-cream/80"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-12 border-t border-cream/15 pt-6 sm:grid sm:grid-cols-[7.5rem_1fr] sm:gap-6">
        <Aside>{copy.idiomasTitulo}</Aside>
        <ul className="mt-2 flex flex-wrap gap-x-10 gap-y-2 sm:mt-0">
          {Object.entries(copy.idiomas).map(([name, level]) => (
            <li key={name} className="font-display text-lg italic text-cream/85">
              {name}: <span className="not-italic font-body text-sm text-cream/65">{level}</span>
            </li>
          ))}
        </ul>
      </div>
    </Shell>
  );
}

/* ---------- contact ---------- */

export function Contacto() {
  const { copy } = useLanguage();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2500);
    return () => clearTimeout(t);
  }, [copied]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://platform.linkedin.com/badges/js/profile.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      script.remove();
    };
  }, []);

  return (
    <section id="contacto" className="border-t border-cream/12 px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-rust-light">07</p>
        <h2 className="mt-4 max-w-3xl font-display text-3xl font-normal italic leading-tight text-cream sm:text-[3.25rem]">
          {copy.contactoPrompt}
        </h2>
        <span aria-hidden="true" className="mt-8 block h-px w-full bg-cream/20" />

        <div className="mt-10 flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col items-start gap-2">
            <a
              href={`mailto:${persona.email}`}
              aria-label={copy.emailAria}
              onClick={() => {
                navigator.clipboard?.writeText(persona.email).then(
                  () => setCopied(true),
                  () => {},
                );
              }}
              className="bg-rust-ink px-8 py-3 font-mono text-xs uppercase tracking-[0.2em] text-cream transition-colors hover:bg-rust-ui"
            >
              {copy.emailLabel}
            </a>
            <p
              role="status"
              aria-live="polite"
              className="font-mono text-[0.7rem] text-sage-light"
              style={{ opacity: copied ? 1 : 0 }}
            >
              {copied ? copy.emailCopied : ""}
            </p>
          </div>

          <div
            key={copy.badgeLocale}
            className="badge-base LI-profile-badge"
            data-locale={copy.badgeLocale}
            data-size="medium"
            data-theme="light"
            data-type="HORIZONTAL"
            data-vanity="angelalvarezg97"
            data-version="v1"
          >
            <a
              className="badge-base__link LI-simple-link"
              href={persona.linkedinBadge}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${copy.linkedinLabel} — ${persona.name}`}
            >
              {persona.name} G.
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const { copy } = useLanguage();
  return (
    <footer className="border-t border-cream/12 px-5 py-8 sm:px-8">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-2">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.28em] text-cream/45">
          © {new Date().getFullYear()} {copy.footer}
        </p>
        <p className="font-display text-sm italic text-cream/45">{copy.location}</p>
      </div>
    </footer>
  );
}
