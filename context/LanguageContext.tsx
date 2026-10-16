import { createContext, useContext, useState, useEffect } from 'react'
import en from '../../locales/en.json'
import es from '../../locales/es.json'

const translations: any = { en, es }

const LanguageContext = createContext<any>(null)

export function useLanguage() { return useContext(LanguageContext) }

export function LanguageProvider({ children }: { children: any }) {
  const [locale, setLocale] = useState<string>(() => typeof window !== 'undefined' ? (localStorage.getItem('locale') || (process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en')) : (process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en'))

  useEffect(() => { localStorage.setItem('locale', locale) }, [locale])

  function t(key: string) { return translations[locale]?.[key] || translations['en'][key] || key }

  return <LanguageContext.Provider value={{ locale, setLocale, t }}>{children}</LanguageContext.Provider>
}
