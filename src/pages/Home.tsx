import Seo from '@/components/Seo'
import HeroVideoAdaptive from '@/components/HeroVideoAdaptive'

export default function Home() {
  return (
    <main>
      <Seo
        title="Inicio"
        description="Conocé los proyectos y desarrollos de Bequbo."
        canonical="https://www.bequbo.com.ar/"
      />
      <HeroVideoAdaptive
        srcLandscape="/videos/videohome.mp4"
        srcPortrait="/videos/videohome.mp4"
        // opcionales: posters
        // posterLandscape="/images/poster_landscape.jpg"
        // posterPortrait="/images/poster_portrait.jpg"
        heightVh={92}
        portraitBelowPx={768} // si querés forzar portrait bajo 768px
      />
    </main>
  )
}
