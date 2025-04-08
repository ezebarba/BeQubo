const Obras = () => {
    return (
      <section className="p-8 max-w-5xl mx-auto">
        <h2 className="text-3xl font-semibold mb-6">Obras</h2>
        <p className="text-gray-700 mb-4">
          Estas son algunas de nuestras obras destacadas. Desde edificios residenciales hasta desarrollos comerciales, construimos con calidad y compromiso.
        </p>
        {/* Placeholder para galería de obras */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-gray-200 h-48 rounded-lg"></div>
          <div className="bg-gray-200 h-48 rounded-lg"></div>
          <div className="bg-gray-200 h-48 rounded-lg"></div>
        </div>
      </section>
    );
  };
  
  export default Obras;
  