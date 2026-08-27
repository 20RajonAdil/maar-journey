import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SplitText from './SplitText'

interface Milestone {
  date: string
  title: string
  location: string
  detail: string
}

const milestones: Milestone[] = [
  {
    date: '20 August 2009 (est.)',
    title: 'Born in Sylhet',
    location: 'Sylhet, Bangladesh',
    detail: 'Born in the mid-2000s in Sylhet, Bangladesh, into a devout Muslim family.',
  },
  {
    date: '2017',
    title: 'British Citizenship by Descent',
    location: 'Sylhet, Bangladesh',
    detail: 'Received British citizenship through his father, a British citizen — a quiet inheritance that would later open a door across the world.',
  },
  {
    date: 'December 2020',
    title: 'Serious Arm Fracture',
    location: 'Sylhet, Bangladesh',
    detail: 'Broke his left elbow playing football on concrete. Weeks of recovery followed — an early lesson in patience.',
  },
  {
    date: '30 – 31 July 2021',
    title: 'Sylhet → London',
    location: 'London (Heathrow)',
    detail: 'First-ever flight — Biman Bangladesh Airlines Boeing 787. Began a 21-day managed quarantine at the Radisson Blu at Heathrow.',
  },
  {
    date: '21 August 2021',
    title: 'Moved to Birmingham',
    location: 'Handsworth, Birmingham',
    detail: 'Settled with relatives in Handsworth after quarantine. Enrolled in a local secondary school.',
  },
  {
    date: 'September 2022',
    title: 'Family Relocated to Aston',
    location: 'Aston, Birmingham',
    detail: 'The move came due to financial strain and housing issues. Adil still resides in Aston today.',
  },
  {
    date: '2022 — 2023',
    title: 'Year 9 — Finding His Footing',
    location: 'Birmingham, UK',
    detail: 'Faced bullying and cultural tension. Improved English rapidly. Formed a steady friendship that carried him through.',
  },
  {
    date: '2023 — 2025',
    title: 'Growth Years',
    location: 'Birmingham, UK',
    detail: 'Turned hardships into motivation. Lost weight from ~85 kg to ~76 kg, discovered coding, and built early websites.',
  },
  {
    date: '2024 — 2025',
    title: 'GCSE Results',
    location: 'Birmingham, UK',
    detail: 'Grade 8 in Bengali, Distinction 1 in Drama, Grade 4 in Food Science. Began tutoring in Maths and English.',
  },
  {
    date: '2024',
    title: 'Spiritual Awakening',
    location: 'Birmingham, UK',
    detail: 'Re-examined his faith deeply. Read parts of the Bible and Torah alongside Islam. By late 2024, described himself as a devout Muslim again.',
  },
  {
    date: '2025 — 2026',
    title: 'Launched the MAAR Websites',
    location: 'Birmingham, UK',
    detail: 'MAAR Quran, MAAR NoFap, and MAAR LIFE — personal projects focused on faith, self-discipline, and lifestyle journaling.',
  },
  {
    date: '2026',
    title: 'Continuing',
    location: 'Birmingham, UK',
    detail: 'Continuing studies and personal projects — the next chapters are still being written.',
  },
]

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: 'easeOut' },
}

export function Timeline() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="timeline" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeInUp} className="mb-16">
          <span className="text-sm text-gray-500 tracking-widest uppercase">Chapter Nine — Timeline</span>
          <div className="w-6 h-px bg-gray-600 mt-2" />
        </motion.div>

        <SplitText
          as="h2"
          text={"KEY\nEVENTS"}
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

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gray-800" aria-hidden />

          <ul className="space-y-0">
            {milestones.map((m, i) => {
              const isOpen = openIndex === i
              return (
                <motion.li
                  key={m.date + m.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6, delay: Math.min(i * 0.05, 0.4) }}
                  className="relative pl-12 md:pl-20 border-b border-gray-900"
                >
                  {/* Dot */}
                  <span
                    className={`absolute left-2 md:left-6 top-8 w-4 h-4 rounded-full border ${
                      isOpen ? 'bg-white border-white' : 'bg-background border-gray-600'
                    } transition-colors`}
                    aria-hidden
                  />

                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full text-left py-6 md:py-8 group"
                    aria-expanded={isOpen}
                  >
                    <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                      <div>
                        <p className="text-xs tracking-widest text-gray-500 uppercase mb-2">
                          {m.date}
                        </p>
                        <h3 className="text-xl md:text-2xl lg:text-3xl font-light text-white group-hover:text-gray-300 transition-colors">
                          {m.title}
                        </h3>
                      </div>
                      <span className="text-sm text-gray-500">{m.location}</span>
                    </div>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="detail"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <p className="mt-6 max-w-2xl text-gray-400 leading-relaxed text-sm lg:text-base">
                            {m.detail}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </motion.li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
