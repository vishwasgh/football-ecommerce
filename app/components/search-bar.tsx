"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { searchProducts } from "@/lib/products"
import type { Product } from "@/lib/store"

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

export default function SearchBar() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Product[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (query.trim()) {
      const searchResults = searchProducts(query)
      setResults(searchResults)
      setIsOpen(true)
    } else {
      setResults([])
      setIsOpen(false)
    }
  }, [query])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleClear = () => {
    setQuery("")
    setResults([])
    setIsOpen(false)
  }

  const handleResultClick = () => {
    setQuery("")
    setResults([])
    setIsOpen(false)
  }

  return (
    <div ref={searchRef} className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-10"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto"
          >
            <div className="p-2">
              {results.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  onClick={handleResultClick}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <img
                    src={productImages[product.name] || product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-16 h-16 object-contain bg-white rounded"
                    onError={e => {
                      (e.currentTarget as HTMLImageElement).src = "/placeholder.svg"
                    }}
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{product.name}</h4>
                    <p className="text-sm text-gray-500">${product.price.toFixed(2)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isOpen && results.length === 0 && query.trim() && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
        >
          <div className="p-4 text-center text-gray-500">No products found for "{query}"</div>
        </motion.div>
      )}
    </div>
  )
}
