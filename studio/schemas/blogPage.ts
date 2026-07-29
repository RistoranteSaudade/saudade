import { defineField, defineType } from 'sanity'

export const blogPage = defineType({
  name: 'blogPage',
  title: 'Pagina Blog',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Titolo hero', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'emptyState', title: 'Testo quando non ci sono articoli', type: 'string' })
  ],
  preview: {
    prepare: () => ({ title: 'Pagina Blog' })
  }
})
