import { useState } from "react"
import ProyectoVotometrica from "@/assets/ProyectoVotometrica.png"
import ProyectoRealDeal from "@/assets/ProyectoRealDeal.png"
import ProyectoWFacturas from "@/assets/ProyectoWFacturas.png"
import ProyectoVR from "@/assets/ProyectoVR.png"
import ProyectoEntrify from "@/assets/ProyectoEntrify.png"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"

const projects = [
    {
        id: 1,
        title: "Votométrica",
        description:
            "Plataforma de comercio electrónico completa desarrollada con Next.js, TypeScript y Stripe. Incluye gestión de inventario, carrito de compras, procesamiento de pagos y panel de administración.",
        image: ProyectoVotometrica,
        technologies: ["Next.js", "TypeScript", "Stripe", "Prisma", "PostgreSQL"],
        liveUrl: "https://www.votometrica.com",
        githubUrl: "#",
        colors: {
            primary: "#3b82f6", // Blue
            secondary: "#1e40af",
            accent: "#60a5fa",
            shadow: "59 130 246", // RGB values for shadow
        },
    },
    {
        id: 2,
        title: "RealDeal JC",
        description:
            "Aplicación de gestión de tareas con funcionalidades de colaboración en tiempo real. Desarrollada con React Native para móviles y Next.js para web, con sincronización en tiempo real.",
        image: ProyectoRealDeal,
        technologies: ["React Native", "Next.js", "Socket.io", "MongoDB", "Express"],
        liveUrl: "https://www.realdealjc.com",
        githubUrl: "#",
        colors: {
            primary: "#10b981", // Emerald
            secondary: "#047857",
            accent: "#34d399",
            shadow: "16 185 129",
        },
    },
    {
        id: 3,
        title: "WFacturas",
        description:
            "Dashboard de análisis con inteligencia artificial para visualización de datos empresariales. Incluye gráficos interactivos, predicciones ML y reportes automatizados.",
        image: ProyectoWFacturas,
        technologies: ["React", "D3.js", "Python", "TensorFlow", "FastAPI"],
        liveUrl: "https://www.wfacturas.com",
        githubUrl: "#",
        colors: {
            primary: "#8b5cf6", // Violet
            secondary: "#7c3aed",
            accent: "#a78bfa",
            shadow: "139 92 246",
        },
    },
    {
        id: 4,
        title: "VR VideoRemixes",
        description:
            "Red social completa con sistema de posts, comentarios, likes y chat en tiempo real. Arquitectura escalable con microservicios y CDN para optimización de imágenes.",
        image: ProyectoVR,
        technologies: ["Vue.js", "Node.js", "Redis", "AWS S3", "Docker"],
        liveUrl: "https://www.videoremixespacks.com",
        githubUrl: "#",
        colors: {
            primary: "#f59e0b", // Amber
            secondary: "#d97706",
            accent: "#fbbf24",
            shadow: "245 158 11",
        },
    },
    {
        id: 5,
        title: "Entrify",
        description:
            "Red social completa con sistema de posts, comentarios, likes y chat en tiempo real. Arquitectura escalable con microservicios y CDN para optimización de imágenes.",
        image: ProyectoEntrify,
        technologies: ["Vue.js", "Node.js", "Redis", "AWS S3", "Docker"],
        liveUrl: "https://www.entrify.mx",
        githubUrl: "#",
        colors: {
            primary: "#f59e0b", // Amber
            secondary: "#d97706",
            accent: "#fbbf24",
            shadow: "245 158 11",
        },
    },
]

