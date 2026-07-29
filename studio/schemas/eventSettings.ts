import { defineType, defineField } from 'sanity'

export const eventSettings = defineType({
  name: 'eventSettings',
  title: 'Evento Settimanale',
  type: 'document',
  fields: [
    defineField({
      name: 'enabled',
      title: 'Mostra sezione evento sul sito',
      type: 'boolean',
      initialValue: true
    }),
    defineField({ name: 'title', title: 'Titolo evento', type: 'string' }),
    defineField({ name: 'description', title: 'Descrizione', type: 'text', rows: 3 }),
    defineField({ name: 'date', title: 'Data / Ricorrenza (es. Ogni Venerdì sera)', type: 'string' })
  ],
  preview: {
    select: { title: 'title' }
  }
})
