"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown, Code2, Github, Linkedin, Mail, Sparkles } from "lucide-react"
import logo from "./../assets/FILogo.png"
import { useI18n } from "@/i18n"
import { useEffect, useState } from "react"

export function HeroSection() {
    const { t } = useI18n()

    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY })
        }
        window.addEventListener("mousemove", handleMouseMove)
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [])

    return (
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden py-5">
            <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-accent/10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(117,190,218,0.1),transparent_50%)]"></div>

                {/* Interactive floating elements */}
                <div
                    className="absolute w-96 h-96 bg-primary/10 rounded-full blur-3xl transition-all duration-1000 ease-out"
                    style={{
                        left: mousePosition.x * 0.02 + "px",
                        top: mousePosition.y * 0.02 + "px",
                    }}
                ></div>
                <div
                    className="absolute w-64 h-64 bg-accent/15 rounded-full blur-2xl transition-all duration-700 ease-out"
                    style={{
                        right: mousePosition.x * -0.01 + "px",
                        bottom: mousePosition.y * -0.01 + "px",
                    }}
                ></div>

                {/* Floating tech icons */}
                <div className="absolute top-20 left-10 w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center animate-float backdrop-blur-sm">
                    <Code2 className="w-8 h-8 text-primary" />
                </div>
                <div
                    className="absolute top-40 right-20 w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center animate-float backdrop-blur-sm"
                    style={{ animationDelay: "1s" }}
                >
                    <Sparkles className="w-6 h-6 text-accent" />
                </div>
                <div
                    className="absolute bottom-40 left-20 w-14 h-14 bg-secondary/20 rounded-2xl flex items-center justify-center animate-float backdrop-blur-sm"
                    style={{ animationDelay: "2s" }}
                >
                    <Github className="w-7 h-7 text-secondary" />
                </div>
            </div>

            <div className="container px-4 mx-auto text-center relative z-10">
                <div className="max-w-5xl mx-auto">
                    <div className=" flex justify-center">
                        <div className="relative animate-fade-scale">
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-2xl scale-150"></div>
                            <div className="relative w-50 h-50 bg-gradient-to-br from-primary via-secondary to-accent rounded-full flex items-center justify-center animate-float drop-shadow-2xl">
                                {/* <img src={logo} alt="Logo" className="w-72 h-72 animate-fade-scale" /> */}
                                {/* <div className="w-48 h-48 bg-background/90 rounded-full flex items-center justify-center backdrop-blur-sm">
                                </div> */}
                                    <span className="text-9xl font-bold">🚀</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6 mb-12">
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-balance animate-slide-up">
                            <span className="gradient-text">{t("hero.name")}</span>
                        </h1>
                        <h2
                            className="text-xl md:text-3xl lg:text-4xl font-semibold text-primary animate-slide-up"
                            style={{ animationDelay: "0.2s" }}
                        >
                            {t("hero.role")}
                        </h2>
                        <p
                            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed animate-slide-up"
                            style={{ animationDelay: "0.4s" }}
                        >
                            {t("hero.description")}
                        </p>
                    </div>

                    <div
                        className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-slide-up"
                        style={{ animationDelay: "0.6s" }}
                    >
                        <Button
                            size="lg"
                            className="group relative text-white overflow-hidden bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-accent transition-all duration-500 transform hover:scale-105 shadow-2xl hover:shadow-primary/25 px-8 py-6 text-lg font-semibold"
                        >
                            <a href="#proyectos" className="flex items-center gap-3 relative z-10">
                                {t("hero.ctaProjects")}
                                <ArrowDown className="h-5 w-5 animate-bounce group-hover:translate-y-1 transition-transform" />
                            </a>
                            <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </Button>

                        <Button
                            variant="outline"
                            size="lg"
                            className="group gradient-border text-primary hover:text-primary transition-all duration-500 transform hover:scale-105 px-8 py-6 text-lg font-semibold bg-transparent cursor-pointer"
                        >
                            <a href="#contacto" className="flex items-center gap-3 relative z-10">
                                <Mail className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                                {t("hero.ctaContact")}
                            </a>
                        </Button>
                    </div>

                    <div className="flex justify-center gap-8 animate-slide-up" style={{ animationDelay: "0.8s" }}>
                        {[
                            { icon: Github, label: t("hero.socialGithub"), url: "https://www.github.com/feribarra1" },
                            { icon: Linkedin, label: t("hero.socialLinkedin"), url: "https://www.linkedin.com/in/feribarra1/" },
                            { icon: Mail, label: t("hero.socialEmail"), url: "mailto:Fernandooibarra@gmail.com" },
                        ].map(({ icon: Icon, label, url }, index) => (
                            <Button
                                key={label}
                                variant="ghost"
                                size="lg"
                                className="group relative overflow-hidden hover:bg-primary/10 transition-all duration-300 transform hover:scale-110 hover:text-primary p-8 cursor-pointer"
                                onClick={() => (window.location.href = url)}
                                style={{ animationDelay: `${0.8 + index * 0.1}s` }}
                            >
                                <div className="flex flex-col items-center gap-2">
                                    <Icon className="h-6 w-6 group-hover:scale-125 transition-transform duration-300" />
                                    <span className="text-sm font-medium">{label}</span>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
