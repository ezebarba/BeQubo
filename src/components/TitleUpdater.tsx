// src/components/TitleUpdater.tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const TitleUpdater = () => {
  const location = useLocation();

  useEffect(() => {
    const routeTitles: Record<string, string> = {
      '/': 'BeQubo',
      '/obras': 'BeQubo - Obras',
      '/nosotros': 'BeQubo - Nosotros',
      '/contacto': 'BeQubo - Contacto',
      '/trabaja-con-nosotros': 'BeQubo - Trabaja con Nosotros',
    };

    document.title = routeTitles[location.pathname] || 'BeQubo';
  }, [location.pathname]);

  return null; // No renderiza nada en pantalla
};

export default TitleUpdater;
