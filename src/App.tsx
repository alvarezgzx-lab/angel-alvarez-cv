import { Analytics } from '@vercel/analytics/react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Perfil from './components/Perfil'
import Formacion from './components/Formacion'
import Certificaciones from './components/Certificaciones'
import ReconocimientoInstitucional from './components/ReconocimientoInstitucional'
import Proyectos from './components/Proyectos'
import Experiencia from './components/Experiencia'
import Habilidades from './components/Habilidades'
import Contacto from './components/Contacto'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-navy font-body text-cream">
      <a
        href="#inicio"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-rust-ink focus:px-4 focus:py-2 focus:text-cream"
      >
        Saltar al contenido principal
      </a>
      <Nav />
      <main>
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
      <Analytics />
    </div>
  )
}
