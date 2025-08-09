export interface Product {
	id: number
	image: string
	name: string
	description?: string
	price: number
	color: string
	quantity: number
}

export type Cart = Product

export interface CartItem extends Product {
	cartQuantity?: number // item has in cart
}

export type OptionsQuantity = 'increase' | 'decrease'
