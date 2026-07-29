import { defineType, defineField } from 'sanity'
import CategoryInput from '../components/CategoryInput'

export const menuItem = defineType({
  name: 'menuItem',
  title: 'Voce Menu',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nome piatto',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'image',
      title: 'Foto piatto',
      type: 'image',
      options: { hotspot: true }
    }),
    defineField({
      name: 'description',
      title: 'Descrizione',
      type: 'text',
      rows: 3
    }),
    defineField({
      name: 'price',
      title: 'Prezzo (es. €42)',
      type: 'string'
    }),
    defineField({
      name: 'category',
      title: 'Categoria principale',
      type: 'string',
      components: { input: CategoryInput },
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
      name: 'displayArea',
      title: 'Area del sito',
      type: 'string',
      hidden: true,
      options: {
        list: [
          { title: 'Menu', value: 'menu' },
          { title: 'Carta', value: 'carta' }
        ]
      },
      initialValue: 'menu',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'tab',
      title: 'Tab',
      type: 'string',
      hidden: true,
      options: {
        list: [
          { title: 'Le Carni', value: 'carni' },
          { title: 'Accompagnamenti', value: 'accompagnamenti' },
          { title: 'Dolci', value: 'dolci' },
          { title: 'Vini', value: 'vini' },
          { title: 'Cocktails', value: 'cocktails' }
        ]
      }
    }),
    defineField({
      name: 'sectionRef',
      title: 'Sezione visuale',
      type: 'reference',
      to: [{ type: 'menuSection' }],
      options: {
        filter: ({ document }) => {
          const category = document?.category
          return category ? { filter: 'category == $category', params: { category } } : {}
        }
      },
      validation: Rule => Rule.custom((value, context) => {
        const category = context.document?.category
        if ((category === 'Dolci' || category === 'Vini' || category === 'Cocktails') && !value) return 'Per Dolci, Vini e Cocktails la sezione visuale è obbligatoria'
        return true
      })
    }),
    defineField({
      name: 'section',
      title: 'Sezione legacy',
      type: 'string',
      hidden: true
    }),
    defineField({
      name: 'cuts',
      title: 'Tagli di carne (solo per Rodizio)',
      type: 'array',
      of: [{ type: 'string' }],
      hidden: ({ document }) => document?.category !== 'Le Carni'
    }),
    defineField({
      name: 'isTraditionalSide',
      title: 'Contorno tradizionale (sezione secondaria)',
      type: 'boolean',
      initialValue: false,
      description: 'Solo per Accompagnamenti: mette il piatto nella sezione "Accompagnamenti Tradizionali" in fondo',
      hidden: ({ document }) => document?.category !== 'Accompagnamenti'
    }),
    defineField({
      name: 'order',
      title: 'Ordine di visualizzazione',
      type: 'number',
      description: 'Numero più basso = mostrato prima'
    })
  ],
  preview: {
    select: {
      title: 'name',
      section: 'sectionRef.name',
      legacySection: 'section',
      displayArea: 'displayArea',
      category: 'category',
      media: 'image'
    },
    prepare: ({ title, section, legacySection, displayArea, category, media }) => ({
      title,
      subtitle: [(['Le Carni', 'Accompagnamenti'].includes(category) ? 'Menu' : 'Carta'), section || legacySection || category || displayArea].filter(Boolean).join(' · '),
      media
    })
  },
  orderings: [
    {
      title: 'Ordine personalizzato',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }]
    },
    {
      title: 'Categoria',
      name: 'categoryAsc',
      by: [{ field: 'category', direction: 'asc' }]
    }
  ]
})
