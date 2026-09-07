import { createFileRoute } from "@tanstack/react-router";
import { LanguageProvider, useLanguage } from "@/lib/language";
import Nav from "@/components/cv/Nav";
import {
  Certificaciones,
  Contacto,
  Experiencia,
  Footer,
  Formacion,
  Habilidades,
  Hero,
  Perfil,
  Proyectos,
  ReconocimientoInstitucional,
} from "@/components/cv/Sections";

// Title/description/OG/Twitter/canonical/JSON-LD for the site live in
// __root.tsx's head() — this is the only real page, so there's no per-route
// meta to add here. (A duplicate, slightly different set used to live here
// too; removed to avoid two conflicting <meta property="og:*"> tags.)
export const Route = createFileRoute("/")({
  component: Index,
});

function Page() {
  const { copy } = useLanguage();
  return (
    <div className="min-h-screen bg-navy">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-cream focus:px-4 focus:py-2 focus:font-body focus:text-navy"
      >
        {copy.skipToContent}
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Perfil />
        <Formacion />
        <Certificaciones />
        <ReconocimientoInstitucional />
        <Proyectos />
        <Experiencia />
        <Habilidades />
        <Contacto />
      </main>
      <Footer />
    </div>
  );
}

function Index() {
  return (
    <LanguageProvider>
      <Page />
    </LanguageProvider>
  );
}
