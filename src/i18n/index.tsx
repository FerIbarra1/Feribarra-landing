import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react"
import { es } from "./es"
import { en } from "./en"

type Dict = typeof es | typeof en

type I18nContextType = {
  lang: "es" | "en"
  setLang: (lang: "es" | "en") => void
  toggle: () => void
  t: (path: string) => string
  dict: Dict
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

const dictionaries = { es, en }

function get(obj: any, path: string, fallback = ""): string {
  return path.split(".").reduce((acc: any, key: string) => (acc && acc[key] != null ? acc[key] : undefined), obj) ?? fallback
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<"es" | "en">(() => {
    const saved = typeof window !== "undefined" ? window.localStorage.getItem("lang") : null
    return (saved === "en" || saved === "es") ? (saved as any) : "es"
  })

  useEffect(() => {
    try { window.localStorage.setItem("lang", lang) } catch {}
  }, [lang])

  const setLang = (l: "es" | "en") => setLangState(l)
  const toggle = () => setLangState(prev => (prev === "es" ? "en" : "es"))

  const dict = useMemo(() => dictionaries[lang], [lang])
  const t = (path: string) => get(dict, path, path)

  const value = useMemo(() => ({ lang, setLang, toggle, t, dict }), [lang, dict])
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error("useI18n must be used within I18nProvider")
  return ctx
}

