"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { allProducts } from "@/lib/products"

const productImages: Record<string, string> = {
  "Precision Cleats": "/footballcleats.jpg",
  "Team Jersey": "/teamjersey.jpg",
  "Football ProX": "/football2.jpg",
  "Performance Football Cleats": "/cleats.jpg",
  "Training Football": "/football1.jpg",
  "Football Gloves": "/gloves.jpg",
  "Goalkeeper Gloves": "/goalkeepergloves.jpg",
  "Football Shorts": "/shorts.jpg",
  // Add more mappings as needed
}

interface RecommendedProductsProps {
  currentProductId?: string
}

export default function RecommendedProducts({ currentProductId }: RecommendedProductsProps) {
  // Filter out current product and show 3 random recommendations
  const recommendations = allProducts
    .filter((product) => product.id !== currentProductId)
    .slice(0, 3)

  return (
    <section className="max-w-7xl mx-auto px-4 py-16 bg-gray-50">
      <h2 className="text-3xl font-bold mb-12">You May Also Like</h2>

      <div className="grid md:grid-cols-3 gap-8">
        {recommendations.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Link href={`/product/${product.id}`}>
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 p-8">
                  <img
                    src={productImages[product.name] || product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-contain"
                    onError={e => {
                      (e.currentTarget as HTMLImageElement).src = "/placeholder.svg"
                    }}
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
