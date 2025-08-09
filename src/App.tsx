// components
import CarItem from './components/CartItem'
import ProductItem from './components/ProductItem'

// context
import { useCartContext } from './context/CartContext'

function App() {
	const { products, cart, totalPrice, totalItems } = useCartContext()

	return (
		<div className="mainContent">
			<div className="card">
				<div className="cardTop">
					<img alt="" src="https://cdn-icons-png.flaticon.com/512/732/732084.png" />
				</div>
				<div className="cardTitle">Our Products</div>
				<div className="cardBody">
					{products.map(product => (
						<ProductItem key={product.id} product={product} />
					))}
				</div>
			</div>

			{/* cart */}
			<div className="card">
				<div className="cardTop">
					<img alt="" src="https://cdn-icons-png.flaticon.com/512/732/732084.png" />
					<div>Total: {totalItems}</div>
				</div>

				<div className="cardTitle">
					<span>Your cart</span>
					<span className="card_amount">{totalPrice}</span>
				</div>
				<div className="cardBody">
					{cart.map(cart => (
						<CarItem key={cart.id} product={cart} />
					))}
				</div>
			</div>
		</div>
	)
}

export default App
