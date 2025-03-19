"use client"

import {
  useEffect,
  useState,
} from "react"

const CLOCK_CENTER_X = 90
const CLOCK_CENTER_Y = 90
const CLOCK_RADIUS = 70
const HOUR_HAND_LENGTH = 35
const MINUTE_HAND_LENGTH = 55
const SECOND_HAND_LENGTH = 60
const HOURS_IN_CLOCK = 12
const DEGREES_PER_HOUR = 30 // 360° ÷ 12
const DEGREES_PER_MINUTE = 6 // 360° ÷ 60
const DEGREES_PER_SECOND = 6 // 360° ÷ 60
const MINUTE_CONTRIBUTION_TO_HOUR = 0.5 // 시침은 1시간(60분)에 30도 이동, 따라서 1분당 시침의 이동 각도는 30° ÷ 60분 = 0.5°

const FRAME_START_X = 35
const FRAME_START_Y = 35
const FRAME_SIZE = 110

const GRID_START = 30
const GRID_END = 150

interface Indicator {
  x: number
  y: number
  key: number
}

export const Clock = () => {
  const [time, setTime] = useState<Date | null>(null)
  const [indicators, setIndicators] = useState<Indicator[]>([])

  useEffect(() => {
    setTime(new Date())

    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const points = [...Array(HOURS_IN_CLOCK)].map((_, i) => {
      const angle = (i * DEGREES_PER_HOUR) * Math.PI / 180
      const x = CLOCK_CENTER_X + CLOCK_RADIUS * Math.sin(angle)
      const y = CLOCK_CENTER_Y - CLOCK_RADIUS * Math.cos(angle)
      return { x, y, key: i }
    })

    setIndicators(points)
  }, [])

  if (!time) {
    return (
      <div className="flex justify-center">
        <svg width="180" height="180" viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg" className="text-zinc-800 dark:text-zinc-200">
          <rect x={FRAME_START_X} y={FRAME_START_Y} width={FRAME_SIZE} height={FRAME_SIZE} fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>
    )
  }

  const hours = time.getHours()
  const minutes = time.getMinutes()
  const seconds = time.getSeconds()
  const currentYear = time.getFullYear()

  const hourAngle = ((hours % HOURS_IN_CLOCK) * DEGREES_PER_HOUR + minutes * MINUTE_CONTRIBUTION_TO_HOUR) * Math.PI / 180
  const minuteAngle = (minutes * DEGREES_PER_MINUTE) * Math.PI / 180
  const secondAngle = (seconds * DEGREES_PER_SECOND) * Math.PI / 180

  const hourX = CLOCK_CENTER_X + HOUR_HAND_LENGTH * Math.sin(hourAngle)
  const hourY = CLOCK_CENTER_Y - HOUR_HAND_LENGTH * Math.cos(hourAngle)

  const minuteX = CLOCK_CENTER_X + MINUTE_HAND_LENGTH * Math.sin(minuteAngle)
  const minuteY = CLOCK_CENTER_Y - MINUTE_HAND_LENGTH * Math.cos(minuteAngle)

  const secondX = CLOCK_CENTER_X + SECOND_HAND_LENGTH * Math.sin(secondAngle)
  const secondY = CLOCK_CENTER_Y - SECOND_HAND_LENGTH * Math.cos(secondAngle)

  const formattedHours = hours < 10 ? `0${hours}` : hours
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes

  return (
    <div className="flex justify-center">
      <svg width="180" height="180" viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg" className="font-serif text-zinc-800 dark:text-zinc-200">
        {/* Grid */}
        <line x1={GRID_START} y1={CLOCK_CENTER_Y} x2={GRID_END} y2={CLOCK_CENTER_Y} stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 3" opacity="0.75" />
        <line x1={CLOCK_CENTER_X} y1={GRID_START} x2={CLOCK_CENTER_X} y2={GRID_END} stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 3" opacity="0.75" />

        {/* Clock Reference */}
        <text x={CLOCK_CENTER_X} y="25" textAnchor="middle" fontSize="10" fill="currentColor">
          T
        </text>
        <text x="155" y={CLOCK_CENTER_Y} textAnchor="middle" fontSize="10" fill="currentColor">
          3
        </text>
        <text x={CLOCK_CENTER_X} y="160" textAnchor="middle" fontSize="10" fill="currentColor">
          6
        </text>
        <text x="25" y={CLOCK_CENTER_Y} textAnchor="middle" fontSize="10" fill="currentColor">
          9
        </text>

        {/* Frame */}
        <rect x={FRAME_START_X} y={FRAME_START_Y} width={FRAME_SIZE} height={FRAME_SIZE} fill="none" stroke="currentColor" strokeWidth="1" />

        {/* Minute indicators */}
        {indicators.map((point) => (
          <circle key={point.key} cx={point.x} cy={point.y} r="1" fill="currentColor" />
        ))}

        {/* Hour Hand */}
        <line x1={CLOCK_CENTER_X} y1={CLOCK_CENTER_Y} x2={hourX} y2={hourY} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />

        {/* Minute Hand */}
        <line x1={CLOCK_CENTER_X} y1={CLOCK_CENTER_Y} x2={minuteX} y2={minuteY} stroke="currentColor" strokeWidth="1" strokeLinecap="round" />

        {/* Second Hand */}
        <line x1={CLOCK_CENTER_X} y1={CLOCK_CENTER_Y} x2={secondX} y2={secondY} stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" opacity="0.7" />

        {/* Center */}
        <circle cx={CLOCK_CENTER_X} cy={CLOCK_CENTER_Y} r="2" fill="currentColor" />

        {/* Time Label */}
        <text x="95" y="115" fontSize="12" fill="currentColor" letterSpacing="1">
          H{formattedHours}
        </text>
        <text x="95" y="130" fontSize="12" fill="currentColor" letterSpacing="1">
          M{formattedMinutes}
        </text>

        {/* Metadata */}
        <text x="40" y="180" fontSize="8" fill="currentColor" opacity="0.75">
          T_0
        </text>
        <text x="140" y="180" fontSize="8" fill="currentColor" opacity="0.75">
          {currentYear}
        </text>
      </svg>
    </div>
  )
}
