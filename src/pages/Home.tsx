const Home = () => {
  return (
    <main className="text-center py-20 bg-gray-100 px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Desarrollando viviendas de calidad</h1>
      <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
        Con BeQubo tu próximo hogar te espera
      </p>
      <div className="flex justify-center">
        <img
          src="/src/images/home.jpg"
          alt="BeQubo"
          className="w-full max-w-md rounded-2xl shadow-lg object-cover"
        />
      </div>
    </main>
  );
};

export default Home;
