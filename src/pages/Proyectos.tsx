import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Seo from '@/components/Seo'
import proyectos from '../resources/proyectos.json'

interface Proyecto {
  slug: string
  nombre: string
  direccion: string
  imagenes: string[]
}

const Proyectos = () => {
  const [lista, setLista] = useState<Proyecto[]>([])

  useEffect(() => {
    setLista(proyectos as Proyecto[])
  }, [])

  return (
    <main>
      <Seo
        title="Proyectos"
        description="Nuestros desarrollos y obras destacados. Bequbo."
        canonical="https://www.bequbo.com.ar/proyectos"
      />

      {/* Hero con borde inferior de color (match con Nosotros/Contacto) */}
      <section className="relative w-full h-[44vh] md:h-[54vh] overflow-hidden">
        <img
          src="/images/proyectos_hero.png" // coloca tu imagen recortada aquí
          alt="Fachada de desarrollo de Bequbo"
          className="w-full h-full object-cover"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-verde" />
        <div className="absolute bottom-8 left-6 md:left-10 text-crudo">
          <h1 className="text-3xl md:text-5xl font-semibold drop-shadow">Proyectos</h1>
          <p className="mt-2 opacity-90">Diseño, calidad y valor de inversión.</p>
        </div>
      </section>

      {/* Grilla de proyectos */}
      <section className="max-w-7xl mx-auto px-6 py-10 md:py-16">
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {lista.map((p) => (
            <Link key={p.slug} to={`/proyecto/${p.slug}`} className="group">
              <article className="bg-white shadow rounded-lg overflow-hidden ring-1 ring-zinc-200 transition hover:shadow-lg hover:-translate-y-0.5">
                <div className="relative">
                  <img
                    src={p.imagenes?.[0]}
                    alt={p.nombre}
                    className="w-full h-60 object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="absolute inset-x-0 bottom-0 h-1 bg-lila/80 opacity-0 group-hover:opacity-100 transition" />
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-zinc-900 mb-1">{p.nombre}</h2>
                  <p className="text-zinc-600">{p.direccion}</p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}

export default Proyectos
