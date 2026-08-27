// A framer-motion port of React Bits' SplitText
// (https://reactbits.dev/text-animations/split-text) — same per-character
// scroll-triggered reveal and the same prop surface, rebuilt on top of
// framer-motion (already a dependency here) instead of GSAP, so the site
// doesn't need to load a second animation library.
import { useMemo, useRef, useState } from 'react'
import { motion, useInView, type Easing } from 'framer-motion'

type SplitType = 'chars' | 'words' | 'lines'

interface SplitTextProps {
  text: string
  className?: string
  delay?: number // ms between each unit's animation start
  duration?: number // seconds
  ease?: string
  splitType?: SplitType
  from?: Record<string, number | string>
  to?: Record<string, number | string>
  threshold?: number
  rootMargin?: string
  textAlign?: React.CSSProperties['textAlign']
  onLetterAnimationComplete?: () => void
  as?: 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
}

// framer-motion doesn't know GSAP's named eases, so map the common ones to
// equivalent cubic-bezier curves; anything unrecognised falls back to
// 'easeOut', which is a safe default for a reveal animation.
const EASE_MAP: Record<string, Easing> = {
  'power1.out': 'easeOut',
  'power2.out': [0.25, 0.46, 0.45, 0.94],
  'power3.out': [0.16, 1, 0.3, 1],
  'power4.out': [0.11, 0.85, 0.24, 1],
  'back.out': [0.34, 1.56, 0.64, 1],
  'expo.out': [0.16, 1, 0.3, 1],
  'sine.out': [0.39, 0.575, 0.565, 1],
  linear: 'linear',
}

function resolveEase(ease?: string): Easing {
  if (!ease) return 'easeOut'
  return EASE_MAP[ease] ?? 'easeOut'
}

export default function SplitText({
  text,
  className = '',
  delay = 50,
  duration = 0.6,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '0px',
  textAlign = 'left',
  onLetterAnimationComplete,
  as = 'div',
}: SplitTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {
    once: true,
    amount: threshold,
    margin: rootMargin as unknown as `${number}px`,
  })
  const [completedCount, setCompletedCount] = useState(0)

  const lines = useMemo(() => text.split('\n'), [text])

  // Flat index across the whole block (spanning all lines) so the stagger
  // reads in natural order regardless of splitType.
  let globalIndex = 0
  const totalUnits = useMemo(() => {
    return lines.reduce((sum, line) => {
      if (splitType === 'lines') return sum + 1
      if (splitType === 'words') return sum + line.split(' ').filter(Boolean).length
      return sum + line.replace(/\s/g, '').length
    }, 0)
  }, [lines, splitType])

  const handleUnitComplete = () => {
    setCompletedCount((count) => {
      const next = count + 1
      if (next >= totalUnits) onLetterAnimationComplete?.()
      return next
    })
  }

  const MotionTag = motion[as as 'div']

  const renderUnit = (unit: string, key: string) => {
    const index = globalIndex
    globalIndex += 1
    const isLast = index === totalUnits - 1

    return (
      <motion.span
        key={key}
        className="inline-block"
        style={{ willChange: 'transform, opacity' }}
        initial={from}
        animate={inView ? to : from}
        transition={{
          duration,
          ease: resolveEase(ease),
          delay: (index * delay) / 1000,
        }}
        onAnimationComplete={isLast ? handleUnitComplete : undefined}
      >
        {unit === ' ' ? '\u00A0' : unit}
      </motion.span>
    )
  }

  return (
    <MotionTag
      ref={ref}
      className={className}
      style={{ textAlign, overflow: 'hidden' }}
    >
      {lines.map((line, lineIndex) => {
        const lineKey = `line-${lineIndex}`

        if (splitType === 'lines') {
          return (
            <span key={lineKey} className="block">
              {renderUnit(line, lineKey)}
            </span>
          )
        }

        if (splitType === 'words') {
          return (
            <span key={lineKey} className="block">
              {line.split(' ').map((word, i) => (
                <span key={`${lineKey}-w-${i}`} className="inline-block">
                  {renderUnit(word, `${lineKey}-w-${i}`)}
                  {i < line.split(' ').length - 1 && '\u00A0'}
                </span>
              ))}
            </span>
          )
        }

        // chars — grouped per word so words still wrap as a unit
        return (
          <span key={lineKey} className="block">
            {line.split(' ').map((word, wi, arr) => (
              <span key={`${lineKey}-w-${wi}`} className="inline-block whitespace-nowrap">
                {Array.from(word).map((char, ci) => renderUnit(char, `${lineKey}-w-${wi}-c-${ci}`))}
                {wi < arr.length - 1 && '\u00A0'}
              </span>
            ))}
          </span>
        )
      })}
    </MotionTag>
  )
}
