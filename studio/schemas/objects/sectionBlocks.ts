import { defineType, defineField } from 'sanity'
import { richTextField } from './portableText'

export const heroBlock = defineType({
  name: 'heroBlock',
  title: 'Hero (banner grande)',
  type: 'object',
  fields: [
    defineField({ name: 'label', title: 'Etichetta piccola sopra il titolo', type: 'string' }),
    defineField({ name: 'heading', title: 'Titolo', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'backgroundImage', title: 'Immagine di sfondo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'ctaLabel', title: 'Testo pulsante (opzionale)', type: 'string' }),
    defineField({ name: 'ctaUrl', title: 'Link pulsante (opzionale)', type: 'url' })
  ],
  preview: {
    select: { title: 'heading', media: 'backgroundImage' },
    prepare: ({ title, media }) => ({ title: title || 'Hero', subtitle: 'Hero', media })
  }
})

export const textImageBlock = defineType({
  name: 'textImageBlock',
  title: 'Testo + Immagine',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Titolo', type: 'string' }),
    richTextField,
    defineField({ name: 'image', title: 'Immagine', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'imagePosition',
      title: 'Posizione immagine',
      type: 'string',
      options: { list: [{ title: 'Destra', value: 'right' }, { title: 'Sinistra', value: 'left' }] },
      initialValue: 'right'
    })
  ],
  preview: {
    select: { title: 'heading', media: 'image' },
    prepare: ({ title, media }) => ({ title: title || 'Testo + Immagine', subtitle: 'Testo + Immagine', media })
  }
})

export const galleryBlock = defineType({
  name: 'galleryBlock',
  title: 'Galleria immagini',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Titolo (opzionale)', type: 'string' }),
    defineField({
      name: 'images',
      title: 'Immagini',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      validation: Rule => Rule.min(2)
    })
  ],
  preview: {
    select: { title: 'heading', media: 'images.0' },
    prepare: ({ title, media }) => ({ title: title || 'Galleria', subtitle: 'Galleria immagini', media })
  }
})

export const ctaBannerBlock = defineType({
  name: 'ctaBannerBlock',
  title: 'Banner promo / CTA',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Titolo', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'text', title: 'Testo', type: 'text', rows: 3 }),
    defineField({ name: 'buttonLabel', title: 'Testo pulsante', type: 'string' }),
    defineField({ name: 'buttonUrl', title: 'Link pulsante', type: 'url' })
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({ title: title || 'Banner promo / CTA', subtitle: 'Banner promo / CTA' })
  }
})

export const menuHighlightBlock = defineType({
  name: 'menuHighlightBlock',
  title: 'Vetrina menu',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Titolo sezione', type: 'string' }),
    defineField({
      name: 'category',
      title: 'Categoria da mostrare',
      type: 'string',
      options: {
        list: [
          { title: 'Le Carni', value: 'Le Carni' },
          { title: 'Accompagnamenti', value: 'Accompagnamenti' },
          { title: 'Dolci', value: 'Dolci' },
          { title: 'Cantina', value: 'Cantina' }
        ]
      },
      validation: Rule => Rule.required()
    }),
    defineField({ name: 'limit', title: 'Numero massimo piatti (opzionale)', type: 'number' })
  ],
  preview: {
    select: { title: 'heading', subtitle: 'category' },
    prepare: ({ title, subtitle }) => ({ title: title || 'Vetrina menu', subtitle })
  }
})

export const richTextBlock = defineType({
  name: 'richTextBlock',
  title: 'Testo libero',
  type: 'object',
  fields: [richTextField],
  preview: {
    prepare: () => ({ title: 'Testo libero' })
  }
})

export const quoteBlock = defineType({
  name: 'quoteBlock',
  title: 'Citazione',
  type: 'object',
  fields: [
    defineField({ name: 'quote', title: 'Citazione', type: 'text', rows: 2, validation: Rule => Rule.required() }),
    defineField({ name: 'attribution', title: 'Firma (opzionale)', type: 'string' })
  ],
  preview: {
    select: { title: 'quote' },
    prepare: ({ title }) => ({ title: title || 'Citazione', subtitle: 'Citazione' })
  }
})

export const sectionBlocks = [
  heroBlock,
  textImageBlock,
  galleryBlock,
  ctaBannerBlock,
  menuHighlightBlock,
  richTextBlock,
  quoteBlock
]

export const sectionsField = defineField({
  name: 'sections',
  title: 'Sezioni',
  type: 'array',
  of: sectionBlocks.map(block => ({ type: block.name }))
})
