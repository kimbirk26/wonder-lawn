import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'
import { useAuth } from '../AuthContext'
import { useCart } from '../CartContext'

export default function CheckoutPage() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const { items, totalPrice, clearCart } = useCart()
  const [address, setAddress] = useState({ street: '', suburb: '', city: 'Cape Town', postal_code: '' })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!loading && !user) navigate('/login?redirect=/checkout', { replace: true })
  }, [user, loading, navigate])

  useEffect(() => {
    if (!user) return
    supabase
      .from('profiles')
      .select('delivery_address, full_name, phone')
      .eq('id', user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (data?.delivery_address) setAddress(data.delivery_address)
      })
  }, [user])

  if (!loading && items.length === 0) {
    return (
      <div className="checkout-page">
        <div className="checkout-empty">
          <p>Your basket is empty. <a href="/shop">Browse the shop</a>.</p>
        </div>
      </div>
    )
  }

  const handlePay = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      const res = await fetch('/.netlify/functions/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(({ plant, qty }) => ({
            id: plant.id,
            name: plant.name,
            price: plant.price,
            qty,
          })),
          total: totalPrice,
          user_id: user.id,
          email: user.email,
          delivery_address: address,
        }),
      })

      if (!res.ok) throw new Error(await res.text())

      const { payfast_url, form_data } = await res.json()

      // Build and auto-submit a form to PayFast
      const form = document.createElement('form')
      form.method = 'POST'
      form.action = payfast_url

      Object.entries(form_data).forEach(([key, value]) => {
        const input = document.createElement('input')
        input.type = 'hidden'
        input.name = key
        input.value = value
        form.appendChild(input)
      })

      document.body.appendChild(form)
      form.submit()
    } catch (err) {
      setError('Payment setup failed. Please try again or order via WhatsApp.')
      setSubmitting(false)
    }
  }

  if (loading || !user) return null

  return (
    <div className="checkout-page">
      <div className="checkout-inner">
        <h1 className="checkout-title">Checkout</h1>

        <div className="checkout-layout">
          <div className="checkout-form-col">
            <form onSubmit={handlePay}>
              <h2 className="checkout-section-title">Delivery address</h2>
              <div className="form-group">
                <label className="form-label">Street address</label>
                <input
                  className="form-input"
                  type="text"
                  required
                  value={address.street}
                  onChange={e => setAddress(a => ({ ...a, street: e.target.value }))}
                  placeholder="1 Garden Lane"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Suburb</label>
                <input
                  className="form-input"
                  type="text"
                  required
                  value={address.suburb}
                  onChange={e => setAddress(a => ({ ...a, suburb: e.target.value }))}
                  placeholder="Claremont"
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">City</label>
                  <input
                    className="form-input"
                    type="text"
                    required
                    value={address.city}
                    onChange={e => setAddress(a => ({ ...a, city: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Postal code</label>
                  <input
                    className="form-input"
                    type="text"
                    required
                    value={address.postal_code}
                    onChange={e => setAddress(a => ({ ...a, postal_code: e.target.value }))}
                    placeholder="7700"
                  />
                </div>
              </div>

              {error && <p className="checkout-error">{error}</p>}

              <p className="checkout-terms">
                By paying you agree to our{' '}
                <a href="/terms" target="_blank" rel="noopener noreferrer">Terms &amp; Conditions</a>
                {' '}and{' '}
                <a href="/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.
              </p>

              <button
                type="submit"
                className="btn-primary checkout-pay-btn"
                disabled={submitting}
              >
                {submitting ? 'Redirecting to PayFast…' : `Pay R ${totalPrice} via PayFast`}
              </button>
            </form>
          </div>

          <div className="checkout-summary-col">
            <h2 className="checkout-section-title">Order summary</h2>
            <ul className="checkout-items">
              {items.map(({ plant, qty }) => (
                <li key={plant.id} className="checkout-item">
                  <span>{qty}× {plant.name}</span>
                  <span>R {plant.price * qty}</span>
                </li>
              ))}
            </ul>
            <div className="checkout-total">
              <span>Total</span>
              <span>R {totalPrice}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
