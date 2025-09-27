import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { Menu, X } from "lucide-react"
// import logo from "./../assets/LogoFernandoIbarra2.png"
import { useI18n } from "@/i18n"

export function Navigation() {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const { t } = useI18n()

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const navItems = [
        { name: t("nav.home"), href: "#inicio" },
        { name: t("nav.experience"), href: "#experiencia" },
        { name: t("nav.skills"), href: "#habilidades" },
        { name: t("nav.projects"), href: "#proyectos" },
        { name: t("nav.certifications"), href: "#certificaciones" },
        { name: t("nav.contact"), href: "#contacto" },
    ]

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg" : "bg-transparent"
                }`}
        >
            <div className="container px-4 mx-auto">
                <div className="flex items-center justify-between h-20">
                    <div className="relative">
                        <div className="h-12 w-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-105 animate-glow">
                            <span className="text-white font-bold text-xl">FI</span>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item, index) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="relative text-muted-foreground font-medium text-lg hover:text-primary transition-all duration-300 group"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                {item.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300 group-hover:w-full"></span>
                            </a>
                        ))}
                    </div>

                    <div className="flex items-center gap-3">
                        <LanguageToggle />
                        <ThemeToggle />

                        {/* Mobile menu button */}
                        <Button
                            variant="ghost"
                            size="sm"
                            className="md:hidden hover:bg-primary/10 transition-colors"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </Button>
                    </div>
                </div>

                {isOpen && (
                    <div className="md:hidden py-6 border-t border-border/50 bg-background/95 backdrop-blur-xl animate-slide-up">
                        <div className="flex flex-col space-y-4">
                            {navItems.map((item, index) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="px-4 py-3 text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-300 font-medium"
                                    onClick={() => setIsOpen(false)}
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    {item.name}
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}
