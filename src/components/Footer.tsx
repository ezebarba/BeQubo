// src/components/Footer.tsx
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm mb-4 md:mb-0">&copy; {new Date().getFullYear()} BeQubo. Todos los derechos reservados.</p>
        <div className="flex gap-4">
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
            <FaInstagram size={20} />
          </a>
          <a href="https://wa.me/541112345678" target="_blank" rel="noopener noreferrer" className="hover:text-green-500">
            <FaWhatsapp size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
