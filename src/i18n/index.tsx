import { useCallback, useEffect, useMemo, useState } from "react"
import type { ReactNode } from "react"
import { es } from "./es"
import { en } from "./en"
import { I18nContext, get } from "./context"

const dictionaries = { es, en }

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

  // index.html ships lang="es"; the document has to follow the toggle or
  // screen readers and translation prompts announce the wrong language.
  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLang = (l: "es" | "en") => setLangState(l)
  const toggle = () => setLangState(prev => (prev === "es" ? "en" : "es"))

  const dict = useMemo(() => dictionaries[lang], [lang])
  const t = useCallback((path: string) => get(dict, path, path), [dict])

  const value = useMemo(() => ({ lang, setLang, toggle, t, dict }), [lang, dict, t])
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}
