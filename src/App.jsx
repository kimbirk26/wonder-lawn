import { useState, useEffect, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        document.querySelector(hash)?.scrollIntoView()
      }, 80)
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])
  return null
}
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import InstallPrompt from './components/InstallPrompt'
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
const PrivacyPage      = lazy(() => import('./pages/PrivacyPage'))
const TermsPage        = lazy(() => import('./pages/TermsPage'))
const QuotesPage       = lazy(() => import('./pages/QuotesPage'))
const GardenPage       = lazy(() => import('./pages/GardenPage'))
const TransformationsPage = lazy(() => import('./pages/TransformationsPage'))
const NotFoundPage     = lazy(() => import('./pages/NotFoundPage'))
const AdminPage        = lazy(() => import('./pages/AdminPage'))

export default function App() {
  const [theme, setTheme] = useState('blue')
  const [darkMode, setDarkMode] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme === 'blue' ? 'blue' : '')
  }, [theme])

  useEffect(() => {
    document.documentElement.setAttribute('data-dark', darkMode ? 'true' : 'false')
  }, [darkMode])

  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <ScrollToTop />
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
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/quotes" element={<QuotesPage />} />
              <Route path="/garden" element={<GardenPage />} />
              <Route path="/transformations" element={<TransformationsPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
          <Footer theme={theme} setTheme={setTheme} darkMode={darkMode} setDarkMode={setDarkMode} />
          <WhatsAppButton />
          <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
          <InstallPrompt />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  )
}
