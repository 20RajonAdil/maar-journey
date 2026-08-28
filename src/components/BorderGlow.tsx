// A from-scratch equivalent of React Bits Pro's BorderGlow
// (https://reactbits.dev/components/border-glow) — that component is part
// of their paid Pro tier, so this isn't a port of their source (which
// isn't publicly available); it's a recreation of the same described
// behaviour — a mesh-gradient border with a directional glow that tracks
// the cursor near the edges — built with framer-motion (already a
// dependency here), matching the same prop names/defaults.
import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion'

interface BorderGlowProps {
  children: React.ReactNode
  className?: string
  /** How close the pointer must be to the edge for the glow to appear (0-100). */
  edgeSensitivity?: number
  /** HSL values for the glow colour, as "H S L". */
  glowColor?: string
  /** Background colour of the card. */
  backgroundColor?: string
  /** Corner radius of the card in pixels. */
  borderRadius?: number
  /** How far the outer glow extends beyond the card in pixels. */
  glowRadius?: number
  /** Multiplier for glow opacity (0.1-3.0). */
  glowIntensity?: number
  /** Width of the directional glow cone, as a percentage (5-45). */
  coneSpread?: number
  /** Play a gentle fade/scale intro on mount. */
  animated?: boolean
  /** Three hex colours for the mesh-gradient border. */
  colors?: [string, string, string]
}

export function BorderGlow({
  children,
  className = '',
  edgeSensitivity = 30,
  glowColor = '40 80 80',
  backgroundColor = '#120F17',
  borderRadius = 28,
  glowRadius = 40,
  glowIntensity = 1.0,
  coneSpread = 25,
  animated = false,
  colors = ['#c084fc', '#f472b6', '#38bdf8'],
}: BorderGlowProps) {
  const ref = useRef<HTMLDivElement>(null)

  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const glowOpacity = useSpring(0, { stiffness: 200, damping: 30 })

  const glowX = useTransform(px, (v) => `${v * 100}%`)
  const glowY = useTransform(py, (v) => `${v * 100}%`)

  // Radius of the glow blob scales with both the configured glowRadius and
  // the cone spread — a wider cone reads as a broader, softer glow.
  const glowSize = Math.max(glowRadius * 2.2, 60) * (0.6 + coneSpread / 45)
  const glow = useMotionTemplate`radial-gradient(${glowSize}px ${glowSize}px at ${glowX} ${glowY}, hsl(${glowColor} / ${glowOpacity}), transparent 70%)`

  const borderGradient = `conic-gradient(${colors[0]}, ${colors[1]}, ${colors[2]}, ${colors[0]})`

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    px.set(Math.min(Math.max(x, 0), 1))
    py.set(Math.min(Math.max(y, 0), 1))

    // Distance (as a %) from the pointer to the nearest edge — the glow
    // only appears once the pointer gets within edgeSensitivity of one.
    const distanceToEdge = Math.min(x, 1 - x, y, 1 - y) * 100
    const proximity = Math.max(0, 1 - distanceToEdge / Math.max(edgeSensitivity, 1))
    glowOpacity.set(proximity * glowIntensity * 0.9)
  }

  const handlePointerLeave = () => {
    glowOpacity.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      initial={animated ? { opacity: 0, scale: 0.97 } : false}
      whileInView={animated ? { opacity: 1, scale: 1 } : undefined}
      viewport={animated ? { once: true, margin: '-60px' } : undefined}
      transition={animated ? { duration: 0.9, ease: 'easeOut' } : undefined}
      className={`relative ${className}`}
      style={{
        borderRadius,
        padding: 1,
        background: borderGradient,
      }}
    >
      <div
        className="relative overflow-hidden"
        style={{ borderRadius: Math.max(borderRadius - 1, 0), background: backgroundColor }}
      >
        {/* Cursor-tracking edge glow */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: glow }}
        />
        <div className="relative">{children}</div>
      </div>
    </motion.div>
  )
}
