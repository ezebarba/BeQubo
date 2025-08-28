import Seo from '@/components/Seo'

const Nosotros = () => {
  return (
    <main>
      <Seo
        title="Nosotros"
        description="En Bequbo desarrollamos espacios que combinan diseño, calidad y confort."
        canonical="https://www.bequbo.com.ar/nosotros"
      />
      <section className="p-8 max-w-3xl mx-auto">
        <h2 className="text-primary text-3xl font-semibold mb-6">Nosotros</h2>
        <p className="text-primary leading-relaxed">
          En Bequbo desarrollamos espacios que combinan diseño, calidad y confort, priorizando el entorno urbano en cada proyecto.
        </p>
        <p className="text-primary leading-relaxed">
          Desde nuestro inicio, en el partido de Tres de Febrero, nos consolidamos como una desarrolladora creativa, dinámica y cercana, que trabaja con pasión y constancia para concretar sueños y transformar espacios en hogares.
        </p>
        <p className="text-primary leading-relaxed">
          Con cada nuevo desarrollo, en Bequbo reafirmamos nuestra vocación por construir futuro, apostando a la expansión y al crecimiento sostenido, haciendo énfasis en lo más importante: el trato humano, la transparencia y la confianza.
        </p>
        <p className="text-primary leading-relaxed">
          Hoy continuamos abriendo camino a nuevas ideas, barrios y comunidades, con el deseo de dejar una huella sólida en cada emprendimiento y en quienes confían en nosotros.
        </p>
      </section>
    </main>
  )
}

export default Nosotros
