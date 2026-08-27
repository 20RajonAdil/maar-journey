import { motion } from 'framer-motion'
import SplitText from './SplitText'

const achievements = [
  {
    category: 'Academic',
    items: [
      'Golden A+ in all subjects — Iqra Madrasa, Sylhet',
      'Ranked first in class during early school years',
      'GCSE Bengali — Grade 8',
      'GCSE Drama — Distinction 1',
      'GCSE Food Science — Grade 4',
    ],
  },
  {
    category: 'Projects',
    items: [
      'Creator of MAAR Quran',
      'Creator of MAAR NoFap',
      'Creator of MAAR LIFE',
      'Former YouTuber — channel grew to 2,000+ subscribers',
    ],
  },
  {
    category: 'Awards & Competitions',
    items: [
      'School-level Quran recitation champion',
      'District-level chess competitor',
      'Debate winner — Bangladeshi youth forum',
    ],
  },
]

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: 'easeOut' },
}

export function Achievements() {
  return (
    <section id="achievements" className="section-padding bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeInUp} className="mb-16">
          <span className="text-sm text-gray-500 tracking-widest uppercase">Chapter Eight — Achievements</span>
          <div className="w-6 h-px bg-gray-600 mt-2" />
        </motion.div>

        <SplitText
          as="h2"
          text={"MARKERS\nALONG THE WAY"}
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

        <div className="space-y-12 lg:space-y-16">
          {achievements.map((group, gIndex) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: gIndex * 0.1 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 border-t border-gray-800 pt-12 lg:pt-16"
            >
              <div className="lg:col-span-4">
                <p className="text-xs text-gray-500 tracking-widest uppercase mb-2">
                  {String(gIndex + 1).padStart(2, '0')}
                </p>
                <h3 className="font-display text-4xl md:text-5xl text-white tracking-tight">
                  {group.category}
                </h3>
              </div>
              <ul className="lg:col-span-8 space-y-4">
                {group.items.map((item) => (
                  <li key={item} className="text-lg text-gray-300 font-light border-b border-gray-900 pb-4">
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
