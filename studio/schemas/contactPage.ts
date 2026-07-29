import { defineField, defineType } from 'sanity'

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Pagina Contatti',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Titolo hero', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'heroImage', title: 'Immagine hero', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'locationTitle', title: 'Titolo sezione indirizzo', type: 'string' }),
    defineField({ name: 'directionsLabel', title: 'Testo link indicazioni', type: 'string' }),
    defineField({ name: 'bookingTitle', title: 'Titolo box prenota', type: 'string' }),
    defineField({ name: 'bookingBody', title: 'Testo box prenota', type: 'text', rows: 2 }),
    defineField({ name: 'formTitle', title: 'Titolo form', type: 'string' }),
    defineField({ name: 'formIntro', title: 'Testo intro form', type: 'string' }),
    defineField({ name: 'successTitle', title: 'Titolo successo', type: 'string' }),
    defineField({ name: 'successBody', title: 'Testo successo', type: 'string' })
  ],
  preview: {
    prepare: () => ({ title: 'Pagina Contatti' })
  }
})
