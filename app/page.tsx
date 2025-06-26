"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { allProducts } from "@/lib/products"
import Navbar from "./components/navbar"
import Footer from "./components/footer"
import { useRef } from "react"
import { useRouter } from "next/navigation"

const featuredProducts = allProducts.slice(0, 6)

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

export default function HomePage() {
  const router = useRouter()
  const featuredRef = useRef<HTMLElement>(null)

  const scrollToFeatured = () => {
    const el = document.getElementById("featured-products")
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-green-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/HeroImage.jpg')`,
          }}
        ></div>

        <div className="relative max-w-7xl mx-auto px-4 py-24 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">Gear Up for Glory</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-200">
              Elevate your game with top-tier football equipment. From cleats to kits, we've got you covered.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-semibold"
                onClick={scrollToFeatured}
              >
                Shop Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section
        id="featured-products"
        ref={featuredRef}
        className="max-w-7xl mx-auto px-4 py-16"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
          <p className="text-gray-600 text-lg">Discover our most popular football gear</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product, index) => (
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
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-green-600">${product.price.toFixed(2)}</span>
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

      {/* Gamified Experience */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Gamified Experience</h2>
          </motion.div>

          <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-lg">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="bg-gradient-to-br from-green-800 to-green-600 rounded-2xl p-8 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-20"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mb-6">
                    <ArrowRight className="w-8 h-8 text-green-800" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Interactive Discount</h3>
                  <p className="text-green-100">Play our games for discounts!</p>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-bold">Unlock Rewards</h3>
                <p className="text-gray-600 text-lg">
                  Earn points with every purchase and unlock exclusive discounts and gear! Level up your fan status!
                </p>
                <Button
                  className="bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => router.push("/product/football")}
                >
                  Start Playing
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section
        id="our-story"
        className="max-w-7xl mx-auto px-4 py-16"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6"
        >
          <h2 className="text-3xl md:text-4xl font-bold">Our Story</h2>
          <p className="text-gray-600 text-lg max-w-4xl mx-auto leading-relaxed">
            At GoalGear, we're more than just a store; we're a community of football fanatics. Our mission is to equip
            players and fans alike with the finest gear, fostering a deeper connection to the beautiful game. We believe
            in quality, performance, and the unifying spirit of football.
          </p>
        </motion.div>
      </section>

      {/* Contact Us */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Contact Us</h2>
          <p className="text-gray-300 text-lg">
            Have questions or need assistance? Our dedicated team is here to help. Reach out and let's talk football!
          </p>
          <Button className="bg-white text-gray-900 hover:bg-gray-100">Get in Touch</Button>
        </div>
      </section>

      <Footer id="footer-contact" />
    </div>
  )
}

