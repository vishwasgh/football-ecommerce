import type { Product } from "./store"

export const allProducts: Product[] = [
  {
    id: "football",
    name: "Football ProX",
    price: 29.99,
    rating: 4.2,
    reviewCount: 123,
    image: "/placeholder.svg?height=300&width=300",
    description: "Experience the thrill! Use the 'Try It' button for a unique gamified preview of the Football ProX.",
    hasGame: true,
    category: "balls",
  },
  {
    id: "cleats",
    name: "Precision Cleats",
    price: 120.0,
    rating: 4.5,
    reviewCount: 89,
    image: "/placeholder.svg?height=300&width=300",
    description: "High-performance cleats engineered for maximum traction and agility on the field.",
    hasGame: false,
    category: "footwear",
  },
  {
    id: "jersey",
    name: "Team Jersey",
    price: 65.0,
    rating: 4.3,
    reviewCount: 156,
    image: "/placeholder.svg?height=300&width=300",
    description: "Show your team pride with our authentic, moisture-wicking team jerseys.",
    hasGame: false,
    category: "apparel",
  },
  {
    id: "gloves",
    name: "Football Gloves",
    price: 40.0,
    rating: 4.4,
    reviewCount: 67,
    image: "/placeholder.svg?height=300&width=300",
    description: "Enhanced grip technology for optimal ball control in all weather conditions.",
    hasGame: false,
    category: "accessories",
  },
  {
    id: "training-ball",
    name: "Training Football",
    price: 25.0,
    rating: 4.1,
    reviewCount: 94,
    image: "/placeholder.svg?height=300&width=300",
    description: "Durable training ball designed to withstand intensive practice sessions.",
    hasGame: false,
    category: "balls",
  },
  {
    id: "goalkeeper-gloves",
    name: "Goalkeeper Gloves",
    price: 55.0,
    rating: 4.6,
    reviewCount: 43,
    image: "/placeholder.svg?height=300&width=300",
    description: "Professional-grade goalkeeper gloves with superior grip and protection.",
    hasGame: false,
    category: "accessories",
  },
  {
    id: "soccer-boots",
    name: "Elite Soccer Boots",
    price: 180.0,
    rating: 4.7,
    reviewCount: 201,
    image: "/placeholder.svg?height=300&width=300",
    description: "Professional-grade soccer boots for elite performance.",
    hasGame: false,
    category: "footwear",
  },
  {
    id: "shin-guards",
    name: "Protective Shin Guards",
    price: 35.0,
    rating: 4.2,
    reviewCount: 78,
    image: "/placeholder.svg?height=300&width=300",
    description: "Lightweight and durable shin guards for maximum protection.",
    hasGame: false,
    category: "accessories",
  },
]

export const getProductById = (id: string): Product | undefined => {
  return allProducts.find((product) => product.id === id)
}

export const searchProducts = (query: string): Product[] => {
  if (!query.trim()) return []

  const lowercaseQuery = query.toLowerCase()
  return allProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.category.toLowerCase().includes(lowercaseQuery),
  )
}
