const Terrenos = () => {
    return (
      <section className="p-8 max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold mb-6">Terrenos disponibles</h2>
        <p className="text-gray-700 mb-4">
          Estos son algunos de los terrenos disponibles para inversión o desarrollo. Consultanos para más detalles.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-200 h-40 rounded-lg"></div>
          <div className="bg-gray-200 h-40 rounded-lg"></div>
        </div>
      </section>
    );
  };
  
  export default Terrenos;
  