import { FaInstagram, FaWhatsapp, FaFacebookF } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-lila text-crudo py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Columna 1: Logo y tagline */}
        <div className="flex flex-col items-center md:items-start">
          <img
            src="/images/logochico.png"
            alt="Bequbo logo"
            className="w-32 h-auto mb-4"
            loading="lazy"
            decoding="async"
          />
          <p className="text-crudo text-sm mb-4 text-center md:text-left">
            Arquitectura que trasciende. Diseño&nbsp;que&nbsp;eleva.
          </p>
        </div>

        {/* Columna 2: Contacto + Redes */}
        <div className="text-center md:text-left">
          <h3 className="text-xl font-semibold mb-2 font-primary">Contacto</h3>

          <p className="text-crudo text-sm">
            Email:{' '}
            <a
              href="mailto:info@bequbo.com.ar"
              className="text-crudo hover:underline underline-offset-4 decoration-1"
              title="Enviar email a Bequbo"
            >
              info@bequbo.com.ar
            </a>
          </p>

          <a
            href="https://wa.me/5491161638192"
            target="_blank"
            rel="noopener noreferrer"
            className="text-crudo text-sm hover:underline underline-offset-4 decoration-1 inline-block mt-1"
            aria-label="Contactar por WhatsApp"
            title="Contactar por WhatsApp"
          >
            Tel: (+54) 1161638192
          </a>

          {/* Redes (debajo de Contacto) */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2 font-primary">Seguinos en nuestras redes</h3>
            <div className="flex items-center gap-4 justify-center md:justify-start">
              <a
                href="https://www.instagram.com/bequbo.desarrolladora/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de Bequbo"
                className="hover:text-pink-500"
                title="Instagram"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61579208437607"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook de Bequbo"
                className="hover:text-[#1877F2]"
                title="Facebook"
              >
                <FaFacebookF size={20} />
              </a>
              <a
                href="https://wa.me/5491161638192"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp de Bequbo"
                className="hover:text-green-400"
                title="WhatsApp"
              >
                <FaWhatsapp size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Columna 3: Ubicación */}
        <div className="text-center md:text-left">
          <h3 className="text-xl font-semibold mb-2 font-primary">Dónde estamos</h3>
          <p className="text-sm text-crudo mb-3">
            <a
              href="https://maps.app.goo.gl/STxzhm3RoX2uSyG4A"
              className="hover:underline underline-offset-4 decoration-1 font-primary"
              title="Ver ubicación en Google Maps"
            >
              <strong>Bequbo</strong> - Av. San Martín 1955, Caseros, Buenos Aires
            </a>
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
          />
        </div>
      </div>

      {/* Línea inferior */}
      <div className="mt-10 text-center text-crudo text-sm border-t border-verde pt-4">
        © {new Date().getFullYear()} Bequbo. Todos los derechos reservados.
      </div>
    </footer>
  )
}

export default Footer
