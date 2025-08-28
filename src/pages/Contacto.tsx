import { useState } from 'react'
import Seo from '@/components/Seo'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const Contacto = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '', website: '' }) // website = honeypot
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({})
  const [status, setStatus] = useState<Status>('idle')
  const [serverError, setServerError] = useState<string>('')

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const validate = () => {
    const errs: typeof errors = {}
    if (!form.name.trim()) errs.name = 'Tu nombre es obligatorio'
    if (!form.email.trim()) errs.email = 'Tu email es obligatorio'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Ingresá un email válido'
    if (!form.message.trim()) errs.message = 'El mensaje es obligatorio'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setStatus('submitting')
    setServerError('')

    try {
      const res = await fetch('/api/send-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
          hp: form.website, // honeypot
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data?.ok) throw new Error(data?.error || 'No se pudo enviar el mensaje.')
      setStatus('success')
      setForm({ name: '', email: '', message: '', website: '' })
    } catch (err: any) {
      setStatus('error')
      setServerError(err?.message || 'No se pudo enviar el mensaje.')
    }
  }

  return (
    <>
      <Seo
        title="Contacto"
        description="Escribinos: consultas comerciales, prensa o soporte. Bequbo."
        canonical="https://www.bequbo.com.ar/contacto"
      />

      {/* Imagen de cabecera con overlay */}
      <div className="relative w-full h-[500px] md:h-[500px] overflow-hidden">
        <img
          src="/images/contacto.jpg"
          alt="Persona trabajando en laptop"
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent"></div>
      </div>

      {/* Formulario */}
      <section className="p-8 max-w-2xl mx-auto">
        <h2 className="text-primary text-3xl font-semibold mb-6">Contacto</h2>

        {status === 'success' && (
          <div className="mb-6 rounded-md bg-green-50 border border-green-200 text-green-800 p-4">
            ¡Gracias! Tu mensaje fue enviado correctamente.
          </div>
        )}

        {status === 'error' && (
          <div className="mb-6 rounded-md bg-red-50 border border-red-200 text-red-800 p-4">
            Ocurrió un error al enviar el mensaje. {serverError && <span>Detalle: {serverError}</span>}
          </div>
        )}

        <form className="space-y-4" onSubmit={onSubmit} noValidate>
          {/* Honeypot anti-bot (oculto a humanos) */}
          <input
            type="text"
            name="website"
            value={form.website}
            onChange={onChange}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />

          <div>
            <label className="block text-sm mb-1" htmlFor="name">Nombre *</label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={onChange}
              required
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
              className={`w-full p-3 border rounded outline-none ${
                errors.name ? 'border-red-400' : 'border-gray-300 focus:border-gray-500'
              }`}
              placeholder="Tu nombre"
            />
            {errors.name && <p id="name-error" className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm mb-1" htmlFor="email">Email *</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              required
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
              className={`w-full p-3 border rounded outline-none ${
                errors.email ? 'border-red-400' : 'border-gray-300 focus:border-gray-500'
              }`}
              placeholder="nombre@dominio.com"
            />
            {errors.email && <p id="email-error" className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm mb-1" htmlFor="message">Mensaje *</label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={onChange}
              required
              rows={6}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? 'message-error' : undefined}
              className={`w-full p-3 border rounded outline-none ${
                errors.message ? 'border-red-400' : 'border-gray-300 focus:border-gray-500'
              }`}
              placeholder="Contanos en qué podemos ayudarte"
            />
            {errors.message && <p id="message-error" className="mt-1 text-sm text-red-600">{errors.message}</p>}
          </div>

          <button
            type="submit"
            disabled={status === 'submitting'}
            className={`bg-verde text-crudo px-6 py-2 rounded transition ${
              status === 'submitting' ? 'opacity-60 cursor-not-allowed' : 'hover:bg-lila'
            }`}
          >
            {status === 'submitting' ? 'Enviando…' : 'Enviar'}
          </button>
        </form>
      </section>
    </>
  )
}

export default Contacto
