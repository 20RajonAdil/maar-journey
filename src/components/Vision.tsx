import { motion } from 'framer-motion'
import { TiltFrame } from './TiltFrame'

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: 'easeOut' },
}

export function Vision() {
  return (
    <section id="vision" className="section-padding bg-[#0d0d0d]">
      <div className="max-w-5xl mx-auto">
        <motion.div {...fadeInUp} className="mb-16">
          <span className="text-sm text-gray-500 tracking-widest uppercase">Chapter Ten — Values & Vision</span>
          <div className="w-6 h-px bg-gray-600 mt-2" />
        </motion.div>

        <motion.h2
          {...fadeInUp}
          className="font-display text-[10vw] lg:text-section leading-none tracking-tight mb-12 lg:mb-16"
        >
          FAITH ·<br />PERSEVERANCE ·<br />SERVICE
        </motion.h2>

        <motion.figure {...fadeInUp} className="mb-12 lg:mb-16">
          <TiltFrame>
            <img
              draggable={false}
              src="/images/future.jpg"
              alt="Vision for the future"
              loading="lazy"
              className="w-auto h-auto max-w-full max-h-[70vh] object-contain"
            />
          </TiltFrame>
          <figcaption className="mt-4 text-xs text-gray-500 tracking-widest uppercase">
            Vision for the future
          </figcaption>
        </motion.figure>


        <motion.p
          {...fadeInUp}
          className="text-lg lg:text-xl text-gray-300 leading-relaxed mb-8"
        >
          Faith is the cornerstone of his identity. He practises Islam devoutly —
          performing daily prayers and studying scripture — and has also drawn
          lessons from other traditions, having read parts of the Bible and Torah.
          Those readings reinforced his belief in universal values such as
          kindness and justice.
        </motion.p>

        <motion.p
          {...fadeInUp}
          transition={{ ...fadeInUp.transition, delay: 0.1 }}
          className="text-lg lg:text-xl text-gray-300 leading-relaxed mb-8"
        >
          He values education and growth — the very meaning he attaches to
          "MAAR" — and holds honesty, charity, and compassion as daily practice.
          His work, including MAAR NoFap, reflects a commitment to helping peers
          live healthier, purpose-driven lives.
        </motion.p>

        <motion.p
          {...fadeInUp}
          transition={{ ...fadeInUp.transition, delay: 0.2 }}
          className="text-lg lg:text-xl text-gray-300 leading-relaxed"
        >
          He believes in continuous self-improvement, and aims to inspire others
          by example. The rest of the chapters are still being written.
        </motion.p>
      </div>
    </section>
  )
}
