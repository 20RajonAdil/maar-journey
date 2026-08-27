import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Counter from './Counter'

// 20 August 2009
const BIRTH_MONTH = 7 // 0-indexed: August
const BIRTH_DAY = 20

interface BirthdayInfo {
  age: number
  progress: number // 0 (just had a birthday) -> 1 (birthday is today/about to happen)
  daysRemaining: number
  hoursRemaining: number
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

  const msRemaining = Math.max(nextBirthday.getTime() - now.getTime(), 0)
  const dayMs = 1000 * 60 * 60 * 24
  const daysRemaining = Math.floor(msRemaining / dayMs)
  const hoursRemaining = Math.floor((msRemaining % dayMs) / (1000 * 60 * 60))

  return { age, progress, daysRemaining, hoursRemaining }
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
 * A quiet, self-updating badge showing Adil's current age — the React Bits
 * "Counter" slot-machine digit roll (https://reactbits.dev/components/counter)
 * inside a thin ring that empties anticlockwise as the year runs from one
 * birthday (20 August) to the next, resetting the moment the next birthday
 * arrives. Below it, a live Days/Hours countdown to the next birthday uses
 * the same rolling-digit counter.
 */
export function BirthdayCounter() {
  const [info, setInfo] = useState<BirthdayInfo>(() => getBirthdayInfo(new Date()))

  useEffect(() => {
    const update = () => setInfo(getBirthdayInfo(new Date()))
    update()
    const interval = setInterval(update, 1000)
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
          <Counter
            value={info.age}
            fontSize={64}
            padding={2}
            gap={2}
            textColor="white"
            fontWeight={900}
            gradientHeight={0}
            gradientFrom="transparent"
            gradientTo="transparent"
            horizontalPadding={0}
          />
        </div>

        {info.daysRemaining === 0 && info.hoursRemaining === 0 ? (
          <span className="mt-8 text-xs text-gray-500 tracking-widest uppercase text-center">
            Happy birthday, Adil
          </span>
        ) : (
          <div className="mt-8 flex items-start gap-8">
            <div className="flex flex-col items-center">
              <Counter
                value={info.daysRemaining}
                places={[100, 10, 1]}
                fontSize={28}
                padding={2}
                gap={2}
                textColor="white"
                fontWeight={700}
                gradientHeight={0}
                gradientFrom="transparent"
                gradientTo="transparent"
                horizontalPadding={0}
              />
              <span className="mt-2 text-[10px] text-gray-500 tracking-[0.25em] uppercase">Days</span>
            </div>
            <div className="flex flex-col items-center">
              <Counter
                value={info.hoursRemaining}
                places={[10, 1]}
                fontSize={28}
                padding={2}
                gap={2}
                textColor="white"
                fontWeight={700}
                gradientHeight={0}
                gradientFrom="transparent"
                gradientTo="transparent"
                horizontalPadding={0}
              />
              <span className="mt-2 text-[10px] text-gray-500 tracking-[0.25em] uppercase">Hours</span>
            </div>
          </div>
        )}
        <span className="mt-4 text-[10px] text-gray-600 tracking-[0.25em] uppercase text-center">
          Until 20 August
        </span>
      </motion.div>
    </section>
  )
}
