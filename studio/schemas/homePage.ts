import { defineField, defineType } from 'sanity'

const homeHeroSlide = defineType({
  name: 'homeHeroSlide',
  title: 'Slide hero',
  type: 'object',
  fields: [
    defineField({ name: 'headline', title: 'Titolo', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'accent', title: 'Parola evidenziata', type: 'string' }),
    defineField({ name: 'description', title: 'Descrizione', type: 'text', rows: 2 }),
    defineField({ name: 'image', title: 'Immagine', type: 'image', options: { hotspot: true } })
  ],
  preview: {
    select: { title: 'headline', subtitle: 'accent', media: 'image' }
  }
})

const homeImageSection = defineType({
  name: 'homeImageSection',
  title: 'Sezione home con immagine',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Titolo', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'body', title: 'Testo principale', type: 'text', rows: 4 }),
    defineField({ name: 'secondaryBody', title: 'Secondo paragrafo (opzionale)', type: 'text', rows: 3 }),
    defineField({ name: 'image', title: 'Immagine', type: 'image', options: { hotspot: true } })
  ],
  preview: {
    select: { title: 'heading', media: 'image' }
  }
})

export const homePage = defineType({
  name: 'homePage',
  title: 'Home',
  type: 'document',
  fields: [
    defineField({ name: 'seoTitle', title: 'SEO Title', type: 'string' }),
    defineField({ name: 'seoDescription', title: 'SEO Description', type: 'text', rows: 2 }),
    defineField({
      name: 'heroSlides',
      title: 'Slide hero',
      type: 'array',
      of: [{ type: 'homeHeroSlide' }],
      validation: Rule => Rule.min(1)
    }),
    defineField({ name: 'meaningHeading', title: 'Titolo significato Saudade', type: 'string' }),
    defineField({ name: 'meaningBody', title: 'Testo significato Saudade', type: 'text', rows: 4 }),
    defineField({ name: 'mobileStoryVideos', title: 'Video mobile (percorsi file pubblici)', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'churrascariaSection', title: 'Sezione Churrascaria', type: 'homeImageSection' }),
    defineField({
      name: 'rodizioSection',
      title: 'Sezione Rodizio',
      type: 'object',
      fields: [
        defineField({ name: 'heading', title: 'Titolo', type: 'string' }),
        defineField({ name: 'body', title: 'Testo', type: 'text', rows: 4 }),
        defineField({ name: 'image', title: 'Immagine', type: 'image', options: { hotspot: true } })
      ]
    }),
    defineField({ name: 'piazzaSection', title: 'Sezione Piazza Vittorio', type: 'homeImageSection' }),
    defineField({ name: 'quoteText', title: 'Citazione finale', type: 'text', rows: 2 }),
    defineField({ name: 'quoteAccent', title: 'Testo evidenziato nella citazione', type: 'string' }),
    defineField({ name: 'quoteBackgroundImage', title: 'Immagine sfondo citazione', type: 'image', options: { hotspot: true } })
  ],
  preview: {
    prepare: () => ({ title: 'Home' })
  }
})

export const homePageSchemaTypes = [homePage, homeHeroSlide, homeImageSection]
