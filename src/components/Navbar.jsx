import { useState, useEffect, useRef, Fragment } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { SuitIcon, suitAt } from './SuitIcon'
import { useCart } from '../CartContext'
import { useAuth } from '../AuthContext'

const NAV_LINKS = [
  { label: 'Services',  href: '#services' },
  { label: 'Our Team',  href: '/team' },
  { label: 'Process',   href: '#process' },
  { label: 'Stories',   href: '/stories' },
  { label: 'Shop',      href: '/shop' },
]

function SuitSeparator({ index }) {
  const suit = suitAt(index)
  return (
    <span className={`suit-sep suit-sep--${suit}`} aria-hidden="true">
      <SuitIcon suit={suit} size={9} />
    </span>
  )
}

function AccountDropdown({ user, signOut, onClose }) {
  return (
    <div className="account-dropdown">
      <div className="account-dropdown-header">
        <span className="account-dropdown-email">{user.email}</span>
      </div>
      <Link to="/account" className="account-dropdown-item" onClick={onClose}>My orders</Link>
      <Link to="/account?tab=Wishlist" className="account-dropdown-item" onClick={onClose}>Wishlist</Link>
      <button
        className="account-dropdown-item account-dropdown-signout"
        onClick={() => { signOut(); onClose() }}
      >
        Sign out
      </button>
    </div>
  )
}

export default function Navbar({ theme, setTheme, onCartOpen }) {
  const { totalItems } = useCart()
  const { user, signOut } = useAuth()
  const [scrolled, setScrolled]       = useState(false)
  const [menuOpen, setMenuOpen]       = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const accountRef = useRef(null)
  const navigate   = useNavigate()
  const location   = useLocation()
  const onHome     = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handler = (e) => {
      if (accountRef.current && !accountRef.current.contains(e.target)) {
        setAccountOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleLink = (href) => {
    setMenuOpen(false)
    if (href.startsWith('/')) {
      navigate(href)
      return
    }
    if (onHome) {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/' + href)
    }
  }

  const goHome = () => {
    setMenuOpen(false)
    if (onHome) window.scrollTo({ top: 0, behavior: 'smooth' })
    else navigate('/')
  }

  const initial = user ? (user.email?.[0] || '?').toUpperCase() : null

  return (
    <>
      <nav className="nav" style={scrolled ? { boxShadow: '0 2px 20px rgba(0,0,0,0.07)' } : {}}>
        <button className="nav-logo" onClick={goHome}>
          Wonder Lawn&nbsp;<span className="nav-logo-grin">:)</span>
        </button>

        <div className="nav-links">
          {NAV_LINKS.map((l, i) => (
            <Fragment key={l.label}>
              <button className="nav-link" onClick={() => handleLink(l.href)}>
                {l.label}
              </button>
              {i < NAV_LINKS.length - 1 && <SuitSeparator index={i} />}
            </Fragment>
          ))}

          <div className="theme-toggle">
            <button
              className={`theme-btn${theme === 'green' ? ' active' : ''}`}
              onClick={() => setTheme('green')}
            >
              Garden
            </button>
            <button
              className={`theme-btn${theme === 'blue' ? ' active' : ''}`}
              onClick={() => setTheme('blue')}
            >
              Parchment
            </button>
          </div>

          <button className="nav-cart" onClick={onCartOpen} aria-label="Open cart">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width="20" height="20" aria-hidden="true">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            {totalItems > 0 && <span className="nav-cart-badge">{totalItems}</span>}
          </button>

          {user ? (
            <div className="nav-account" ref={accountRef}>
              <button
                className="nav-account-btn"
                onClick={() => setAccountOpen(o => !o)}
                aria-label="Account menu"
                aria-expanded={accountOpen}
              >
                <span className="nav-account-initial">{initial}</span>
              </button>
              {accountOpen && (
                <AccountDropdown
                  user={user}
                  signOut={signOut}
                  onClose={() => setAccountOpen(false)}
                />
              )}
            </div>
          ) : (
            <button className="nav-link nav-signin" onClick={() => navigate('/login')}>
              Sign in
            </button>
          )}

          <button className="nav-cta" onClick={() => handleLink('#contact')}>
            Begin Your Garden
          </button>
        </div>

        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        {NAV_LINKS.map(l => (
          <button key={l.label} className="mobile-nav-link" onClick={() => handleLink(l.href)}>
            {l.label}
          </button>
        ))}
        {user ? (
          <>
            <button className="mobile-nav-link" onClick={() => { navigate('/account'); setMenuOpen(false) }}>
              My Account
            </button>
            <button className="mobile-nav-link" onClick={() => { signOut(); setMenuOpen(false) }}>
              Sign out
            </button>
          </>
        ) : (
          <button className="mobile-nav-link" onClick={() => { navigate('/login'); setMenuOpen(false) }}>
            Sign in
          </button>
        )}
        <div className="theme-toggle" style={{ alignSelf: 'flex-start' }}>
          <button
            className={`theme-btn${theme === 'green' ? ' active' : ''}`}
            onClick={() => setTheme('green')}
          >
            Garden
          </button>
          <button
            className={`theme-btn${theme === 'blue' ? ' active' : ''}`}
            onClick={() => setTheme('blue')}
          >
            Parchment
          </button>
        </div>
        <button className="nav-cta" onClick={() => handleLink('#contact')}>
          Begin Your Garden
        </button>
      </div>
    </>
  )
}
