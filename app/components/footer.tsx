"use client"

import { motion } from "framer-motion"
import { Twitter, Instagram, Facebook } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Footer() {
  return (
    <footer className="bg-gray-50 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Newsletter Signup */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Stay Updated</h3>
            <p className="text-gray-600">Get the latest news and special offers.</p>

            <div className="space-y-3">
              <Input type="email" placeholder="Email address" className="w-full" />
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button className="w-full bg-black text-white hover:bg-gray-800">Subscribe</Button>
              </motion.div>
            </div>

            <p className="text-sm text-gray-500">
              By signing up, you agree to our{" "}
              <a href="#" className="underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="underline">
                Privacy Policy
              </a>
              .
            </p>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Follow Us</h3>
            <div className="flex space-x-4">
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
              >
                <Twitter className="w-5 h-5 text-gray-600" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
              >
                <Instagram className="w-5 h-5 text-gray-600" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
              >
                <Facebook className="w-5 h-5 text-gray-600" />
              </motion.a>
            </div>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Legal</h3>
            <div className="space-y-2">
              <a href="#" className="block text-gray-600 hover:text-gray-900 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="block text-gray-600 hover:text-gray-900 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="block text-gray-600 hover:text-gray-900 transition-colors">
                Legal Information
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 text-center text-gray-500">
          <p>&copy; 2024 Your Football Brand. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
