import { createContext, useContext, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([]) // [{ plant, qty }]

  const addToCart = (plant) => {
    setItems(prev => {
      const existing = prev.find(i => i.plant.id === plant.id)
      if (existing) return prev.map(i => i.plant.id === plant.id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { plant, qty: 1 }]
    })
  }

  const updateQty = (id, qty) => {
    if (qty < 1) return removeFromCart(id)
    setItems(prev => prev.map(i => i.plant.id === id ? { ...i, qty } : i))
  }

  const removeFromCart = (id) => {
    setItems(prev => prev.filter(i => i.plant.id !== id))
  }

  const clearCart = () => setItems([])

  const totalItems = items.reduce((sum, i) => sum + i.qty, 0)
  const totalPrice = items.reduce((sum, i) => sum + i.plant.price * i.qty, 0)

  return (
    <CartContext.Provider value={{ items, addToCart, updateQty, removeFromCart, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
