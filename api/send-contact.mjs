// api/send-contact.mjs
import nodemailer from 'nodemailer'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const strip = (s, max = 200) => String(s ?? '').replace(/[\r\n]+/g, ' ').trim().slice(0, max)

// Lee el body incluso si vercel dev no lo parsea (Windows-friendly)
async function readJsonBody(req) {
  try {
    if (req && typeof req.body === 'object' && req.body !== null) return req.body
    if (req && typeof req.body === 'string') { try { return JSON.parse(req.body) } catch {} }
    const chunks = []
    for await (const chunk of req) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
    const raw = Buffer.concat(chunks).toString('utf8').trim()
    if (!raw) return {}
    try { return JSON.parse(raw) } catch { return {} }
  } catch { return {} }
}

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      res?.setHeader?.('Allow', 'POST')
      return res.status(405).json({ ok: false, error: 'Method not allowed' })
    }

    // 👉 leemos envs SIN defaults; si falta alguna, devolvemos 500 con detalle
    const {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_USER,
      SMTP_PASS,
      CONTACT_FROM,
      CONTACT_TO,
      SMTP_SNI,     // opcional (útil si el cert no coincide con el host)
      NODE_ENV,
    } = process.env

    const required = { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_FROM, CONTACT_TO }
    const missing = Object.entries(required).filter(([, v]) => !v).map(([k]) => k)
    if (missing.length) {
      if (NODE_ENV !== 'production') {
        console.error('[send-contact] Faltan env vars:', missing)
      }
      return res.status(500).json({ ok: false, error: `Faltan variables de entorno: ${missing.join(', ')}` })
    }

    const body = await readJsonBody(req)
    const { name, email, message, hp } = body || {}

    // Validaciones del payload
    if (hp) return res.status(400).json({ ok: false, error: 'Bot detected' })
    if (!name || !email || !message) return res.status(400).json({ ok: false, error: 'Faltan campos obligatorios' })
    if (!emailRegex.test(String(email))) return res.status(400).json({ ok: false, error: 'Email inválido' })

    // Sanitizado
    const cleanName = strip(name, 120)
    const cleanEmail = strip(email, 200)
    const cleanMsg = String(message ?? '').slice(0, 4000)

    // Puerto/seguridad en base a ENV
    const port = Number(SMTP_PORT)
    if (!Number.isFinite(port) || port <= 0) {
      return res.status(500).json({ ok: false, error: 'SMTP_PORT inválido' })
    }
    const secure = port === 465 // SSL directo si 465; si 587 => STARTTLS

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      secure,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
      requireTLS: !secure,
      tls: {
        minVersion: 'TLSv1.2',
        servername: SMTP_SNI || SMTP_HOST, // SNI correcto si el cert es de otro host
      },
    })

    const subject = `Consulta Web Bequbo - ${cleanName}`

    // Mensaje + salto de línea + Mail de contacto
    const textBody = `${cleanMsg}\n\nMail de contacto: ${cleanEmail}`

    await transporter.sendMail({
      from: `Bequbo Automático <${CONTACT_FROM}>`, // debe ser tu casilla autenticada
      to: CONTACT_TO,
      subject,
      replyTo: cleanEmail, // al responder, va al mail del usuario
      text: textBody,
      headers: { 'X-Entity-Ref-ID': 'bequbo-contact' },
    })

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('[send-contact] error:', err?.stack || err)
    return res.status(500).json({ ok: false, error: 'No se pudo enviar el email' })
  }
}
