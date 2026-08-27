import { motion } from 'framer-motion'

const links = [
  {
    label: 'Email',
    value: '20rajona@gmail.com',
    href: 'mailto:20rajona@gmail.com',
  },
  {
    label: 'GitHub',
    value: 'github.com/20RajonAdil',
    href: 'https://github.com/20RajonAdil',
  },
  {
    label: 'MAAR Quran',
    value: 'Open project',
    href: 'https://20rajonadil.github.io/MAAR.Quran/',
  },
  {
    label: 'MAAR NoFap',
    value: 'Open project',
    href: 'https://20rajonadil.github.io/MAARnofap/',
  },
  {
    label: 'MAAR LIFE',
    value: 'Open project',
    href: 'https://20rajonadil.github.io/MAAR-LIFE/',
  },
]

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: 'easeOut' },
}

export function Contact() {
  return (
    <section id="contact" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeInUp} className="mb-16">
          <span className="text-sm text-gray-500 tracking-widest uppercase">Final Chapter — Contact</span>
          <div className="w-6 h-px bg-gray-600 mt-2" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="font-display text-[12vw] lg:text-hero leading-none tracking-tight mb-8"
        >
          Get in touch
        </motion.h2>

        <motion.div {...fadeInUp} className="w-full h-px bg-gray-700 mb-12 lg:mb-16" />

        <motion.div {...fadeInUp} className="mb-12 lg:mb-16 max-w-2xl">
          <h3 className="text-xl md:text-2xl lg:text-3xl text-white font-light leading-tight mb-4">
            THE STORY<br />
            IS STILL<br />
            BEING WRITTEN
          </h3>
          <p className="text-sm text-gray-500 tracking-widest uppercase">
            Reach out by email or explore the MAAR projects
          </p>
        </motion.div>

        <div className="max-w-3xl">
          {links.map((link, index) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('mailto') ? undefined : '_blank'}
              rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="flex items-center justify-between border-t border-gray-800 py-5 md:py-6 group hover:bg-gray-900/30 transition-colors px-4 -mx-4"
            >
              <div>
                <p className="text-xs text-gray-500 tracking-widest uppercase mb-1">
                  {link.label}
                </p>
                <span className="text-lg lg:text-xl text-gray-200 group-hover:text-white transition-colors">
                  {link.value}
                </span>
              </div>
              <span className="text-gray-500 group-hover:text-white transition-colors text-xl">↗</span>
            </motion.a>
          ))}
          <div className="border-t border-gray-800" />
        </div>

        <motion.footer
          {...fadeInUp}
          className="mt-24 lg:mt-32 pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} MAAR Journey — The Biography of MD Adil Rajon.
          </p>
          <p className="text-xs text-gray-600 text-center max-w-sm">
            Accessibility: this site aims to meet WCAG 2.1 AA standards. Found a barrier? Email{' '}
            <a href="mailto:rajonadil@gmail.com" className="underline hover:text-gray-400">
              rajonadil@gmail.com
            </a>
            .
          </p>
          <p className="text-xs text-gray-600">
            Sylhet · Birmingham
          </p>
        </motion.footer>
      </div>
    </section>
  )
}
