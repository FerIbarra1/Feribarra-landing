import ProyectoVotometrica from "@/assets/optimized/ProyectoVotometrica.jpg"
import ProyectoRealDeal from "@/assets/optimized/ProyectoRealDeal.jpg"
import ProyectoWFacturas from "@/assets/optimized/ProyectoWFacturas.jpg"
import ProyectoVR from "@/assets/optimized/ProyectoVR.jpg"
import ProyectoEntrify from "@/assets/optimized/ProyectoEntrify.jpg"
import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"
import { useI18n } from "@/i18n/use-i18n"
import { useInView } from "@/hooks/use-in-view"

const images: Record<string, string> = {
    ProyectoVotometrica,
    ProyectoRealDeal,
    ProyectoWFacturas,
    ProyectoVR,
    ProyectoEntrify,
}

export function ProjectsSection() {
    const { dict, t } = useI18n()
    const projects = dict.projects.map((p) => ({ ...p, image: images[p.imageKey] }))
    const { ref, inView } = useInView<HTMLDivElement>()

    return (
        <section id="proyectos" className="py-32 md:py-44 lg:py-56 border-t border-border">
            <div ref={ref} data-inview={inView} className="container-page reveal">
                <div className="mb-16">
                    <p className="text-eyebrow uppercase text-signal-ink mb-6">
                        {t("projectsSection.title")}
                    </p>
                    <p className="text-lead text-foreground/85 max-w-[46rem] text-pretty">
                        {t("projectsSection.subtitle")}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, i) => (
                        <a
                            key={i}
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block"
                            aria-label={`${project.title} — ${t("projectsSection.viewProject")}`}
                        >
                            <Card className="group h-full overflow-hidden border border-border bg-card transition-all duration-300 hover:border-border-strong">
                                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        width={1400}
                                        height={788}
                                        loading="lazy"
                                        decoding="async"
                                        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>

                                <CardContent className="p-6">
                                    <h3 className="text-[1.25rem] font-semibold text-foreground mb-2 group-hover:text-signal-ink transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-meta text-muted-foreground leading-relaxed line-clamp-3 mb-4">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-1.5 mb-4">
                                        {project.technologies.slice(0, 4).map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-2 py-0.5 text-mono-sm border border-border rounded-md text-muted-foreground"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    <span className="inline-flex items-center gap-1.5 text-mono-sm text-foreground/85 group-hover:text-signal-ink transition-colors">
                                        {t("projectsSection.viewProject")}
                                        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                                    </span>
                                </CardContent>
                            </Card>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    )
}
