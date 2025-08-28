import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
// Layout y utilitarios
import Header from './components/Header';
import Footer from './components/Footer';
import TitleUpdater from './components/TitleUpdater';
// Code-splitting de páginas
const Home = lazy(() => import('./pages/Home'));
const Nosotros = lazy(() => import('./pages/Nosotros'));
const Contacto = lazy(() => import('./pages/Contacto'));
// const TrabajaConNosotros = lazy(() => import('./pages/TrabajaConNosotros'))
const Proyectos = lazy(() => import('./pages/Proyectos'));
const ProyectoDetalle = lazy(() => import('./pages/ProyectoDetalle'));
// Variantes para animaciones
const pageVariants = {
    initial: { opacity: 0, y: -100 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 100 },
};
// Rutas animadas
const AnimatedRoutes = () => {
    const location = useLocation();
    return (_jsx(AnimatePresence, { mode: "wait", children: _jsx(Suspense, { fallback: _jsx("div", { className: "p-8 animate-pulse", children: "Cargando\u2026" }), children: _jsxs(Routes, { location: location, children: [_jsx(Route, { path: "/", element: _jsx(motion.div, { initial: "initial", animate: "animate", exit: "exit", variants: pageVariants, children: _jsx(Home, {}) }) }), _jsx(Route, { path: "/proyectos", element: _jsx(Proyectos, {}) }), _jsx(Route, { path: "/proyecto/:slug", element: _jsx(ProyectoDetalle, {}) }), _jsx(Route, { path: "/nosotros", element: _jsx(motion.div, { initial: "initial", animate: "animate", exit: "exit", variants: pageVariants, children: _jsx(Nosotros, {}) }) }), _jsx(Route, { path: "/contacto", element: _jsx(motion.div, { initial: "initial", animate: "animate", exit: "exit", variants: pageVariants, children: _jsx(Contacto, {}) }) })] }, location.pathname) }) }));
};
const App = () => {
    return (_jsxs(Router, { children: [_jsx(TitleUpdater, {}), _jsx(Header, {}), _jsx(AnimatedRoutes, {}), _jsx(Footer, {})] }));
};
export default App;
