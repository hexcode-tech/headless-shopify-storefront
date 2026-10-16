import { useLanguage } from '../context/LanguageContext'

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage()
  return (
    <select value={locale} onChange={e => setLocale(e.target.value)} className="border rounded p-1">
      <option value="en">English</option>
      <option value="es">Español</option>
    </select>
  )
}
