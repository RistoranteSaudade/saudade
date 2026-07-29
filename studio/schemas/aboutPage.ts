import { defineType } from 'sanity'
import { sectionsField } from './objects/sectionBlocks'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'Pagina Chi Siamo',
  type: 'document',
  fields: [sectionsField],
  preview: {
    prepare: () => ({ title: 'Pagina Chi Siamo' })
  }
})
