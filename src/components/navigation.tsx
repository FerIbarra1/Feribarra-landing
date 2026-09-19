import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { Menu, X } from "lucide-react"
import logo from "@/assets/optimized/FILogo.jpg"
import { useI18n } from "@/i18n/use-i18n"

export function Navigation() {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [activeId, setActiveId] = useState("inicio")
    const triggerRef = useRef<HTMLButtonElement>(null)
    const panelRef = useRef<HTMLDivElement>(null)
    const { t } = useI18n()

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 24)
        handleScroll()
        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const navItems = [
        { name: t("nav.home"), href: "#inicio" },
        { name: t("nav.experience"), href: "#experiencia" },
        { name: t("nav.skills"), href: "#habilidades" },
        { name: t("nav.projects"), href: "#proyectos" },
        { name: t("nav.certifications"), href: "#certificaciones" },
        { name: t("nav.education"), href: "#formacion" },
        { name: t("nav.contact"), href: "#contacto" },
    ]

    // The active section drives aria-current, which is what a screen reader
    // announces instead of the visual underline.
    useEffect(() => {
        const sections = navItems
            .map((item) => document.querySelector(item.href))
            .filter((el): el is Element => el !== null)
        if (sections.length === 0) return

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
                if (visible?.target.id) setActiveId(visible.target.id)
            },
            { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
        )
        sections.forEach((s) => observer.observe(s))
        return () => observer.disconnect()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [t])

    useEffect(() => {
        if (!isOpen) return

        const panel = panelRef.current
        panel?.querySelector<HTMLAnchorElement>("a")?.focus()

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setIsOpen(false)
                triggerRef.current?.focus()
            }
        }
        const onPointerDown = (e: PointerEvent) => {
            if (!panel?.contains(e.target as Node)) setIsOpen(false)
        }

        document.addEventListener("keydown", onKeyDown)
        document.addEventListener("pointerdown", onPointerDown)
        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = "hidden"
        return () => {
            document.removeEventListener("keydown", onKeyDown)
            document.removeEventListener("pointerdown", onPointerDown)
            document.body.style.overflow = previousOverflow
        }
    }, [isOpen])

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-500 ${
                scrolled
                    ? "bg-background/80 backdrop-blur-xl border-b border-border"
                    : "bg-transparent"
            }`}
        >
            <div className="container-page">
                <div className="flex items-center justify-between h-22">
                    <a
                        href="#inicio"
                        aria-label={t("nav.home")}
                        className="shrink-0 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                    >
                        <img
                            src={logo}
                            alt="Fernando Ibarra"
                            width={48}
                            height={48}
                            decoding="async"
                            className="h-12 w-12 rounded-full"
                        />
                    </a>

                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => {
                            const isActive = activeId === item.href.slice(1)
                            return (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    aria-current={isActive ? "page" : undefined}
                                    className={`relative text-meta transition-colors duration-200 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/50 ${
                                        isActive
                                            ? "text-foreground"
                                            : "text-muted-foreground hover:text-foreground"
                                    }`}
                                >
                                    {item.name}
                                    <span
                                        aria-hidden="true"
                                        className={`absolute -bottom-1.5 left-0 right-0 h-px bg-signal-ink origin-left transition-transform duration-300 ${
                                            isActive ? "scale-x-100" : "scale-x-0"
                                        }`}
                                    />
                                </a>
                            )
                        })}
                    </div>

                    <div className="flex items-center gap-2">
                        <LanguageToggle />
                        <ThemeToggle />
                        <a
                            href="/cv/fernando-ibarra-cv-es.pdf"
                            download="fernando-ibarra-cv-es.pdf"
                            className="hidden md:inline-flex text-meta text-muted-foreground hover:text-foreground transition-colors border border-border rounded-md px-3 py-1.5 outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                        >
                            {t("nav.downloadCv")}
                        </a>
                        <Button
                            ref={triggerRef}
                            variant="ghost"
                            size="sm"
                            className="md:hidden hover:bg-accent"
                            aria-label={isOpen ? t("nav.menuClose") : t("nav.menuOpen")}
                            aria-expanded={isOpen}
                            aria-controls="mobile-menu"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </Button>
                    </div>
                </div>

                {isOpen && (
                    <div
                        id="mobile-menu"
                        ref={panelRef}
                        className="md:hidden py-6 border-t border-border bg-background/95 backdrop-blur-xl"
                    >
                        <ul className="flex flex-col gap-1">
                            {navItems.map((item) => (
                                <li key={item.href}>
                                    <a
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        aria-current={
                                            activeId === item.href.slice(1) ? "page" : undefined
                                        }
                                        className="block px-4 py-3 text-meta text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                                    >
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    )
}
