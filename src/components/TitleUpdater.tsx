// src/components/TitleUpdater.tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const TitleUpdater = () => {
  const location = useLocation();

  useEffect(() => {
    const routeTitles: Record<string, string> = {
      '/': 'Bequbo',
      '/proyectos': 'Bequbo - Proyectos',
      '/nosotros': 'Bequbo - Nosotros',
      '/contacto': 'Bequbo - Contacto',
      '/trabaja-con-nosotros': 'Bequbo - Trabaja con Nosotros',
    };

    document.title = routeTitles[location.pathname] || 'Bequbo';
  }, [location.pathname]);

  return null; // No renderiza nada en pantalla
};

export default TitleUpdater;
