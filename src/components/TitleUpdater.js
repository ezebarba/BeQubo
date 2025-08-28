import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
/**
 * TitleUpdater: mantiene compatibilidad con la lógica anterior,
 * pero NO pisa el <title> si detecta que Seo ya está gestionando metadata.
 */
const TitleUpdater = () => {
    const location = useLocation();
    useEffect(() => {
        // Si Seo está gestionando metadata, no tocar el título
        const seoManaged = document.head.querySelector('meta[name="x-seo-managed"]');
        if (seoManaged)
            return;
        const routeTitles = {
            '/': 'Bequbo',
            '/proyectos': 'Bequbo - Proyectos',
            '/nosotros': 'Bequbo - Nosotros',
            '/contacto': 'Bequbo - Contacto',
            '/trabaja-con-nosotros': 'Bequbo - Trabaja con Nosotros',
        };
        document.title = routeTitles[location.pathname] || 'Bequbo';
    }, [location.pathname]);
    return null;
};
export default TitleUpdater;
