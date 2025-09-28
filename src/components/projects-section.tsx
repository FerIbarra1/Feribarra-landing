import { useMemo } from "react"
import ProyectoVotometrica from "@/assets/ProyectoVotometrica.png"
import ProyectoRealDeal from "@/assets/ProyectoRealDeal.png"
import ProyectoWFacturas from "@/assets/ProyectoWFacturas.png"
import ProyectoVR from "@/assets/ProyectoVR.png"
import ProyectoEntrify from "@/assets/ProyectoEntrify.png"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import { useI18n } from "@/i18n"

export function ProjectsSection() {
    const { dict, t } = useI18n()
    // const [currentProject, setCurrentProject] = useState(0)

    const images = { ProyectoVotometrica, ProyectoRealDeal, ProyectoWFacturas, ProyectoVR, ProyectoEntrify } as const
    const projects = useMemo(() =>
        dict.projects.map((p) => ({ ...p, image: (images as any)[p.imageKey] })),
        [dict.projects]
    )

    // const nextProject = () => setCurrentProject((prev) => (prev + 1) % projects.length)
    // const prevProject = () => setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length)

    // const project = projects[currentProject]

    return (
        <div className="py-20 bg-background">
            <div className="container px-4 mx-auto">
                <div className="text-center mb-16 animate-on-scroll">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
                        <span className="text-foreground">{t("projectsSection.title")}</span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">{t("projectsSection.subtitle")}</p>
                </div>

                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project, index) => (
                            <Card
                                key={index}
                                className="group overflow-hidden border-0 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
                            >
                                {/* Project Image/Visual */}
                                <div className="relative h-48 overflow-hidden">
                                    {/* <div
                                        className="absolute inset-0 bg-gradient-to-br opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                                        style={{
                                            background: `linear-gradient(135deg, ${project.colors.primary} 0%, ${project.colors.secondary} 50%, ${project.colors.accent} 100%)`,
                                        }}
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-center text-white">
                                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-3 mx-auto backdrop-blur-sm">
                                                <span className="text-2xl font-bold">{project.title.charAt(0)}</span>
                                            </div>
                                            <h3 className="text-lg font-semibold">{project.title}</h3>
                                        </div>
                                    </div> */}
                                    <img src={project.image} alt={project.title} className="w-full h-full object-cover object-center" />
                                    {/* Hover overlay */}
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </div>

                                <CardContent className="p-6">
                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                                                {project.title}
                                            </h3>
                                            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                                                {project.description}
                                            </p>
                                        </div>

                                        {/* Technologies */}
                                        <div>
                                            <div className="flex flex-wrap gap-1.5">
                                                {project.technologies.slice(0, 3).map((tech: string, techIndex: number) => (
                                                    <span
                                                        key={techIndex}
                                                        className="text-xs p-2 text-primary border rounded-xl border-primary/50">
                                                        {tech}
                                                    </span>
                                                ))}
                                                {project.technologies.length > 3 && (
                                                    <span className="text-xs p-2 text-primary border rounded-xl border-primary/50">
                                                        +{project.technologies.length - 3}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Action Button */}
                                        <div className="pt-2">
                                            <Button
                                                asChild
                                                size="sm"
                                                className="w-full py-5 group-hover:bg-primary group-hover:border-primary transition-all duration-300 bg-primary"
                                            >
                                                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                                    <ExternalLink className="w-4 h-4 mr-2" />
                                                    {t("projectsSection.viewProject")}
                                                </a>
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Featured Project Highlight */}
                    <div className="mt-16">
                        <div className="text-center mb-8">
                            <h3 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
                                <span className="text-foreground">{t("projectsSection.title2")}</span>
                            </h3>
                            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">{t("projectsSection.subtitle2")}</p>
                        </div>

                        <Card className="overflow-hidden border-2 border-primary/20 bg-gradient-to-r from-background to-muted/30">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                                {/* Featured Project Visual */}
                                {/* <div className="relative h-64 lg:h-80">
                                    <div
                                        className="absolute inset-0 bg-gradient-to-br opacity-90"
                                        style={{
                                            background: `linear-gradient(135deg, ${projects[0].colors.primary} 0%, ${projects[0].colors.secondary} 50%, ${projects[0].colors.accent} 100%)`,
                                        }}
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-center text-white">
                                            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto backdrop-blur-sm">
                                                <span className="text-3xl font-bold">{projects[0].title.charAt(0)}</span>
                                            </div>
                                            <h4 className="text-xl font-semibold">{projects[0].title}</h4>
                                        </div>
                                    </div>
                                </div> */}

                                <img src={projects[0].image} alt={projects[0].title} className="w-full h-64 lg:h-auto object-cover object-center" />

                                {/* Featured Project Content */}
                                <CardContent className="flex flex-col justify-center p-8 lg:p-12">
                                    <div>
                                        <h3 className="text-3xl font-bold text-foreground mb-4">{projects[0].title}</h3>
                                        <p className="text-muted-foreground leading-relaxed mb-6 text-lg">{projects[0].description}</p>

                                        <div className="mb-8">
                                            <h4 className="text-sm font-semibold text-foreground/80 mb-3">{t("projectsSection.tech")}</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {projects[0].technologies.map((tech: string, index: number) => (
                                                    <span
                                                        key={index}
                                                        className="px-3 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex gap-4">
                                            <Button asChild size="lg" className="flex-1 py-6 text-base font-semibold">
                                                <a href={projects[0].liveUrl} target="_blank" rel="noopener noreferrer">
                                                    <ExternalLink className="w-4 h-4 mr-2" />
                                                    {t("projectsSection.viewProject")}
                                                </a>
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
