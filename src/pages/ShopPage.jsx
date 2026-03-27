import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { PLANTS, SHOP_CATEGORIES } from '../data'
import { usePageMeta } from '../usePageMeta'
import { useCart } from '../CartContext'
import { useWishlist } from '../useWishlist'
import { RabbitIcon, PocketWatchIcon, KeyIcon } from '../components/SuitIcon'

function PlantGrid({ plants }) {
  const { addToCart } = useCart()
  const { toggle, isWishlisted } = useWishlist()
  const navigate = useNavigate()
  const [toast, setToast] = useState(null)

  const handleAdd = (plant) => {
    addToCart(plant)
    setToast(plant.name)
    setTimeout(() => setToast(null), 2200)
  }

  return (
    <>
      <div className="shop-grid">
        {plants.map(plant => (
          <Link key={plant.id} to={`/shop/${plant.id}`} className={`shop-card${!plant.inStock ? ' shop-card--sold-out' : ''}`}>
            <div className="shop-card-img-wrap">
              <img
                src={plant.image}
                alt={`${plant.name} — potted plant available in Cape Town from Wonder Lawn`}
                className="shop-card-img"
                loading="lazy"
                onError={e => { e.currentTarget.style.display = 'none'; e.currentTarget.nextSibling.style.display = 'flex' }}
              />
              <div className="shop-card-icon-fallback" style={{ display: 'none' }}>
                {plant.icon}
              </div>
              <button
                className={`wishlist-btn${isWishlisted(plant.id) ? ' wishlisted' : ''}`}
                onClick={e => { e.preventDefault(); toggle(plant.id, navigate) }}
                aria-label={isWishlisted(plant.id) ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                {isWishlisted(plant.id) ? '♥' : '♡'}
              </button>
            </div>
            <div className="shop-card-body">
              <span className="shop-cat">{plant.category}</span>
              <h3 className="shop-card-name">{plant.name}</h3>
              <div className="shop-card-size">{plant.size}</div>
              <p className="shop-card-desc">{plant.desc.split('\n')[0]}</p>
              <div className="shop-card-footer">
                <div className="shop-price">R {plant.price}</div>
                {!plant.inStock
                  ? <span className="shop-sold-out">Out of stock</span>
                  : <button className="shop-add-btn" onClick={e => { e.preventDefault(); handleAdd(plant) }}>+ Add</button>
                }
              </div>
            </div>
          </Link>
        ))}
      </div>
      {toast && (
        <div className="cart-toast" aria-live="polite">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" width="13" height="13" aria-hidden="true">
            <polyline points="2 8 6 12 14 4" />
          </svg>
          {toast} added to basket
        </div>
      )}
    </>
  )
}

function ShopEditorial({ plant }) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)

  const handleAdd = (e) => {
    e.preventDefault()
    addToCart(plant)
    setAdded(true)
    setTimeout(() => setAdded(false), 2200)
  }

  const date = new Date().toLocaleDateString('en-ZA', { weekday: 'long', day: 'numeric', month: 'long' })
  const ed = plant.editorial

  return (
    <>
      <div className="shop-editorial">
        <div className="shop-editorial-inner">
          <div className="shop-editorial-header">
            <span className="shop-editorial-label">Plant of the Day</span>
            <span className="shop-editorial-date">{date}</span>
          </div>
          <h2 className="shop-editorial-title">{plant.name}</h2>
          <div className="shop-editorial-body">
            <Link to={`/shop/${plant.id}`} className="shop-editorial-img-wrap">
              <img
                src={ed ? ed.image : plant.image}
                alt={ed ? ed.caption : plant.name}
                className="shop-editorial-img"
                loading="eager"
              />
              {ed?.caption && <figcaption className="shop-editorial-caption">{ed.caption}</figcaption>}
            </Link>
            <div className="shop-editorial-text">
              <span className="shop-cat" style={{ display: 'block', marginBottom: '1rem' }}>{plant.category}</span>
              {ed ? (
                <>
                  <blockquote className="shop-editorial-quote">{ed.quote}</blockquote>
                  <p className="shop-editorial-desc">{ed.body}</p>
                </>
              ) : (
                <p className="shop-editorial-desc">{plant.desc.split('\n')[0]}</p>
              )}
              <div className="shop-editorial-size">{plant.size}</div>
              <div className="shop-editorial-actions">
                <span className="shop-price">R {plant.price}</span>
                {plant.inStock && (
                  <button className={`shop-add-btn${added ? ' added' : ''}`} onClick={handleAdd}>
                    {added ? '✓ Added to basket' : '+ Add to basket'}
                  </button>
                )}
              </div>
              <Link to={`/shop/${plant.id}`} className="shop-editorial-read-more">
                {ed ? 'Read about this plant →' : 'View plant details →'}
              </Link>
            </div>
          </div>
        </div>
      </div>
      {added && (
        <div className="cart-toast" aria-live="polite">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" width="13" height="13" aria-hidden="true">
            <polyline points="2 8 6 12 14 4" />
          </svg>
          {plant.name} added to basket
        </div>
      )}
    </>
  )
}

