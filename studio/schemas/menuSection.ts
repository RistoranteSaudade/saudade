import { defineField, defineType } from 'sanity'

export const menuSection = defineType({
  name: 'menuSection',
  title: 'Sezione Menu/Carta',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nome sezione',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'category',
      title: 'Categoria collegata',
      type: 'string',
      options: {
        list: [
          { title: 'Le Carni', value: 'Le Carni' },
          { title: 'Accompagnamenti', value: 'Accompagnamenti' },
          { title: 'Dolci', value: 'Dolci' },
          { title: 'Vini', value: 'Vini' },
          { title: 'Cocktails', value: 'Cocktails' }
        ]
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'order',
      title: 'Ordine',
      type: 'number'
    })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category'
    }
  },
  orderings: [
    {
      title: 'Ordine',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }]
    }
  ]
})
