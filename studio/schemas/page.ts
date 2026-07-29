import { defineType, defineField } from 'sanity'
import { sectionsField } from './objects/sectionBlocks'

export const page = defineType({
  name: 'page',
  title: 'Pagina',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Titolo pagina', type: 'string', validation: Rule => Rule.required() }),
    defineField({
      name: 'slug',
      title: 'Slug (indirizzo pagina, es. promo-estate)',
      type: 'slug',
      options: { source: 'title' },
      validation: Rule => Rule.required()
    }),
    sectionsField,
    defineField({
      name: 'seo',
      title: 'SEO / Condivisione social',
      type: 'object',
      fields: [
        defineField({ name: 'metaTitle', title: 'Titolo SEO (opzionale)', type: 'string' }),
        defineField({ name: 'metaDescription', title: 'Descrizione SEO (opzionale)', type: 'text', rows: 2 }),
        defineField({ name: 'ogImage', title: 'Immagine condivisione social', type: 'image' })
      ]
    })
  ],
  preview: {
    select: { title: 'title', subtitle: 'slug.current' }
  }
})
