import Seo from '@/components/Seo'
import HeroVideoAdaptive from '@/components/HeroVideoAdaptive'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <main>
      <Seo
        title="Inicio"
        description="Conocé los proyectos y desarrollos de Bequbo."
        canonical="https://www.bequbo.com.ar/"
      />

      <HeroVideoAdaptive
        // Landscape 16:9
        landscape720="/videos/home_16_9_720.mp4"
        landscape1080="/videos/home_16_9_1080.mp4"
        // Portrait 4:3
        portrait720="/videos/home_4_3_720.mp4"
        portrait1080="/videos/home_4_3_1080.mp4"

        // Posters opcionales
        // posterLandscape="/images/poster_landscape.jpg"
        // posterPortrait="/images/poster_portrait.jpg"

        heightVh={92}
        portraitBelowPx={768}

        // Overlay (podés tunear el gradiente u opacidad)
        overlay
        overlayClassName="bg-gradient-to-b from-black/70 via-black/40 to-black/10"

        // Slot de contenido
        contentPosition="bottom-left"
        contentClassName="text-crudo max-w-xl pb-10"
      >
        <h1 className="text-3xl md:text-5xl font-semibold leading-tight drop-shadow">
          Tu próximo paso, con Bequbo
        </h1>
        <p className="mt-3 text-base md:text-lg opacity-90">
          Diseñamos y desarrollamos proyectos inmobiliarios que elevan tu calidad de vida.
        </p>
        <div className="mt-5 flex gap-3">
          <Link
            to="/proyectos"
            className="bg-verde text-crudo px-5 py-2 rounded hover:bg-lila transition"
          >
            Ver proyectos
          </Link>
          <Link
            to="/contacto"
            className="bg-transparent border border-crudo/80 text-crudo px-5 py-2 rounded hover:bg-crudo hover:text-lila transition"
          >
            Contáctanos
          </Link>
        </div>
      </HeroVideoAdaptive>
    </main>
  )
}
