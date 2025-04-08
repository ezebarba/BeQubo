import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Obras from './pages/Obras';
import Nosotros from './pages/Nosotros';
import Contacto from './pages/Contacto';
import Terrenos from './pages/Terrenos';
import TrabajaConNosotros from './pages/TrabajaConNosotros';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/obras" element={<Obras />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/terrenos" element={<Terrenos />} />
        <Route path="/trabaja-con-nosotros" element={<TrabajaConNosotros />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