function WhatsAppCTA() {
  return (
    <div className="shop-wa-cta">
      <div className="shop-wa-cta-inner">
        <div className="hero-eyebrow" style={{ justifyContent: 'center', marginBottom: '1.5rem' }}>
          <span className="hero-eyebrow-line" style={{ background: 'rgba(255,255,255,0.3)' }} />
          Ready to start?
          <span className="hero-eyebrow-line" style={{ background: 'rgba(255,255,255,0.3)' }} />
        </div>
        <h2 className="shop-wa-cta-title">Not sure where to begin?</h2>
        <p className="shop-wa-cta-sub">Message us on WhatsApp — we'll help you choose the right plants for your space and conditions.</p>
        <a
          href="https://wa.me/27637931439?text=Hello!%20I'd%20like%20some%20help%20choosing%20plants%20from%20Wonder%20Lawn."
          target="_blank"
          rel="noopener noreferrer"
          className="shop-wa-btn"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.554 4.122 1.523 5.855L.057 23.882a.75.75 0 00.92.92l6.101-1.474A11.932 11.932 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.717 9.717 0 01-4.976-1.366l-.356-.213-3.695.892.908-3.603-.233-.371A9.718 9.718 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
          </svg>
          Chat on WhatsApp
        </a>
      </div>
    </div>
  )
}

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const category = searchParams.get('category') || ''

  const inStockPlants = PLANTS.filter(p => p.inStock)
  const plantOfTheDay = PLANTS.find(p => p.editorial && p.inStock)
    ?? inStockPlants[new Date().getDate() % inStockPlants.length]

  const catConfig = SHOP_CATEGORIES.find(c => c.key === category)
  const catLabel = category === 'all' ? 'All Plants' : catConfig?.label || 'Plants'

  usePageMeta(
    'Shop — Potted Plants | Wonder Lawn Cape Town',
    'Browse Wonder Lawn\'s curated selection of potted plants for Cape Town homes and gardens.'
  )

  // ── Category landing ──────────────────────────────────────────────────────
  if (!category) {
    return (
      <main className="shop-page">
        <div className="shop-cat-landing">
          <div className="shop-cat-landing-header">
            <p className="hero-eyebrow-editorial">The Shop</p>
            <h1 className="shop-cat-heading">What are you looking for?</h1>
            <button className="shop-browse-all-btn" onClick={() => setSearchParams({ category: 'all' })}>
              Browse all plants →
            </button>
          </div>
          <div className="shop-cat-grid">
            {SHOP_CATEGORIES.map(cat => (
              <button
                key={cat.key}
                className={`shop-cat-tile${cat.rowSpan === 2 ? ' shop-cat-tile--tall' : cat.span === 3 ? ' shop-cat-tile--full' : cat.span === 2 ? ' shop-cat-tile--wide' : ''}`}
                onClick={() => {
                  if (cat.key === 'plant-of-the-day') {
                    document.getElementById('plant-of-the-day')?.scrollIntoView({ behavior: 'smooth' })
                  } else {
                    setSearchParams({ category: cat.key })
                  }
                }}
              >
                <img src={cat.image} alt={cat.label} className="shop-cat-tile-img" loading="lazy" />
                <div className="shop-cat-tile-overlay" />
                <span className="shop-cat-tile-label">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div id="plant-of-the-day">
          <ShopEditorial plant={plantOfTheDay} />
        </div>

        <div className="section shop-steps-section">
          <div className="section-inner">
            <div className="hero-eyebrow" style={{ justifyContent: 'center', marginBottom: '3rem' }}>
              <span className="hero-eyebrow-line" />
              How Ordering Works
              <span className="hero-eyebrow-line" />
            </div>
            <div className="shop-steps">
              <div className="shop-step">
                <RabbitIcon size={44} className="shop-step-icon" />
                <h3 className="shop-step-title">Browse &amp; choose</h3>
                <p className="shop-step-body">Browse our curated selection and add plants to your basket at your own pace.</p>
              </div>
              <div className="shop-step">
                <PocketWatchIcon size={44} className="shop-step-icon" />
                <h3 className="shop-step-title">Place your order</h3>
                <p className="shop-step-body">Checkout online or send us a WhatsApp — we'll confirm availability and answer any questions.</p>
              </div>
              <div className="shop-step">
                <KeyIcon size={44} className="shop-step-icon" />
                <h3 className="shop-step-title">Delivery or collection</h3>
                <p className="shop-step-body">We deliver across Cape Town or you're welcome to collect from Constantia. We'll arrange a time that suits you.</p>
              </div>
            </div>
          </div>
        </div>

        <WhatsAppCTA />
      </main>
    )
  }

  // ── Plant of the Day ──────────────────────────────────────────────────────
  if (category === 'plant-of-the-day') {
    return (
      <main className="shop-page">
        <div className="shop-cat-back-bar">
          <div className="shop-cat-back-inner">
            <button className="shop-cat-back-btn" onClick={() => setSearchParams({})}>← All Categories</button>
          </div>
        </div>
        <ShopEditorial plant={plantOfTheDay} />
        <WhatsAppCTA />
      </main>
    )
  }

  // ── Filtered category ─────────────────────────────────────────────────────
  const filtered = category === 'all'
    ? inStockPlants
    : PLANTS.filter(p => p.category === category)

  return (
    <main className="shop-page">
      <div className="shop-cat-back-bar">
        <div className="shop-cat-back-inner">
          <button className="shop-cat-back-btn" onClick={() => setSearchParams({})}>← All Categories</button>
          <span className="shop-cat-back-sep">/</span>
          <span className="shop-cat-back-current">{catLabel}</span>
        </div>
      </div>

      <div className="section">
        <div className="section-inner">
          {filtered.length === 0 ? (
            <div className="shop-cat-empty">
              <p>No plants in this category yet — check back soon.</p>
              <button className="btn-outline" onClick={() => setSearchParams({})}>Browse all categories</button>
            </div>
          ) : (
            <PlantGrid plants={filtered} />
          )}
        </div>
      </div>

      <WhatsAppCTA />
    </main>
  )
}
