import { defineField, defineType } from 'sanity'

export const menuPage = defineType({
  name: 'menuPage',
  title: 'Pagina Menu',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Titolo hero', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'heroImage', title: 'Immagine hero', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'allergyNote', title: 'Nota allergie', type: 'text', rows: 2 }),
    defineField({ name: 'coverNote', title: 'Nota coperto', type: 'string' })
  ],
  preview: {
    prepare: () => ({ title: 'Pagina Menu' })
  }
})
