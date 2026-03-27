import { useParams, Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { PLANTS } from '../data'
import { usePageMeta } from '../usePageMeta'
import { useCart } from '../CartContext'
import { useWishlist } from '../useWishlist'

const WA = '27637931439'

export default function PlantPage() {
  const { id } = useParams()
  const plant = PLANTS.find(p => p.id === id)

  usePageMeta(
    plant ? `${plant.name} | Wonder Lawn Shop` : 'Plant | Wonder Lawn',
    plant ? plant.desc.split('\n')[0] : 'Potted plants for Cape Town homes and gardens.'
  )

  useEffect(() => { window.scrollTo(0, 0) }, [id])

  if (!plant) return (
    <main className="story-not-found" style={{ paddingTop: '64px' }}>
      <p>Plant not found.</p>
      <Link to="/shop" className="btn-outline">← Back to Shop</Link>
    </main>
  )

  const { addToCart } = useCart()
  const { toggle, isWishlisted } = useWishlist()
  const navigate = useNavigate()
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    addToCart(plant)
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  const waMsg = encodeURIComponent(`Hello! I'd like to order: ${plant.name} (R ${plant.price}). Could you help me with delivery or collection?`)
  const paragraphs = plant.desc.split('\n').filter(p => p.trim())

  return (
    <main className="plant-page" style={{ paddingTop: '64px' }}>

      <div className="plant-page-inner">

        {/* Image */}
        <div className="plant-page-img-wrap">
          {plant.image ? (
            <img
              src={plant.image}
              alt={`${plant.name} — potted plant for Cape Town gardens`}
              className="plant-page-img"
            />
          ) : (
            <div className="plant-page-icon">{plant.icon}</div>
          )}
        </div>

        {/* Details */}
        <div className="plant-page-body">
          <Link to="/shop" className="story-back-link">← Shop</Link>

          <span className="shop-cat" style={{ display: 'inline-block', marginBottom: '0.75rem' }}>
            {plant.category}
          </span>

          <h1 className="plant-page-title">{plant.name}</h1>

          <div className="plant-page-meta">
            <span className="plant-page-size">{plant.size}</span>
            <span className="plant-page-price">R {plant.price}</span>
            {!plant.inStock && <span className="shop-sold-out">Out of stock</span>}
          </div>

          <div className="plant-page-desc">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {plant.inStock && (
            <div className="plant-page-actions">
              <button onClick={handleAdd} className={`btn-primary plant-page-add${added ? ' added' : ''}`}>
                {added ? '✓ Added to basket' : '+ Add to basket'}
              </button>
              <button
                onClick={() => toggle(plant.id, navigate)}
                className={`btn-outline plant-page-wishlist${isWishlisted(plant.id) ? ' wishlisted' : ''}`}
              >
                {isWishlisted(plant.id) ? '♥ Saved to wishlist' : '♡ Save to wishlist'}
              </button>
              <a
                href={`https://wa.me/${WA}?text=${waMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline plant-page-order"
              >
                Order directly on WhatsApp
              </a>
            </div>
          )}
        </div>

      </div>

      {/* Hawk moth editorial — lonicera only */}
      {plant.id === 'lonicera' && (
        <div className="shop-interlude" style={{ marginTop: '4rem', paddingBottom: '4rem' }}>
          <div className="shop-interlude-text">
            <div className="hero-eyebrow" style={{ justifyContent: 'flex-start', marginBottom: '1.25rem' }}>
              <span className="hero-eyebrow-line" style={{ maxWidth: '2rem' }} />
              A living garden
            </div>
            <p className="shop-interlude-quote">
              "A garden is never just plants — it is the whole world of creatures drawn to them."
            </p>
            <p className="shop-interlude-body">
              Each plant we select invites life. The lonicera alone draws hummingbird hawk moths, bees, and sunbirds to Cape Town gardens.
            </p>
          </div>
          <figure className="shop-interlude-figure">
            <img
              src="/plants/hawkmoth.png"
              alt="Hummingbird hawk moth feeding from honeysuckle flower"
              className="shop-interlude-img"
              loading="lazy"
            />
            <figcaption className="shop-interlude-caption">
              Hummingbird hawk moth on lonicera · Cape Town
            </figcaption>
          </figure>
        </div>
      )}

    </main>
  )
}
