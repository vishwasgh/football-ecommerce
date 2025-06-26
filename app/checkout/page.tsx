"use client"

import { useCartStore } from "@/lib/store"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

// Add productImages mapping for fallback
const productImages: Record<string, string> = {
  "Precision Cleats": "/footballcleats.jpg",
  "Team Jersey": "/teamjersey.jpg",
  "Football ProX": "/football2.jpg",
  "Performance Football Cleats": "/cleats.jpg",
  "Training Football": "/football1.jpg",
  "Football Gloves": "/gloves.jpg",
  "Goalkeeper Gloves": "/goalkeepergloves.jpg",
  "Football Shorts": "/shorts.jpg",
}

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCartStore()
  const [discountCode, setDiscountCode] = useState("")
  const [discountApplied, setDiscountApplied] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const router = useRouter()

  const subtotal = getTotalPrice()
  const discount = discountApplied ? 5 : 0
  const total = Math.max(0, subtotal - discount)

  const handleApplyDiscount = () => {
    if (discountCode.trim().toUpperCase() === "GOAL5") {
      setDiscountApplied(true)
    } else {
      setDiscountApplied(false)
      alert("Invalid discount code.")
    }
  }

  const handleCompleteOrder = () => {
    clearCart()
    setOrderComplete(true)
    setTimeout(() => router.push("/"), 2500)
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow text-center">
          <h2 className="text-2xl font-bold mb-4">Thank you for your order!</h2>
          <p className="text-lg">Your football gear is on its way. ⚽</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>
        {items.length === 0 ? (
          <div className="text-center text-gray-500">Your cart is empty.</div>
        ) : (
          <>
            <div className="mb-6 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center space-x-3">
                    <img
                      src={
                        productImages[item.name] ||
                        item.image ||
                        "/placeholder.svg"
                      }
                      alt={item.name}
                      className="w-12 h-12 object-contain bg-gray-100 rounded"
                      onError={e => {
                        (e.currentTarget as HTMLImageElement).src = "/placeholder.svg"
                      }}
                    />
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-gray-500">x{item.quantity}</div>
                    </div>
                  </div>
                  <div className="font-semibold">${(item.price * item.quantity).toFixed(2)}</div>
                </div>
              ))}
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-medium">Discount Code</label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={discountCode}
                  onChange={e => setDiscountCode(e.target.value)}
                  className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter code (e.g. GOAL5)"
                  disabled={discountApplied}
                />
                <Button onClick={handleApplyDiscount} disabled={discountApplied}>
                  {discountApplied ? "Applied" : "Apply"}
                </Button>
              </div>
              {discountApplied && (
                <div className="text-green-600 mt-2 text-sm font-semibold">$5 discount applied!</div>
              )}
            </div>
            <div className="mb-6 space-y-1 text-lg">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Discount:</span>
                <span className="text-green-600">-${discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-xl mt-2">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-3" onClick={handleCompleteOrder}>
              Complete Order
            </Button>
          </>
        )}
      </div>
    </div>
  )
}