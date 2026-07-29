import { defineField, defineType } from 'sanity'

export const cartaPage = defineType({
  name: 'cartaPage',
  title: 'Pagina Carta',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Titolo hero', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'heroImage', title: 'Immagine hero', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'footerNote', title: 'Nota finale', type: 'text', rows: 2 })
  ],
  preview: {
    prepare: () => ({ title: 'Pagina Carta' })
  }
})
