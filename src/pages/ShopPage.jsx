import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { PLANTS } from '../data'
import { usePageMeta } from '../usePageMeta'
import { useCart } from '../CartContext'
import { useWishlist } from '../useWishlist'

const WA = '27637931439'
const CATEGORIES = ['All', 'Indoor', 'Outdoor', 'Indoor / Outdoor']

export default function ShopPage() {
  usePageMeta(
    'Shop — Potted Plants | Wonder Lawn Cape Town',
    'Browse Wonder Lawn\'s curated selection of potted plants for Cape Town homes and gardens. Order easily on WhatsApp with same-day response.'
  )

  const [active, setActive] = useState('All')
  const { addToCart } = useCart()
  const { toggle, isWishlisted } = useWishlist()
  const navigate = useNavigate()

  const visible = active === 'All'
    ? PLANTS
    : PLANTS.filter(p => p.category === active)

  return (
    <main className="shop-page">

      {/* Page hero */}
      <div className="stories-hero">
        <div className="hero-glow-1" style={{ opacity: 0.35 }} />
        <div className="hero-glow-2" style={{ opacity: 0.25 }} />
        <div className="hero-pattern" />
        <img src="/plants/botanical1.webp" alt="" aria-hidden="true" className="shop-tree-right" loading="lazy" />
        <img src="/plants/botanical2.jpeg" alt="" aria-hidden="true" className="shop-tree" loading="lazy" />
      
        <div className="stories-hero-inner">
          <div className="shop-heading-card">
            <div className="hero-eyebrow">
              <span className="hero-eyebrow-line" />
              Potted Plants · Cape Town
              <span className="hero-eyebrow-line" />
            </div>
            <h1 className="stories-hero-title">
              Plants for every<br /><em>garden and home</em>
            </h1>
            <p className="stories-hero-sub">
              Curated potted plants selected for Cape Town conditions. Order on WhatsApp. We'll arrange delivery or collection.
            </p>
          </div>
        </div>
      </div>

      {/* Category filter */}
      <div className="shop-filter-wrap">
        <div className="shop-filter">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`shop-filter-btn${active === cat ? ' active' : ''}`}
              onClick={() => setActive(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Specimen card */}
      <div className="shop-specimen-wrap">
        <figure className="shop-specimen-card">
          <img src="/plants/lonicera.webp" alt="Hummingbird hawk moth feeding from honeysuckle flower" className="shop-specimen-img" loading="lazy" />
          <figcaption className="shop-specimen-caption">
            Hummingbird hawk moth feeding from honeysuckle flower
          </figcaption>
        </figure>
      </div>

      {/* Plant grid */}
      <div className="section">
        <div className="section-inner">
          <div className="shop-grid">
            {visible.map(plant => (
              <Link key={plant.id} to={`/shop/${plant.id}`} className={`shop-card${!plant.inStock ? ' shop-card--sold-out' : ''}`}>

                {/* Image or icon placeholder */}
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
                      : <button
                          className="shop-add-btn"
                          onClick={e => { e.preventDefault(); addToCart(plant) }}
                        >+ Add</button>
                    }
                  </div>
                </div>

              </Link>
            ))}
          </div>
        </div>
      </div>

    </main>
  )
}
