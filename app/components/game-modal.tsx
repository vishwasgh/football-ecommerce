"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface GameModalProps {
  onClose: () => void
}

export default function GameModal({ onClose }: GameModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [score, setScore] = useState(15)
  const [gameStarted, setGameStarted] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = 800
    canvas.height = 400

    const drawGame = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw sky gradient
      const skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 0.6)
      skyGradient.addColorStop(0, "#87CEEB")
      skyGradient.addColorStop(1, "#98FB98")
      ctx.fillStyle = skyGradient
      ctx.fillRect(0, 0, canvas.width, canvas.height * 0.6)

      // Draw trees (simplified)
      ctx.fillStyle = "#228B22"
      for (let i = 0; i < 15; i++) {
        const x = (i * canvas.width) / 14
        const height = 60 + Math.random() * 40
        ctx.beginPath()
        ctx.moveTo(x, canvas.height * 0.6)
        ctx.lineTo(x - 15, canvas.height * 0.6 - height)
        ctx.lineTo(x + 15, canvas.height * 0.6 - height)
        ctx.closePath()
        ctx.fill()
      }

      // Draw field
      const fieldGradient = ctx.createLinearGradient(0, canvas.height * 0.6, 0, canvas.height)
      fieldGradient.addColorStop(0, "#32CD32")
      fieldGradient.addColorStop(1, "#228B22")
      ctx.fillStyle = fieldGradient
      ctx.fillRect(0, canvas.height * 0.6, canvas.width, canvas.height * 0.4)

      // Draw field lines
      ctx.strokeStyle = "white"
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(0, canvas.height * 0.75)
      ctx.lineTo(canvas.width, canvas.height * 0.75)
      ctx.moveTo(0, canvas.height * 0.9)
      ctx.lineTo(canvas.width, canvas.height * 0.9)
      ctx.stroke()

      // Draw football
      const footballX = canvas.width / 2
      const footballY = canvas.height * 0.82

      ctx.fillStyle = "#8B4513"
      ctx.beginPath()
      ctx.ellipse(footballX, footballY, 20, 12, 0, 0, 2 * Math.PI)
      ctx.fill()

      // Football laces
      ctx.strokeStyle = "white"
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(footballX - 8, footballY)
      ctx.lineTo(footballX + 8, footballY)
      for (let i = -6; i <= 6; i += 3) {
        ctx.moveTo(footballX + i, footballY - 3)
        ctx.lineTo(footballX + i, footballY + 3)
      }
      ctx.stroke()

      // Draw play button if game not started
      if (!gameStarted) {
        ctx.fillStyle = "rgba(255, 255, 255, 0.9)"
        ctx.beginPath()
        ctx.arc(canvas.width / 2, canvas.height / 2, 40, 0, 2 * Math.PI)
        ctx.fill()

        ctx.fillStyle = "#333"
        ctx.beginPath()
        ctx.moveTo(canvas.width / 2 - 10, canvas.height / 2 - 15)
        ctx.lineTo(canvas.width / 2 + 15, canvas.height / 2)
        ctx.lineTo(canvas.width / 2 - 10, canvas.height / 2 + 15)
        ctx.closePath()
        ctx.fill()
      }
    }

    drawGame()

    const handleCanvasClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      // Scale coordinates to canvas size
      const canvasX = (x / rect.width) * canvas.width
      const canvasY = (y / rect.height) * canvas.height

      // Check if clicked on football area
      const footballX = canvas.width / 2
      const footballY = canvas.height * 0.82
      const distance = Math.sqrt((canvasX - footballX) ** 2 + (canvasY - footballY) ** 2)

      if (distance < 30) {
        setScore((prev) => prev + 5)
        setGameStarted(true)
      }
    }

    canvas.addEventListener("click", handleCanvasClick)

    return () => {
      canvas.removeEventListener("click", handleCanvasClick)
    }
  }, [gameStarted])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Football Challenge</h2>
          <Button variant="ghost" size="sm" onClick={onClose} className="p-2">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="relative bg-gray-100 rounded-lg overflow-hidden">
          <canvas ref={canvasRef} className="w-full h-auto max-w-full" style={{ aspectRatio: "2/1" }} />
          {!gameStarted && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white bg-black bg-opacity-50 p-4 rounded-lg">
                <p className="text-lg font-semibold mb-2">Kick the ball!</p>
                <p className="text-sm">Click on the football to start playing</p>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mt-6">
          <div className="text-lg">
            Score: <span className="font-bold text-blue-600">{score}</span>
          </div>
          <Button onClick={onClose} className="bg-black text-white hover:bg-gray-800">
            Exit Game
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )
}
