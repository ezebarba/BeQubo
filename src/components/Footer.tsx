// components/Footer.tsx
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-12">
      <div className="container mx-auto px-4 grid md:grid-cols-3 gap-4 text-center md:text-left">
        <div>
          <h4 className="font-bold mb-2">Clamaco</h4>
          <p>+40 años proyectando el futuro con más de 100 edificios construidos.</p>
        </div>
        <div>
          <h4 className="font-bold mb-2">Navegación</h4>
          <ul className="space-y-1">
            <li><Link to="/" className="hover:underline">Inicio</Link></li>
            <li><Link to="/obras" className="hover:underline">Obras</Link></li>
            <li><Link to="/nosotros" className="hover:underline">Nosotros</Link></li>
            <li><Link to="/contacto" className="hover:underline">Contacto</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">Contacto</h4>
          <p>contacto@clamaco.com.ar</p>
          <p>(011) 4444-4444</p>
          <div className="mt-2 flex justify-center md:justify-start gap-2">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <img src="/icons/facebook.svg" alt="Facebook" className="h-6" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <img src="/icons/instagram.svg" alt="Instagram" className="h-6" />
            </a>
          </div>
        </div>
      </div>
      <div className="text-center mt-6 text-sm text-gray-400">
        © {new Date().getFullYear()} Clamaco. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;
