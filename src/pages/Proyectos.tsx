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
    <main className="container mx-auto px-4 py-8">
      <Seo
        title="Proyectos"
        description="Nuestros desarrollos y obras destacados. Bequbo."
        canonical="https://www.bequbo.com.ar/proyectos"
      />
      <h1 className="text-3xl font-bold text-primary mb-6 font-primary">Proyectos</h1>
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {lista.map((p) => (
          <Link key={p.slug} to={`/proyecto/${p.slug}`}>
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <img
                src={p.imagenes?.[0]}
                alt={p.nombre}
                className="w-full h-60 object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-primary mb-2 font-primary">{p.nombre}</h2>
                <p className="text-gray-600">{p.direccion}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}

export default Proyectos
