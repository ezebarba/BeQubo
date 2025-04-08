const TrabajaConNosotros = () => {
    return (
      <section className="p-8 max-w-xl mx-auto">
        <h2 className="text-3xl font-semibold mb-6">Trabajá con Nosotros</h2>
        <p className="text-gray-700 mb-4">
          ¿Querés formar parte de nuestro equipo? Completá el siguiente formulario y contanos sobre vos.
        </p>
        <form className="space-y-4">
          <input type="text" placeholder="Nombre completo" className="w-full p-3 border border-gray-300 rounded" />
          <input type="email" placeholder="Email" className="w-full p-3 border border-gray-300 rounded" />
          <input type="file" className="w-full p-2 border border-gray-300 rounded" />
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
            Enviar CV
          </button>
        </form>
      </section>
    );
  };
  
  export default TrabajaConNosotros;
  