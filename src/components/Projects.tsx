import { motion } from 'framer-motion'

const projects = [
  {
  name: 'MAAR',
  tag: '2026',
  purpose: 'A premium web design and development studio for modern businesses.',
  description:
    'MAAR is a creative digital studio focused on designing fast, elegant, and conversion-driven websites. From strategy and branding to development and SEO, it helps businesses build a professional online presence with a timeless, premium experience.',
  audience: 'Startups, small businesses, creators, and organisations seeking high-quality websites.',
  href: 'https://maar-five.vercel.app/',
},
  {
    name: 'MAAR Quran',
    tag: '2025 — 2026',
    purpose: 'Quranic education — recitations, tafsir, and learning tips.',
    description:
      'A quiet resource for young Muslims learning the Quran. The site offers a Surah index, audio recitations, translations, and reflections designed to make learning approachable.',
    audience: 'Muslims learning the Quran — youth',
    href: 'https://20rajonadil.github.io/MAAR.Quran/',
  },
  {
    name: 'MAAR NoFap',
    tag: '2025 — 2026',
    purpose: 'Support for self-discipline and recovery from pornography addiction.',
    description:
      'Articles on the NoFap journey, a personal journey blog, resource links, and community-oriented pages — written to help young men (14–25) build self-discipline.',
    audience: 'Young men facing porn addiction',
    href: 'https://20rajonadil.github.io/MAARnofap/',
  },
  {
    name: 'MAAR LIFE',
    tag: '2025 — 2026',
    purpose: 'Personal growth and journaling — habits, goals, reflections.',
    description:
      '"A garden of habits, a map of dreams." Blog entries on habits, goal-setting tools, an About page, and a newsletter — a general-audience space for students and young professionals.',
    audience: 'General audience — students, young professionals',
    href: 'https://20rajonadil.github.io/MAAR-LIFE/',
  },
{
  name: 'MAAR QR',
  tag: '2025 — 2026',
  purpose: 'A modern, fast, and accessible QR code generation tool.',
  description:
    'MAAR QR is a simple and professional web-based QR generator designed to make creating and sharing QR codes quick and effortless. Built with a clean interface and focused user experience, it provides an easy way to turn links and information into scannable QR codes.',
  audience: 'Individuals, businesses, and organisations looking for a simple QR solution.',
  href: 'https://20rajonadil.github.io/MAAR-QR/',
},
]

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: 'easeOut' },
}

export function Projects() {
  return (
    <section id="projects" className="section-padding bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeInUp} className="mb-16">
          <span className="text-sm text-gray-500 tracking-widest uppercase">Chapter Six — Projects</span>
          <div className="w-6 h-px bg-gray-600 mt-2" />
        </motion.div>

        <motion.h2
          {...fadeInUp}
          className="font-display text-[10vw] lg:text-section leading-none tracking-tight mb-8 lg:mb-12"
        >
          THE MAAR<br />PROJECTS
        </motion.h2>

        <motion.p
          {...fadeInUp}
          className="max-w-2xl text-base lg:text-lg text-gray-300 leading-relaxed mb-16 lg:mb-24"
        >
          In 2025–2026, Adil launched the MAAR websites — personal projects
          reflecting his interests in faith, self-discipline, and lifestyle
          journaling. Built with free hosting on GitHub Pages, each one is a
          milestone in his development rather than a commercial product.
        </motion.p>

        <div className="space-y-0">
          {projects.map((p, index) => (
            <motion.article
              key={p.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="border-t border-gray-800 py-10 lg:py-16 group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                <div className="lg:col-span-4">
                  <p className="text-xs text-gray-500 tracking-widest uppercase mb-3">
                    {p.tag}
                  </p>
                  <h3 className="font-display text-4xl md:text-5xl lg:text-6xl text-white mb-2 tracking-tight">
                    {p.name}
                  </h3>
                </div>

                <div className="lg:col-span-6">
                  <p className="text-base lg:text-lg text-gray-300 leading-relaxed mb-4">
                    {p.purpose}
                  </p>
                  <p className="text-sm lg:text-base text-gray-400 leading-relaxed mb-5">
                    {p.description}
                  </p>
                  <p className="text-xs text-gray-500 tracking-widest uppercase">
                    For · {p.audience}
                  </p>
                </div>

                <div className="lg:col-span-2 flex lg:justify-end lg:items-start">
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-white border border-gray-700 px-5 py-3 hover:bg-white hover:text-black transition-colors"
                  >
                    Open <span aria-hidden>↗</span>
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
          <div className="border-t border-gray-800" />
        </div>
      </div>
    </section>
  )
}
