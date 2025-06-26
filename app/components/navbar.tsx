"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { ShoppingCart, Target, Search, Menu, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useCartStore } from "@/lib/store"
import SearchBar from "./search-bar"
import CartDrawer from "./cart-drawer"

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { getTotalItems, openCart } = useCartStore()
  const totalItems = getTotalItems()

  // Smooth scroll helper
  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  return (
    <>
      <nav className="border-b border-gray-200 px-4 py-4 bg-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">GoalGear</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <button
              type="button"
              className="text-gray-600 hover:text-gray-900 transition-colors"
              onClick={() => scrollToSection("featured-products")}
            >
              Shop
            </button>
            <button
              type="button"
              className="text-gray-600 hover:text-gray-900 transition-colors"
              onClick={() => scrollToSection("our-story")}
            >
              About
            </button>
            
          </div>

          {/* Desktop Search */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <SearchBar />
          </div>

          <div className="flex items-center space-x-4">
            {/* Mobile Search Button */}
            <button className="md:hidden p-2">
              <Search className="w-5 h-5" />
            </button>

            {/* Cart Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openCart}
              className="relative p-2"
            >
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <Badge className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center p-0">
                  {totalItems}
                </Badge>
              )}
            </motion.button>

            {/* Mobile Menu Button */}
            <button className="lg:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-gray-200 mt-4 pt-4"
            >
              <div className="space-y-4">
                {/* Mobile Search */}
                <div className="md:hidden">
                  <SearchBar />
                </div>

                {/* Mobile Navigation Links */}
                <div className="space-y-2">
                  <Link
                    href="/"
                    className="block py-2 text-gray-600 hover:text-gray-900 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    href="/shop"
                    className="block py-2 text-gray-600 hover:text-gray-900 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Shop
                  </Link>
                  <Link
                    href="/about"
                    className="block py-2 text-gray-600 hover:text-gray-900 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    About
                  </Link>
                  <Link
                    href="/contact"
                    className="block py-2 text-gray-600 hover:text-gray-900 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Contact
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <CartDrawer />
    </>
  )
}
