import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

// Layout y utilitarios
import Header from './components/Header'
import Footer from './components/Footer'
import TitleUpdater from './components/TitleUpdater'
import WhatsAppFloatingButton from './components/WhatsAppFloatingButton'
import PoliticasPrivacidad from "./pages/PoliticasPrivacidad";

// Code-splitting de páginas
const Home = lazy(() => import('./pages/Home'))
const Nosotros = lazy(() => import('./pages/Nosotros'))
const Contacto = lazy(() => import('./pages/Contacto'))
const Proyectos = lazy(() => import('./pages/Proyectos'))
const ProyectoDetalle = lazy(() => import('./pages/ProyectoDetalle'))

// Variantes para animaciones
const pageVariants = {
  initial: { opacity: 0, y: -100 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 100 },
}

// -----------------------------
// 🔥 Rutas animadas + Scroll al inicio
// -----------------------------
const AnimatedRoutes = () => {
  const location = useLocation()

  // 👇 Esto garantiza scroll al inicio en cada cambio de ruta
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<div className="p-8 animate-pulse">Cargando…</div>}>
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
            path="/politicas-de-privacidad"
            element={<PoliticasPrivacidad />}
          />

        </Routes>
      </Suspense>
    </AnimatePresence>
  )
}

// -----------------------------
// APP PRINCIPAL
// -----------------------------
const App = () => {
  return (
    <Router>
      <TitleUpdater />
      <Header />
      
      <AnimatedRoutes />
      
      <WhatsAppFloatingButton phone="5491161638192" />
      <Footer />
    </Router>
  )
}

export default App
