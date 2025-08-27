import React from 'react'
import Seo from '@/components/Seo'

const TrabajaConNosotros = () => {
  return (
    <main>
      <Seo
        title="Trabajá con Nosotros"
        description="Sumate a Bequbo: dejanos tus datos y CV."
        canonical="https://www.bequbo.com.ar/trabaja-con-nosotros"
      />
      <section className="p-8 max-w-xl mx-auto">
        <h2 className="text-primary text-3xl font-semibold mb-6">Trabajá con Nosotros</h2>
        <p className="text-primary mb-4">
          ¿Querés formar parte de nuestro equipo? Completá el siguiente formulario y contanos sobre vos.
        </p>
        <form className="space-y-4">
          <input type="text" placeholder="Nombre completo" className="w-full p-3 border border-gray-300 rounded" />
          <input type="email" placeholder="Email" className="w-full p-3 border border-gray-300 rounded" />
          <input type="file" className="w-full p-2 border border-gray-300 rounded" />
          <button type="submit" className="bg-verde text-crudo px-6 py-2 rounded hover:bg-lila transition">
            Enviar CV
          </button>
        </form>
      </section>
    </main>
  )
}

export default TrabajaConNosotros
