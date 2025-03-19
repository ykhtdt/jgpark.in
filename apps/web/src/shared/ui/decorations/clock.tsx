"use client"

import {
  useEffect,
  useState,
} from "react"

export function Clock() {
  const [time, setTime] = useState(new Date())
  const [indicators, setIndicators] = useState<Array<{ x: number; y: number; key: number }>>([])

  useEffect(() => {
    const points = [...Array(12)].map((_, i) => {
      const angle = (i * 30) * Math.PI / 180
      const x = 90 + 70 * Math.sin(angle)
      const y = 90 - 70 * Math.cos(angle)
      return { x, y, key: i }
    })

    setIndicators(points)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const hours = time.getHours()
  const minutes = time.getMinutes()
  const seconds = time.getSeconds()
  const currentYear = time.getFullYear()

  const hourAngle = ((hours % 12) * 30 + minutes * 0.5) * Math.PI / 180
  const minuteAngle = (minutes * 6) * Math.PI / 180
  const secondAngle = (seconds * 6) * Math.PI / 180

  const hourX = 90 + 35 * Math.sin(hourAngle)
  const hourY = 90 - 35 * Math.cos(hourAngle)

  const minuteX = 90 + 55 * Math.sin(minuteAngle)
  const minuteY = 90 - 55 * Math.cos(minuteAngle)

  const secondX = 90 + 60 * Math.sin(secondAngle)
  const secondY = 90 - 60 * Math.cos(secondAngle)

  const formattedHours = hours < 10 ? `0${hours}` : hours
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes

  return (
    <div className="flex justify-center mb-12">
      <svg width="180" height="180" viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg" className="text-zinc-800 dark:text-zinc-200">
        {/* Grid */}
        <line x1="30" y1="90" x2="150" y2="90" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 3" opacity="0.4" />
        <line x1="90" y1="30" x2="90" y2="150" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 3" opacity="0.4" />

        {/* Clock Reference */}
        <text x="90" y="25" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="currentColor">T</text>
        <text x="155" y="90" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="currentColor">3</text>
        <text x="90" y="160" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="currentColor">6</text>
        <text x="25" y="90" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="currentColor">9</text>

        {/* Minimal Frame */}
        <rect x="35" y="35" width="110" height="110" fill="none" stroke="currentColor" strokeWidth="1" />

        {/* Minute indicators */}
        {indicators.map((point) => (
          <circle key={point.key} cx={point.x} cy={point.y} r="1" fill="currentColor" />
        ))}

        {/* Hour Hand */}
        <line x1="90" y1="90" x2={hourX} y2={hourY} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />

        {/* Minute Hand */}
        <line x1="90" y1="90" x2={minuteX} y2={minuteY} stroke="currentColor" strokeWidth="1" strokeLinecap="round" />

        {/* Second Hand */}
        <line x1="90" y1="90" x2={secondX} y2={secondY} stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" opacity="0.7" />

        {/* Center */}
        <circle cx="90" cy="90" r="2" fill="currentColor" />

        {/* Time Label */}
        <text x="95" y="115" fontSize="12" fontFamily="monospace" fill="currentColor" letterSpacing="1">
          H{formattedHours}
        </text>
        <text x="95" y="130" fontSize="12" fontFamily="monospace" fill="currentColor" letterSpacing="1">
          M{formattedMinutes}
        </text>

        {/* Metadata */}
        <text x="40" y="180" fontSize="8" fontFamily="monospace" fill="currentColor" opacity="0.7">
          T_0
        </text>
        <text x="140" y="180" fontSize="8" fontFamily="monospace" fill="currentColor" opacity="0.7">
          {currentYear}
        </text>
      </svg>
    </div>
  )
}
