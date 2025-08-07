import React, { useState } from 'react'
import type { Product, Cart, CartItem, OptionsQuantity } from '../types'

import { listData } from '../data'

interface CartContextType {
	products: Product[]
	cart: Cart[]
	handleAddProduct: (id: string) => void
	handleDeleteAllProduct: () => void
	changeQuantity: (options: OptionsQuantity, id: string) => void
	totalAmount: number
	totalProduct: number
}

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = React.createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: React.PropsWithChildren) => {
	const [products, setProducts] = useState<Product[]>([])
	const [cart, setCart] = React.useState<CartItem[]>([])

	React.useEffect(() => {
		const listProduct = listData.map(product => product)
		setProducts(listProduct)
	}, [])

	const handleFindProductById = (id: string) => {
		const product = products.find(product => product.id === id)
		return product
	}

	const handleAddProduct = (id: string) => {
		const existingItem = cart.find(item => item.id === id)
		if (existingItem) {
			setCart(prev => prev.map(item => (item.id === id ? { ...item, cartQuantity: item.cartQuantity + 1 } : item)))
		}

		if (!existingItem) {
			const product = handleFindProductById(id)
			if (!product) return
			setCart(prev => [...prev, { ...product, cartQuantity: 1 }])
		}
	}

	const changeQuantity = (options: OptionsQuantity, id: string) => {
		switch (options) {
			case 'increase':
				setCart(prev => prev.map(item => (item.id === id ? { ...item, cartQuantity: item.cartQuantity + 1 } : item)))
				break

			case 'decrease':
				setCart(prev =>
					prev.map(item =>
						item.id === id ? { ...item, cartQuantity: item.cartQuantity <= 0 ? 0 : item.cartQuantity - 1 } : item,
					),
				)
				break
		}
	}

	return (
		<CartContext.Provider
			value={{
				products,
				cart,
				handleAddProduct,
				changeQuantity,
			}}
		>
			{children}
		</CartContext.Provider>
	)
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCartContext = () => {
	const context = React.useContext(CartContext)

	if (!context) {
		throw new Error('useContext must be used within a CartProvider')
	}
	return context
}
