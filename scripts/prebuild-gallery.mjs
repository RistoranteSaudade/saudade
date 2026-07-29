import fs from 'node:fs'
import { createClient } from '@sanity/client'

const projectId = process.env.SANITY_PROJECT_ID || '68afqfk5'
const dataset = process.env.SANITY_DATASET || 'production'

const client = createClient({ projectId, dataset, apiVersion: '2024-01-01', useCdn: true })

// Include asset metadata so the UI can reserve the correct aspect-ratio immediately
const data = await client.fetch(`*[_type == "galleryPage" && _id == "galleryPage"][0]{
  title,
  seoDescription,
  images[]{
    _key,
    alt,
    caption,
    image,
    "aspectRatio": image.asset->metadata.dimensions.aspectRatio
  }
}`)

if (!data) {
  console.log('No gallery data found, skipping.')
  process.exit(0)
}

fs.writeFileSync('public/gallery-data.json', JSON.stringify(data, null, 2))
console.log(`Gallery prebuild: ${data.images?.length ?? 0} images written to public/gallery-data.json`)
