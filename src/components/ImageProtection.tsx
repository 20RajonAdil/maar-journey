import { useEffect } from 'react'

/**
 * Renders nothing. On mount, attaches document-level listeners that stop
 * the browser's default "Save Image" / "Copy Image" affordances on <img>
 * elements — right-click context menu and native drag-out — anywhere on
 * the site, including images added later (Gallery, future chapters).
 *
 * This is a deterrent, not a lock: it stops casual right-click saving and
 * dragging, but nothing running in the browser can prevent a screenshot,
 * dev-tools inspection, or someone viewing the page source.
 */
export function ImageProtection() {
  useEffect(() => {
    const blockIfImage = (e: Event) => {
      if (e.target instanceof HTMLImageElement) {
        e.preventDefault()
      }
    }

    document.addEventListener('contextmenu', blockIfImage)
    document.addEventListener('dragstart', blockIfImage)

    return () => {
      document.removeEventListener('contextmenu', blockIfImage)
      document.removeEventListener('dragstart', blockIfImage)
    }
  }, [])

  return null
}
