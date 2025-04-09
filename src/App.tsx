import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Obras from './pages/Obras';
import Nosotros from './pages/Nosotros';
import Contacto from './pages/Contacto';
import TrabajaConNosotros from './pages/TrabajaConNosotros';
import TitleUpdater from './components/TitleUpdater'; // 👈

const App = () => {
  return (
    <Router>
      <TitleUpdater /> {/* 👈 Aca se actualiza el título dinámicamente */}
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/obras" element={<Obras />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/trabaja-con-nosotros" element={<TrabajaConNosotros />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
