import { useNavigate, useLocation } from 'react-router-dom'
import { useHarlequin } from '../useHarlequin'
import { SuitIcon } from './SuitIcon'

const QUOTE_BAND = {
  '/': {
    quote: "We're all mad here — it's what makes us wonderful.",
    rabbitDest: '/quotes',
  },
  '/shop': {
    quote: "Every garden begins with a single seed of curiosity.",
    rabbitDest: '/quotes',
  },
  '/stories': {
    quote: "Curiouser and curiouser.",
    rabbitDest: '/quotes',
  },
  '/garden': {
    quote: "If you don't know where you're going, any road will take you there.",
    rabbitDest: '/quotes',
  },
  '/team': {
    quote: "We are all quite extraordinary — each in our own peculiar way.",
    rabbitDest: '/quotes',
  },
  '/quotes': {
    quote: "Sometimes I've believed as many as six impossible things before breakfast.",
    rabbitDest: '/garden',
  },
  '/account': {
    quote: "I knew who I was this morning, but I've changed a few times since then.",
    rabbitDest: '/quotes',
  },
  '/transformations': {
    quote: "It would be so nice if something made sense for a change.",
    rabbitDest: '/garden',
  },
}

const DEFAULT_BAND = {
  quote: "We're all mad here — it's what makes us wonderful.",
  rabbitDest: '/quotes',
}

function getBandConfig(pathname) {
  if (QUOTE_BAND[pathname]) return QUOTE_BAND[pathname]
  const prefix = Object.keys(QUOTE_BAND)
    .filter(k => k !== '/' && pathname.startsWith(k))
    .sort((a, b) => b.length - a.length)[0]
  return QUOTE_BAND[prefix] || DEFAULT_BAND
}

const NAV_LINKS = [
  { label: 'Services',          href: '#services' },
  { label: 'Process',           href: '#process' },

  { label: 'Client Stories',    href: '#testimonials' },
  { label: 'Contact',           href: '#contact' },
  { label: 'Stories & Updates', href: '/stories' },
  { label: 'Shop',              href: '/shop' },
  { label: 'Our Team',          href: '/team' },
  { label: 'The Garden',        href: '/garden' },
  { label: 'Transformations',   href: '/transformations' },
]

const SERVICES_LINKS = [
  'Lawn Artistry',
  'Garden Design',
  'Planting & Borders',
  'Hedge Sculpture',
  'Irrigation & Water',
  'Garden Restoration',
]

export default function Footer({ theme, setTheme, darkMode, setDarkMode }) {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const footerRef = useHarlequin(0.1)
  const { quote, rabbitDest } = getBandConfig(pathname)

  const handleLink = (href) => {
    if (href.startsWith('/')) {
      navigate(href)
      window.scrollTo(0, 0)
      return
    }
    const el = document.querySelector(href)
    if (el) el.scrollIntoView()
    else navigate('/' + href)
  }

  return (
    <footer ref={footerRef} className="footer pattern-section">

      <div className="footer-quote-top">
        <p className="footer-quote-top-text">
          <em>"{quote}"</em>
        </p>
        <button className="footer-rabbit footer-rabbit--below" onClick={() => navigate(rabbitDest)} aria-label="Follow the rabbit">
          <img src="/rabbitblue.png" alt="" aria-hidden="true" />
        </button>
        <div className="footer-quote-rule" />
      </div>

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
        <span className="footer-bottom-legal">
          <button className="footer-link footer-link--inline" onClick={() => handleLink('/privacy')}>Privacy Policy</button>
          <span aria-hidden="true"> · </span>
          <button className="footer-link footer-link--inline" onClick={() => handleLink('/terms')}>Terms &amp; Conditions</button>
        </span>
        <button
          className="nav-theme-btn"
          onClick={() => setTheme(theme === 'green' ? 'blue' : 'green')}
          aria-label={`Switch to ${theme === 'green' ? 'Parchment' : 'Garden'} theme`}
        >
          <SuitIcon suit="diamond" size={11} />
        </button>
        <button
          className="nav-theme-btn"
          onClick={() => setDarkMode(d => !d)}
          aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {darkMode ? (
            <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="4"/>
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width={14} height={14} fill="currentColor">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          )}
        </button>
        <span className="footer-bottom-quote">
          "Every garden is a door to somewhere wonderful."
        </span>
      </div>
    </footer>
  )
}
