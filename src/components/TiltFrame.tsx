import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface TiltFrameProps {
  children: React.ReactNode
  className?: string
  /** Maximum tilt in degrees. Kept subtle to match the site's restrained tone. */
  maxTilt?: number
  /** Scale applied to the frame on hover. */
  hoverScale?: number
  /** Frame backdrop shown while an image loads. Pass 'transparent' to omit it. */
  background?: string
}

/**
 * Wraps a photograph so it responds to the cursor with a gentle 3D tilt and
 * a light glare sweep — the same interactive spirit as the site's existing
 * grayscale-to-colour hover, just with a bit of depth. Used as a drop-in
 * replacement for the plain image-frame <div> used throughout the site.
 * Disabled automatically on touch devices, where hover doesn't apply.
 */
export function TiltFrame({
  children,
  className = '',
  maxTilt = 8,
  hoverScale = 1.035,
  background = '#0a0a0a',
}: TiltFrameProps) {
  const ref = useRef<HTMLDivElement>(null)

  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)

  const springConfig = { stiffness: 220, damping: 22, mass: 0.6 }
  const rotateX = useSpring(useTransform(py, [0, 1], [maxTilt, -maxTilt]), springConfig)
  const rotateY = useSpring(useTransform(px, [0, 1], [-maxTilt, maxTilt]), springConfig)
  const scale = useSpring(1, springConfig)
  const glareX = useTransform(px, [0, 1], ['0%', '100%'])
  const glareY = useTransform(py, [0, 1], ['0%', '100%'])
  const glareOpacity = useSpring(0, springConfig)

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch') return
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    px.set((e.clientX - rect.left) / rect.width)
    py.set((e.clientY - rect.top) / rect.height)
  }

  const handlePointerEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch') return
    scale.set(hoverScale)
    glareOpacity.set(1)
  }

  const handlePointerLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch') return
    px.set(0.5)
    py.set(0.5)
    scale.set(1)
    glareOpacity.set(0)
  }

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className={`relative w-full overflow-hidden flex items-center justify-center [perspective:1200px] ${className}`}
      style={{ background }}
    >
      <motion.div
        style={{ rotateX, rotateY, scale, transformStyle: 'preserve-3d' }}
        className="relative w-full h-full flex items-center justify-center will-change-transform"
      >
        {children}
        <motion.div
          aria-hidden="true"
          style={{
            opacity: glareOpacity,
            background: useTransform(
              [glareX, glareY],
              ([gx, gy]: string[]) =>
                `radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.16), transparent 55%)`
            ),
          }}
          className="pointer-events-none absolute inset-0"
        />
      </motion.div>
    </div>
  )
}
