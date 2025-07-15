import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';


const Header = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    setMenuOpen(false); // cerrar menú al navegar
  }, [location.pathname]);

  const navLinks = [
    { to: '/', label: 'Inicio' },
    { to: '/proyectos', label: 'Proyectos' },
    { to: '/nosotros', label: 'Nosotros' },
    { to: '/contacto', label: 'Contacto' },
    { to: '/trabaja-con-nosotros', label: 'Trabaja con Nosotros' }
  ];

  return (
    <header className="bg-lila shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/">
        
        <img src="images/logocompleto.png" alt="Bequbo" className="h-18 w-auto" />
        
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex space-x-6 text-gray-700 font-medium text-lg">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`relative group transition-all duration-200 ${
                location.pathname === link.to ? 'text-primary' : 'text-verde'
              }`}
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-crudo transition-all duration-300 group-hover:w-full"></span>
            </Link>

          ))}
        </nav>

        {/* Mobile menu toggle */}
        <div className="md:hidden text-3xl text-gray-700 cursor-pointer" onClick={toggleMenu}>
          {menuOpen ? <HiX /> : <HiMenu />}
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="md:hidden bg-black shadow-inner overflow-hidden"
          >
            <div className="flex flex-col px-6 py-4 space-y-4 text-gray-700 text-lg font-medium">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`relative group transition-all duration-200 ${
                    location.pathname === link.to ? 'text-blue-600' : 'text-gray-700'
                  }`}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </Link>

              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
