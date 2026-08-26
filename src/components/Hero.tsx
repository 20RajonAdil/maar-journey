import { motion } from 'framer-motion'
import { TiltFrame } from './TiltFrame'

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden flex items-end md:items-center">
      {/* Neutral cinematic background — no stock imagery */}
      <div className="absolute inset-0 w-full h-full">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 20% 30%, #1c1c1c 0%, #0a0a0a 45%, #050505 100%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              'linear-gradient(180deg, transparent 0%, transparent 60%, #000 100%)',
          }}
        />
        {/* Subtle grid line */}
        <div className="absolute left-6 md:left-16 top-1/3 bottom-1/4 w-px bg-white/10" />
        <div className="absolute top-6 md:top-16 right-6 md:right-16 text-[10px] tracking-[0.35em] text-white/40 uppercase">
          A Life · In Chapters
        </div>
      </div>

      <div className="relative z-10 w-full pb-24 md:pb-0 px-4 sm:px-6 md:px-12 lg:px-16">
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 md:gap-16 items-end md:items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <p className="mb-6 text-xs sm:text-sm tracking-[0.3em] text-white/60 uppercase">
              The Biography of
            </p>
            <h1 className="font-display leading-none tracking-tighter text-[15vw] sm:text-[12vw] md:text-hero">
              <span className="block text-white">MD Adil</span>
              <span className="block text-white">Rajon</span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.9 }}
              className="mt-8 md:mt-10 text-base sm:text-lg text-white/70 max-w-xl leading-relaxed"
            >
              British Bangladeshi student and self-taught web developer.
              A journey from Sylhet to Birmingham — shaped by faith, learning,
              and the quiet discipline of building things that matter.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.9 }}
              className="mt-6 text-xs tracking-[0.3em] text-white/40 uppercase"
            >
              MAAR Journey — Est. 2009 · Sylhet, Bangladesh
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1, ease: 'easeOut' }}
            className="hidden md:block w-[260px] lg:w-[320px]"
          >
            <TiltFrame>
              <img
                src="/images/profile.jpg"
                alt="MD Adil Rajon"
                className="w-auto h-auto max-w-full max-h-[70vh] object-contain grayscale hover:grayscale-0 transition-all duration-700"
              />
            </TiltFrame>
            <p className="mt-4 text-[10px] tracking-[0.25em] text-white/40 uppercase">
              Portrait · MD Adil Rajon
            </p>
          </motion.div>
        </div>
      </div>

    </section>
  )
}
