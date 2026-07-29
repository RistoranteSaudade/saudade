import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { presentationTool } from 'sanity/presentation'
import { schemaTypes } from './schemas'

const SITE_URL = process.env.SANITY_STUDIO_PREVIEW_URL!

export default defineConfig({
  name: 'saudade',
  title: 'Saudade — Gestione Contenuti',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Contenuti')
          .items([
            S.listItem()
              .title('Menu')
              .schemaType('menuItem')
              .child(S.documentTypeList('menuItem').title('Voci Menu')),
            S.listItem()
              .title('Sezioni')
              .schemaType('menuSection')
              .child(S.documentTypeList('menuSection').title('Sezioni Menu/Carta')),
            S.listItem()
              .title('Home')
              .schemaType('homePage')
              .child(S.document().schemaType('homePage').documentId('homePage')),
            S.listItem()
              .title('Pagina Menu')
              .schemaType('menuPage')
              .child(S.document().schemaType('menuPage').documentId('menuPage')),
            S.listItem()
              .title('Pagina Carta')
              .schemaType('cartaPage')
              .child(S.document().schemaType('cartaPage').documentId('cartaPage')),
            S.listItem()
              .title('Pagina Contatti')
              .schemaType('contactPage')
              .child(S.document().schemaType('contactPage').documentId('contactPage')),
            S.listItem()
              .title('Pagina Chi Siamo')
              .schemaType('aboutPage')
              .child(S.document().schemaType('aboutPage').documentId('aboutPage')),
            S.listItem()
              .title('Galleria')
              .schemaType('galleryPage')
              .child(S.document().schemaType('galleryPage').documentId('galleryPage')),
            S.listItem()
              .title('Impostazioni Sito')
              .schemaType('siteSettings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            S.listItem()
              .title('Evento Settimanale')
              .schemaType('eventSettings')
              .child(S.document().schemaType('eventSettings').documentId('eventSettings'))
          ])
    }),
    presentationTool({
      previewUrl: SITE_URL
    })
  ],

  schema: {
    types: schemaTypes
  }
})
