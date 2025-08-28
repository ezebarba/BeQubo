import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
const Header = () => {
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => setMenuOpen((v) => !v);
    useEffect(() => {
        setMenuOpen(false); // cerrar menú al navegar
    }, [location.pathname]);
    const navLinks = [
        { to: '/', label: 'Inicio' },
        { to: '/proyectos', label: 'Proyectos' },
        { to: '/nosotros', label: 'Nosotros' },
        { to: '/contacto', label: 'Contacto' },
        // { to: '/trabaja-con-nosotros', label: 'Trabaja con Nosotros' }
    ];
    return (_jsxs("header", { className: "bg-lila shadow-md sticky top-0 z-50", children: [_jsxs("div", { className: "max-w-7xl mx-auto px-4 py-4 flex justify-between items-center", children: [_jsx(Link, { to: "/", "aria-label": "Ir al inicio", children: _jsx("img", { src: "/images/logocompleto.png", alt: "Bequbo", className: "h-18 w-auto", loading: "eager", decoding: "async" }) }), _jsx("nav", { className: "hidden md:flex space-x-6 text-lg", children: navLinks.map((link) => {
                            const active = location.pathname === link.to;
                            return (_jsxs(Link, { to: link.to, className: `relative group transition-all duration-200 ${active ? 'text-primary' : 'text-verde'}`, "aria-current": active ? 'page' : undefined, children: [link.label, _jsx("span", { className: "absolute -bottom-1 left-0 w-0 h-0.5 bg-crudo transition-all duration-300 group-hover:w-full" })] }, link.to));
                        }) }), _jsx("button", { type: "button", className: "md:hidden text-3xl text-gray-700 cursor-pointer", onClick: toggleMenu, "aria-label": menuOpen ? 'Cerrar menú' : 'Abrir menú', "aria-expanded": menuOpen, children: menuOpen ? _jsx(HiX, {}) : _jsx(HiMenu, {}) })] }), _jsx(AnimatePresence, { children: menuOpen && (_jsx(motion.nav, { initial: { height: 0 }, animate: { height: 'auto' }, exit: { height: 0 }, className: "md:hidden bg-black shadow-inner overflow-hidden", children: _jsx("div", { className: "flex flex-col px-6 py-4 space-y-4 text-lg font-medium", children: navLinks.map((link) => {
                            const active = location.pathname === link.to;
                            return (_jsxs(Link, { to: link.to, className: `relative group transition-all duration-200 ${active ? 'text-blue-600' : 'text-gray-200'}`, "aria-current": active ? 'page' : undefined, children: [link.label, _jsx("span", { className: "absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full" })] }, link.to));
                        }) }) })) })] }));
};
export default Header;
