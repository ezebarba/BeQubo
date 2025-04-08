const Contacto = () => {
    return (
      <section className="p-8 max-w-2xl mx-auto">
        <h2 className="text-3xl font-semibold mb-6">Contacto</h2>
        <form className="space-y-4">
          <input type="text" placeholder="Nombre" className="w-full p-3 border border-gray-300 rounded" />
          <input type="email" placeholder="Email" className="w-full p-3 border border-gray-300 rounded" />
          <textarea placeholder="Mensaje" className="w-full p-3 border border-gray-300 rounded h-32" />
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
            Enviar
          </button>
        </form>
      </section>
    );
  };
  
  export default Contacto;
  