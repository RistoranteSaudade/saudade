import { CARTA_CATEGORIES, type CartaCategory, type CartaSection } from '../constants'
import { type MenuItem } from '../types'

const TAB_TITLES: Record<string, string> = {
  vini: 'Vini',
  cocktails: 'Cocktails',
  dolci: 'Dolci'
}

const WINE_SECTIONS = new Set(['Rossi', 'Rosati'])

export function getDisplayArea(item: MenuItem) {
  if (item.type === 'Le Carni' || item.type === 'Accompagnamenti') return 'menu'
  return 'carta'
}

export function getCartaTab(item: MenuItem) {
  if (item.type === 'Dolci') return 'dolci'
  if (item.type === 'Vini') return 'vini'
  if (item.type === 'Cocktails') return 'cocktails'
  if (item.type !== 'Cantina') return null
  return WINE_SECTIONS.has(item.section || '') ? 'vini' : 'cocktails'
}

export function buildCartaCategories(items: MenuItem[]): CartaCategory[] {
  const cartaItems = items
    .filter((item) => getDisplayArea(item) === 'carta')
    .map((item) => ({ ...item, tab: getCartaTab(item) }))
    .filter((item) => item.tab)
    .sort((a, b) => (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER))
  if (!cartaItems.length) return CARTA_CATEGORIES

  return Object.entries(TAB_TITLES)
    .map(([id, title]) => {
      const tabItems = cartaItems.filter((item) => item.tab === id)
      const sectionsByName = new Map<string, CartaSection & { sortOrder?: number }>()

      tabItems.forEach((item) => {
        const sectionTitle = item.section || title
        const sectionId = sectionTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-')
        if (!sectionsByName.has(sectionTitle)) {
          sectionsByName.set(sectionTitle, {
            id: sectionId,
            title: sectionTitle,
            items: [],
            sortOrder: item.sectionOrder ?? item.order ?? Number.MAX_SAFE_INTEGER
          })
        }
        sectionsByName.get(sectionTitle)!.items.push({
          id: item.id,
          name: item.name,
          description: item.description || '',
          price: item.price || '',
          image: item.image
        })
      })

      return {
        id,
        title,
        sections: Array.from(sectionsByName.values())
          .sort((a, b) => (a.sortOrder ?? Number.MAX_SAFE_INTEGER) - (b.sortOrder ?? Number.MAX_SAFE_INTEGER))
          .map(({ sortOrder, ...section }) => section)
      }
    })
    .filter((category) => category.sections.length > 0)
}
