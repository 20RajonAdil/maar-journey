import { useState } from 'react'

interface ResilientImageProps {
  src: string
  alt: string
  loading?: 'lazy' | 'eager'
  className?: string
  fallbackClassName?: string
  fallbackLabel?: string
  onClick?: () => void
}

/**
 * Drop-in replacement for a plain <img> used throughout the site.
 * If the image is missing or fails to load, it renders a quiet,
 * on-brand placeholder instead of a broken-image icon so the layout
 * never looks unfinished — useful for slots (like the Chapter Eleven
 * photographs) whose files may not have been uploaded yet.
 */
export function ResilientImage({
  src,
  alt,
  loading = 'lazy',
  className = '',
  fallbackClassName = '',
  fallbackLabel = 'Image coming soon',
  onClick,
}: ResilientImageProps) {
  const [errored, setErrored] = useState(false)

  if (errored || !src) {
    return (
      <div
        onClick={onClick}
        className={`w-full min-h-[220px] flex items-center justify-center border border-white/5 bg-[#0a0a0a] ${fallbackClassName}`}
      >
        <span className="text-[10px] text-gray-600 tracking-widest uppercase px-6 text-center">
          {fallbackLabel}
        </span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      onClick={onClick}
      onError={() => setErrored(true)}
      className={className}
    />
  )
}
