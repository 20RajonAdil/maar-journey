import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ResilientImage } from './ResilientImage'

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: 'easeOut' },
}

interface GalleryPhoto {
  src: string
  alt: string
  caption: string
}

// Reuses every photograph already featured across the MAAR Journey —
// plus the three new Chapter Eleven friendship photographs — from the
// same /public/images directory the rest of the site draws from.
// No files are duplicated; this is purely a new view onto them.
const photos: GalleryPhoto[] = [
  { src: '/images/childhood.jpg', alt: 'Sylhet, Bangladesh — Early years', caption: 'Sylhet, Bangladesh — Early years' },
  { src: '/images/bangladesh.jpg', alt: 'Growing up in Sylhet, Bangladesh', caption: 'Growing up in Sylhet, Bangladesh' },
  { src: '/images/iqra-madrasa.jpg', alt: 'Iqra Bangladesh School and Madrasa — Sylhet', caption: 'Iqra Bangladesh School and Madrasa — Sylhet' },
  { src: '/images/family.jpg', alt: 'Family picture — Birmingham', caption: 'Family picture — Birmingham' },
  { src: '/images/arm-fracture.jpg', alt: 'December 2020 — A fracture, a pause', caption: 'December 2020 — A fracture, a pause' },
  { src: '/images/uk-arrival.jpg', alt: '30 July 2021 — Sylhet → London Heathrow', caption: '30 July 2021 — Sylhet → London Heathrow' },
  { src: '/images/radisson.jpg', alt: 'Radisson Blu Edwardian — Heathrow, London', caption: 'Radisson Blu Edwardian — Heathrow, London' },
  { src: '/images/first-home.jpg', alt: 'Handsworth — first home in Birmingham', caption: 'Handsworth — first home in Birmingham' },
  { src: '/images/aston.jpg', alt: 'Aston, Birmingham — September 2022', caption: 'Aston, Birmingham — September 2022' },
  { src: '/images/fortis-academy.jpg', alt: 'Fortis Academy — Albert Road, Birmingham', caption: 'Fortis Academy — Albert Road, Birmingham' },
  { src: '/images/gcse-years.jpg', alt: 'GCSE years — Years 10 & 11', caption: 'GCSE years — Years 10 & 11' },
  { src: '/images/coding.jpg', alt: 'Beginning the programming journey', caption: 'Beginning the programming journey' },
  { src: '/images/friendship1.jpg', alt: 'Ifnan — a friendship that found its way back', caption: 'Ifnan — Chapter Eleven, Friendship' },
  { src: '/images/friendship2.jpg', alt: 'Talha — a friend built on loyalty', caption: 'Talha — Chapter Eleven, Friendship' },
  { src: '/images/friendship3.jpg', alt: 'Moheiz — a friendship built on understanding', caption: 'Moheiz — Chapter Eleven, Friendship' },
  { src: '/images/future.jpg', alt: 'Vision for the future', caption: 'Vision for the future' },
]

export function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const close = () => setActiveIndex(null)
  const showPrev = () =>
    setActiveIndex((i) => (i === null ? i : (i - 1 + photos.length) % photos.length))
  const showNext = () =>
    setActiveIndex((i) => (i === null ? i : (i + 1) % photos.length))

  useEffect(() => {
    if (activeIndex === null) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') showPrev()
      if (e.key === 'ArrowRight') showNext()
    }

    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [activeIndex])

  const active = activeIndex !== null ? photos[activeIndex] : null

  return (
    <section id="gallery" className="section-padding bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeInUp} className="mb-16">
          <span className="text-sm text-gray-500 tracking-widest uppercase">The MAAR Journey — Gallery</span>
          <div className="w-6 h-px bg-gray-600 mt-2" />
        </motion.div>

        <motion.h2
          {...fadeInUp}
          className="font-display text-[10vw] lg:text-section leading-none tracking-tight mb-8 lg:mb-12"
        >
          MOMENTS<br />IN FRAME
        </motion.h2>

        <motion.p
          {...fadeInUp}
          className="text-base lg:text-lg text-gray-400 leading-relaxed mb-16 lg:mb-20 max-w-3xl"
        >
          A collection of the photographs from across the MAAR Journey — from Sylhet to
          Birmingham, and the friends found along the way. Select any photograph to view it
          in full.
        </motion.p>

        {/* Masonry-style gallery — CSS columns keep every photo at its own
            natural aspect ratio, whatever its orientation or resolution. */}
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 lg:gap-5 [column-fill:_balance]">
          {photos.map((photo, index) => (
            <motion.button
              key={photo.src}
              type="button"
              onClick={() => setActiveIndex(index)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: (index % 8) * 0.05, ease: 'easeOut' }}
              className="group mb-4 lg:mb-5 block w-full break-inside-avoid overflow-hidden bg-[#0a0a0a] text-left cursor-zoom-in"
              aria-label={`View photograph: ${photo.caption}`}
            >
              <ResilientImage
                src={photo.src}
                alt={photo.alt}
                className="w-full h-auto block grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-[1.03]"
              />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center p-4 md:p-10"
            onClick={close}
          >
            <button
              type="button"
              onClick={close}
              className="fixed top-6 right-6 md:top-10 md:right-10 text-sm text-white hover:opacity-60 transition-opacity z-[101]"
              aria-label="Close"
            >
              Close
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                showPrev()
              }}
              className="fixed left-4 md:left-10 top-1/2 -translate-y-1/2 text-sm text-white hover:opacity-60 transition-opacity z-[101]"
              aria-label="Previous photograph"
            >
              ← Prev
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                showNext()
              }}
              className="fixed right-4 md:right-10 top-1/2 -translate-y-1/2 text-sm text-white hover:opacity-60 transition-opacity z-[101]"
              aria-label="Next photograph"
            >
              Next →
            </button>

            <motion.figure
              key={active.src}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="max-w-[92vw] max-h-[86vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <ResilientImage
                src={active.src}
                alt={active.alt}
                className="max-w-[92vw] max-h-[76vh] w-auto h-auto object-contain"
              />
              <figcaption className="mt-4 text-xs text-gray-400 tracking-widest uppercase text-center">
                {active.caption}
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
