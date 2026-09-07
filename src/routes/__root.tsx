import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { es } from "../data/content";

const SITE_URL = "https://angel-alvarez-cv.vercel.app/";
const OG_IMAGE_URL = "https://angel-alvarez-cv.vercel.app/og-image.png";

// The head() below is server-rendered once (statically, in Spanish — the
// site's default language) and is what search engines and social-share
// scrapers actually read, since they don't execute the client-side JS that
// LanguageProvider uses to update document.title/lang after hydration for
// a live language toggle. Keep this in sync with `es` in data/content.ts.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Jesús Ángel Álvarez González",
  alternateName: "Jesús Álvarez",
  jobTitle:
    "Especialista en Aprendizaje y People Analytics | Habilitación de Fuerza Laboral y Estrategia de Negocio | Investigador Independiente en Economía de la Educación y el Talento",
  url: SITE_URL,
  email: "mailto:alvarezgzx@gmail.com",
  sameAs: ["https://www.linkedin.com/in/jesusalvarezgz"],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Universidad Metropolitana de Monterrey (UMM)",
  },
  address: {
    "@type": "PostalAddress",
    addressRegion: "Nuevo León",
    addressCountry: "MX",
  },
};

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: es.title },
      { name: "description", content: es.metaDescription },
      { name: "author", content: "Jesús Álvarez" },
      { property: "og:type", content: "profile" },
      { property: "og:title", content: es.title },
      { property: "og:description", content: es.metaDescription },
      { property: "og:image", content: OG_IMAGE_URL },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:url", content: SITE_URL },
      { property: "og:locale", content: "es_MX" },
      { property: "profile:first_name", content: "Jesús" },
      { property: "profile:last_name", content: "Álvarez" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: es.title },
      { name: "twitter:description", content: es.metaDescription },
      { name: "twitter:image", content: OG_IMAGE_URL },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "canonical", href: SITE_URL },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32.png" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
    ],
  }),

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang={es.htmlLang}>
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger -- static JSON-LD, not user input
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
