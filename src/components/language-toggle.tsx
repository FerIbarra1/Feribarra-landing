import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"
import { useI18n } from "@/i18n"

export function LanguageToggle() {
    const { lang, toggle } = useI18n()

    return (
        <Button variant="ghost" size="sm" onClick={toggle} className="gap-2">
            <Globe className="h-4 w-4" />
            {lang === "es" ? "ES" : "EN"}
        </Button>
    )
}
