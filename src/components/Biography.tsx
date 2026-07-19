import { motion } from 'framer-motion'

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: 'easeOut' },
}

export function Biography() {
  return (
    <section id="biography" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeInUp} className="mb-16">
          <span className="text-sm text-gray-500 tracking-widest uppercase">Chapter One — Biography</span>
          <div className="w-6 h-px bg-gray-600 mt-2" />
        </motion.div>

        {/* Opening portrait + intro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 mb-24 lg:mb-32">
          <motion.div {...fadeInUp} className="order-2 lg:order-1">
            <figure>
              <div className="relative w-full overflow-hidden bg-[#0a0a0a] flex items-center justify-center">
                <img
                  src="/images/childhood.jpg"
                  alt="Sylhet, Bangladesh — Early years"
                  loading="lazy"
                  className="w-auto h-auto max-w-full max-h-[70vh] object-contain grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <figcaption className="mt-4 text-xs text-gray-500 tracking-widest uppercase">
                Sylhet, Bangladesh — Early years
              </figcaption>
            </figure>
          </motion.div>


          <motion.div
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.2 }}
            className="order-1 lg:order-2 flex items-center"
          >
            <div>
              <p className="text-base lg:text-lg text-gray-300 leading-relaxed">
                MD Adil Rajon was born in the mid-2000s in Sylhet, Bangladesh,
                and raised in a devout Muslim family. His father was already a
                British citizen, and under UK nationality law a child born abroad
                to a British parent normally obtains citizenship by descent —
                a quiet inheritance that would later open a door across the world.
              </p>
              <p className="mt-6 text-base lg:text-lg text-gray-300 leading-relaxed">
                He is British Bangladeshi, a student, and a self-taught web
                developer. His story is not one of overnight arrival, but of a
                slow, disciplined becoming.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Growing up in Sylhet — full-width */}
        <motion.div {...fadeInUp} className="mb-24 lg:mb-32">
          <figure>
              <div className="relative w-full overflow-hidden bg-[#0a0a0a] flex items-center justify-center">
                <img
                  src="/images/bangladesh.jpg"
                  alt="Growing up in Sylhet, Bangladesh"
                  loading="lazy"
                  className="w-auto h-auto max-w-full max-h-[70vh] object-contain grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <figcaption className="mt-4 text-xs text-gray-500 tracking-widest uppercase">
                Growing up in Sylhet, Bangladesh
              </figcaption>
            </figure>
        </motion.div>


        {/* Early Life headline block */}
        <motion.div {...fadeInUp} className="mb-24 lg:mb-32">
          <h2 className="font-display text-[8vw] lg:text-section leading-none tracking-tight text-gray-300">
            "AN OUTSTANDING<br />
            <span className="text-white underline underline-offset-8">STUDENT</span> AT THE<br />
            IQRA MADRASA —<br />
            GOLDEN A+ IN EVERY SUBJECT."
          </h2>
          <p className="mt-6 text-sm text-gray-500 tracking-widest uppercase">
            Iqra Bangladesh School and Madrasa · Sylhet
          </p>
        </motion.div>

        {/* Second block — Madrasa */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 mb-24 lg:mb-32">
          <motion.div {...fadeInUp} className="flex items-center lg:text-right">
            <p className="text-base lg:text-lg text-gray-300 leading-relaxed">
              He attended the Iqra Bangladesh School and Madrasa in Sylhet,
              where religious and general education were taught side by side.
              In his early years he scored top grades — Golden A+ in each
              subject — and ranked first in his class. During those years he
              also quietly navigated personal fears and a strict household,
              but he kept his focus on his studies.
            </p>
          </motion.div>

          <motion.div
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.2 }}
          >
            <figure>
              <div className="relative w-full overflow-hidden bg-[#0a0a0a] flex items-center justify-center">
                <img
                  src="/images/family.jpg"
                  alt="Iqra Madrasa — Sylhet"
                  loading="lazy"
                  className="w-auto h-auto max-w-full max-h-[70vh] object-contain grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <figcaption className="mt-4 text-xs text-gray-500 tracking-widest uppercase">
               Family Picture — Birmingham
              </figcaption>
            </figure>

          </motion.div>
        </div>

        {/* Third block — Injury */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24">
          <motion.div {...fadeInUp}>
            <figure>
              <div className="relative w-full overflow-hidden bg-[#0a0a0a] flex items-center justify-center">
                <img
                  src="/images/arm-fracture.jpg"
                  alt="December 2020 — A fracture, a pause"
                  loading="lazy"
                  className="w-auto h-auto max-w-full max-h-[70vh] object-contain grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <figcaption className="mt-4 text-xs text-gray-500 tracking-widest uppercase">
                December 2020 — A fracture, a pause
              </figcaption>
            </figure>

          </motion.div>

          <motion.div
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.2 }}
            className="flex items-center"
          >
            <p className="text-base lg:text-lg text-gray-300 leading-relaxed">
              In December 2020, aged around fifteen, Adil broke his left elbow
              playing football on concrete. It was first treated with massage;
              doctors later confirmed a serious fracture that required
              bandaging and physical therapy. For several weeks he stepped away
              from school activities — an early lesson in patience, and in the
              body's honest way of telling the truth.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
