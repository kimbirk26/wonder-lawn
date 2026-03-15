import { useNavigate } from 'react-router-dom'
import { useHarlequin } from '../useHarlequin'

const NAV_LINKS = [
  { label: 'Services',         href: '#services' },
  { label: 'Our Team',         href: '#team' },
  { label: 'Process',          href: '#process' },
  { label: 'Client Stories',   href: '#testimonials' },
  { label: 'Contact',          href: '#contact' },
  { label: 'Stories & Updates', href: '/stories' },
]

const SERVICES_LINKS = [
  'Lawn Artistry',
  'Garden Design',
  'Planting & Borders',
  'Hedge Sculpture',
  'Irrigation & Water',
  'Garden Restoration',
]

export default function Footer() {
  const navigate = useNavigate()
  const footerRef = useHarlequin(0.1)

  const handleLink = (href) => {
    if (href.startsWith('/')) {
      navigate(href)
      window.scrollTo(0, 0)
      return
    }
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    else navigate('/' + href)
  }

  return (
    <footer ref={footerRef} className="footer pattern-section">
      <div className="footer-inner">

        {/* Brand */}
        <div>
          <span className="footer-logo">
            Wonder Lawn&nbsp;<span className="footer-logo-grin">:)</span>
          </span>
          <p className="footer-text">
            Bespoke garden design and landscaping for discerning Cape Town homes.
            We believe every garden holds a door to somewhere more wonderful —
            and we find it together.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <div className="footer-col-title">Navigation</div>
          {NAV_LINKS.map(l => (
            <button key={l.label} className="footer-link" onClick={() => handleLink(l.href)}>
              {l.label}
            </button>
          ))}
        </div>

        {/* Services */}
        <div>
          <div className="footer-col-title">Services</div>
          {SERVICES_LINKS.map(s => (
            <button key={s} className="footer-link" onClick={() => handleLink('#services')}>
              {s}
            </button>
          ))}
        </div>

      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Wonder Lawn · Cape Town · All rights reserved</span>
        <span className="footer-bottom-quote">
          "Every garden is a door to somewhere wonderful."
        </span>
      </div>
    </footer>
  )
}
