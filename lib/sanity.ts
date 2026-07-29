import { createClient, type SanityClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID as string | undefined

// ponytail: skip client when env missing so the static-constants fallback still renders
export const sanityClient: SanityClient | null = projectId
  ? createClient({
      projectId,
      dataset: 'production',
      // ponytail: prefer fresh Sanity reads over CDN caching so Studio edits show up immediately
      useCdn: false,
      apiVersion: '2024-01-01',
      stega: {
        studioUrl: import.meta.env.VITE_SANITY_STUDIO_URL || 'https://saudade.sanity.studio'
      }
    })
  : null

const builder = projectId
  ? imageUrlBuilder({ projectId, dataset: 'production' })
  : null

export function urlFor(source: SanityImageSource) {
  if (!builder) throw new Error('Sanity is not configured')
  return builder.image(source)
}

export function imageUrl(source?: string | SanityImageSource | null, width?: number, height?: number) {
  if (!source) return ''
  if (typeof source === 'string') return source
  if (!builder) return ''
  let image = builder.image(source)
  if (width) image = image.width(width)
  if (height) image = image.height(height)
  return image.url()
}
