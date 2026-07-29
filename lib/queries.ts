import { sanityClient } from './sanity'
import { MenuItem, MenuItemType } from '../types'

function client() {
  if (!sanityClient) throw new Error('Sanity is not configured')
  return sanityClient
}

interface SanityMenuItem {
  _id: string
  name: string
  description: string
  price: string
  category: string
  displayArea?: 'menu' | 'carta'
  tab?: string
  section?: string
  sectionRef?: { name?: string; order?: number }
  cuts?: string[]
  isTraditionalSide?: boolean
  order?: number
  image?: any
}

interface SanitySettings {
  name: string
  subtitle: string
  address: string
  phone: string
  email: string
  hours: string
  instagram: string
  footerTagline?: string
  footerHoursNote?: string
  bookingLabel?: string
  navHomeLabel?: string
  navMenuLabel?: string
  navAboutLabel?: string
  navContactLabel?: string
  bookingUrl: string
  menuPdfUrl: string
}

interface SanityEvent {
  enabled: boolean
  title: string
  description: string
  date: string
}

export interface SanityHomePage {
  seoTitle?: string
  seoDescription?: string
  heroSlides?: Array<{ headline: string; accent?: string; description?: string; image?: any }>
  meaningHeading?: string
  meaningBody?: string
  mobileStoryVideos?: string[]
  churrascariaSection?: { heading?: string; body?: string; secondaryBody?: string; image?: any }
  rodizioSection?: { heading?: string; body?: string; image?: any }
  piazzaSection?: { heading?: string; body?: string; secondaryBody?: string; image?: any }
  quoteText?: string
  quoteAccent?: string
  quoteBackgroundImage?: any
}

export interface SanityMenuPage {
  title?: string
  heroImage?: any
  allergyNote?: string
  coverNote?: string
}

export interface SanityCartaPage {
  title?: string
  heroImage?: any
  footerNote?: string
}

export interface SanityContactPage {
  title?: string
  heroImage?: any
  locationTitle?: string
  directionsLabel?: string
  bookingTitle?: string
  bookingBody?: string
  formTitle?: string
  formIntro?: string
  successTitle?: string
  successBody?: string
}

export interface SanityBlogPage {
  title?: string
  emptyState?: string
}

export async function fetchMenu(): Promise<MenuItem[]> {
  const items: SanityMenuItem[] = await client().fetch(
    `*[_type == "menuItem"] | order(order asc, _createdAt asc) {
      _id, name, description, price, category, displayArea, tab, section, "sectionRef": sectionRef->{name, order}, cuts, isTraditionalSide, order, image
    }`
  )

  return items.map(item => ({
    id: item._id,
    name: item.name,
    description: item.description || '',
    price: item.price || '',
    type: item.category as MenuItemType,
    displayArea: item.displayArea || 'menu',
    tab: item.tab,
    section: item.sectionRef?.name || item.section,
    sectionOrder: item.sectionRef?.order,
    order: item.order,
    cuts: item.cuts,
    isTraditionalSide: item.isTraditionalSide || false,
    image: item.image
  }))
}

export async function fetchSiteSettings(): Promise<SanitySettings | null> {
  return client().fetch(
    `*[_type == "siteSettings" && _id == "siteSettings"][0]`
  )
}

export async function fetchEventSettings(): Promise<SanityEvent | null> {
  return client().fetch(
    `*[_type == "eventSettings" && _id == "eventSettings"][0]`
  )
}

export async function fetchHomePage(): Promise<SanityHomePage | null> {
  return client().fetch(`*[_type == "homePage" && _id == "homePage"][0]`)
}

export async function fetchMenuPage(): Promise<SanityMenuPage | null> {
  return client().fetch(`*[_type == "menuPage" && _id == "menuPage"][0]`)
}

export async function fetchCartaPage(): Promise<SanityCartaPage | null> {
  return client().fetch(`*[_type == "cartaPage" && _id == "cartaPage"][0]`)
}

export async function fetchContactPage(): Promise<SanityContactPage | null> {
  return client().fetch(`*[_type == "contactPage" && _id == "contactPage"][0]`)
}

export async function fetchBlogPage(): Promise<SanityBlogPage | null> {
  return client().fetch(`*[_type == "blogPage" && _id == "blogPage"][0]`)
}

export interface SanityGalleryImage {
  image: any
  alt: string
  caption?: string
  aspectRatio?: number
}

export interface SanityGalleryPage {
  title?: string
  seoDescription?: string
  images?: SanityGalleryImage[]
}

export async function fetchGalleryPage(): Promise<SanityGalleryPage | null> {
  return client().fetch(`*[_type == "galleryPage" && _id == "galleryPage"][0]`)
}

const SECTIONS_PROJECTION = `sections[]{ ... }`

export interface SanityPage {
  _id: string
  title: string
  slug: string
  sections: any[]
  seo?: { metaTitle?: string; metaDescription?: string; ogImage?: any }
}

export async function fetchAboutPage(): Promise<{ sections: any[] } | null> {
  return client().fetch(`*[_type == "aboutPage"][0]{ ${SECTIONS_PROJECTION} }`)
}

export async function fetchPageBySlug(slug: string): Promise<SanityPage | null> {
  return client().fetch(
    `*[_type == "page" && slug.current == $slug][0]{
      _id, title, "slug": slug.current, ${SECTIONS_PROJECTION}, seo
    }`,
    { slug }
  )
}

export interface SanityPost {
  _id: string
  title: string
  slug: string
  coverImage?: any
  excerpt?: string
  category?: string
  publishedAt: string
  body: any[]
}

export async function fetchPosts(): Promise<SanityPost[]> {
  return client().fetch(
    `*[_type == "post"] | order(publishedAt desc){
      _id, title, "slug": slug.current, coverImage, excerpt, category, publishedAt
    }`
  )
}

export async function fetchPostBySlug(slug: string): Promise<SanityPost | null> {
  return client().fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      _id, title, "slug": slug.current, coverImage, excerpt, category, publishedAt, body
    }`,
    { slug }
  )
}
