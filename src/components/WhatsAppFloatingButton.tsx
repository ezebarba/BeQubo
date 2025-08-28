import { FaWhatsapp } from 'react-icons/fa'

type Props = {
  /** Número en formato internacional, sin + ni espacios. Ej: 5491161638192 */
  phone: string
  /** Mensaje inicial opcional */
  message?: string
}

export default function WhatsAppFloatingButton({
  phone,
  message = 'Hola! Quisiera más información sobre Bequbo.',
}: Props) {
  const href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-btn"
      aria-label="Escribinos por WhatsApp"
    >
      <FaWhatsapp className="whatsapp-btn__icon" aria-hidden="true" />
    </a>
  )
}
