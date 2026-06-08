'use client'

import { useEffect, useRef } from 'react'

export function AnimatedLinesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size to parent container
    const setCanvasSize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      
      canvas.width = parent.clientWidth
      canvas.height = parent.clientHeight
    }

    setCanvasSize()

    // Animation state
    let animationId: number
    let offset = 0

    // Grid configuration
    const gridSize = 60
    const diagonalSpacing = 40

    const animate = () => {
      // Clear canvas with background
      ctx.fillStyle = 'rgba(248, 249, 250, 1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Line styling
      ctx.strokeStyle = 'rgba(200, 200, 200, 0.25)'
      ctx.lineWidth = 1
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'

      // Draw vertical grid lines
      for (let x = -gridSize; x < canvas.width + gridSize; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      // Draw horizontal grid lines
      for (let y = -gridSize; y < canvas.height + gridSize; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Draw animated diagonal lines (walking effect)
      const animOffset = (offset * 1.5) % diagonalSpacing
      ctx.strokeStyle = 'rgba(255, 107, 53, 0.15)'
      ctx.lineWidth = 1.5

      // Diagonal lines moving from top-left to bottom-right
      for (let i = -canvas.height; i < canvas.width + canvas.height; i += diagonalSpacing) {
        const startX = i - animOffset
        const endX = startX + canvas.height

        ctx.beginPath()
        ctx.moveTo(startX, 0)
        ctx.lineTo(endX, canvas.height)
        ctx.stroke()

        // Secondary diagonal for seamless loop
        ctx.beginPath()
        ctx.moveTo(startX + diagonalSpacing, 0)
        ctx.lineTo(endX + diagonalSpacing, canvas.height)
        ctx.stroke()
      }

      // Draw opposite diagonal lines for grid texture
      ctx.strokeStyle = 'rgba(255, 107, 53, 0.08)'
      for (let i = -canvas.height; i < canvas.width + canvas.height; i += diagonalSpacing) {
        const startX = i + animOffset
        const endX = startX - canvas.height

        ctx.beginPath()
        ctx.moveTo(startX, 0)
        ctx.lineTo(endX, canvas.height)
        ctx.stroke()

        // Secondary diagonal for seamless loop
        ctx.beginPath()
        ctx.moveTo(startX + diagonalSpacing, 0)
        ctx.lineTo(endX + diagonalSpacing, canvas.height)
        ctx.stroke()
      }

      offset += 1
      animationId = requestAnimationFrame(animate)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      setCanvasSize()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}
