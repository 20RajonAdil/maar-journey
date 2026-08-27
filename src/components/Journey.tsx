import { motion } from 'framer-motion'
import SplitText from './SplitText'
import { TiltFrame } from './TiltFrame'

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: 'easeOut' },
}

export function Journey() {
  return (
    <section id="journey" className="section-padding bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeInUp} className="mb-16">
          <span className="text-sm text-gray-500 tracking-widest uppercase">Chapter Two — Journey</span>
          <div className="w-6 h-px bg-gray-600 mt-2" />
        </motion.div>

        <SplitText
          as="h2"
          text={"SYLHET\nTO BIRMINGHAM"}
          className="font-display text-[10vw] lg:text-section leading-none tracking-tight mb-16 lg:mb-24"
          splitType="chars"
          delay={30}
          duration={0.6}
          ease="power3.out"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.2}
          textAlign="left"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 mb-24 lg:mb-32">
          <motion.div {...fadeInUp} className="flex items-center">
            <p className="text-base lg:text-lg text-gray-300 leading-relaxed">
              A family friend helped his parents obtain travel visas. In mid-2021
              his mother won a UK visa after a long application process, and the
              family began preparing to leave. On 30 July 2021, Adil boarded a
              Biman Bangladesh Airlines Boeing 787 from Sylhet to London — his
              first ever flight. He recalls the long journey, and the quiet
              wonder of seeing aircraft lined up at Heathrow for the first time.
            </p>
          </motion.div>

          <motion.div
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.2 }}
          >
            <figure>
              <TiltFrame>
                <img
                  draggable={false}
                  src="/images/uk-arrival.jpg"
                  alt="30 July 2021 — Sylhet → London Heathrow"
                  loading="lazy"
                  className="w-auto h-auto max-w-full max-h-[70vh] object-contain"
                />
              </TiltFrame>
              <figcaption className="mt-4 text-xs text-gray-500 tracking-widest uppercase">
                30 July 2021 — Sylhet → London Heathrow
              </figcaption>
            </figure>

          </motion.div>
        </div>

        {/* Quarantine pull-quote */}
        <motion.div {...fadeInUp} className="mb-24 lg:mb-32">
          <h3 className="font-display text-[8vw] lg:text-section leading-none tracking-tight text-gray-300">
            "TWENTY-ONE DAYS<br />
            AT THE <span className="text-white underline underline-offset-8">RADISSON BLU</span>,<br />
            HEATHROW —<br />
            A NEW COUNTRY,<br />
            WAITING OUTSIDE."
          </h3>
          <p className="mt-6 text-sm text-gray-500 tracking-widest uppercase">
            Managed quarantine · 31 July – 20 July 2021
          </p>
          <div className="mt-12 lg:mt-16">
            <figure>
              <TiltFrame>
                <img
                  draggable={false}
                  src="/images/radisson.jpg"
                  alt="Radisson Blu Edwardian — Heathrow, London"
                  loading="lazy"
                  className="w-auto h-auto max-w-full max-h-[70vh] object-contain"
                />
              </TiltFrame>
              <figcaption className="mt-4 text-xs text-gray-500 tracking-widest uppercase">
                Radisson Blu Edwardian — Heathrow, London
              </figcaption>
            </figure>
          </div>
        </motion.div>


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 mb-24 lg:mb-32">
          <motion.div {...fadeInUp}>
            <figure>
              <TiltFrame>
                <img
                  draggable={false}
                  src="/images/first-home.jpg"
                  alt="Handsworth — first home in Birmingham"
                  loading="lazy"
                  className="w-auto h-auto max-w-full max-h-[70vh] object-contain"
                />
              </TiltFrame>
              <figcaption className="mt-4 text-xs text-gray-500 tracking-widest uppercase">
                Handsworth — first home in Birmingham
              </figcaption>
            </figure>

          </motion.div>

          <motion.div
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.2 }}
            className="flex items-center"
          >
            <p className="text-base lg:text-lg text-gray-300 leading-relaxed">
              After quarantine, on 20 July 2021, Adil moved to Birmingham and
              settled with relatives in Handsworth. Small things stood out — UK
              car number plates used letters, not just digits. He enrolled at a
              local secondary school, and saw his first British secondary,
              Fortis Academy on Albert Road.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24">
          <motion.div {...fadeInUp} className="flex items-center lg:text-right">
            <p className="text-base lg:text-lg text-gray-300 leading-relaxed">
              After about a year in Handsworth, financial strain and housing
              issues moved the family to a flat in Aston in September 2022 —
              where he still lives. Cultural adaptation was ongoing: a new
              accent, a new climate, a new rhythm of the week. He kept going.
            </p>
          </motion.div>

          <motion.div
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.2 }}
          >
            <figure>
              <TiltFrame>
                <img
                  draggable={false}
                  src="/images/aston.jpg"
                  alt="Aston, Birmingham — September 2022"
                  loading="lazy"
                  className="w-auto h-auto max-w-full max-h-[70vh] object-contain"
                />
              </TiltFrame>
              <figcaption className="mt-4 text-xs text-gray-500 tracking-widest uppercase">
                Aston, Birmingham — September 2022
              </figcaption>
            </figure>

          </motion.div>
        </div>
      </div>
    </section>
  )
}
