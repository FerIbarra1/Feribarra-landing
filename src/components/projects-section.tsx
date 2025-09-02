import { useMemo, useState } from "react"
import ProyectoVotometrica from "@/assets/ProyectoVotometrica.png"
import ProyectoRealDeal from "@/assets/ProyectoRealDeal.png"
import ProyectoWFacturas from "@/assets/ProyectoWFacturas.png"
import ProyectoVR from "@/assets/ProyectoVR.png"
import ProyectoEntrify from "@/assets/ProyectoEntrify.png"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import { useI18n } from "@/i18n"

export function ProjectsSection() {
    const { dict, t } = useI18n()
    const [currentProject, setCurrentProject] = useState(0)

    const images = { ProyectoVotometrica, ProyectoRealDeal, ProyectoWFacturas, ProyectoVR, ProyectoEntrify } as const
    const projects = useMemo(() =>
        dict.projects.map((p: any) => ({ ...p, image: (images as any)[p.imageKey] })),
        [dict.projects]
    )

    const nextProject = () => setCurrentProject((prev) => (prev + 1) % projects.length)
    const prevProject = () => setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length)

    const project = projects[currentProject]

    return (
        <div className="py-20 bg-background">
            <div className="container px-4 mx-auto">
                <div className="text-center mb-16 animate-on-scroll">
                    <h2 className="text-4xl font-bold mb-4 text-balance">
                        <span className="text-primary">{t("projectsSection.title")}</span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
                        {t("projectsSection.subtitle")}
                    </p>
                </div>

                <div className="max-w-6xl mx-auto">
                    <div className="relative">
                        <Card className="overflow-hidden border-2 transition-all duration-700 animate-in slide-in-from-right-5 backdrop-blur-sm px-4 ">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                                {/* Image Side */}
                                <div className="relative group">
                                    <div
                                        className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl opacity-70 group-hover:opacity-90 transition duration-500"
                                        style={{
                                            background: `radial-gradient(circle at 30% 30%, ${project.colors.secondary} 0%, transparent 60%), radial-gradient(circle at 70% 70%, ${project.colors.accent} 0%, transparent 60%)`,
                                        }}
                                    />
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-contain rounded-xl relative z-10 transform group-hover:scale-[1.02] transition duration-500"
                                        loading="lazy"
                                    />
                                </div>

                                {/* Content Side */}
                                <CardContent className="flex flex-col justify-between py-6">
                                    <div>
                                        <div className="mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                                            <h3 className="text-3xl font-bold text-foreground mb-2" style={{ color: project.colors.primary }}>{project.title}</h3>
                                            <p className="text-muted-foreground leading-relaxed">{project.description}</p>
                                        </div>

                                        <div className="mb-6 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                                            <h4 className="text-sm font-semibold text-foreground/80 mb-3">{t("projectsSection.tech")}</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {project.technologies.map((tech: string, index: number) => (
                                                    <span
                                                        key={index}
                                                        className="px-3 py-1 rounded-full text-xs font-medium transition-all border"
                                                        style={{
                                                            borderColor: project.colors.primary,
                                                            color: project.colors.primary,
                                                            backgroundColor: `rgba(${project.colors.shadow}, 0.1)`,
                                                        }}
                                                        onMouseEnter={(e) => {
                                                            (e.currentTarget as HTMLSpanElement).style.backgroundColor = `rgba(${project.colors.shadow}, 0.2)`
                                                            ;(e.currentTarget as HTMLSpanElement).style.boxShadow = `0 4px 12px rgba(${project.colors.shadow}, 0.3)`
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            (e.currentTarget as HTMLSpanElement).style.backgroundColor = `rgba(${project.colors.shadow}, 0.1)`
                                                            ;(e.currentTarget as HTMLSpanElement).style.boxShadow = ""
                                                        }}
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex gap-4 pt-4 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
                                            <Button
                                                asChild
                                                className="flex-1 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border-0"
                                                style={{
                                                    backgroundColor: project.colors.primary,
                                                    color: "white",
                                                    boxShadow: `0 4px 14px rgba(${project.colors.shadow}, 0.4)`,
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.backgroundColor = project.colors.secondary
                                                    e.currentTarget.style.boxShadow = `0 8px 25px rgba(${project.colors.shadow}, 0.6)`
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.backgroundColor = project.colors.primary
                                                    e.currentTarget.style.boxShadow = `0 4px 14px rgba(${project.colors.shadow}, 0.4)`
                                                }}
                                            >
                                                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                                    <ExternalLink className="w-4 h-4 mr-2" />
                                                    {t("projectsSection.viewProject")}
                                                </a>
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </div>
                        </Card>

                        {/* Navigation Buttons */}
                        <div className="flex justify-between items-center mt-8">
                            <Button
                                variant="default"
                                size="lg"
                                onClick={prevProject}
                                className="transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl bg-primary"
                            >
                                <ChevronLeft className="w-5 h-5 mr-2" />
                                {t("projectsSection.prev")}
                            </Button>

                            {/* Project Indicators */}
                            <div className="flex gap-3">
                                {projects.map((proj, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentProject(index)}
                                        className="w-4 h-4 rounded-full transition-all duration-500 hover:scale-125 shadow-lg"
                                        style={{
                                            backgroundColor: index === currentProject ? proj.colors.primary : "rgba(156, 163, 175, 0.3)",
                                            boxShadow:
                                                index === currentProject
                                                    ? `0 0 20px rgba(${proj.colors.shadow}, 0.6), 0 4px 12px rgba(${proj.colors.shadow}, 0.4)`
                                                    : "0 2px 4px rgba(0, 0, 0, 0.1)",
                                            transform: index === currentProject ? "scale(1.25)" : "scale(1)",
                                        }}
                                        onMouseEnter={(e) => {
                                            if (index !== currentProject) {
                                                e.currentTarget.style.backgroundColor = `rgba(${proj.colors.shadow}, 0.5)`
                                                e.currentTarget.style.boxShadow = `0 0 15px rgba(${proj.colors.shadow}, 0.4)`
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (index !== currentProject) {
                                                e.currentTarget.style.backgroundColor = "rgba(156, 163, 175, 0.3)"
                                                e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)"
                                            }
                                        }}
                                    />
                                ))}
                            </div>

                            <Button
                                variant="default"
                                size="lg"
                                onClick={nextProject}
                                className="transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl bg-primary"
                            >
                                {t("projectsSection.next")}
                                <ChevronRight className="w-5 h-5 ml-2" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
