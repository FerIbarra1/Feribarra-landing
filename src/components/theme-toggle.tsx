import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { useI18n } from "@/i18n/use-i18n";

type Theme = "light" | "dark" | "system";

const STORAGE_KEY = "theme";

function readStoredTheme(): Theme {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved === "light" || saved === "dark" || saved === "system" ? saved : "system";
    } catch {
        // Private mode / blocked site data.
        return "system";
    }
}

function applyTheme(theme: Theme) {
    const html = document.documentElement;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    html.classList.toggle("dark", theme === "dark" || (theme === "system" && prefersDark));
    try {
        if (theme === "system") localStorage.removeItem(STORAGE_KEY);
        else localStorage.setItem(STORAGE_KEY, theme);
    } catch {
        // Persisting the choice is best-effort; the class above already applied.
    }
}

export function ThemeToggle() {
    const { t } = useI18n();
    const [theme, setThemeState] = useState<Theme>(readStoredTheme);

    useEffect(() => {
        applyTheme(theme);
        if (theme !== "system") return;
        const query = window.matchMedia("(prefers-color-scheme: dark)");
        const listener = () => applyTheme("system");
        query.addEventListener("change", listener);
        return () => query.removeEventListener("change", listener);
    }, [theme]);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="relative">
                    <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">{t("theme.toggle")}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setThemeState("light")}>{t("theme.light")}</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setThemeState("dark")}>{t("theme.dark")}</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setThemeState("system")}>{t("theme.system")}</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
