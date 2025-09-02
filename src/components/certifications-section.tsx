import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award } from "lucide-react"

const certifications = [
    {
        provider: "Microsoft",
        certifications: [
            {
                name: "Software Development Fundamentals",
                description: "Fundamentos del desarrollo de software, principios de programación y mejores prácticas.",
                technologies: ["C#", ".NET", "Software Architecture", "OOP"],
            },
            {
                name: "Generative AI Fundamentals",
                description: "Fundamentos de IA generativa, modelos de lenguaje y aplicaciones prácticas.",
                technologies: ["AI", "Machine Learning", "GPT", "Azure AI"],
            },
            {
                name: "Systems Administration Career Fundamentals",
                description: "Administración de sistemas, infraestructura y gestión de servidores.",
                technologies: ["Windows Server", "PowerShell", "Active Directory", "Networking"],
            },
        ],
    },
    {
        provider: "DevTalles",
        certifications: [
            {
                name: "TypeScript",
                description: "Desarrollo avanzado con TypeScript, tipos, interfaces y patrones de diseño.",
                technologies: ["TypeScript", "JavaScript", "Type Safety", "OOP"],
            },
            {
                name: "React & React PRO",
                description: "Desarrollo completo con React, hooks, context, patrones avanzados y optimización.",
                technologies: ["React", "Hooks", "Context API", "Performance"],
            },
            {
                name: "Next.js",
                description: "Framework de React para aplicaciones full-stack con SSR, SSG y API routes.",
                technologies: ["Next.js", "SSR", "SSG", "API Routes"],
            },
            {
                name: "Node.js & Nest.js",
                description: "Desarrollo backend con Node.js y framework empresarial Nest.js.",
                technologies: ["Node.js", "Nest.js", "Express", "REST APIs"],
            },
            {
                name: "Zustand & TanStack Query",
                description: "Gestión de estado y manejo de datos asíncronos en aplicaciones React.",
                technologies: ["Zustand", "TanStack Query", "State Management", "Caching"],
            },
            {
                name: "OpenAI & AI with React + NestJS",
                description: "Integración de IA en aplicaciones web usando OpenAI API con React y NestJS.",
                technologies: ["OpenAI API", "AI Integration", "React", "NestJS"],
            },
        ],
    },
]

export function CertificationsSection() {
    return (
        <section className="py-20 bg-muted/30">
            <div className="container px-4 mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Certificaciones</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Formación continua y certificaciones que respaldan mi experiencia técnica
                    </p>
                </div>

                <div className="max-w-6xl mx-auto space-y-12">
                    {certifications.map((provider, providerIndex) => (
                        <div key={providerIndex}>
                            <div className="flex items-center gap-3 mb-8">
                                <Award className="h-6 w-6 text-primary" />
                                <h3 className="text-2xl font-bold text-foreground">{provider.provider}</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {provider.certifications.map((cert, certIndex) => (
                                    <Card key={certIndex} className="hover:shadow-lg transition-shadow group">
                                        <CardHeader>
                                            <CardTitle className="text-xl font-bold text-primary group-hover:text-accent transition-colors">
                                                {cert.name}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{cert.description}</p>
                                            <div className="flex flex-wrap gap-2">
                                                {cert.technologies.map((tech, techIndex) => (
                                                    <Badge key={techIndex} variant="default" className="text-xs text-white">
                                                        {tech}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
