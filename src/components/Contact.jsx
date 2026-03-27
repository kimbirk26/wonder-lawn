import { useState } from 'react'
import { SERVICES } from '../data'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', service: '', message: '' })

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setSent(true)
    } catch {
      setError('Something went wrong. Please try again or reach us on WhatsApp.')
    } finally {
      setSubmitting(false)
    }
  }

  if (sent) {
    return (
      <section className="section section-parchment" id="contact">
        <div className="section-inner">
          <div className="form-success">
            <div className="form-success-icon">✿</div>
            <div className="form-success-title">Your message is in the garden.</div>
            <p className="form-success-sub">
              We'll be in touch within one working day. Something wonderful is coming your way.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="section section-parchment" id="contact">
      <div className="section-inner">
        <div className="contact-grid">

          {/* Left — info */}
          <div>
            <div className="contact-badge">Begin Your Garden Story</div>
            <h2 className="contact-title">
              Let's step through<br />the <em>looking glass</em>
            </h2>
            <p className="contact-sub">
              Every extraordinary garden starts with a single conversation. Tell us a little about
              your space and vision, and we'll arrange a complimentary garden visit.
            </p>

            <div className="contact-detail">
              <div className="contact-icon">✦</div>
              <div className="contact-text">
                <strong>Studio</strong>
                Newlands, Cape Town<br />By appointment
              </div>
            </div>
            <div className="contact-detail">
              <div className="contact-icon">✉</div>
              <div className="contact-text">
                <strong>Email</strong>
                kimbirkdev@gmail.com
              </div>
            </div>
            <div className="contact-detail">
              <div className="contact-icon">☏</div>
              <div className="contact-text">
                <strong>Phone</strong>
                +27 63 793 1439
              </div>
            </div>
            <div className="contact-detail">
              <a
                href="https://wa.me/27637931439?text=Hello!%20I'd%20love%20to%20find%20out%20more%20about%20Wonder%20Lawn."
                target="_blank"
                rel="noopener noreferrer"
                className="contact-wa-link"
              >
                <div className="contact-icon contact-icon--wa">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.554 4.122 1.523 5.855L.057 23.882a.75.75 0 00.92.92l6.101-1.474A11.932 11.932 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.717 9.717 0 01-4.976-1.366l-.356-.213-3.695.892.908-3.603-.233-.371A9.718 9.718 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
                  </svg>
                </div>
                <div className="contact-text">
                  <strong>WhatsApp</strong>
                  Message us directly
                </div>
              </a>
            </div>
          </div>

          {/* Right — form */}
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="name">Your Name</label>
                <input
                  id="name" name="name" type="text"
                  className="form-input" required
                  value={form.name} onChange={handleChange}
                  placeholder="Catherine Blythe"
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="email">Email Address</label>
                <input
                  id="email" name="email" type="email"
                  className="form-input" required
                  value={form.email} onChange={handleChange}
                  placeholder="catherine@example.com"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="service">I'm Interested In</label>
              <select
                id="service" name="service"
                className="form-select"
                value={form.service} onChange={handleChange}
              >
                <option value="">Select a service…</option>
                {SERVICES.map(s => (
                  <option key={s.name} value={s.name}>{s.name}</option>
                ))}
                <option value="Not sure yet">Not sure yet — let's talk</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="message">Tell Us About Your Garden</label>
              <textarea
                id="message" name="message"
                className="form-textarea"
                value={form.message} onChange={handleChange}
                placeholder="Describe your space, your vision, or simply what you dream of…"
              />
            </div>

            {error && <p style={{ color: '#b71c1c', fontSize: '0.85rem', marginBottom: '0.5rem' }}>{error}</p>}
            <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start' }} disabled={submitting}>
              {submitting ? 'Sending…' : 'Send My Enquiry'}
            </button>
          </form>

        </div>
      </div>
    </section>
  )
}
