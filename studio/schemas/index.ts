import { menuItem } from './menuItem'
import { siteSettings } from './siteSettings'
import { eventSettings } from './eventSettings'
import { aboutPage } from './aboutPage'
import { page } from './page'
import { post } from './post'
import { sectionBlocks } from './objects/sectionBlocks'
import { homePageSchemaTypes } from './homePage'
import { menuPage } from './menuPage'
import { cartaPage } from './cartaPage'
import { contactPage } from './contactPage'
import { blogPage } from './blogPage'
import { menuSection } from './menuSection'
import { galleryPage } from './galleryPage'

export const schemaTypes = [
  menuItem,
  siteSettings,
  menuSection,
  eventSettings,
  aboutPage,
  ...homePageSchemaTypes,
  menuPage,
  cartaPage,
  contactPage,
  blogPage,
  galleryPage,
  page,
  post,
  ...sectionBlocks
]
