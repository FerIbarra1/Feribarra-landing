import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import type { ReactNode } from "react"
import { es } from "./es"
import { en } from "./en"

// Both dictionaries are structurally identical, so a single shape is the type.
// The previous `typeof es | typeof en` union forced every `.map` call site to
// narrow, which is why five components had `(x: any)` casts.
type Dict = typeof es

type I18nContextType = {
  lang: "es" | "en"
  setLang: (lang: "es" | "en") => void
  toggle: () => void
  t: (path: string) => string
  dict: Dict
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

const dictionaries = { es, en }

function get(obj: unknown, path: string, fallback = ""): string {
  const value = path.split(".").reduce<unknown>(
    (acc, key) =>
      acc && typeof acc === "object" && key in acc
        ? (acc as Record<string, unknown>)[key]
        : undefined,
    obj,
  )
  return typeof value === "string" ? value : fallback
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<"es" | "en">(() => {
    if (typeof window === "undefined") return "es"
    const saved = window.localStorage.getItem("lang")
    return saved === "en" ? "en" : "es"
  })

  useEffect(() => {
    try {
      window.localStorage.setItem("lang", lang)
    } catch {
      // localStorage is unavailable (private mode / blocked site data).
    }
  }, [lang])

  const setLang = (l: "es" | "en") => setLangState(l)
  const toggle = () => setLangState(prev => (prev === "es" ? "en" : "es"))

  const dict = useMemo(() => dictionaries[lang], [lang])
  const t = useCallback((path: string) => get(dict, path, path), [dict])

  const value = useMemo(() => ({ lang, setLang, toggle, t, dict }), [lang, dict, t])
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error("useI18n must be used within I18nProvider")
  return ctx
}
