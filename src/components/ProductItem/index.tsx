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
			<div className="cartItem">
				<div className="cartItem_image" style={{ backgroundColor: color }}>
					<img alt={description} src={image} />
				</div>
				<div className="cartItem_name">{name}</div>
				<div className="cartItem_description">{description}</div>
				<div className="cartItem_bottom">
					<div className="cartItem_price">{price}</div>
					<button className="shopItem_button" onClick={() => handleAddProduct(id)}>
						ADD TO CART
					</button>
				</div>
			</div>
		</>
	)
}

export default ProductItem
