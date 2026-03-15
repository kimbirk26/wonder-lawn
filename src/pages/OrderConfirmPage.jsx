import { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useCart } from '../CartContext'

export default function OrderConfirmPage() {
  const { clearCart } = useCart()
  const [searchParams] = useSearchParams()
  const paymentId = searchParams.get('pf_payment_id')

  useEffect(() => {
    clearCart()
  }, [])

  return (
    <div className="confirm-page">
      <div className="confirm-card">
        <div className="confirm-icon" aria-hidden="true">❧</div>
        <h1 className="confirm-title">Thank you for your order!</h1>
        <p className="confirm-message">
          Your payment has been received. We'll prepare your plants with care and be in touch about delivery.
        </p>
        {paymentId && (
          <p className="confirm-ref">Payment reference: <code>{paymentId}</code></p>
        )}
        <div className="confirm-actions">
          <Link to="/account" className="btn-primary confirm-btn">View my orders</Link>
          <Link to="/shop" className="confirm-link">Continue shopping</Link>
        </div>
      </div>
    </div>
  )
}
