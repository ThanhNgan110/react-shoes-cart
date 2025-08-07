// components
import { Card } from './components/Card'
import CarItem from './components/CartItem'
import ProductItem from './components/ProductItem'

// context
import { useCartContext } from './context/CartContext'

function App() {
	const { products, cart } = useCartContext()

	return (
		<div className="mainContent">
			{/* Product */}
			<Card title="Our Products">
				<>
					{products.map(product => (
						<ProductItem product={product} key={product.id} />
					))}
				</>
			</Card>

			{/* Cart */}
			<Card title="Your cart" amount={'$89.97'} total={10}>
				<>
					{cart?.map(product => (
						<CarItem product={product} key={product.id} />
					))}
				</>
			</Card>
		</div>
	)
}

export default App
