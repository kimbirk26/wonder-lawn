import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'

const STATUS_TABS = ['All', 'Pending', 'Paid', 'Shipped', 'Delivered', 'Cancelled']
const STATUS_LABELS = {
  pending: 'Pending',
  paid: 'Paid',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
}

function itemsSummary(items) {
  if (!items?.length) return '—'
  if (items.length === 1) return `${items[0].qty}× ${items[0].name}`
  return `${items[0].qty}× ${items[0].name} +${items.length - 1} more`
}

export default function AdminPage() {
  const { user, session, loading } = useAuth()
  const navigate = useNavigate()
  const isAdmin = user?.email === import.meta.env.VITE_ADMIN_EMAIL

  const [orders, setOrders] = useState([])
  const [loading2, setLoading2] = useState(true)
  const [error, setError] = useState(null)
  const [filterTab, setFilterTab] = useState('All')
  const [expandedOrder, setExpandedOrder] = useState(null)
  const [updating, setUpdating] = useState(null)
  const [modalStatus, setModalStatus] = useState('')

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) navigate('/', { replace: true })
  }, [user, loading, isAdmin, navigate])

  useEffect(() => {
    if (isAdmin && session) fetchOrders()
  }, [isAdmin, session])

  async function fetchOrders() {
    setLoading2(true)
    setError(null)
    try {
      const res = await fetch('/.netlify/functions/admin-get-orders', {
        headers: { Authorization: `Bearer ${session.access_token}` },
      })
      if (!res.ok) { setError('Failed to load orders'); setLoading2(false); return }
      setOrders(await res.json())
    } catch {
      setError('Failed to load orders')
    }
    setLoading2(false)
  }

  async function updateStatus(orderId, newStatus) {
    setUpdating(orderId)
    const res = await fetch('/.netlify/functions/admin-update-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({ orderId, status: newStatus }),
    })
    if (res.ok) {
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o))
      setExpandedOrder(prev => prev?.id === orderId ? { ...prev, status: newStatus } : prev)
    }
    setUpdating(null)
  }

  function openModal(order) {
    setExpandedOrder(order)
    setModalStatus(order.status)
  }

  if (loading || !user) return null

  const filtered = filterTab === 'All'
    ? orders
    : orders.filter(o => o.status === filterTab.toLowerCase())

  const stats = {
    total: orders.length,
    revenue: orders
      .filter(o => o.status !== 'cancelled')
      .reduce((s, o) => s + Number(o.total), 0),
    paid: orders.filter(o => o.status === 'paid').length,
    pending: orders.filter(o => o.status === 'pending').length,
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1 className="admin-title">Orders Dashboard</h1>
        <p className="admin-subtitle">{orders.length} order{orders.length !== 1 ? 's' : ''} total</p>
      </div>

      <div className="admin-stats">
        <div className="admin-stat-card">
          <div className="admin-stat-value">{stats.total}</div>
          <div className="admin-stat-label">Total Orders</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-value">R {stats.revenue.toLocaleString()}</div>
          <div className="admin-stat-label">Revenue</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-value">{stats.paid}</div>
          <div className="admin-stat-label">Paid</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-value">{stats.pending}</div>
          <div className="admin-stat-label">Pending</div>
        </div>
      </div>

      <div className="account-tabs admin-filter-tabs">
        {STATUS_TABS.map(t => (
          <button
            key={t}
            className={`account-tab${filterTab === t ? ' active' : ''}`}
            onClick={() => setFilterTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {loading2 && <div className="admin-loading">Loading orders…</div>}
      {error && <div className="admin-error">{error}</div>}

      {!loading2 && !error && (
        filtered.length === 0 ? (
          <div className="admin-empty">No orders in this category.</div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th className="admin-col-items">Items</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(order => (
                  <tr key={order.id}>
                    <td className="admin-td-date">
                      {new Date(order.created_at).toLocaleDateString('en-ZA', {
                        day: 'numeric', month: 'short', year: 'numeric',
                      })}
                    </td>
                    <td className="admin-td-id">{order.id.slice(0, 8)}…</td>
                    <td>
                      <div className="admin-customer-name">{order.customer_name || '—'}</div>
                      <div className="admin-customer-email">{order.customer_email || '—'}</div>
                    </td>
                    <td className="admin-col-items">{itemsSummary(order.items)}</td>
                    <td>R {order.total}</td>
                    <td>
                      <span className={`order-status order-status--${order.status}`}>
                        {STATUS_LABELS[order.status] || order.status}
                      </span>
                    </td>
                    <td className="admin-td-actions">
                      <button className="admin-btn-detail" onClick={() => openModal(order)}>
                        View
                      </button>
                      {order.status === 'paid' && (
                        <button
                          className="admin-btn-ship"
                          disabled={updating === order.id}
                          onClick={() => updateStatus(order.id, 'shipped')}
                        >
                          {updating === order.id ? '…' : 'Ship'}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}

      {expandedOrder && (
        <div className="admin-modal-overlay" onClick={e => { if (e.target === e.currentTarget) setExpandedOrder(null) }}>
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h2 className="admin-modal-title">Order {expandedOrder.id.slice(0, 8)}…</h2>
              <button className="admin-modal-close" onClick={() => setExpandedOrder(null)}>✕</button>
            </div>

            <div className="admin-modal-section">
              <div className="admin-modal-label">Customer</div>
              <div>{expandedOrder.customer_name || '—'}</div>
              <div>{expandedOrder.customer_email || '—'}</div>
              {expandedOrder.customer_phone && <div>{expandedOrder.customer_phone}</div>}
            </div>

            {expandedOrder.delivery_address && (
              <div className="admin-modal-section">
                <div className="admin-modal-label">Delivery Address</div>
                {expandedOrder.delivery_address.street && <div>{expandedOrder.delivery_address.street}</div>}
                {expandedOrder.delivery_address.suburb && <div>{expandedOrder.delivery_address.suburb}</div>}
                {expandedOrder.delivery_address.city && <div>{expandedOrder.delivery_address.city}</div>}
                {expandedOrder.delivery_address.postal_code && <div>{expandedOrder.delivery_address.postal_code}</div>}
              </div>
            )}

            <div className="admin-modal-section">
              <div className="admin-modal-label">Items</div>
              <ul className="admin-modal-items">
                {expandedOrder.items?.map((item, i) => (
                  <li key={i} className="order-item">
                    <span>{item.qty}× {item.name}</span>
                    <span>R {item.price * item.qty}</span>
                  </li>
                ))}
              </ul>
              <div className="order-total">Total: R {expandedOrder.total}</div>
            </div>

            <div className="admin-modal-section admin-status-update">
              <div className="admin-modal-label">Update Status</div>
              <div className="admin-status-row">
                <select
                  className="admin-status-select"
                  value={modalStatus}
                  onChange={e => setModalStatus(e.target.value)}
                >
                  {['pending', 'paid', 'shipped', 'delivered', 'cancelled'].map(s => (
                    <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                  ))}
                </select>
                <button
                  className="admin-status-btn btn-primary"
                  disabled={updating === expandedOrder.id || modalStatus === expandedOrder.status}
                  onClick={() => updateStatus(expandedOrder.id, modalStatus)}
                >
                  {updating === expandedOrder.id ? 'Updating…' : 'Update'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
