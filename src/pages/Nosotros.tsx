// src/pages/Nosotros.tsx
import Seo from '@/components/Seo'

export default function Nosotros() {
  return (
    <main>
      <Seo
        title="Nosotros"
        description="Bequbo: desarrolladora creativa, dinámica y cercana."
        canonical="https://www.bequbo.com.ar/nosotros"
      />

      {/* Hero con borde inferior de color */}
      <section className="relative w-full h-[44vh] md:h-[54vh] overflow-hidden">
        <img
          src="/images/balcon_caseros.png"
          alt="Balcón de un desarrollo de Bequbo"
          className="w-full h-full object-cover"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-verde" />
        <div className="absolute bottom-8 left-6 md:left-10 text-crudo">
          <h1 className="text-3xl md:text-5xl font-semibold drop-shadow">Nosotros</h1>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Texto en "tarjeta" con borde lateral */}
          <div className="md:col-span-3">
            <div className="bg-white/90 border-l-4 border-lila rounded-r-xl shadow-sm p-6 md:p-8">
              <p className="text-lg text-zinc-900">
                En <strong>Bequbo</strong> desarrollamos espacios que combinan diseño, calidad y confort,
                priorizando el entorno urbano en cada proyecto.
              </p>
              <br>
              </br>
              <p className="text-lg text-zinc-900">
                Nacimos en <strong>Tres de Febrero</strong> y nos consolidamos como una desarrolladora creativa, dinámica y cercana,
                trabajando con pasión y constancia para transformar espacios en hogares.
              </p>
              <br>
              </br>
              <p className="text-lg text-zinc-900">
                Reafirmamos nuestra vocación por construir futuro, apostando a la expansión y al crecimiento sostenido,
                con foco en el <strong>trato humano</strong>, la <strong>transparencia</strong> y la <strong>confianza</strong>.
              </p>
              <br>
              </br>
              <p className="text-lg text-zinc-900">
                Hoy seguimos abriendo camino a nuevas ideas, barrios y comunidades, dejando una huella sólida en cada emprendimiento.
              </p>
            </div>
          </div>

          {/* Mapa con caption y marco sutil */}
          <div className="md:col-span-2">
            <figure className="rounded-xl overflow-hidden ring-1 ring-zinc-200 bg-white">
              <img
                src="/images/mapa_tresdefebrero.png"
                alt="Mapa de Tres de Febrero con proyectos de Bequbo"
                className="w-full h-auto object-contain"
                loading="lazy"
                decoding="async"
              />
            </figure>
            <figcaption className="mt-3 text-sm text-zinc-600">
              Proyectos en desarrollo y nuevas oportunidades en Tres de Febrero y alrededores.
            </figcaption>
          </div>
        </div>
      </section>
    </main>
  )
}
