import { defineType, defineField } from 'sanity'
import { richTextField } from './objects/portableText'

export const post = defineType({
  name: 'post',
  title: 'Articolo Blog',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Titolo', type: 'string', validation: Rule => Rule.required() }),
    defineField({
      name: 'slug',
      title: 'Slug (indirizzo articolo)',
      type: 'slug',
      options: { source: 'title' },
      validation: Rule => Rule.required()
    }),
    defineField({ name: 'coverImage', title: 'Immagine copertina', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'excerpt', title: 'Riassunto breve', type: 'text', rows: 3 }),
    defineField({
      name: 'category',
      title: 'Categoria',
      type: 'string',
      options: { list: [{ title: 'Novità', value: 'novita' }, { title: 'Eventi', value: 'eventi' }, { title: 'Cucina', value: 'cucina' }] }
    }),
    defineField({ name: 'publishedAt', title: 'Data pubblicazione', type: 'datetime', validation: Rule => Rule.required() }),
    richTextField
  ],
  orderings: [
    { title: 'Più recenti', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] }
  ],
  preview: {
    select: { title: 'title', subtitle: 'publishedAt', media: 'coverImage' }
  }
})
