"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { FileText, Settings, Star, Hand, Cloud, Circle, Target, Zap } from "lucide-react"

const tabs = [
  { id: "description", label: "Description", icon: FileText },
  { id: "specifications", label: "Specifications", icon: Settings },
  { id: "reviews", label: "Reviews", icon: Star },
]

export default function ProductTabs() {
  const [activeTab, setActiveTab] = useState("description")

  const renderContent = () => {
    switch (activeTab) {
      case "description":
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <p className="text-gray-700 text-lg leading-relaxed">
              The 'ProKick' football is engineered for peak performance, featuring a durable, weather-resistant outer
              shell and a precision-balanced core for superior flight and accuracy. Its textured surface ensures optimal
              grip, making it ideal for both practice and competitive play. Available in sizes 4 and 5, it meets
              official standards for weight and size, ensuring a professional-grade experience for players of all ages
              and skill levels.
            </p>

            <div>
              <h3 className="text-2xl font-bold mb-6">Features</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Hand className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Textured Surface</h4>
                    <p className="text-gray-600">Enhanced grip for better control</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Target className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Balanced Core</h4>
                    <p className="text-gray-600">Consistent flight and bounce</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Cloud className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Weather-Resistant</h4>
                    <p className="text-gray-600">Suitable for all weather conditions</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Settings className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Official Size & Weight</h4>
                    <p className="text-gray-600">Meets official size and weight standards</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Circle className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Size Options</h4>
                    <p className="text-gray-600">Available in sizes 4 and 5</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Zap className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Versatile Use</h4>
                    <p className="text-gray-600">Ideal for training and matches</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )
      case "specifications":
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Dimensions</h4>
                <div className="space-y-2 text-gray-600">
                  <p>Size 4: 25.6-26.0 cm circumference</p>
                  <p>Size 5: 27.0-28.0 cm circumference</p>
                  <p>Weight: 410-450 grams</p>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Materials</h4>
                <div className="space-y-2 text-gray-600">
                  <p>Outer Shell: Synthetic leather</p>
                  <p>Core: Rubber bladder</p>
                  <p>Lining: Cotton-polyester blend</p>
                </div>
              </div>
            </div>
          </motion.div>
        )
      case "reviews":
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="text-3xl font-bold">4.2</div>
              <div>
                <div className="flex items-center mb-1">
                  {[1, 2, 3, 4].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                  <Star className="w-5 h-5 text-gray-300" />
                </div>
                <p className="text-gray-600">Based on 123 reviews</p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                {
                  name: "Mike Johnson",
                  rating: 5,
                  comment: "Excellent quality football. Great grip and perfect weight distribution.",
                },
                { name: "Sarah Davis", rating: 4, comment: "Good value for money. My kids love playing with it." },
                {
                  name: "Tom Wilson",
                  rating: 4,
                  comment: "Durable and weather-resistant as advertised. Highly recommend!",
                },
              ].map((review, index) => (
                <div key={index} className="border-b border-gray-200 pb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-semibold">{review.name}</span>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )
      default:
        return null
    }
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="border-b border-gray-200 mb-8">
        <nav className="flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? "border-black text-black"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </nav>
      </div>

      <div className="min-h-[400px]">{renderContent()}</div>
    </section>
  )
}
