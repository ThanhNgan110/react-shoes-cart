import React, { useState } from 'react'
import type { Product, Cart, CartItem, OptionsQuantity } from '../types'

import { listData } from '../data'

interface CartContextType {
	products: Product[]
	cart: Cart[]
	handleAddProduct: (id: number) => void
	handleDeleteProduct: (id: number) => void
	changeQuantity: (options: OptionsQuantity, id: number) => void
	totalPrice: number
	totalItems: number
}

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = React.createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: React.PropsWithChildren) => {
	const [products, setProducts] = useState<Product[]>([])
	const [cart, setCart] = React.useState<CartItem[]>([])

	React.useEffect(() => {
		setProducts(listData.map(product => product))
	}, [])

	const handleFindProductById = React.useCallback(
		(id: number) => products.find(product => product.id === id),
		[products],
	)

	const handleAddProduct = React.useCallback(
		(id: number) => {
			setCart(prev => {
				const existingItem = prev.find(item => item.id === id)
				if (existingItem) {
					return prev.map(item => (item.id === id ? { ...item, cartQuantity: (item.cartQuantity ?? 0) + 1 } : item))
				}
				const product = handleFindProductById(id)
				if (!product) return prev
				return [...prev, { ...product, cartQuantity: 1 }]
			})
		},
		[handleFindProductById],
	)

	const changeQuantity = React.useCallback((options: OptionsQuantity, id: number) => {
		switch (options) {
			case 'increase':
				setCart(prev =>
					prev.map(item => (item.id === id ? { ...item, cartQuantity: (item.cartQuantity ?? 0) + 1 } : item)),
				)
				break

			case 'decrease':
				setCart(prev =>
					prev.map(item =>
						item.id === id ? { ...item, cartQuantity: Math.max((item.cartQuantity ?? 0) - 1, 0) } : item,
					),
				)
				break
		}
	}, [])

	const handleDeleteProduct = React.useCallback((id: number) => {
		setCart(prev => prev.filter(item => item.id !== id))
	}, [])

	const totalPrice = React.useMemo(() => {
		return cart.reduce((sum, item) => sum + item.price * (item.cartQuantity ?? 0), 0).toFixed(2)
	}, [cart])

	const totalItems = React.useMemo(() => cart.length, [cart])

	const value = React.useMemo(
		() => ({
			products,
			cart,
			handleAddProduct,
			handleDeleteProduct,
			changeQuantity,
			totalPrice,
			totalItems,
		}),
		[products, cart, handleAddProduct, handleDeleteProduct, changeQuantity, totalPrice, totalItems],
	)

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCartContext = () => {
	const context = React.useContext(CartContext)
	if (!context) {
		throw new Error('useCartContext must be used inside CartProvider')
	}
	return context
}
