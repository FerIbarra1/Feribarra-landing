import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { Menu, X } from "lucide-react"
import logo from "./../assets/LogoFernandoIbarra2.png"

export function Navigation() {
    const [isOpen, setIsOpen] = useState(false)

    const navItems = [
        { name: "Inicio", href: "#inicio" },
        { name: "Experiencia", href: "#experiencia" },
        { name: "Habilidades", href: "#habilidades" },
        { name: "Proyectos", href: "#proyectos" },
        { name: "Certificaciones", href: "#certificaciones" },
        { name: "Contacto", href: "#contacto" },
    ]

    return (
        <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
            <div className="container px-4 mx-auto">
                <div className="flex items-center justify-between h-32">
                    <img src={logo} alt="Logo" className="h-40 md:h-50 w-auto" />

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="text-muted-foreground font-bold text-lg hover:text-primary transition-colors"
                            >
                                {item.name}
                            </a>
                        ))}
                    </div>

                    <div className="flex items-center gap-2">
                        <LanguageToggle />
                        <ThemeToggle />

                        {/* Mobile menu button */}
                        <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                            {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                        </Button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <div className="md:hidden py-4 border-t border-border">
                        <div className="flex flex-col space-y-2">
                            {navItems.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="px-4 py-2 text-muted-foreground hover:text-primary transition-colors"
                                    onClick={() => setIsOpen(false)}
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
