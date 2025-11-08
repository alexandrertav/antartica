"use client"

import { useEffect, useRef, useState } from "react"

export function LiquidMetalBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDaytime, setIsDaytime] = useState(false)

  useEffect(() => {
    const checkTime = () => {
      const hour = new Date().getHours()
      // Daytime is between 6 AM and 6 PM
      setIsDaytime(hour >= 6 && hour < 18)
    }

    checkTime()
    // Update every minute to catch time changes
    const interval = setInterval(checkTime, 60000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    interface Snowflake {
      x: number
      y: number
      radius: number
      speed: number
      drift: number
      opacity: number
    }

    interface AuroraWave {
      offset: number
      amplitude: number
      frequency: number
      speed: number
    }

    const snowflakes: Snowflake[] = []
    const numFlakes = 150

    for (let i = 0; i < numFlakes; i++) {
      snowflakes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.4 + 0.1,
        drift: Math.random() * 0.3 - 0.15,
        opacity: Math.random() * 0.5 + 0.3,
      })
    }

    const auroraWaves: AuroraWave[] = [
      { offset: 0, amplitude: 80, frequency: 0.002, speed: 0.0005 },
      { offset: 100, amplitude: 60, frequency: 0.003, speed: 0.0007 },
      { offset: 50, amplitude: 100, frequency: 0.0015, speed: 0.0003 },
    ]

    let time = 0
    let animationId: number

    const drawAntarcticScene = () => {
      time += 0.01

      const skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      if (isDaytime) {
        // Daytime: bright blue Antarctic sky
        skyGradient.addColorStop(0, "#4a7ba7")
        skyGradient.addColorStop(0.3, "#6ba3d4")
        skyGradient.addColorStop(0.6, "#87b8e0")
        skyGradient.addColorStop(1, "#a5d5f5")
      } else {
        // Nighttime: dark polar sky
        skyGradient.addColorStop(0, "#030b1a")
        skyGradient.addColorStop(0.3, "#0a1633")
        skyGradient.addColorStop(0.6, "#162744")
        skyGradient.addColorStop(1, "#1e3557")
      }
      ctx.fillStyle = skyGradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      if (!isDaytime) {
        auroraWaves.forEach((wave, index) => {
          const gradient = ctx.createLinearGradient(0, canvas.height * 0.2, 0, canvas.height * 0.5)

          if (index === 0) {
            // Bright lime-green aurora
            gradient.addColorStop(0, "rgba(180, 255, 100, 0.3)")
            gradient.addColorStop(0.5, "rgba(150, 240, 80, 0.2)")
            gradient.addColorStop(1, "rgba(120, 200, 60, 0)")
          } else if (index === 1) {
            // Purple/magenta aurora
            gradient.addColorStop(0, "rgba(200, 100, 255, 0.25)")
            gradient.addColorStop(0.5, "rgba(180, 80, 220, 0.15)")
            gradient.addColorStop(1, "rgba(160, 60, 180, 0)")
          } else {
            // Yellow-green aurora
            gradient.addColorStop(0, "rgba(220, 255, 100, 0.28)")
            gradient.addColorStop(0.5, "rgba(200, 240, 80, 0.18)")
            gradient.addColorStop(1, "rgba(180, 200, 60, 0)")
          }

          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.moveTo(0, canvas.height * 0.5)

          for (let x = 0; x <= canvas.width; x += 5) {
            const y =
              canvas.height * 0.2 +
              Math.sin(x * wave.frequency + time * wave.speed) * wave.amplitude +
              Math.sin(x * wave.frequency * 2 + time * wave.speed * 0.5) * (wave.amplitude * 0.3) +
              wave.offset
            ctx.lineTo(x, y)
          }

          ctx.lineTo(canvas.width, canvas.height * 0.5)
          ctx.closePath()
          ctx.fill()
        })
      }

      if (!isDaytime) {
        for (let i = 0; i < 400; i++) {
          const x = (Math.sin(i * 12.9898) * 0.5 + 0.5) * canvas.width
          const y = (Math.cos(i * 78.233) * 0.5 + 0.5) * canvas.height * 0.65

          const twinkle = (Math.sin(time * 2 + i) + 1) * 0.5
          const size = Math.random() * 1 + 0.3

          ctx.fillStyle = `rgba(255, 255, 255, ${twinkle * 0.7 + 0.2})`
          ctx.beginPath()
          ctx.arc(x, y, size, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      const drawIceberg = (x: number, baseWidth: number, height: number, peaks: { x: number; y: number }[], darkness: number) => {
        ctx.save()
        ctx.translate(x, canvas.height)

        const iceGradient = ctx.createLinearGradient(0, -height, 0, 0)
        if (isDaytime) {
          iceGradient.addColorStop(0, `rgba(250, 255, 255, ${0.98 - darkness})`)
          iceGradient.addColorStop(0.3, `rgba(235, 248, 255, ${0.95 - darkness})`)
          iceGradient.addColorStop(0.6, `rgba(220, 240, 252, ${0.92 - darkness})`)
          iceGradient.addColorStop(1, `rgba(205, 230, 248, ${0.88 - darkness})`)
        } else {
          iceGradient.addColorStop(0, `rgba(230, 245, 255, ${0.92 - darkness})`)
          iceGradient.addColorStop(0.3, `rgba(210, 235, 250, ${0.88 - darkness})`)
          iceGradient.addColorStop(0.6, `rgba(190, 220, 245, ${0.85 - darkness})`)
          iceGradient.addColorStop(1, `rgba(170, 205, 240, ${0.82 - darkness})`)
        }

        ctx.fillStyle = iceGradient
        ctx.beginPath()
        ctx.moveTo(-baseWidth / 2, 0)

        // Create irregular peaks and edges
        peaks.forEach((peak) => {
          ctx.lineTo(peak.x, peak.y)
        })

        ctx.lineTo(baseWidth / 2, 0)
        ctx.closePath()
        ctx.fill()

        // Add shadows and depth
        const shadowOpacity = isDaytime ? 0.15 : 0.25
        ctx.fillStyle = `rgba(80, 130, 170, ${shadowOpacity - darkness * 0.3})`
        ctx.beginPath()
        ctx.moveTo(0, -height * 0.3)
        peaks.slice(Math.floor(peaks.length / 2)).forEach((peak) => {
          ctx.lineTo(peak.x, peak.y)
        })
        ctx.lineTo(baseWidth / 2, 0)
        ctx.lineTo(-baseWidth / 2, 0)
        ctx.closePath()
        ctx.fill()

        // Ice texture details
        ctx.strokeStyle = isDaytime
          ? `rgba(200, 230, 245, ${0.3 - darkness * 0.2})`
          : `rgba(170, 210, 235, ${0.25 - darkness * 0.2})`
        ctx.lineWidth = 1
        for (let i = 0; i < 5; i++) {
          const startX = -baseWidth / 2 + (baseWidth / 5) * i
          const startY = -height * (0.2 + Math.random() * 0.3)
          const endY = startY + height * 0.3

          ctx.beginPath()
          ctx.moveTo(startX, startY)
          ctx.lineTo(startX + Math.random() * 20 - 10, endY)
          ctx.stroke()
        }

        ctx.restore()
      }

      // Tall spire iceberg
      drawIceberg(
        canvas.width * 0.12,
        80,
        180,
        [
          { x: -35, y: -50 },
          { x: -25, y: -100 },
          { x: -15, y: -150 },
          { x: -5, y: -180 },
          { x: 5, y: -175 },
          { x: 15, y: -140 },
          { x: 30, y: -80 },
          { x: 40, y: -30 },
        ],
        0.45,
      )

      // Wide flat iceberg
      drawIceberg(
        canvas.width * 0.35,
        160,
        100,
        [
          { x: -75, y: -40 },
          { x: -60, y: -80 },
          { x: -40, y: -95 },
          { x: -20, y: -100 },
          { x: 0, y: -98 },
          { x: 20, y: -95 },
          { x: 50, y: -75 },
          { x: 70, y: -50 },
          { x: 80, y: -20 },
        ],
        0.3,
      )

      // Jagged multi-peak iceberg
      drawIceberg(
        canvas.width * 0.62,
        120,
        150,
        [
          { x: -55, y: -35 },
          { x: -45, y: -70 },
          { x: -35, y: -55 },
          { x: -25, y: -90 },
          { x: -15, y: -120 },
          { x: -5, y: -100 },
          { x: 5, y: -135 },
          { x: 15, y: -150 },
          { x: 25, y: -130 },
          { x: 35, y: -100 },
          { x: 45, y: -70 },
          { x: 60, y: -40 },
        ],
        0.35,
      )

      // Small rounded iceberg
      drawIceberg(
        canvas.width * 0.85,
        70,
        90,
        [
          { x: -30, y: -30 },
          { x: -20, y: -60 },
          { x: -10, y: -80 },
          { x: 0, y: -90 },
          { x: 10, y: -85 },
          { x: 20, y: -65 },
          { x: 30, y: -35 },
          { x: 35, y: -15 },
        ],
        0.4,
      )

      const iceShelfGradient = ctx.createLinearGradient(0, canvas.height * 0.8, 0, canvas.height)
      if (isDaytime) {
        iceShelfGradient.addColorStop(0, "#f5faff")
        iceShelfGradient.addColorStop(0.2, "#e8f4fc")
        iceShelfGradient.addColorStop(0.5, "#dceef9")
        iceShelfGradient.addColorStop(0.8, "#cfe6f5")
        iceShelfGradient.addColorStop(1, "#c2dff2")
      } else {
        iceShelfGradient.addColorStop(0, "#c8e0f0")
        iceShelfGradient.addColorStop(0.2, "#b8d5e8")
        iceShelfGradient.addColorStop(0.5, "#a8cae0")
        iceShelfGradient.addColorStop(0.8, "#98bfd8")
        iceShelfGradient.addColorStop(1, "#88b4d0")
      }

      ctx.fillStyle = iceShelfGradient
      ctx.beginPath()
      ctx.moveTo(0, canvas.height * 0.83)

      // Static smooth ice surface
      for (let x = 0; x <= canvas.width; x += 10) {
        const bigWaves = Math.sin(x * 0.005) * 12
        const mediumWaves = Math.sin(x * 0.015) * 6
        const smallDetail = Math.sin(x * 0.04) * 2
        const y = canvas.height * 0.83 + bigWaves + mediumWaves + smallDetail
        ctx.lineTo(x, y)
      }

      ctx.lineTo(canvas.width, canvas.height)
      ctx.lineTo(0, canvas.height)
      ctx.closePath()
      ctx.fill()

      ctx.strokeStyle = isDaytime ? "rgba(180, 210, 230, 0.4)" : "rgba(130, 170, 200, 0.35)"
      ctx.lineWidth = 1.5
      for (let i = 0; i < 15; i++) {
        const x = (canvas.width / 16) * (i + 0.5)
        const bigWaves = Math.sin(x * 0.005) * 12
        const mediumWaves = Math.sin(x * 0.015) * 6
        const smallDetail = Math.sin(x * 0.04) * 2
        const startY = canvas.height * 0.83 + bigWaves + mediumWaves + smallDetail

        ctx.beginPath()
        ctx.moveTo(x, startY)
        ctx.lineTo(x + Math.sin(i * 2.5) * 4, startY + 15 + Math.cos(i * 1.8) * 10)
        ctx.lineTo(x + Math.sin(i * 3.2) * 6, startY + 30 + Math.cos(i * 2.1) * 15)
        ctx.stroke()
      }

      // Blue shadows in crevasses - also static
      ctx.strokeStyle = isDaytime ? "rgba(100, 160, 200, 0.25)" : "rgba(70, 120, 160, 0.2)"
      ctx.lineWidth = 1
      for (let i = 0; i < 20; i++) {
        const x = (canvas.width / 21) * (i + 0.5) + Math.sin(i * 2) * 10
        const bigWaves = Math.sin(x * 0.005) * 12
        const mediumWaves = Math.sin(x * 0.015) * 6
        const smallDetail = Math.sin(x * 0.04) * 2
        const startY = canvas.height * 0.83 + bigWaves + mediumWaves + smallDetail + 3

        ctx.beginPath()
        ctx.moveTo(x, startY)
        ctx.lineTo(x, startY + 8 + Math.sin(i * 1.3) * 4)
        ctx.stroke()
      }

      const oceanGradient = ctx.createLinearGradient(0, canvas.height * 0.8, 0, canvas.height * 0.85)
      if (isDaytime) {
        oceanGradient.addColorStop(0, "#2d5a7a")
        oceanGradient.addColorStop(1, "#1a3d57")
      } else {
        oceanGradient.addColorStop(0, "#1a2d45")
        oceanGradient.addColorStop(1, "#0f1e32")
      }
      ctx.fillStyle = oceanGradient
      ctx.beginPath()
      ctx.moveTo(0, canvas.height * 0.85)

      for (let x = 0; x <= canvas.width; x += 10) {
        const y = canvas.height * 0.82 + Math.sin(x * 0.01 + time * 0.5) * 2
        ctx.lineTo(x, y)
      }

      ctx.lineTo(canvas.width, canvas.height * 0.85)
      ctx.closePath()
      ctx.fill()

      // Ice chunks on water with better visibility
      const iceChunkColor = isDaytime ? "rgba(220, 235, 250, 0.7)" : "rgba(180, 210, 235, 0.5)"
      ctx.fillStyle = iceChunkColor
      for (let i = 0; i < 12; i++) {
        const x = (canvas.width / 12) * i + Math.sin(time + i) * 20
        const y = canvas.height * 0.82 + Math.sin(x * 0.01 + time * 0.5) * 2

        // Irregular ice chunk shapes
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(x + 12, y + 2)
        ctx.lineTo(x + 18, y + 1)
        ctx.lineTo(x + 15, y + 5)
        ctx.lineTo(x + 3, y + 6)
        ctx.closePath()
        ctx.fill()
      }

      snowflakes.forEach((flake) => {
        ctx.beginPath()
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`
        ctx.fill()

        flake.y += flake.speed
        flake.x += flake.drift

        if (flake.y > canvas.height) {
          flake.y = -10
          flake.x = Math.random() * canvas.width
        }
        if (flake.x > canvas.width) flake.x = 0
        if (flake.x < 0) flake.x = canvas.width
      })

      animationId = requestAnimationFrame(drawAntarcticScene)
    }

    drawAntarcticScene()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [isDaytime])

  return (
    <div className="absolute inset-0 -z-10">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}
