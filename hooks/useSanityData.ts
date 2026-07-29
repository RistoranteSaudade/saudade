import { useState, useEffect } from 'react'
import { fetchMenu, fetchSiteSettings, fetchEventSettings } from '../lib/queries'
import { FULL_MENU, RESTAURANT_INFO, EVENT_SETTINGS, EXTERNAL_LINKS } from '../constants'
import { MenuItem } from '../types'

const SANITY_ENABLED = Boolean(import.meta.env.VITE_SANITY_PROJECT_ID)

export interface SiteData {
  menu: MenuItem[]
  restaurantInfo: typeof RESTAURANT_INFO
  eventSettings: typeof EVENT_SETTINGS
  externalLinks: typeof EXTERNAL_LINKS
  loading: boolean
}

export function useSanityData(): SiteData {
  const [menu, setMenu] = useState<MenuItem[]>(FULL_MENU)
  const [restaurantInfo, setRestaurantInfo] = useState(RESTAURANT_INFO)
  const [eventSettings, setEventSettings] = useState(EVENT_SETTINGS)
  const [externalLinks, setExternalLinks] = useState(EXTERNAL_LINKS)
  const [loading, setLoading] = useState(SANITY_ENABLED)

  useEffect(() => {
    if (!SANITY_ENABLED) return

    Promise.all([fetchMenu(), fetchSiteSettings(), fetchEventSettings()])
      .then(([menuItems, settings, event]) => {
        if (menuItems.length > 0) {
          setMenu(menuItems)
        }
        if (settings) {
          setRestaurantInfo({
            name: settings.name ?? RESTAURANT_INFO.name,
            subtitle: settings.subtitle ?? RESTAURANT_INFO.subtitle,
            address: settings.address ?? RESTAURANT_INFO.address,
            phone: settings.phone ?? RESTAURANT_INFO.phone,
            email: settings.email ?? RESTAURANT_INFO.email,
            hours: settings.hours ?? RESTAURANT_INFO.hours,
            instagram: settings.instagram ?? RESTAURANT_INFO.instagram,
            footerTagline: settings.footerTagline ?? RESTAURANT_INFO.footerTagline,
            footerHoursNote: settings.footerHoursNote ?? RESTAURANT_INFO.footerHoursNote,
            bookingLabel: settings.bookingLabel ?? RESTAURANT_INFO.bookingLabel,
            navHomeLabel: settings.navHomeLabel ?? RESTAURANT_INFO.navHomeLabel,
            navMenuLabel: settings.navMenuLabel ?? RESTAURANT_INFO.navMenuLabel,
            navAboutLabel: settings.navAboutLabel ?? RESTAURANT_INFO.navAboutLabel,
            navContactLabel: settings.navContactLabel ?? RESTAURANT_INFO.navContactLabel,
            navGalleryLabel: settings.navGalleryLabel ?? RESTAURANT_INFO.navGalleryLabel
          })
          setExternalLinks({
            ...EXTERNAL_LINKS,
            book: settings.bookingUrl || EXTERNAL_LINKS.book,
            menu: settings.menuPdfUrl || EXTERNAL_LINKS.menu
          })
        }
        if (event) {
          setEventSettings({
            enabled: event.enabled ?? EVENT_SETTINGS.enabled,
            title: event.title ?? EVENT_SETTINGS.title,
            description: event.description ?? EVENT_SETTINGS.description,
            date: event.date ?? EVENT_SETTINGS.date
          })
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return { menu, restaurantInfo, eventSettings, externalLinks, loading }
}
