import Seo from '@/components/Seo'

export default function Home() {
  return (
    <main>
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
          preload="metadata"
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            maxHeight: '92vh',
            objectFit: 'cover'
          }}
        />
      </section>

      {/* Contenido
      <section className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-semibold mb-4">Bequbo</h1>
        <p className="text-lg opacity-80">
          Desarrollos y obras con enfoque en calidad, diseño y transparencia.
        </p>
      </section> */}
    </main>
  )
}
