"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingCart, Star, Play, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getProductById } from "@/lib/products"
import { useCartStore } from "@/lib/store"
import Navbar from "../../components/navbar"
import GameModal from "../../game-modal"
import ProductTabs from "../../components/product-tabs"
import RecommendedProducts from "../../components/recommended-products"
import Footer from "../../components/footer"

interface ProductPageProps {
  params: {
    id: string
  }
}

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

export default function ProductPage({ params }: ProductPageProps) {
  const [isGameModalOpen, setIsGameModalOpen] = useState(false)
  const product = getProductById(params.id)
  const { addItem } = useCartStore()

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Link href="/">
            <Button>Return Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    addItem(product)
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
      </div>

      {/* Product Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">{product.name}</h1>

            <div className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</div>

            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${star <= Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <span className="text-gray-600">({product.reviewCount} reviews)</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button onClick={handleAddToCart} className="bg-black text-white hover:bg-gray-800 px-8 py-3 text-lg">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
              </motion.div>

              {product.hasGame && (
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    variant="outline"
                    className="px-8 py-3 text-lg border-2"
                    onClick={() => setIsGameModalOpen(true)}
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Try It
                  </Button>
                </motion.div>
              )}
            </div>

            <p className="text-gray-600 text-lg">{product.description}</p>
          </motion.div>

          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl p-8 lg:p-12">
              <img
                src={productImages[product.name] || product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-auto max-w-md mx-auto"
                onError={e => {
                  (e.currentTarget as HTMLImageElement).src = "/placeholder.svg"
                }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Product Tabs */}
      <ProductTabs productId={params.id} />

      {/* Recommended Products */}
      <RecommendedProducts currentProductId={params.id} />

      {/* Footer */}
      <Footer />

      {/* Game Modal */}
      <AnimatePresence>{isGameModalOpen && <GameModal onClose={() => setIsGameModalOpen(false)} />}</AnimatePresence>
    </div>
  )
}

