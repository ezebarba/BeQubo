import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/">
          <img src="/src/images/logo.jpg" alt="BeQubo" className="h-10" />
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/" className="text-gray-700">Inicio</Link></li>
            <li><Link to="/obras" className="text-gray-700">Obras</Link></li>
            <li><Link to="/nosotros" className="text-gray-700">Nosotros</Link></li>
            <li><Link to="/contacto" className="text-gray-700">Contacto</Link></li>
            <li><Link to="/trabaja-con-nosotros" className="text-gray-700">Trabajá con Nosotros</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
