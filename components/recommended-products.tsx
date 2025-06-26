"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

const products = [
	{
		id: 1,
		name: "Performance Football Cleats",
		description: "High-performance cleats for maximum traction.",
		price: 120.0,
		image: "/photos/cleats.jpg",
	},
	{
		id: 2,
		name: "Training Football",
		description: "Durable football for practice sessions.",
		price: 25.0,
		image: "/photos/football.jpg",
	},
	{
		id: 3,
		name: "Football Gloves",
		description: "Enhanced grip for optimal performance.",
		price: 40.0,
		image: "/photos/gloves.jpg",
	},
]

export default function RecommendedProducts({
	currentProductId,
}: {
	currentProductId?: string
}) {
	// Filter out the current product if id is provided
	const filteredProducts = currentProductId
		? products.filter((p) => String(p.id) !== String(currentProductId))
		: products

	return (
		<section className="max-w-7xl mx-auto px-4 py-16 bg-gray-50">
			<h2 className="text-3xl font-bold mb-12">You May Also Like</h2>

			<div className="grid md:grid-cols-3 gap-8">
				{filteredProducts.map((product, index) => (
					<motion.div
						key={product.id}
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: index * 0.1 }}
						className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
					>
						<div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 p-8">
							<img
								src={product.image || "/placeholder.svg"}
								alt={product.name}
								className="w-full h-full object-contain"
							/>
						</div>

						<div className="p-6">
							<h3 className="text-xl font-bold mb-2">{product.name}</h3>
							<p className="text-gray-600 mb-4">{product.description}</p>
							<div className="flex items-center justify-between">
								<span className="text-2xl font-bold">
									${product.price.toFixed(2)}
								</span>
								<motion.div
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
								>
									<Button variant="outline">Add to Cart</Button>
								</motion.div>
							</div>
						</div>
					</motion.div>
				))}
			</div>
		</section>
	)
}
