import Seo from '@/components/Seo'

const Contacto = () => {
  return (
    <>
      <Seo
        title="Contacto"
        description="Escribinos: consultas comerciales, prensa o soporte. Bequbo."
        canonical="https://www.bequbo.com.ar/contacto"
      />

      {/* Imagen de cabecera con overlay */}
      <div className="relative w-full h-[500px] md:h-[500px] overflow-hidden">
        <img
          src="/images/contacto.jpg"
          alt="Persona trabajando en laptop"
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent"></div>
      </div>

      {/* Formulario */}
      <section className="p-8 max-w-2xl mx-auto">
        <h2 className="text-primary text-3xl font-semibold mb-6">Contacto</h2>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Nombre"
            className="w-full p-3 border border-gray-300 rounded"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded"
          />
          <textarea
            placeholder="Mensaje"
            className="w-full p-3 border border-gray-300 rounded h-32"
          />
          <button
            type="submit"
            className="bg-verde text-crudo px-6 py-2 rounded hover:bg-lila transition"
          >
            Enviar
          </button>
        </form>
      </section>
    </>
  )
}

export default Contacto
