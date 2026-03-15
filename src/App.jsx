import { useState, useEffect, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import CartDrawer from './components/CartDrawer'
import { CartProvider } from './CartContext'
import { AuthProvider } from './AuthContext'
import HomePage from './pages/HomePage'

const StoriesPage      = lazy(() => import('./pages/StoriesPage'))
const StoryPage        = lazy(() => import('./pages/StoryPage'))
const ShopPage         = lazy(() => import('./pages/ShopPage'))
const PlantPage        = lazy(() => import('./pages/PlantPage'))
const TeamPage         = lazy(() => import('./pages/TeamPage'))
const AuthPage         = lazy(() => import('./pages/AuthPage'))
const AccountPage      = lazy(() => import('./pages/AccountPage'))
const CheckoutPage     = lazy(() => import('./pages/CheckoutPage'))
const OrderConfirmPage = lazy(() => import('./pages/OrderConfirmPage'))

export default function App() {
  const [theme, setTheme] = useState('green')
  const [cartOpen, setCartOpen] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme === 'blue' ? 'blue' : '')
  }, [theme])

  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Navbar theme={theme} setTheme={setTheme} onCartOpen={() => setCartOpen(true)} />
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/stories" element={<StoriesPage />} />
              <Route path="/stories/:slug" element={<StoryPage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/shop/:id" element={<PlantPage />} />
              <Route path="/team" element={<TeamPage />} />
              <Route path="/login" element={<AuthPage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order-confirmed" element={<OrderConfirmPage />} />
            </Routes>
          </Suspense>
          <Footer />
          <WhatsAppButton />
          <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  )
}
