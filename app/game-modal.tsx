"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface GameModalProps {
  onClose: () => void
}

type ShotState = "aim" | "shooting" | "scored" | "missed"

export default function GameModal({ onClose }: GameModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [score, setScore] = useState(0)
  const [shots, setShots] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [shotState, setShotState] = useState<ShotState>("aim")
  const [ball, setBall] = useState({
    x: 400,
    y: 330,
    vx: 0,
    vy: 0,
    radius: 18,
    moving: false,
  })
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null)
  const [dragEnd, setDragEnd] = useState<{ x: number; y: number } | null>(null)
  const [message, setMessage] = useState<string>("Click and drag to aim your shot!")

  // Reset for next shot
  const resetBall = () => {
    setBall({
      x: 400,
      y: 330,
      vx: 0,
      vy: 0,
      radius: 18,
      moving: false,
    })
    setDragStart(null)
    setDragEnd(null)
    setShotState("aim")
    setMessage("Click and drag to aim your shot!")
  }

  // Draw the game
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = 800
    canvas.height = 400

    // Draw background
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // Sky
    const skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 0.6)
    skyGradient.addColorStop(0, "#87CEEB")
    skyGradient.addColorStop(1, "#98FB98")
    ctx.fillStyle = skyGradient
    ctx.fillRect(0, 0, canvas.width, canvas.height * 0.6)
    // Field
    const fieldGradient = ctx.createLinearGradient(0, canvas.height * 0.6, 0, canvas.height)
    fieldGradient.addColorStop(0, "#32CD32")
    fieldGradient.addColorStop(1, "#228B22")
    ctx.fillStyle = fieldGradient
    ctx.fillRect(0, canvas.height * 0.6, canvas.width, canvas.height * 0.4)

    // Draw goal post (front view, center top)
    const goalX = 300
    const goalY = 80
    const goalWidth = 200
    const goalHeight = 60
    // Goal net
    ctx.save()
    ctx.strokeStyle = "#bbb"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.rect(goalX, goalY, goalWidth, goalHeight)
    ctx.stroke()
    // Net lines
    ctx.lineWidth = 1
    for (let i = 1; i < 5; i++) {
      ctx.beginPath()
      ctx.moveTo(goalX, goalY + (goalHeight / 5) * i)
      ctx.lineTo(goalX + goalWidth, goalY + (goalHeight / 5) * i)
      ctx.stroke()
    }
    for (let i = 1; i < 5; i++) {
      ctx.beginPath()
      ctx.moveTo(goalX + (goalWidth / 5) * i, goalY)
      ctx.lineTo(goalX + (goalWidth / 5) * i, goalY + goalHeight)
      ctx.stroke()
    }
    ctx.restore()
    // Goal posts
    ctx.save()
    ctx.strokeStyle = "#fff"
    ctx.lineWidth = 8
    ctx.beginPath()
    ctx.moveTo(goalX, goalY + goalHeight)
    ctx.lineTo(goalX, goalY)
    ctx.lineTo(goalX + goalWidth, goalY)
    ctx.lineTo(goalX + goalWidth, goalY + goalHeight)
    ctx.stroke()
    ctx.restore()
    // Penalty spot
    ctx.save()
    ctx.fillStyle = "#fff"
    ctx.beginPath()
    ctx.arc(400, 270, 4, 0, 2 * Math.PI)
    ctx.fill()
    ctx.restore()

    // Draw ball
    ctx.save()
    ctx.shadowColor = "#222"
    ctx.shadowBlur = 8
    ctx.fillStyle = "#fff"
    ctx.beginPath()
    ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI)
    ctx.fill()
    ctx.restore()
    // Ball details
    ctx.strokeStyle = "#222"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI)
    ctx.stroke()
    // Draw swoosh/air trail if ball is moving
    if (ball.moving && (Math.abs(ball.vx) > 1 || Math.abs(ball.vy) > 1)) {
      const trailLength = 6
      for (let i = 1; i <= trailLength; i++) {
        const t = i / trailLength
        const tx = ball.x - ball.vx * 8 * t
        const ty = ball.y - ball.vy * 8 * t
        ctx.save()
        ctx.globalAlpha = 0.15 * (1 - t)
        ctx.beginPath()
        ctx.ellipse(tx, ty, ball.radius * (1 - t * 0.5), ball.radius * 0.7 * (1 - t * 0.5), 0, 0, 2 * Math.PI)
        ctx.fillStyle = "#bdbdbd"
        ctx.shadowColor = "#bdbdbd"
        ctx.shadowBlur = 10
        ctx.fill()
        ctx.restore()
      }
    }

    // Draw football (realistic hex/pent pattern)
    ctx.save()
    ctx.shadowColor = "#222"
    ctx.shadowBlur = 8
    // Ball base
    ctx.beginPath()
    ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI)
    ctx.fillStyle = "#fff"
    ctx.fill()
    ctx.restore()

    // Ball shading
    ctx.save()
    const grad = ctx.createRadialGradient(ball.x - 6, ball.y - 6, ball.radius * 0.2, ball.x, ball.y, ball.radius)
    grad.addColorStop(0, "#eee")
    grad.addColorStop(0.7, "#fff")
    grad.addColorStop(1, "#bbb")
    ctx.beginPath()
    ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI)
    ctx.fillStyle = grad
    ctx.globalAlpha = 0.7
    ctx.fill()
    ctx.restore()

    // Ball outline
    ctx.save()
    ctx.strokeStyle = "#222"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI)
    ctx.stroke()
    ctx.restore()

    // Draw pentagon/hexagon pattern (classic football)
    ctx.save()
    ctx.translate(ball.x, ball.y)
    ctx.rotate(Math.atan2(ball.vy, ball.vx) / 2)
    // Center pentagon (black)
    ctx.beginPath()
    for (let i = 0; i < 5; i++) {
      const angle = ((Math.PI * 2) / 5) * i - Math.PI / 2
      const px = Math.cos(angle) * (ball.radius * 0.55)
      const py = Math.sin(angle) * (ball.radius * 0.55)
      if (i === 0) ctx.moveTo(px, py)
      else ctx.lineTo(px, py)
    }
    ctx.closePath()
    ctx.fillStyle = "#222"
    ctx.globalAlpha = 0.85
    ctx.fill()
    ctx.globalAlpha = 1
    ctx.strokeStyle = "#222"
    ctx.lineWidth = 1.2
    ctx.stroke()
    // Surrounding hexagons (alternating black/white)
    for (let j = 0; j < 5; j++) {
      ctx.save()
      ctx.rotate(((Math.PI * 2) / 5) * j)
      ctx.beginPath()
      for (let i = 0; i < 6; i++) {
        const angle = ((Math.PI * 2) / 6) * i + Math.PI / 6
        const px = Math.cos(angle) * (ball.radius * 0.85)
        const py = Math.sin(angle) * (ball.radius * 0.85)
        if (i === 0) ctx.moveTo(px, py)
        else ctx.lineTo(px, py)
      }
      ctx.closePath()
      ctx.fillStyle = j % 2 === 0 ? "#fff" : "#222"
      ctx.globalAlpha = j % 2 === 0 ? 0.9 : 0.7
      ctx.fill()
      ctx.globalAlpha = 1
      ctx.strokeStyle = "#222"
      ctx.lineWidth = 1.1
      ctx.stroke()
      ctx.restore()
    }
    ctx.restore()

    // Draw message
    ctx.font = "20px Arial"
    ctx.fillStyle = "#222"
    ctx.textAlign = "center"
    ctx.fillText(message, canvas.width / 2, 60)
  }, [ball, dragStart, dragEnd, shotState, message])

  // Animate the ball
  useEffect(() => {
    if (!ball.moving) return
    let animationFrame: number
    const canvas = canvasRef.current
    if (!canvas) return
    // const ctx = canvas.getContext("2d")
    // if (!ctx) return

    const animate = () => {
      setBall((prev) => {
        let { x, y, vx, vy, radius } = prev
        x += vx
        y += vy
        // Friction
        vx *= 0.99
        vy *= 0.99

        // Goal area
        const goalX = 300
        const goalY = 80
        const goalWidth = 200
        const goalHeight = 60

        // If ball enters the goal area, "collect" it and stop at the back of the net
        if (
          x > goalX + radius &&
          x < goalX + goalWidth - radius &&
          y > goalY + radius &&
          y < goalY + goalHeight - radius
        ) {
          // Move ball to back of net and stop
          return {
            ...prev,
            x,
            y: goalY + goalHeight - radius - 2,
            vx: 0,
            vy: 0,
            moving: false,
          }
        }

        // Stop if slow or out of bounds
        if (
          (Math.abs(vx) < 0.5 && Math.abs(vy) < 0.5) ||
          x < 0 || x > 800 || y < 0 || y > 400
        ) {
          return { ...prev, vx: 0, vy: 0, moving: false }
        }
        return { ...prev, x, y, vx, vy }
      })
      animationFrame = requestAnimationFrame(animate)
    }
    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [ball.moving])

  // Check for goal or miss
  useEffect(() => {
    if (!ball.moving && shotState === "shooting") {
      // Goal area: inside goal post rectangle
      const goalX = 300
      const goalY = 80
      const goalWidth = 200
      const goalHeight = 60
      if (
        ball.x > goalX + ball.radius &&
        ball.x < goalX + goalWidth - ball.radius &&
        ball.y > goalY + ball.radius &&
        ball.y < goalY + goalHeight - ball.radius
      ) {
        setScore((s) => s + 1)
        setMessage("GOAL! 🎉 Click to shoot again.")
        setShotState("scored")
      } else {
        setMessage("Missed! 😢 Click to try again.")
        setShotState("missed")
      }
      setShots((s) => s + 1)
    }
  }, [ball.moving, shotState, ball.x, ball.y])

  // Mouse/touch events
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const getPos = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect()
      let x = 0, y = 0
      if ("touches" in e) {
        x = e.touches[0].clientX - rect.left
        y = e.touches[0].clientY - rect.top
      } else {
        x = e.clientX - rect.left
        y = e.clientY - rect.top
      }
      return { x: (x / rect.width) * canvas.width, y: (y / rect.height) * canvas.height }
    }

    const handleDown = (e: MouseEvent | TouchEvent) => {
      if (shotState === "aim") {
        setGameStarted(true)
        const pos = getPos(e)
        // Only allow drag from ball area
        const dist = Math.sqrt((pos.x - ball.x) ** 2 + (pos.y - ball.y) ** 2)
        if (dist < ball.radius + 10) {
          setDragStart(pos)
          setDragEnd(pos)
        }
      } else if (shotState === "scored" || shotState === "missed") {
        resetBall()
      }
    }
    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (dragStart) {
        const pos = getPos(e)
        setDragEnd(pos)
      }
    }
    const handleUp = (e: MouseEvent | TouchEvent) => {
      if (dragStart && dragEnd) {
        // Calculate velocity
        const dx = dragEnd.x - dragStart.x
        const dy = dragEnd.y - dragStart.y
        // Only allow shooting upwards, and from the ball position
        // The user should drag from the ball upwards toward the goal
        // Power is proportional to drag length, capped
        const dragVecX = dragEnd.x - ball.x
        const dragVecY = dragEnd.y - ball.y
        // Only allow drag that starts near the ball and ends above the ball
        if (dragVecY > -10) {
          setDragStart(null)
          setDragEnd(null)
          setMessage("Drag upwards from the ball to shoot!")
          return
        }
        const power = Math.min(Math.sqrt(dragVecX * dragVecX + dragVecY * dragVecY), 180)
        const angle = Math.atan2(dragVecY, dragVecX)
        // Set velocity so that the ball travels in the direction of the drag (from ball to dragEnd)
        // But invert so that dragging up shoots up
        const velocityScale = 0.18 // tweak for realism
        const vx = (dragVecX) * velocityScale
        const vy = (dragVecY) * velocityScale
        setBall((prev) => ({
          ...prev,
          vx,
          vy,
          moving: true,
        }))
        setShotState("shooting")
        setDragStart(null)
        setDragEnd(null)
        setMessage("Shooting...")
      }
    }

    canvas.addEventListener("mousedown", handleDown)
    canvas.addEventListener("mousemove", handleMove)
    canvas.addEventListener("mouseup", handleUp)
    canvas.addEventListener("touchstart", handleDown)
    canvas.addEventListener("touchmove", handleMove)
    canvas.addEventListener("touchend", handleUp)
    return () => {
      canvas.removeEventListener("mousedown", handleDown)
      canvas.removeEventListener("mousemove", handleMove)
      canvas.removeEventListener("mouseup", handleUp)
      canvas.removeEventListener("touchstart", handleDown)
      canvas.removeEventListener("touchmove", handleMove)
      canvas.removeEventListener("touchend", handleUp)
    }
    // eslint-disable-next-line
  }, [dragStart, dragEnd, shotState, ball])

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
          <h2 className="text-2xl font-bold">Penalty Shootout</h2>
          <Button variant="ghost" size="sm" onClick={onClose} className="p-2">
            <X className="w-5 h-5" />
          </Button>
        </div>
        <div className="relative bg-gray-100 rounded-lg overflow-hidden">
          <canvas
            ref={canvasRef}
            className="w-full h-auto max-w-full touch-none select-none"
            style={{ aspectRatio: "2/1", cursor: shotState === "aim" ? "crosshair" : "pointer" }}
          />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-6 gap-3">
          <div className="text-lg">
            Shots: <span className="font-bold">{shots}</span> | Goals: <span className="font-bold text-green-600">{score}</span>
          </div>
          <Button onClick={onClose} className="bg-black text-white hover:bg-gray-800">
            Exit Game
          </Button>
        </div>
        {score >= 5 && (
          <div className="mt-6 p-4 bg-green-100 border border-green-400 rounded text-green-800 text-center text-lg font-semibold">
            Congratulations! You scored 5 goals! 🎉<br />
            Use code <span className="font-mono bg-green-200 px-2 py-1 rounded">GOAL5</span> for $5 off your order.
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}
