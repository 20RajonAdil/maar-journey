import { useState } from 'react'
import { useActiveSection } from '@/hooks/useActiveSection'
import { useScrollVisibility } from '@/hooks/useScrollVisibility'
import { cn } from '@/lib/utils'

const navItems = [
  { id: 'biography', label: 'Biography' },
  { id: 'journey', label: 'Journey' },
  { id: 'education', label: 'Education' },
  { id: 'faith', label: 'Faith' },
  { id: 'projects', label: 'Projects' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'friendship', label: 'Friendship' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'contact', label: 'Contact' },
]

export function Navigation() {
  const activeSection = useActiveSection()
  const isVisible = useScrollVisibility()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setMobileMenuOpen(false)
    }
  }

  return (
    <>
      {/* Mobile Header */}
      <div className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-start md:hidden pointer-events-none">
        <div className="relative">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-sm text-white mix-blend-difference pointer-events-auto"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? 'Close' : 'Menu'}
          </button>

          <div
            className={cn(
              'flex flex-col items-start gap-3 mt-6 transition-all duration-300',
              mobileMenuOpen
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 -translate-y-4 pointer-events-none'
            )}
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  'text-sm text-white mix-blend-difference transition-all duration-300 relative py-1',
                  'hover:opacity-60',
                  activeSection === item.id &&
                    'after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-white'
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Brand mark right */}
        <span className="text-xs tracking-[0.3em] text-white mix-blend-difference uppercase">
          MAAR Journey
        </span>
      </div>

      {/* Desktop brand mark — top left */}
      <div className="hidden md:block fixed top-0 left-0 z-50 p-6 md:p-10 pointer-events-none">
        <button
          onClick={() => scrollToSection('home')}
          className="text-xs tracking-[0.35em] text-white mix-blend-difference uppercase hover:opacity-60 transition-opacity pointer-events-auto"
        >
          MAAR Journey
        </button>
      </div>

      {/* Desktop brand kicker — top right */}
      <div className="hidden md:block fixed top-0 right-0 z-50 p-6 md:p-10 pointer-events-none">
        <span className="text-xs tracking-[0.3em] text-white mix-blend-difference uppercase">
          The Biography of MD Adil Rajon
        </span>
      </div>

      {/* Desktop nav — bottom right */}
      <nav
        className={cn(
          'hidden md:block fixed bottom-0 right-0 z-50 p-6 md:p-10 transition-all duration-500',
          isVisible
            ? 'opacity-100 translate-x-0'
            : 'opacity-0 translate-x-8 pointer-events-none'
        )}
      >
        <div className="flex flex-col items-end gap-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={cn(
                'text-sm text-white mix-blend-difference transition-all duration-300 relative py-1',
                'hover:opacity-60',
                activeSection === item.id &&
                  'after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-white'
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>
    </>
  )
}
