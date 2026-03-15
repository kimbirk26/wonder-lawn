import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'
import { useAuth } from '../AuthContext'
import { useCart } from '../CartContext'
import { PLANTS } from '../data'

const TABS = ['Orders', 'Wishlist', 'My Details']

const STATUS_LABELS = {
  pending: 'Pending payment',
  paid: 'Paid',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
}

export default function AccountPage() {
  const { user, signOut, loading } = useAuth()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [tab, setTab] = useState('Orders')
  const [orders, setOrders] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [profile, setProfile] = useState({ full_name: '', phone: '', delivery_address: {} })
  const [saving, setSaving] = useState(false)
  const [saveMsg, setSaveMsg] = useState('')

  useEffect(() => {
    if (!loading && !user) navigate('/login', { replace: true })
  }, [user, loading, navigate])

  useEffect(() => {
    if (!user) return
    fetchOrders()
    fetchWishlist()
    fetchProfile()
  }, [user])

  async function fetchOrders() {
    const { data } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
    setOrders(data || [])
  }

  async function fetchWishlist() {
    const { data } = await supabase
      .from('wishlists')
      .select('plant_id')
    setWishlist(data?.map(r => r.plant_id) || [])
  }

  async function fetchProfile() {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle()
    if (data) setProfile(data)
  }

  async function removeFromWishlist(plantId) {
    await supabase.from('wishlists').delete().eq('plant_id', plantId)
    setWishlist(prev => prev.filter(id => id !== plantId))
  }

  async function saveProfile(e) {
    e.preventDefault()
    setSaving(true)
    setSaveMsg('')
    const { error } = await supabase.from('profiles').upsert({
      id: user.id,
      full_name: profile.full_name,
      phone: profile.phone,
      delivery_address: profile.delivery_address,
    })
    setSaving(false)
    setSaveMsg(error ? 'Error saving. Please try again.' : 'Saved!')
    setTimeout(() => setSaveMsg(''), 3000)
  }

  const wishlistPlants = PLANTS.filter(p => wishlist.includes(String(p.id)))

  if (loading || !user) return null

  return (
    <div className="account-page">
      <div className="account-header">
        <div>
          <h1 className="account-title">My Account</h1>
          <p className="account-email">{user.email}</p>
        </div>
        <button className="account-signout" onClick={signOut}>Sign out</button>
      </div>

      <div className="account-tabs">
        {TABS.map(t => (
          <button
            key={t}
            className={`account-tab${tab === t ? ' active' : ''}`}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'Orders' && (
        <div className="account-section">
          {orders.length === 0 ? (
            <div className="account-empty">
              <p>No orders yet. Head to the <a href="/shop">shop</a> to get started.</p>
            </div>
          ) : (
            <ul className="orders-list">
              {orders.map(order => (
                <li key={order.id} className="order-card">
                  <div className="order-card-header">
                    <span className="order-date">
                      {new Date(order.created_at).toLocaleDateString('en-ZA', {
                        day: 'numeric', month: 'long', year: 'numeric'
                      })}
                    </span>
                    <span className={`order-status order-status--${order.status}`}>
                      {STATUS_LABELS[order.status] || order.status}
                    </span>
                  </div>
                  <ul className="order-items">
                    {order.items?.map((item, i) => (
                      <li key={i} className="order-item">
                        <span>{item.qty}× {item.name}</span>
                        <span>R {item.price * item.qty}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="order-total">Total: R {order.total}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {tab === 'Wishlist' && (
        <div className="account-section">
          {wishlistPlants.length === 0 ? (
            <div className="account-empty">
              <p>Your wishlist is empty. Heart a plant in the <a href="/shop">shop</a> to save it here.</p>
            </div>
          ) : (
            <ul className="wishlist-grid">
              {wishlistPlants.map(plant => (
                <li key={plant.id} className="wishlist-card">
                  {plant.image && (
                    <img src={plant.image} alt={plant.name} className="wishlist-card-img" />
                  )}
                  <div className="wishlist-card-info">
                    <div className="wishlist-card-name">{plant.name}</div>
                    <div className="wishlist-card-price">R {plant.price}</div>
                    <div className="wishlist-card-actions">
                      <button
                        className="btn-primary wishlist-add-btn"
                        onClick={() => addToCart(plant)}
                      >
                        Add to basket
                      </button>
                      <button
                        className="wishlist-remove-btn"
                        onClick={() => removeFromWishlist(String(plant.id))}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {tab === 'My Details' && (
        <div className="account-section">
          <form className="profile-form" onSubmit={saveProfile}>
            <div className="form-group">
              <label className="form-label">Full name</label>
              <input
                className="form-input"
                type="text"
                value={profile.full_name || ''}
                onChange={e => setProfile(p => ({ ...p, full_name: e.target.value }))}
                placeholder="Your name"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Phone</label>
              <input
                className="form-input"
                type="tel"
                value={profile.phone || ''}
                onChange={e => setProfile(p => ({ ...p, phone: e.target.value }))}
                placeholder="+27 60 000 0000"
              />
            </div>
            <fieldset className="form-fieldset">
              <legend className="form-legend">Delivery address</legend>
              <div className="form-group">
                <label className="form-label">Street address</label>
                <input
                  className="form-input"
                  type="text"
                  value={profile.delivery_address?.street || ''}
                  onChange={e => setProfile(p => ({
                    ...p,
                    delivery_address: { ...p.delivery_address, street: e.target.value }
                  }))}
                  placeholder="1 Garden Lane"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Suburb</label>
                <input
                  className="form-input"
                  type="text"
                  value={profile.delivery_address?.suburb || ''}
                  onChange={e => setProfile(p => ({
                    ...p,
                    delivery_address: { ...p.delivery_address, suburb: e.target.value }
                  }))}
                  placeholder="Claremont"
                />
              </div>
              <div className="form-group">
                <label className="form-label">City</label>
                <input
                  className="form-input"
                  type="text"
                  value={profile.delivery_address?.city || ''}
                  onChange={e => setProfile(p => ({
                    ...p,
                    delivery_address: { ...p.delivery_address, city: e.target.value }
                  }))}
                  placeholder="Cape Town"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Postal code</label>
                <input
                  className="form-input"
                  type="text"
                  value={profile.delivery_address?.postal_code || ''}
                  onChange={e => setProfile(p => ({
                    ...p,
                    delivery_address: { ...p.delivery_address, postal_code: e.target.value }
                  }))}
                  placeholder="7700"
                />
              </div>
            </fieldset>
            <button type="submit" className="btn-primary profile-save-btn" disabled={saving}>
              {saving ? 'Saving…' : 'Save details'}
            </button>
            {saveMsg && <p className="profile-save-msg">{saveMsg}</p>}
          </form>
        </div>
      )}
    </div>
  )
}
