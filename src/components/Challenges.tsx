import { motion } from 'framer-motion'
import SplitText from './SplitText'

const challenges = [
  {
    title: 'The Fracture',
    year: '2020',
    body:
      'A serious arm injury sustained playing football on concrete. Weeks away from school activities became a first lesson in patience and recovery.',
  },
  {
    title: 'A New Country',
    year: '2021',
    body:
      'Twenty-one days of managed quarantine followed by cultural adaptation in Birmingham — a new accent, a new climate, a new rhythm of the week.',
  },
  {
    title: 'Finding His Footing',
    year: '2022 — 2023',
    body:
      'Bullying and cultural tension in Year 9. Some classmates mocked his accent, clothing, and weight. English fluency grew rapidly; one steady friendship carried him through.',
  },
  {
    title: 'Rebuilding the Body',
    year: '2023 — 2025',
    body:
      'A disciplined diet and consistent exercise brought his weight from around 85 kg down to around 76 kg — small daily choices, held to over years.',
  },
]

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: 'easeOut' },
}

export function Challenges() {
  return (
    <section id="challenges" className="section-padding bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeInUp} className="mb-16">
          <span className="text-sm text-gray-500 tracking-widest uppercase">Chapter Four — Challenges</span>
          <div className="w-6 h-px bg-gray-600 mt-2" />
        </motion.div>

        <SplitText
          as="h2"
          text={"RESILIENCE,\nQUIETLY BUILT"}
          className="font-display text-[10vw] lg:text-section leading-none tracking-tight mb-12 lg:mb-20"
          splitType="chars"
          delay={30}
          duration={0.6}
          ease="power3.out"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.2}
          textAlign="left"
        />

        <motion.p
          {...fadeInUp}
          className="max-w-2xl text-base lg:text-lg text-gray-300 leading-relaxed mb-16 lg:mb-24"
        >
          Rather than deter him, these moments shaped his resilience. Through
          faith and self-discipline, he turned adversity into motivation —
          losing weight through healthy habits, improving academically, and
          later launching projects meant to support others walking a similar road.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {challenges.map((c, index) => (
            <motion.article
              key={c.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              className="border border-gray-800 p-8 lg:p-10 hover:border-gray-600 transition-colors"
            >
              <p className="text-xs text-gray-500 tracking-widest uppercase mb-4">
                {c.year}
              </p>
              <h3 className="text-2xl lg:text-3xl font-light text-white mb-4">
                {c.title}
              </h3>
              <p className="text-gray-400 leading-relaxed text-sm lg:text-base">
                {c.body}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
