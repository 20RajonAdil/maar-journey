import { motion } from 'framer-motion'
import SplitText from './SplitText'
import { TiltFrame } from './TiltFrame'

const technical = ['HTML', 'CSS', 'JavaScript', 'Basic Python', 'Video Editing', 'Git & GitHub']
const creative = ['Web Design', 'Drama', 'Prompt Engineering', 'Presentation', 'Communication']
const languages = [
  { name: 'Bengali', level: 'Native · Mother tongue' },
  { name: 'English', level: 'Fluent' },
  { name: 'Hindi', level: 'Conversational' },
  { name: 'Urdu', level: 'Conversational' },
]

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: 'easeOut' },
}

export function Skills() {
  return (
    <section id="skills" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeInUp} className="mb-16">
          <span className="text-sm text-gray-500 tracking-widest uppercase">Chapter Seven — Skills & Languages</span>
          <div className="w-6 h-px bg-gray-600 mt-2" />
        </motion.div>

        <SplitText
          as="h2"
          text={"A QUIET\nTOOLBOX"}
          className="font-display text-[10vw] lg:text-section leading-none tracking-tight mb-12 lg:mb-16"
          splitType="chars"
          delay={30}
          duration={0.6}
          ease="power3.out"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.2}
          textAlign="left"
        />

        <motion.figure {...fadeInUp} className="mb-16 lg:mb-24">
          <TiltFrame>
            <img
              draggable={false}
              src="/images/coding.jpg"
              alt="Beginning the programming journey"
              loading="lazy"
              className="w-auto h-auto max-w-full max-h-[70vh] object-contain"
            />
          </TiltFrame>
          <figcaption className="mt-4 text-xs text-gray-500 tracking-widest uppercase">
            Beginning the programming journey
          </figcaption>
        </motion.figure>


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-16 lg:mb-24">
          <motion.div
            {...fadeInUp}
            className="border border-gray-800 p-8 lg:p-10 hover:border-gray-600 transition-colors"
          >
            <p className="text-xs text-gray-500 tracking-widest uppercase mb-6">Technical</p>
            <ul className="space-y-3">
              {technical.map((s) => (
                <li key={s} className="text-lg text-white font-light">{s}</li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.1 }}
            className="border border-gray-800 p-8 lg:p-10 hover:border-gray-600 transition-colors"
          >
            <p className="text-xs text-gray-500 tracking-widest uppercase mb-6">Creative & Communication</p>
            <ul className="space-y-3">
              {creative.map((s) => (
                <li key={s} className="text-lg text-white font-light">{s}</li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.2 }}
            className="border border-gray-800 p-8 lg:p-10 hover:border-gray-600 transition-colors"
          >
            <p className="text-xs text-gray-500 tracking-widest uppercase mb-6">Languages</p>
            <ul className="space-y-4">
              {languages.map((l) => (
                <li key={l.name}>
                  <div className="text-lg text-white font-light">{l.name}</div>
                  <div className="text-sm text-gray-500">{l.level}</div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
