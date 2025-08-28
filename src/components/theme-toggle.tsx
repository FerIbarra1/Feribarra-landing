import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";

function setHtmlTheme(theme: "light" | "dark" | "system") {
    const html = document.documentElement;
    if (theme === "system") {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        html.classList.toggle("dark", prefersDark);
        localStorage.removeItem("theme");
    } else {
        html.classList.toggle("dark", theme === "dark");
        localStorage.setItem("theme", theme);
    }
}

export function ThemeToggle() {
    const [theme, setThemeState] = useState<string>(() => {
        return localStorage.getItem("theme") || "system";
    });

    useEffect(() => {
        if (theme === "system") {
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
            setHtmlTheme("system");
            const listener = (e: MediaQueryListEvent) => {
                setHtmlTheme(e.matches ? "dark" : "light");
            };
            prefersDark.addEventListener("change", listener);
            return () => prefersDark.removeEventListener("change", listener);
        } else {
            setHtmlTheme(theme as "light" | "dark");
        }
    }, [theme]);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="font-geist-sans font-semibold">
                    <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="font-geist-sans font-medium">
                <DropdownMenuItem onClick={() => setThemeState("light")}>Claro</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setThemeState("dark")}>Oscuro</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setThemeState("system")}>Sistema</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
