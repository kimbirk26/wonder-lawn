import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { CrownIcon, CheshireIcon } from './SuitIcon'
import { useCart } from '../CartContext'
import { useAuth } from '../AuthContext'
import { SHOP_CATEGORIES, SERVICES } from '../data'

const PLANT_ITEMS = [
  { key: 'all', label: 'All Plants', href: '/shop?category=all' },
  ...SHOP_CATEGORIES.map(cat => ({
    key: cat.key,
    label: cat.label,
    href: `/shop?category=${cat.key}`,
  })),
]

const SERVICE_ITEMS = SERVICES.map(svc => ({
  key: svc.name,
  label: svc.name,
  sub: svc.tagline,
  href: '#contact',
}))

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
  const [openDropdown, setOpenDropdown] = useState(null)   // 'plants' | 'services' | null
  const [mobileOpen, setMobileOpen]   = useState(null)    // 'plants' | 'services' | null (mobile accordion)
  const accountRef = useRef(null)
  const navRef     = useRef(null)
  const navigate   = useNavigate()
  const location   = useLocation()
  const onHome     = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close dropdowns when clicking outside the nav
  useEffect(() => {
    const handler = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenDropdown(null)
        setAccountOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Close dropdowns on route change
  useEffect(() => {
    setOpenDropdown(null)
    setMenuOpen(false)
    setMobileOpen(null)
  }, [location.pathname, location.search])

  const handleLink = (href) => {
    setOpenDropdown(null)
    setMenuOpen(false)
    setMobileOpen(null)
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

  const toggleDropdown = (key) => setOpenDropdown(prev => prev === key ? null : key)
  const toggleMobile   = (key) => setMobileOpen(prev => prev === key ? null : key)

  return (
    <>
      <nav ref={navRef} className={`nav${onHome && !scrolled ? ' nav--merged' : ''}`}>
        <button className="nav-logo" onClick={goHome}>
          Wonder Lawn&nbsp;<CheshireIcon size={22} className="nav-logo-grin" />
        </button>

        <div className="nav-links">

          {/* Shop Plants dropdown — hover opens, click navigates */}
          <div
            className="nav-dropdown-wrap"
            onMouseEnter={() => setOpenDropdown('plants')}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button
              className={`nav-link nav-dropdown-trigger${openDropdown === 'plants' ? ' nav-link--open' : ''}`}
              onClick={() => handleLink('/shop')}
            >
              Shop Plants
              <svg className="nav-dropdown-caret" viewBox="0 0 10 6" width="10" height="6" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M1 1l4 4 4-4" />
              </svg>
            </button>
            {openDropdown === 'plants' && (
              <div className="nav-dropdown" role="listbox">
                {PLANT_ITEMS.map(item => (
                  <button
                    key={item.key}
                    className="nav-dropdown-item"
                    onClick={() => handleLink(item.href)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Shop Services dropdown — hover opens, click navigates */}
          <div
            className="nav-dropdown-wrap"
            onMouseEnter={() => setOpenDropdown('services')}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button
              className={`nav-link nav-dropdown-trigger${openDropdown === 'services' ? ' nav-link--open' : ''}`}
              onClick={() => handleLink('#contact')}
            >
              Shop Services
              <svg className="nav-dropdown-caret" viewBox="0 0 10 6" width="10" height="6" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M1 1l4 4 4-4" />
              </svg>
            </button>
            {openDropdown === 'services' && (
              <div className="nav-dropdown nav-dropdown--services" role="listbox">
                {SERVICE_ITEMS.map(item => (
                  <button
                    key={item.key}
                    className="nav-dropdown-item nav-dropdown-item--has-sub"
                    onClick={() => handleLink(item.href)}
                  >
                    <span className="nav-dropdown-item-label">{item.label}</span>
                    <span className="nav-dropdown-item-sub">{item.sub}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button className="nav-link" onClick={() => handleLink('/garden')}>
            Down the Path
          </button>

          {/* Cart */}
          <button className="nav-cart" onClick={onCartOpen} aria-label="Open cart">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width="20" height="20" aria-hidden="true">
              <path d="M1 1h4l2.68 13.39a2 2 0 001.99 1.61h9.72a2 2 0 001.99-1.61L23 6H6"/>
              <circle cx="9" cy="21" r="1" fill="currentColor" stroke="none"/>
              <circle cx="20" cy="21" r="1" fill="currentColor" stroke="none"/>
            </svg>
            {totalItems > 0 && <span className="nav-cart-badge">{totalItems}</span>}
          </button>

          {/* Account */}
          {user ? (
            <div className="nav-account" ref={accountRef}>
              <button
                className="nav-account-btn"
                onClick={() => setAccountOpen(o => !o)}
                aria-label="Account menu"
                aria-expanded={accountOpen}
              >
                <CrownIcon size={18} className="nav-account-crown" />
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
            <button className="nav-signin" onClick={() => navigate('/login')} aria-label="Sign in">
              <img src="/key.svg" alt="" aria-hidden="true" className="nav-signin-keyhole" />
            </button>
          )}
        </div>

        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        <button className="mobile-nav-rabbit" onClick={() => handleLink('/quotes')}>
          <img src="/rabbitblue.png" alt="Follow the rabbit" />
        </button>

        {/* Mobile: Shop Plants accordion */}
        <div className="mobile-nav-group">
          <button
            className="mobile-nav-link mobile-nav-group-trigger"
            onClick={() => toggleMobile('plants')}
          >
            Shop Plants
            <svg className={`mobile-nav-caret${mobileOpen === 'plants' ? ' open' : ''}`} viewBox="0 0 10 6" width="10" height="6" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M1 1l4 4 4-4" />
            </svg>
          </button>
          {mobileOpen === 'plants' && (
            <div className="mobile-nav-group-items">
              {PLANT_ITEMS.map(item => (
                <button key={item.key} className="mobile-nav-sub-link" onClick={() => handleLink(item.href)}>
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Mobile: Shop Services accordion */}
        <div className="mobile-nav-group">
          <button
            className="mobile-nav-link mobile-nav-group-trigger"
            onClick={() => toggleMobile('services')}
          >
            Shop Services
            <svg className={`mobile-nav-caret${mobileOpen === 'services' ? ' open' : ''}`} viewBox="0 0 10 6" width="10" height="6" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M1 1l4 4 4-4" />
            </svg>
          </button>
          {mobileOpen === 'services' && (
            <div className="mobile-nav-group-items">
              {SERVICE_ITEMS.map(item => (
                <button key={item.key} className="mobile-nav-sub-link" onClick={() => handleLink(item.href)}>
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <button className="mobile-nav-link" onClick={() => handleLink('/garden')}>
          Down the Path
        </button>

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
      </div>
    </>
  )
}
