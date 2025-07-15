import { FaInstagram, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-lila text-crudo py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Logo y redes */}
        <div className="flex flex-col items-center md:items-start">
          <img src="images/logochico.png" alt="BeQubo Logo" className="w-32 h-auto mb-4" />
          <p className="text-crudo text-sm mb-4 text-center md:text-left">
            Viviendas de calidad. Tu próximo hogar te espera.
          </p>
          <div className="flex gap-4">
            <a href="https://www.instagram.com/bequbo.ar/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
              <FaInstagram size={20} />
            </a>
            <a href="https://wa.me/5491173600610" target="_blank" rel="noopener noreferrer" className="hover:text-green-400">
              <FaWhatsapp size={20} />
            </a>
          </div>
        </div>

        {/* Contacto */}
        <div className="text-center md:text-left">
          <h3 className="text-xl font-semibold mb-2">Contacto</h3>
          <p className="text-crudo text-sm">Email: info@bequbo.com.ar</p>
          <a href="https://wa.me/5491173600610" target="_blank" rel="noopener noreferrer" className="text-crudo text-sm"> Tel: +541173600610 </a>
        </div>

        {/* Ubicación */}
        <div className="text-center md:text-left">
          <h3 className="text-xl font-semibold mb-2">Dónde estamos</h3>
          <p className="text-sm text-crudo mb-3">
          <a href="https://maps.app.goo.gl/STxzhm3RoX2uSyG4A"><strong>Bequbo</strong> - Av. San Martín 1955, Caseros, Buenos Aires </a>
          </p>
          <iframe
            title="Ubicación de Bequbo"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.157214655884!2d-58.56573662427245!3d-34.65241197294544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcc8a8ab9936a9%3A0xe6b25993a8b0f542!2sAv.%20San%20Mart%C3%ADn%201955%2C%20B1678DLK%20Caseros%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1712611128844!5m2!1ses!2sar"
            width="100%"
            height="200"
            style={{ border: 0, borderRadius: '8px', maxWidth: '100%' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      {/* Línea inferior */}
      <div className="mt-10 text-center text-crudo text-sm border-t border-verde pt-4">
        © {new Date().getFullYear()} BeQubo. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;
