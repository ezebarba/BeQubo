import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

// Layout y utilitarios
import Header from './components/Header'
import Footer from './components/Footer'
import TitleUpdater from './components/TitleUpdater'
import WhatsAppFloatingButton from './components/WhatsAppFloatingButton'

// Code-splitting de páginas
const Home = lazy(() => import('./pages/Home'))
const Nosotros = lazy(() => import('./pages/Nosotros'))
const Contacto = lazy(() => import('./pages/Contacto'))
// const TrabajaConNosotros = lazy(() => import('./pages/TrabajaConNosotros'))
const Proyectos = lazy(() => import('./pages/Proyectos'))
const ProyectoDetalle = lazy(() => import('./pages/ProyectoDetalle'))

// Variantes para animaciones
const pageVariants = {
  initial: { opacity: 0, y: -100 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 100 },
}

// Rutas animadas
const AnimatedRoutes = () => {
  const location = useLocation()

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
          {/* <Route
            path="/trabaja-con-nosotros"
            element={
              <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants}>
                <TrabajaConNosotros />
              </motion.div>
            }
          /> */}
        </Routes>
      </Suspense>
    </AnimatePresence>
  )
}

const App = () => {
  return (
    <Router>
      <TitleUpdater />
      <Header />
      <AnimatedRoutes />
      <WhatsAppFloatingButton phone="5491161638192"/>
      <Footer />
    </Router>
  )
}

export default App
