import { useState, useEffect } from 'react'
import { supabase } from './supabase'
import { useAuth } from './AuthContext'

export function useWishlist() {
  const { user } = useAuth()
  const [wishlist, setWishlist] = useState([]) // array of plant_id strings

  useEffect(() => {
    if (!user) { setWishlist([]); return }
    supabase
      .from('wishlists')
      .select('plant_id')
      .then(({ data }) => setWishlist(data?.map(r => r.plant_id) || []))
  }, [user])

  const toggle = async (plantId, navigate) => {
    if (!user) {
      if (navigate) navigate('/login?redirect=/shop')
      return
    }
    const id = String(plantId)
    if (wishlist.includes(id)) {
      await supabase.from('wishlists').delete().eq('plant_id', id)
      setWishlist(prev => prev.filter(x => x !== id))
    } else {
      await supabase.from('wishlists').insert({ user_id: user.id, plant_id: id })
      setWishlist(prev => [...prev, id])
    }
  }

  const isWishlisted = (plantId) => wishlist.includes(String(plantId))

  return { wishlist, toggle, isWishlisted }
}
