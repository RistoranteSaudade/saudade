import { defineArrayMember, defineField } from 'sanity'

export const richTextField = defineField({
  name: 'body',
  title: 'Testo',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Normale', value: 'normal' },
        { title: 'Titolo', value: 'h3' },
        { title: 'Citazione', value: 'blockquote' }
      ],
      marks: {
        decorators: [
          { title: 'Grassetto', value: 'strong' },
          { title: 'Corsivo', value: 'em' }
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [{ name: 'href', type: 'url', title: 'URL' }]
          }
        ]
      }
    })
  ]
})
