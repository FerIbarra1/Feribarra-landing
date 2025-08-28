import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"

export function LanguageToggle() {
    const [language, setLanguage] = useState<"es" | "en">("es")

    const toggleLanguage = () => {
        setLanguage((prev) => (prev === "es" ? "en" : "es"))
    }

    return (
        <Button variant="ghost" size="sm" onClick={toggleLanguage} className="gap-2">
            <Globe className="h-4 w-4" />
            {language === "es" ? "ES" : "EN"}
        </Button>
    )
}
