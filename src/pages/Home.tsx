import React from 'react'
import Seo from '@/components/Seo'
import AnimatedSection from '../components/AnimatedSection'

const Home = () => {
  return (
    <main className="text-center bg-crudo">
      <Seo
        title="Inicio"
        description="Conocé los proyectos y desarrollos de Bequbo."
        canonical="https://www.bequbo.com.ar/"
      />

      {/* Hero con video (autoplay requiere muted y playsInline) */}
      <section>
        <video
          src="/videos/videohome.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            maxHeight: '92vh',
            objectFit: 'cover'
          }}
        />
      </section>
    </main>
  )
}

export default Home
