import { useRef } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from 'framer-motion'

interface TiltFrameProps {
  children: React.ReactNode
  className?: string
  /** Maximum tilt in degrees. Kept subtle to match the site's restrained tone. */
  maxTilt?: number
  /** Scale applied to the frame on hover. */
  hoverScale?: number
  /** Frame backdrop shown while an image loads. Pass 'transparent' to omit it. */
  background?: string
  /**
   * Whether this frame owns the grayscale-to-colour reveal: hover on
   * desktop, tap-to-toggle on touch (since touch devices have no hover
   * state to trigger it). Set false where a parent already handles its
   * own reveal — e.g. the Gallery grid, whose thumbnails should open the
   * lightbox on a single tap rather than toggle colour first.
   */
  manageGrayscale?: boolean
}

/**
 * Wraps a photograph so it responds to the cursor with a gentle 3D tilt, a
 * light glare sweep, and a black-and-white-to-colour reveal — on desktop
 * that reveal happens on hover; on touch devices (which have no hover) a
 * single tap toggles it instead. Used as a drop-in replacement for the
 * plain image-frame <div> used throughout the site.
 */
export function TiltFrame({
  children,
  className = '',
  maxTilt = 8,
  hoverScale = 1.035,
  background = '#0a0a0a',
  manageGrayscale = true,
}: TiltFrameProps) {
  const ref = useRef<HTMLDivElement>(null)
  const revealed = useRef(false)

  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)

  const springConfig = { stiffness: 220, damping: 22, mass: 0.6 }
  const rotateX = useSpring(useTransform(py, [0, 1], [maxTilt, -maxTilt]), springConfig)
  const rotateY = useSpring(useTransform(px, [0, 1], [-maxTilt, maxTilt]), springConfig)
  const scale = useSpring(1, springConfig)
  const glareX = useTransform(px, [0, 1], ['0%', '100%'])
  const glareY = useTransform(py, [0, 1], ['0%', '100%'])
  const glareOpacity = useSpring(0, springConfig)

  // 1 = fully black-and-white, 0 = full colour.
  const grayscaleAmount = useSpring(manageGrayscale ? 1 : 0, {
    stiffness: 180,
    damping: 24,
  })
  const filter = useMotionTemplate`grayscale(${grayscaleAmount})`

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
    if (manageGrayscale) grayscaleAmount.set(0)
  }

  const handlePointerLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch') return
    px.set(0.5)
    py.set(0.5)
    scale.set(1)
    glareOpacity.set(0)
    if (manageGrayscale) grayscaleAmount.set(1)
  }

  // Touch devices have no hover state, so a tap toggles the reveal instead.
  const handleClick = () => {
    if (!manageGrayscale) return
    const isCoarsePointer =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(hover: none), (pointer: coarse)').matches
    if (!isCoarsePointer) return
    revealed.current = !revealed.current
    grayscaleAmount.set(revealed.current ? 0 : 1)
    scale.set(revealed.current ? hoverScale : 1)
  }

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
      className={`relative w-full overflow-hidden flex items-center justify-center [perspective:1200px] ${className}`}
      style={{ background }}
    >
      <motion.div
        style={{ rotateX, rotateY, scale, transformStyle: 'preserve-3d', filter }}
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
