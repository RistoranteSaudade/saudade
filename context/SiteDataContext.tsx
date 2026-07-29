import React, { createContext, useContext } from 'react'
import { useSanityData, SiteData } from '../hooks/useSanityData'

const SiteDataContext = createContext<SiteData | null>(null)

export function SiteDataProvider({ children }: { children: React.ReactNode }) {
  const data = useSanityData()
  return <SiteDataContext.Provider value={data}>{children}</SiteDataContext.Provider>
}

export function useSiteData(): SiteData {
  const ctx = useContext(SiteDataContext)
  if (!ctx) throw new Error('useSiteData must be used inside SiteDataProvider')
  return ctx
}
