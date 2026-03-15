import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '../supabase'
import { useAuth } from '../AuthContext'

export default function AuthPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const redirect = searchParams.get('redirect') || '/account'

  useEffect(() => {
    if (user) navigate(redirect, { replace: true })
  }, [user, navigate, redirect])

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Welcome to Wonder Lawn</h1>
        <p className="auth-subtitle">Sign in or create an account to track orders, save your wishlist and check out faster.</p>
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#4A7A62',
                  brandAccent: '#3a6450',
                  inputBackground: '#fff',
                  inputBorder: '#d4c9b0',
                  inputBorderFocus: '#4A7A62',
                  inputText: '#1a1a1a',
                },
                radii: {
                  borderRadiusButton: '2px',
                  inputBorderRadius: '2px',
                },
                fontSizes: {
                  baseBodySize: '14px',
                  baseInputSize: '14px',
                  baseLabelSize: '13px',
                  baseButtonSize: '14px',
                },
              },
            },
          }}
          providers={[]}
          redirectTo={window.location.origin + redirect}
        />
      </div>
    </div>
  )
}
