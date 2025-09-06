// src/pages/Contacto.tsx
import { useState, type ChangeEvent, type FormEvent } from 'react'
import Seo from '@/components/Seo'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const Contacto = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '', website: '' }) // website = honeypot
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({})
  const [status, setStatus] = useState<Status>('idle')
  const [serverError, setServerError] = useState<string>('')

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  const onSubmit = async (e: FormEvent) => {
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
    <main>
      <Seo
        title="Contacto"
        description="Escribinos: consultas comerciales, soporte. Bequbo."
        canonical="https://www.bequbo.com.ar/contacto"
      />

      {/* Hero con borde inferior de color (match con Nosotros) */}
      <section className="relative w-full h-[44vh] md:h-[54vh] overflow-hidden">
        <img
          src="/images/contacto.jpg"
          alt="Contacto Bequbo"
          className="w-full h-full object-cover"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-verde" />
        <div className="absolute bottom-8 left-6 md:left-10 text-crudo">
          <h1 className="text-3xl md:text-5xl font-semibold drop-shadow">Contacto</h1>
        </div>
      </section>

      {/* Tarjeta centrada con borde lila lateral */}
      <section className="max-w-7xl mx-auto px-6 py-10 md:py-16">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white/90 border-l-4 border-lila rounded-r-xl shadow-sm p-6 md:p-8">
            <p className="text-zinc-700 mb-6">
              Completá el formulario y te respondemos a la brevedad.
            </p>

            {status === 'success' && (
              <div
                role="status"
                aria-live="polite"
                className="mb-6 rounded-md bg-green-50 border border-green-200 text-green-800 p-4"
              >
                ¡Gracias! Tu mensaje fue enviado correctamente.
              </div>
            )}

            {status === 'error' && (
              <div
                role="alert"
                className="mb-6 rounded-md bg-red-50 border border-red-200 text-red-800 p-4"
              >
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
                  autoComplete="name"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  className={`w-full p-3 border rounded outline-none ${
                    errors.name ? 'border-red-400' : 'border-gray-300 focus:border-gray-500'
                  }`}
                  placeholder="Tu nombre completo"
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
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className={`w-full p-3 border rounded outline-none ${
                    errors.email ? 'border-red-400' : 'border-gray-300 focus:border-gray-500'
                  }`}
                  placeholder="mail@gmail.com"
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

              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className={`bg-verde text-crudo px-6 py-2 rounded transition ${
                    status === 'submitting' ? 'opacity-60 cursor-not-allowed' : 'hover:bg-lila'
                  }`}
                >
                  {status === 'submitting' ? 'Enviando…' : 'Enviar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Contacto
