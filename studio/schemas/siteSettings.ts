import { defineType, defineField } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Impostazioni Sito',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Nome ristorante', type: 'string' }),
    defineField({ name: 'subtitle', title: 'Sottotitolo', type: 'string' }),
    defineField({ name: 'address', title: 'Indirizzo', type: 'string' }),
    defineField({ name: 'phone', title: 'Telefono', type: 'string' }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'hours', title: 'Orari apertura', type: 'string' }),
    defineField({ name: 'instagram', title: 'Handle Instagram (senza @)', type: 'string' }),
    defineField({ name: 'footerTagline', title: 'Testo footer', type: 'string' }),
    defineField({ name: 'footerHoursNote', title: 'Nota orari footer', type: 'string' }),
    defineField({ name: 'bookingLabel', title: 'CTA prenotazione condivisa', type: 'string' }),
    defineField({ name: 'navHomeLabel', title: 'Voce menu: Home', type: 'string' }),
    defineField({ name: 'navMenuLabel', title: 'Voce menu: Menu', type: 'string' }),
    defineField({ name: 'navAboutLabel', title: 'Voce menu: Chi siamo', type: 'string' }),
    defineField({ name: 'navContactLabel', title: 'Voce menu: Contatti', type: 'string' }),
    defineField({
      name: 'bookingUrl',
      title: 'Link prenotazione',
      type: 'url'
    }),
    defineField({
      name: 'menuPdfUrl',
      title: 'Link menu PDF esterno',
      type: 'url'
    })
  ],
  preview: {
    select: { title: 'name' }
  }
})
