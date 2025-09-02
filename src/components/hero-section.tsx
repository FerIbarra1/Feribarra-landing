"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react"
import logo from "./../assets/LogoFernandoIbarra.png"
import { useI18n } from "@/i18n"

export function HeroSection() {
    const { t } = useI18n()
    return (
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-card to-muted relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full animate-pulse"></div>
                <div className="absolute top-40 right-20 w-16 h-16 bg-accent/10 rounded-full animate-bounce delay-1000"></div>
                <div className="absolute bottom-40 left-20 w-12 h-12 bg-primary/20 rounded-full animate-pulse delay-500"></div>
                <div className="absolute bottom-20 right-10 w-24 h-24 bg-accent/10 rounded-full animate-bounce delay-700"></div>
            </div>

            <div className="container px-4 mx-auto text-center relative z-10">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8 flex justify-center">
                        <div className="relative animate-in fade-in-0 zoom-in-95 duration-1000">
                            <img
                                src={logo}
                                alt="Fernando Ibarra Logo"
                                width={300}
                                height={300}
                                className="animate-float"
                            />
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 text-balance animate-in slide-in-from-bottom-4 duration-1000">
                        {t("hero.name")}
                    </h1>
                    <h2 className="text-xl md:text-2xl lg:text-3xl text-primary font-semibold mb-8 animate-in slide-in-from-bottom-4 duration-1000 delay-200">
                        {t("hero.role")}
                    </h2>
                    <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto text-pretty animate-in slide-in-from-bottom-4 duration-1000 delay-300">
                        {t("hero.description")}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-in slide-in-from-bottom-4 duration-1000 delay-500">
                        <Button size="lg" className="gap-2 hover:scale-105 transition-transform">
                            <a href="#proyectos" className="flex items-center gap-2">
                                {t("hero.ctaProjects")}
                                <ArrowDown className="h-4 w-4 animate-bounce" />
                            </a>
                        </Button>
                        <Button variant="outline" size="lg" className="gap-2 bg-transparent hover:scale-105 transition-transform">
                            <a href="#contacto" className="flex items-center gap-2">
                                <Mail className="h-4 w-4" />
                                {t("hero.ctaContact")}
                            </a>
                        </Button>
                    </div>

                    <div className="flex justify-center gap-6 animate-in slide-in-from-bottom-4 duration-1000 delay-700">
                        <Button variant="ghost" size="sm" className="gap-2 hover:scale-110 hover:text-primary transition-all cursor-pointer"
                            onClick={() => (window.location.href = "https://www.github.com/feribarra1")}
                        >
                            <Github className="h-5 w-5" />
                            {t("hero.socialGithub")}
                        </Button>
                        <Button variant="ghost" size="sm" className="gap-2 hover:scale-110 hover:text-primary transition-all cursor-pointer"
                            onClick={() => (window.location.href = "https://www.linkedin.com/in/feribarra1/")}
                        >
                            <Linkedin className="h-5 w-5" />
                            {t("hero.socialLinkedin")}
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="gap-2 hover:scale-110 hover:text-primary transition-all cursor-pointer"
                            onClick={() => (window.location.href = "mailto:Fernandooibarra@gmail.com")}
                        >
                            <Mail className="h-5 w-5" />
                            {t("hero.socialEmail")}
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
