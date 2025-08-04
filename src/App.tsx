import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Nosotros from './pages/Nosotros';
import Contacto from './pages/Contacto';
import TrabajaConNosotros from './pages/TrabajaConNosotros';
import TitleUpdater from './components/TitleUpdater'; // 👈
import Proyectos from './pages/Proyectos';
import ProyectoDetalle from './pages/ProyectoDetalle';
// Componente que envuelve las rutas con animaciones
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants}>
              <Home />
            </motion.div>
          }
        />
        <Route path="/proyectos" element={<Proyectos />} />
        <Route path="/proyecto/:slug" element={<ProyectoDetalle />} />
        <Route
          path="/nosotros"
          element={
            <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants}>
              <Nosotros />
            </motion.div>
          }
        />
        <Route
          path="/contacto"
          element={
            <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants}>
              <Contacto />
            </motion.div>
          }
        />
        <Route
          path="/trabaja-con-nosotros"
          element={
            <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants}>
              <TrabajaConNosotros />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

// Variantes para las animaciones de las páginas
const pageVariants = {
  initial: { opacity: 0, y: -100 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 100 },
};

const App = () => {
  return (
    <Router>
      <TitleUpdater /> {/* 👈 Aca se actualiza el título dinámicamente */}
      <Header />
      <AnimatedRoutes />
      <Footer />
    </Router>
  );
};

export default App;
