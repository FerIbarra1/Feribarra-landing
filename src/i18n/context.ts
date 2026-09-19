import { createContext } from "react"
import { es } from "./es"

// Both dictionaries are structurally identical, so a single shape is the type.
// The previous `typeof es | typeof en` union forced every `.map` call site to
// narrow, which is why five components had `(x: any)` casts.
export type Dict = typeof es

export type I18nContextType = {
  lang: "es" | "en"
  setLang: (lang: "es" | "en") => void
  toggle: () => void
  t: (path: string) => string
  dict: Dict
}

export const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function get(obj: unknown, path: string, fallback = ""): string {
  const value = path.split(".").reduce<unknown>(
    (acc, key) =>
      acc && typeof acc === "object" && key in acc
        ? (acc as Record<string, unknown>)[key]
        : undefined,
    obj,
  )
  return typeof value === "string" ? value : fallback
}
