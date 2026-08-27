import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

// 20 August 2009
const BIRTH_MONTH = 7 // 0-indexed: August
const BIRTH_DAY = 20

interface BirthdayInfo {
  age: number
  progress: number // 0 (just had a birthday) -> 1 (birthday is today/about to happen)
  daysRemaining: number
}

function getBirthdayInfo(now: Date): BirthdayInfo {
  const hadBirthdayThisYear =
    now.getMonth() > BIRTH_MONTH ||
    (now.getMonth() === BIRTH_MONTH && now.getDate() >= BIRTH_DAY)

  const age = now.getFullYear() - 2009 - (hadBirthdayThisYear ? 0 : 1)

  const lastBirthdayYear = hadBirthdayThisYear ? now.getFullYear() : now.getFullYear() - 1
  const lastBirthday = new Date(lastBirthdayYear, BIRTH_MONTH, BIRTH_DAY)
  const nextBirthday = new Date(lastBirthdayYear + 1, BIRTH_MONTH, BIRTH_DAY)

  const totalMs = nextBirthday.getTime() - lastBirthday.getTime()
  const elapsedMs = now.getTime() - lastBirthday.getTime()
  const progress = Math.min(Math.max(elapsedMs / totalMs, 0), 1)

  const daysRemaining = Math.max(
    Math.ceil((nextBirthday.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)),
    0
  )

  return { age, progress, daysRemaining }
}

function DigitRoller({ digit, fontSize }: { digit: number; fontSize: number }) {
  const rowHeight = fontSize * 1.08
  return (
    <div
      className="relative overflow-hidden"
      style={{ height: rowHeight, width: fontSize * 0.66 }}
    >
      <motion.div
        animate={{ y: -digit * rowHeight }}
        transition={{ type: 'spring', stiffness: 170, damping: 24 }}
      >
        {Array.from({ length: 10 }, (_, i) => (
          <div
            key={i}
            className="font-display text-white flex items-center justify-center"
            style={{ height: rowHeight, fontSize, lineHeight: `${rowHeight}px` }}
          >
            {i}
          </div>
        ))}
      </motion.div>
    </div>
  )
}

function AgeNumber({ age, fontSize }: { age: number; fontSize: number }) {
  const digits = String(age).split('').map(Number)
  return (
    <div className="flex" style={{ gap: fontSize * 0.04 }}>
      {digits.map((d, i) => (
        <DigitRoller key={i} digit={d} fontSize={fontSize} />
      ))}
    </div>
  )
}

function ProgressRing({
  progress,
  size,
  strokeWidth = 2,
}: {
  progress: number
  size: number
  strokeWidth?: number
}) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const dashOffset = circumference * progress

  return (
    // Mirrored horizontally so the depletion reads anticlockwise, as requested,
    // instead of the SVG default of clockwise.
    <div className="absolute inset-0" style={{ transform: 'scaleX(-1)' }}>
      <svg width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="white"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={false}
          animate={{ strokeDashoffset: dashOffset }}
          transition={{ duration: 1, ease: 'easeOut' }}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
    </div>
  )
}

/**
 * A quiet, self-updating badge showing Adil's current age — an odometer-style
 * rolling digit inside a thin ring that empties anticlockwise as the year
 * runs from one birthday (20 August) to the next, resetting the moment the
 * next birthday arrives (the ring refills and the age ticks up automatically,
 * purely from the date — no manual update ever needed).
 */
export function BirthdayCounter() {
  const [info, setInfo] = useState<BirthdayInfo>(() => getBirthdayInfo(new Date()))

  useEffect(() => {
    const update = () => setInfo(getBirthdayInfo(new Date()))
    update()
    const interval = setInterval(update, 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const size = 176

  return (
    <section className="py-16 md:py-20 flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="flex flex-col items-center"
      >
        <span className="text-xs text-gray-500 tracking-[0.3em] uppercase mb-6">Age</span>

        <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
          <ProgressRing progress={info.progress} size={size} />
          <AgeNumber age={info.age} fontSize={64} />
        </div>

        <span className="mt-6 text-xs text-gray-500 tracking-widest uppercase text-center">
          {info.daysRemaining === 0
            ? 'Happy birthday, Adil'
            : `${info.daysRemaining} day${info.daysRemaining === 1 ? '' : 's'} until 20 August`}
        </span>
      </motion.div>
    </section>
  )
}
