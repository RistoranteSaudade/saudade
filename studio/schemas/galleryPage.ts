import { defineType, defineField } from 'sanity'

export const galleryPage = defineType({
  name: 'galleryPage',
  title: 'Galleria',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titolo pagina',
      type: 'string',
      initialValue: 'Galleria'
    }),
    defineField({
      name: 'seoDescription',
      title: 'Meta description (SEO)',
      type: 'text',
      rows: 2,
      description: 'Descrizione per Google (max 160 caratteri)'
    }),
    defineField({
      name: 'images',
      title: 'Immagini',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'galleryImage',
          title: 'Immagine',
          fields: [
            defineField({
              name: 'image',
              title: 'Foto',
              type: 'image',
              options: { hotspot: true },
              validation: (R) => R.required()
            }),
            defineField({
              name: 'alt',
              title: 'Titolo SEO / Alt text',
              type: 'string',
              description: 'Descrive l\'immagine per Google Immagini (es. "Picanha alla griglia Saudade Torino")',
              validation: (R) => R.required()
            }),
            defineField({
              name: 'caption',
              title: 'Didascalia (opzionale)',
              type: 'string'
            })
          ],
          preview: {
            select: { title: 'alt', media: 'image' }
          }
        }
      ]
    })
  ],
  preview: { prepare: () => ({ title: 'Galleria' }) }
})
