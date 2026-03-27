import { useNavigate } from 'react-router-dom'
import { useCart } from '../CartContext'
import { useAuth } from '../AuthContext'
import { SuitIcon } from './SuitIcon'

const WA = '27637931439'

function buildWhatsAppMessage(items, totalPrice) {
  const lines = items.map(({ plant, qty }) =>
    `• ${qty}× ${plant.name} — R ${plant.price * qty}`
  ).join('\n')
  return encodeURIComponent(
    `Hello! I'd like to order the following from Wonder Lawn:\n\n${lines}\n\nTotal: R ${totalPrice}\n\nCould you help me with delivery or collection?`
  )
}

export default function CartDrawer({ open, onClose }) {
  const { items, updateQty, removeFromCart, clearCart, totalItems, totalPrice } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  const checkoutWithPayFast = () => {
    onClose()
    navigate('/checkout')
  }

  const checkoutWithWhatsApp = () => {
    const msg = buildWhatsAppMessage(items, totalPrice)
    window.open(`https://wa.me/${WA}?text=${msg}`, '_blank', 'noopener,noreferrer')
  }

  const signInToCheckout = () => {
    onClose()
    navigate('/login?redirect=/checkout')
  }

  return (
    <>
      {/* Backdrop */}
      <div className={`cart-backdrop${open ? ' open' : ''}`} onClick={onClose} aria-hidden="true" />

      {/* Drawer */}
      <aside className={`cart-drawer${open ? ' open' : ''}`} aria-label="Shopping cart">
        <div className="cart-drawer-header">
          <h2 className="cart-drawer-title">Your basket</h2>
          <button className="cart-close" onClick={onClose} aria-label="Close cart">✕</button>
        </div>

        {items.length === 0 ? (
          <div className="cart-empty">
            <SuitIcon suit="heart" size={36} className="cart-empty-heart" />
            <p>Your basket is empty.</p>
          </div>
        ) : (
          <>
            <ul className="cart-items">
              {items.map(({ plant, qty }) => (
                <li key={plant.id} className="cart-item">
                  {plant.image && (
                    <img src={plant.image} alt={plant.name} className="cart-item-img" />
                  )}
                  <div className="cart-item-info">
                    <div className="cart-item-name">{plant.name}</div>
                    <div className="cart-item-price">R {plant.price} each</div>
                    <div className="cart-item-controls">
                      <button className="cart-qty-btn" onClick={() => updateQty(plant.id, qty - 1)}>−</button>
                      <span className="cart-qty">{qty}</span>
                      <button className="cart-qty-btn" onClick={() => updateQty(plant.id, qty + 1)}>+</button>
                      <button className="cart-remove" onClick={() => removeFromCart(plant.id)}>Remove</button>
                    </div>
                  </div>
                  <div className="cart-item-subtotal">R {plant.price * qty}</div>
                </li>
              ))}
            </ul>

            <div className="cart-footer">
              <div className="cart-total">
                <span>Total</span>
                <span className="cart-total-price">R {totalPrice}</span>
              </div>

              {user ? (
                <button onClick={checkoutWithPayFast} className="btn-primary cart-checkout-btn">
                  Pay now — R {totalPrice}
                </button>
              ) : (
                <>
                  <button onClick={signInToCheckout} className="btn-primary cart-checkout-btn">
                    Sign in to pay
                  </button>
                  <button onClick={checkoutWithWhatsApp} className="cart-whatsapp-btn">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.554 4.122 1.523 5.855L.057 23.882a.75.75 0 00.92.92l6.101-1.474A11.932 11.932 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.717 9.717 0 01-4.976-1.366l-.356-.213-3.695.892.908-3.603-.233-.371A9.718 9.718 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
                    </svg>
                    Order via WhatsApp instead
                  </button>
                </>
              )}
              <button onClick={clearCart} className="cart-clear">Clear basket</button>
            </div>
          </>
        )}
      </aside>
    </>
  )
}