export function ProjectsSection() {
    const [currentProject, setCurrentProject] = useState(0)

    const nextProject = () => {
        setCurrentProject((prev) => (prev + 1) % projects.length)
    }

    const prevProject = () => {
        setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length)
    }

    const project = projects[currentProject]

    return (
        <div className="py-20 bg-background">
            <div className="container px-4 mx-auto">
                <div className="text-center mb-16 animate-on-scroll">
                    <h2 className="text-4xl font-bold mb-4 text-balance">
                        Mis <span className="text-primary">Proyectos</span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
                        Una selección de proyectos que demuestran mis habilidades en desarrollo full-stack
                    </p>
                </div>

                <div className="max-w-6xl mx-auto">
                    <div className="relative">
                        {/* Project Card */}
                        <Card
                            className="overflow-hidden border-2 transition-all duration-700 animate-in slide-in-from-right-5 backdrop-blur-sm px-4"
                            style={{
                                borderColor: project.colors.primary,
                                boxShadow: `0 0 0 1px ${project.colors.primary}20, 0 25px 50px -12px rgba(${project.colors.shadow}, 0.4), 0 0 60px rgba(${project.colors.shadow}, 0.15)`,
                                background: `linear-gradient(135deg, rgba(${project.colors.shadow}, 0.03) 0%, rgba(${project.colors.shadow}, 0.08) 100%)`,
                            }}
                        >
                            <div className="grid md:grid-cols-2 gap-0">
                                {/* Project Image */}
                                <div className="relative h-64 md:h-full bg-muted overflow-hidden">
                                    <img
                                        src={project.image || "/placeholder.svg"}
                                        alt={project.title}
                                        className="object-cover transition-all duration-700 hover:scale-110 rounded-xl"
                                    />
                                    <div
                                        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-xl"
                                        style={{
                                            background: `linear-gradient(135deg, rgba(${project.colors.shadow}, 0.2) 0%, rgba(${project.colors.shadow}, 0.4) 100%)`,
                                        }}
                                    />
                                    <div
                                        className="absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm animate-pulse shadow-lg"
                                        style={{
                                            backgroundColor: project.colors.primary,
                                            color: "white",
                                            boxShadow: `0 0 20px rgba(${project.colors.shadow}, 0.6)`,
                                        }}
                                    >
                                        {project.id}
                                    </div>
                                </div>

                                {/* Project Content */}
                                <CardContent className="p-8 flex flex-col justify-center">
                                    <div className="space-y-6">
                                        <div className="animate-fade-in-up">
                                            <h3
                                                className="text-2xl font-bold mb-3 text-balance transition-colors duration-300 hover:drop-shadow-lg"
                                                style={
                                                    {
                                                        "--hover-color": project.colors.primary,
                                                    } as React.CSSProperties
                                                }
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.color = project.colors.primary
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.color = ""
                                                }}
                                            >
                                                {project.title}
                                            </h3>
                                            <p className="text-muted-foreground leading-relaxed text-pretty">{project.description}</p>
                                        </div>

                                        {/* Technologies */}
                                        <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                                            <h4 className="font-semibold mb-3">Tecnologías utilizadas:</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {project.technologies.map((tech, index) => (
                                                    <span
                                                        key={tech}
                                                        className="px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 cursor-default animate-in slide-in-from-bottom-2 hover:scale-105 hover:shadow-lg"
                                                        style={{
                                                            backgroundColor: `rgba(${project.colors.shadow}, 0.1)`,
                                                            color: project.colors.primary,
                                                            border: `1px solid rgba(${project.colors.shadow}, 0.2)`,
                                                            animationDelay: `${index * 0.1}s`,
                                                        }}
                                                        onMouseEnter={(e) => {
                                                            e.currentTarget.style.backgroundColor = `rgba(${project.colors.shadow}, 0.2)`
                                                            e.currentTarget.style.boxShadow = `0 4px 12px rgba(${project.colors.shadow}, 0.3)`
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            e.currentTarget.style.backgroundColor = `rgba(${project.colors.shadow}, 0.1)`
                                                            e.currentTarget.style.boxShadow = ""
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
                                                    Ver Proyecto
                                                </a>
                                            </Button>
                                            {/* <Button
                                                variant="outline"
                                                asChild
                                                className="flex-1 hover:scale-105 transition-all duration-300 bg-transparent shadow-lg hover:shadow-xl"
                                                style={{
                                                    borderColor: project.colors.primary,
                                                    color: project.colors.primary,
                                                    boxShadow: `0 2px 8px rgba(${project.colors.shadow}, 0.2)`,
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.backgroundColor = project.colors.primary
                                                    e.currentTarget.style.color = "white"
                                                    e.currentTarget.style.boxShadow = `0 8px 25px rgba(${project.colors.shadow}, 0.4)`
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.backgroundColor = "transparent"
                                                    e.currentTarget.style.color = project.colors.primary
                                                    e.currentTarget.style.boxShadow = `0 2px 8px rgba(${project.colors.shadow}, 0.2)`
                                                }}
                                            >
                                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                                    <Github className="w-4 h-4 mr-2" />
                                                    Código
                                                </a>
                                            </Button> */}
                                        </div>
                                    </div>
                                </CardContent>
                            </div>
                        </Card>

                        {/* Navigation Buttons */}
                        <div className="flex justify-between items-center mt-8">
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={prevProject}
                                className="transition-all duration-300 hover:scale-105 bg-transparent shadow-lg hover:shadow-xl"
                                style={{
                                    borderColor: project.colors.primary,
                                    color: project.colors.primary,
                                    boxShadow: `0 2px 8px rgba(${project.colors.shadow}, 0.2)`,
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = project.colors.primary
                                    e.currentTarget.style.color = "white"
                                    e.currentTarget.style.boxShadow = `0 8px 25px rgba(${project.colors.shadow}, 0.4)`
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = "transparent"
                                    e.currentTarget.style.color = project.colors.primary
                                    e.currentTarget.style.boxShadow = `0 2px 8px rgba(${project.colors.shadow}, 0.2)`
                                }}
                            >
                                <ChevronLeft className="w-5 h-5 mr-2" />
                                Anterior
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
                                variant="outline"
                                size="lg"
                                onClick={nextProject}
                                className="transition-all duration-300 hover:scale-105 bg-transparent shadow-lg hover:shadow-xl"
                                style={{
                                    borderColor: project.colors.primary,
                                    color: project.colors.primary,
                                    boxShadow: `0 2px 8px rgba(${project.colors.shadow}, 0.2)`,
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = project.colors.primary
                                    e.currentTarget.style.color = "white"
                                    e.currentTarget.style.boxShadow = `0 8px 25px rgba(${project.colors.shadow}, 0.4)`
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = "transparent"
                                    e.currentTarget.style.color = project.colors.primary
                                    e.currentTarget.style.boxShadow = `0 2px 8px rgba(${project.colors.shadow}, 0.2)`
                                }}
                            >
                                Siguiente
                                <ChevronRight className="w-5 h-5 ml-2" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
