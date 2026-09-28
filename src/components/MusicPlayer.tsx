import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Download, Navigation2, Pause, Play, RotateCw, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react'
import { SONG_CUES, type SongCue } from '@/lib/songCues'
import { SONG_KEYWORDS } from '@/lib/songKeywords'

const SRC = '/audio/maar-journey.mp3'
const TITLE = 'This is MAAR Journey'
const ARTIST = 'MD Adil Rajon'
const COVER = '/images/song-cover.png'
const BARS = 56

const fmt = (s: number) => {
  if (!isFinite(s) || s < 0) return '0:00'
  const m = Math.floor(s / 60)
  return `${m}:${Math.floor(s % 60).toString().padStart(2, '0')}`
}

/** Flip card (React Bits "Flip Card" style): cover on the front, song details on the back. */
function FlipCard({ playing }: { playing: boolean }) {
  const [flipped, setFlipped] = useState(false)
  return (
    <div
      className="group relative w-full max-w-[320px] aspect-square mx-auto cursor-pointer select-none"
      style={{ perspective: 1200 }}
      onClick={() => setFlipped((f) => !f)}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setFlipped((f) => !f)}
      role="button"
      tabIndex={0}
      aria-label="Flip song card"
    >
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        whileHover={{ rotateY: flipped ? 180 : 0, scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 90, damping: 16 }}
      >
        {/* front */}
        <div
          className="absolute inset-0 overflow-hidden rounded-2xl border border-white/15 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)]"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <img src={COVER} alt={`${TITLE} cover`} className="h-full w-full object-cover" draggable={false} />
          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/5" />
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4 bg-gradient-to-t from-black/70 to-transparent">
            <span className="text-[10px] tracking-[0.25em] uppercase text-white/70">{playing ? 'Now playing' : 'Tap to flip'}</span>
            <RotateCw className="h-3.5 w-3.5 text-white/60 transition-transform duration-700 group-hover:rotate-180" />
          </div>
        </div>
        {/* back */}
        <div
          className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-2xl border border-white/15 bg-white/[0.06] p-6 backdrop-blur-2xl"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div>
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/50">The song</span>
            <h3 className="mt-3 text-2xl font-bold tracking-tight text-white">{TITLE}</h3>
            <p className="mt-1 text-sm text-white/60">{ARTIST}</p>
          </div>
          <p className="text-sm italic leading-relaxed text-white/70">
            From Sylhet to Birmingham…<br />
            From a dream to a direction…<br />
            This isn't the end of the story.
          </p>
          <span className="text-[10px] tracking-[0.25em] uppercase text-white/40">MD ADIL RAJON</span>
        </div>
      </motion.div>
    </div>
  )
}

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const ctxRef = useRef<AudioContext | null>(null)
  const playingRef = useRef(false)
  const levelsRef = useRef<number[]>(Array(BARS).fill(0))

  const [playing, setPlaying] = useState(false)
  const [time, setTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.9)
  const [muted, setMuted] = useState(false)
  const [scrub, setScrub] = useState<number | null>(null)
  const [follow, setFollow] = useState(true)
  const followRef = useRef(true)
  const sectionRef = useRef<HTMLElement>(null)
  const lastCueRef = useRef(-1)
  const syncMode = typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('sync')
  const [cues, setCues] = useState<SongCue[]>(SONG_CUES)
  const cuesRef = useRef(cues)
  cuesRef.current = cues
  const [copied, setCopied] = useState(false)

  const cueIndexAt = (t: number) => {
    let idx = 0
    cuesRef.current.forEach((c, i) => {
      if (c.t <= t) idx = i
    })
    return idx
  }
  const activeCue = cues[cueIndexAt(time)]
  // The keyword being sung right now (shown under the cover for a few seconds).
  const kwIndex = SONG_KEYWORDS.reduce((acc, k, i) => (k.t <= time ? i : acc), -1)
  const activeKw = kwIndex >= 0 && time - SONG_KEYWORDS[kwIndex].t < 6 ? SONG_KEYWORDS[kwIndex] : null

  useEffect(() => {
    followRef.current = follow
  }, [follow])

  // If the visitor scrolls by hand, stop steering the page so we never fight them.
  useEffect(() => {
    const off = () => {
      cancelAnimationFrame(scrollRaf.current)
      setFollow(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End'].includes(e.key)) off()
    }
    window.addEventListener('wheel', off, { passive: true })
    window.addEventListener('touchmove', off, { passive: true })
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('wheel', off)
      window.removeEventListener('touchmove', off)
      window.removeEventListener('keydown', onKey)
    }
  }, [])

  const scrollRaf = useRef(0)

  /** Glide to a target that is re-measured every frame, so late image loads or animations can't knock it off course. */
  const glideTo = useCallback((getY: () => number) => {
    cancelAnimationFrame(scrollRaf.current)
    const start = window.scrollY
    const t0 = performance.now()
    const dur = Math.min(2400, Math.max(1000, Math.abs(getY() - start) * 0.25))
    const step = (now: number) => {
      const p = Math.min(1, (now - t0) / dur)
      const e = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2
      const target = getY()
      window.scrollTo({ top: start + (target - start) * e, behavior: 'instant' as ScrollBehavior })
      // after arriving, keep correcting for ~1.5s in case the layout shifts
      if (p < 1 || now - t0 < dur + 1500) scrollRaf.current = requestAnimationFrame(step)
    }
    scrollRaf.current = requestAnimationFrame(step)
  }, [])

  const goToCue = useCallback(
    (i: number) => {
      const cue = cuesRef.current[i]
      if (!cue) return
      const section = cue.id === 'music' ? sectionRef.current : document.getElementById(cue.id)
      if (!section) return
      const findTarget = (): HTMLElement => {
        if (!cue.find) return section
        const needle = cue.find.toLowerCase()
        let best: HTMLElement | null = null
        section.querySelectorAll<HTMLElement>('h1,h2,h3,h4,h5,p,span,li,div').forEach((el) => {
          const txt = (el.textContent || '').toLowerCase()
          if (txt.includes(needle) && (!best || txt.length < (best.textContent || '').length)) best = el
        })
        return best ?? section
      }
      const target = findTarget()
      glideTo(() => {
        const top = target.getBoundingClientRect().top + window.scrollY
        // sub-topics sit a little below the top so the heading and its content are both in view
        return Math.max(0, cue.find && target !== section ? top - window.innerHeight * 0.25 : top)
      })
    },
    [glideTo],
  )

  // Follow the song
  useEffect(() => {
    if (!playing || !follow) return
    const i = cueIndexAt(time)
    if (i !== lastCueRef.current) {
      lastCueRef.current = i
      goToCue(i)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time, playing, follow, goToCue])

  const setupAudioGraph = useCallback(() => {
    const el = audioRef.current
    if (!el || ctxRef.current) return
    try {
      const AC = window.AudioContext || (window as any).webkitAudioContext
      const ctx = new AC()
      const src = ctx.createMediaElementSource(el)
      const analyser = ctx.createAnalyser()
      analyser.fftSize = 256
      analyser.smoothingTimeConstant = 0.82
      src.connect(analyser)
      analyser.connect(ctx.destination)
      ctxRef.current = ctx
      analyserRef.current = analyser
    } catch {
      /* visualizer falls back to idle animation */
    }
  }, [])

  const toggle = useCallback(async () => {
    const el = audioRef.current
    if (!el) return
    setupAudioGraph()
    if (ctxRef.current?.state === 'suspended') await ctxRef.current.resume()
    if (el.paused) await el.play().catch(() => {})
    else el.pause()
  }, [setupAudioGraph])

  const skip = (s: number) => {
    const el = audioRef.current
    if (el) el.currentTime = Math.max(0, Math.min(el.duration || 0, el.currentTime + s))
  }

  useEffect(() => {
    const el = audioRef.current
    if (el) el.volume = muted ? 0 : volume
  }, [volume, muted])

  // Visualizer
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const g = canvas.getContext('2d')
    if (!g) return
    let raf = 0
    let t = 0
    const data = new Uint8Array(128)

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const { width, height } = canvas.getBoundingClientRect()
      canvas.width = width * dpr
      canvas.height = height * dpr
      g.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const draw = () => {
      raf = requestAnimationFrame(draw)
      t += 0.03
      const { width: w, height: h } = canvas.getBoundingClientRect()
      g.clearRect(0, 0, w, h)
      const an = analyserRef.current
      if (an && playingRef.current) an.getByteFrequencyData(data)
      const gap = 3
      const bw = (w - gap * (BARS - 1)) / BARS
      const grad = g.createLinearGradient(0, h, 0, 0)
      grad.addColorStop(0, 'rgba(255,255,255,0.15)')
      grad.addColorStop(1, 'rgba(255,255,255,0.95)')
      g.fillStyle = grad
      for (let i = 0; i < BARS; i++) {
        // mirror: bass in the centre, highs at the edges
        const d = Math.abs(i - (BARS - 1) / 2) / ((BARS - 1) / 2)
        const bin = Math.floor(d * 70) + 1
        let target: number
        if (an && playingRef.current) target = Math.pow(data[bin] / 255, 1.3)
        else target = 0.05 + 0.03 * Math.sin(t * 1.5 + i * 0.4)
        const lv = levelsRef.current
        lv[i] += (target - lv[i]) * (target > lv[i] ? 0.35 : 0.12)
        const bh = Math.max(3, lv[i] * h)
        const x = i * (bw + gap)
        const y = (h - bh) / 2
        g.beginPath()
        g.roundRect(x, y, bw, bh, bw / 2)
        g.fill()
      }
    }
    draw()
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [])

  const shown = scrub ?? time
  const pct = duration ? (shown / duration) * 100 : 0

  return (
    <section id="music" ref={sectionRef} className="relative py-16 md:py-24 px-6 overflow-hidden">
      {/* ambient glow from the cover */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[820px] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-[120px]"
        style={{ background: 'radial-gradient(closest-side, rgba(255,214,150,0.45), rgba(120,140,170,0.15), transparent)' }}
      />
      <motion.div
        initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto grid max-w-4xl items-center gap-8 rounded-[28px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl md:grid-cols-[320px_1fr] md:gap-12 md:p-10"
      >
        <motion.div
          initial={{ opacity: 0, x: -30, rotateY: -25 }}
          whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <FlipCard playing={playing} />
          <div className="mt-6 flex h-24 flex-col items-center justify-start text-center" aria-live="polite">
            <AnimatePresence mode="wait">
              {activeKw ? (
                <motion.div
                  key={`${activeKw.t}-${activeKw.word}`}
                  initial={{ opacity: 0, y: 14, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -10, filter: 'blur(8px)' }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center"
                >
                  <span className="text-[10px] uppercase tracking-[0.35em] text-white/45">{activeKw.tag}</span>
                  <span className="mt-1.5 bg-gradient-to-b from-white to-white/60 bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-4xl">
                    {activeKw.word}
                  </span>
                </motion.div>
              ) : (
                <motion.span
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.45 }}
                  exit={{ opacity: 0 }}
                  className="mt-3 text-[10px] uppercase tracking-[0.3em] text-white"
                >
                  {playing ? '· · ·' : 'Press play'}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <div className="flex min-w-0 flex-col">
          <span className="text-[10px] tracking-[0.35em] uppercase text-white/45">Original song</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl">{TITLE}</h2>
          <p className="mt-1 text-sm text-white/55">{ARTIST}</p>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                const next = !follow
                setFollow(next)
                if (next) {
                  lastCueRef.current = -1
                }
              }}
              aria-pressed={follow}
              className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[10px] uppercase tracking-[0.2em] backdrop-blur-xl transition ${
                follow ? 'border-white/40 bg-white/15 text-white' : 'border-white/15 bg-white/[0.04] text-white/50 hover:text-white'
              }`}
            >
              <Navigation2 className={`h-3 w-3 ${follow ? 'fill-current' : ''}`} />
              Follow the song {follow ? 'on' : 'off'}
            </button>
          </div>

          <canvas ref={canvasRef} className="mt-6 h-20 w-full" aria-hidden />

          {/* progress */}
          <div className="mt-4">
            <div className="relative h-5 w-full">
              <div className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-white/10" />
              <div className="absolute left-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-white" style={{ width: `${pct}%` }} />
              <div
                className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_14px_rgba(255,255,255,0.8)]"
                style={{ left: `${pct}%` }}
              />
              <input
                type="range"
                min={0}
                max={duration || 0}
                step={0.1}
                value={shown}
                aria-label="Seek"
                onChange={(e) => setScrub(parseFloat(e.target.value))}
                onPointerUp={() => {
                  if (scrub !== null && audioRef.current) audioRef.current.currentTime = scrub
                  setScrub(null)
                }}
                onKeyUp={() => {
                  if (scrub !== null && audioRef.current) audioRef.current.currentTime = scrub
                  setScrub(null)
                }}
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              />
            </div>
            <div className="mt-1 flex justify-between text-[11px] tabular-nums text-white/45">
              <span>{fmt(shown)}</span>
              <span>{fmt(duration)}</span>
            </div>
          </div>

          {/* controls */}
          <div className="mt-5 flex flex-wrap items-center gap-3 sm:gap-4">
            <button onClick={() => skip(-10)} aria-label="Back 10 seconds" className="rounded-full p-2 text-white/60 transition hover:text-white active:scale-90">
              <SkipBack className="h-5 w-5" />
            </button>
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              onClick={toggle}
              aria-label={playing ? 'Pause' : 'Play'}
              className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white text-black shadow-[0_0_40px_rgba(255,255,255,0.25)]"
            >
              {playing && <span className="absolute inset-0 animate-ping rounded-full bg-white/30" />}
              {playing ? <Pause className="relative h-6 w-6" fill="currentColor" /> : <Play className="relative ml-0.5 h-6 w-6" fill="currentColor" />}
            </motion.button>
            <button onClick={() => skip(10)} aria-label="Forward 10 seconds" className="rounded-full p-2 text-white/60 transition hover:text-white active:scale-90">
              <SkipForward className="h-5 w-5" />
            </button>

            <div className="ml-auto flex items-center gap-2">
              <button onClick={() => setMuted((m) => !m)} aria-label="Mute" className="text-white/60 transition hover:text-white">
                {muted || volume === 0 ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={muted ? 0 : volume}
                aria-label="Volume"
                onChange={(e) => {
                  setVolume(parseFloat(e.target.value))
                  setMuted(false)
                }}
                className="h-1 w-20 cursor-pointer appearance-none rounded-full bg-white/15 accent-white"
              />
            </div>
          </div>

          <a
            href={SRC}
            download={`${TITLE}.mp3`}
            className="group mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-white/80 backdrop-blur-xl transition hover:border-white/40 hover:bg-white/10 hover:text-white"
          >
            <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            Download song
          </a>
        </div>
      </motion.div>

      {syncMode && (
        <div className="relative mx-auto mt-6 max-w-4xl rounded-2xl border border-amber-300/30 bg-black/60 p-5 text-xs text-white/80 backdrop-blur-xl">
          <p className="mb-3 text-amber-200">
            Sync mode — play the song, and click <b>Set</b> next to a part the moment the song starts talking about it. Then press Copy and send it over.
          </p>
          <ul className="space-y-1.5">
            {cues.map((c, i) => (
              <li key={i} className="flex items-center gap-3">
                <span className="w-12 tabular-nums text-white/50">{fmt(c.t)}</span>
                <span className="flex-1 truncate">
                  <span className="text-white/40">#{c.id}</span> {c.label}
                </span>
                <button
                  className="rounded-full border border-white/20 px-3 py-1 hover:bg-white/10"
                  onClick={() => setCues((cs) => cs.map((x, j) => (j === i ? { ...x, t: Math.round((audioRef.current?.currentTime ?? 0) * 10) / 10 } : x)))}
                >
                  Set to now
                </button>
                <button className="rounded-full border border-white/20 px-3 py-1 hover:bg-white/10" onClick={() => { if (audioRef.current) audioRef.current.currentTime = c.t }}>
                  Go
                </button>
              </li>
            ))}
          </ul>
          <button
            className="mt-4 rounded-full bg-amber-200 px-4 py-2 font-medium text-black"
            onClick={() => {
              navigator.clipboard?.writeText(JSON.stringify(cues.map(({ t, id, keyword }) => ({ t, id, keyword })), null, 1))
              setCopied(true)
              setTimeout(() => setCopied(false), 2000)
            }}
          >
            {copied ? 'Copied!' : 'Copy timings'}
          </button>
        </div>
      )}

      <audio
        ref={audioRef}
        src={SRC}
        preload="metadata"
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onDurationChange={(e) => setDuration(e.currentTarget.duration)}
        onTimeUpdate={(e) => scrub === null && setTime(e.currentTarget.currentTime)}
        onPlay={() => {
          playingRef.current = true
          setPlaying(true)
          // pressing play (re)starts the guided tour, even if the visitor scrolled here by hand
          lastCueRef.current = -1
          setFollow(true)
        }}
        onPause={() => {
          playingRef.current = false
          setPlaying(false)
        }}
        onEnded={() => {
          playingRef.current = false
          setPlaying(false)
          setTime(0)
        }}
      />
    </section>
  )
}
