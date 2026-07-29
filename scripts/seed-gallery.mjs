import fs from 'node:fs'
import path from 'node:path'
import { createClient } from '@sanity/client'

const projectId = process.env.SANITY_PROJECT_ID || '68afqfk5'
const dataset = process.env.SANITY_DATASET || 'production'
const token = process.env.SANITY_TOKEN
if (!token) { console.error('Missing SANITY_TOKEN'); process.exit(1) }

const client = createClient({ projectId, dataset, apiVersion: '2024-01-01', token, useCdn: false })

const imagesDir = path.resolve('public/images')
const files = fs.readdirSync(imagesDir)
  .filter(f => /\.(jpe?g|png|webp)$/i.test(f))
  .sort((a, b) => {
    const numA = parseInt((a.match(/(\d+)/) || [])[1]) || 0
    const numB = parseInt((b.match(/(\d+)/) || [])[1]) || 0
    return numA - numB
  })

console.log(`Found ${files.length} images to upload`)

const galleryImages = []

for (const file of files) {
  const filePath = path.join(imagesDir, file)
  const baseName = path.parse(file).name
  const alt = `Ristorante Saudade Torino — ${baseName.replace(/[-_]/g, ' ')}`

  console.log(`Uploading ${file}...`)
  try {
    const asset = await client.assets.upload('image', fs.createReadStream(filePath), { filename: file })
    galleryImages.push({
      _key: baseName.toLowerCase().replace(/[^a-z0-9]/g, ''),
      _type: 'galleryImage',
      image: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } },
      alt
    })
    console.log(`  ✓ ${file}`)
  } catch (err) {
    console.error(`  ✗ ${file}: ${err.message}`)
  }
}

console.log(`\nCreating gallery document with ${galleryImages.length} images...`)

await client.createOrReplace({
  _id: 'galleryPage',
  _type: 'galleryPage',
  title: 'Galleria',
  seoDescription: 'Le foto del ristorante brasiliano Saudade a Torino: churrascaria, cocktail, sala e piatti',
  images: galleryImages
})

console.log('Done!')
