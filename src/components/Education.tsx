import { motion } from 'framer-motion'
import { TiltFrame } from './TiltFrame'

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: 'easeOut' },
}

export function Education() {
  return (
    <section id="education" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeInUp} className="mb-16">
          <span className="text-sm text-gray-500 tracking-widest uppercase">Chapter Three — Education</span>
          <div className="w-6 h-px bg-gray-600 mt-2" />
        </motion.div>

        <motion.h2
          {...fadeInUp}
          className="font-display text-[10vw] lg:text-section leading-none tracking-tight mb-16 lg:mb-24"
        >
          A STUDENT'S<br />ROAD
        </motion.h2>

        <div className="space-y-16 lg:space-y-24">
          {/* Iqra Madrasa */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24">
            <motion.div {...fadeInUp}>
              <figure>
              <TiltFrame>
                <img
                  draggable={false}
                  src="/images/iqra-madrasa.jpg"
                  alt="Iqra Bangladesh School and Madrasa — Sylhet"
                  loading="lazy"
                  className="w-auto h-auto max-w-full max-h-[70vh] object-contain grayscale hover:grayscale-0 transition-all duration-700"
                />
              </TiltFrame>
              <figcaption className="mt-4 text-xs text-gray-500 tracking-widest uppercase">
                Iqra Bangladesh School and Madrasa — Sylhet
              </figcaption>
            </figure>

            </motion.div>

            <motion.div
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: 0.2 }}
              className="flex items-center"
            >
              <div>
                <h3 className="text-xl lg:text-2xl font-light text-white mb-4">
                  Iqra Bangladesh School and Madrasa
                </h3>
                <p className="text-gray-400 leading-relaxed mb-4 text-sm lg:text-base">
                  Religious and general studies taught side by side. Ranked
                  first in class with Golden A+ in every subject.
                </p>
                <p className="text-sm text-gray-500">Early years — Sylhet, Bangladesh</p>
              </div>
            </motion.div>
          </div>

          {/* Fortis Academy */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24">
            <motion.div
              {...fadeInUp}
              className="flex items-center lg:order-2"
            >
              <div>
                <h3 className="text-xl lg:text-2xl font-light text-white mb-4">
                  Fortis Academy — Secondary Education
                </h3>
                <p className="text-gray-400 leading-relaxed mb-4 text-sm lg:text-base">
                  Enrolled around Year 8 shortly after arriving in the UK.
                  English fluency grew rapidly; academic focus deepened
                  across the following years.
                </p>
                <p className="text-sm text-gray-500">2021 onwards — Birmingham, UK</p>
              </div>
            </motion.div>

            <motion.div
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: 0.2 }}
              className="lg:order-1"
            >
              <figure>
              <TiltFrame>
                <img
                  draggable={false}
                  src="/images/fortis-academy.jpg"
                  alt="Fortis Academy — Albert Road, Birmingham"
                  loading="lazy"
                  className="w-auto h-auto max-w-full max-h-[70vh] object-contain grayscale hover:grayscale-0 transition-all duration-700"
                />
              </TiltFrame>
              <figcaption className="mt-4 text-xs text-gray-500 tracking-widest uppercase">
                Fortis Academy — Albert Road, Birmingham
              </figcaption>
            </figure>

            </motion.div>
          </div>

          {/* GCSE Achievements */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24">
            <motion.div {...fadeInUp}>
              <figure>
              <TiltFrame>
                <img
                  draggable={false}
                  src="/images/gcse-years.jpg"
                  alt="GCSE years — Years 10 & 11"
                  loading="lazy"
                  className="w-auto h-auto max-w-full max-h-[70vh] object-contain grayscale hover:grayscale-0 transition-all duration-700"
                />
              </TiltFrame>
              <figcaption className="mt-4 text-xs text-gray-500 tracking-widest uppercase">
                GCSE years — Years 10 & 11
              </figcaption>
            </figure>

            </motion.div>

            <motion.div
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: 0.2 }}
              className="flex items-center"
            >
              <div>
                <h3 className="text-xl lg:text-2xl font-light text-white mb-4">
                  GCSE Results
                </h3>
                <p className="text-gray-400 leading-relaxed mb-4 text-sm lg:text-base">
                  Grade 8 in Bengali, Distinction 1 in Drama, and Grade 4 in
                  Food Science. He struggled in Maths and English but has since
                  begun tutoring in those subjects — an ongoing chapter.
                </p>
                <p className="text-sm text-gray-500">2024 — 2025 · Birmingham, UK</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
