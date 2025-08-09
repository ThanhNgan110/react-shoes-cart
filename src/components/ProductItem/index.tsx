import React from 'react'

import type { Product } from '../../types'

import { useCartContext } from '../../context/CartContext'

interface ProductItemProps {
	product: Product
}

const ProductItem = ({ product }: ProductItemProps) => {
	const { image, description, name, price, id, color } = product
	const { handleAddProduct } = useCartContext()

	return (
		<>
			<div className="shopItem">
				<div className="shopItem_image" style={{ backgroundColor: color }}>
					<img alt={description} src={image} />
				</div>
				<div className="shopItem_name">{name}</div>
				<div className="shopItem_description">{description}</div>
				<div className="shopItem_bottom">
					<div className="shopItem_price">{price}</div>
					<button className="shopItem_button" onClick={() => handleAddProduct(id)}>
						ADD TO CART
					</button>
				</div>
			</div>
		</>
	)
}

export default React.memo(ProductItem)
