import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const skillCategories = [
    {
        title: "Frontend",
        skills: [
            "React.js",
            "React Native",
            "Next.js",
            "TypeScript",
            "JavaScript",
            "Tailwind CSS",
            "Shadcn/UI",
            "Bootstrap",
            "CSS",
            "SASS",
        ],
    },
    {
        title: "Backend",
        skills: ["Node.js", "Nest.js", "Express.js"],
    },
    {
        title: "Bases de Datos",
        skills: ["PostgreSQL", "MongoDB", "TypeORM", "Prisma"],
    },
    {
        title: "DevOps & Herramientas",
        skills: ["Docker", "Git", "GitHub", "WebSockets", "NPM"],
    },
    {
        title: "Otros",
        skills: ["OpenAI API", "Firebase", "Zustand", "TanStack Query", "React Router"],
    },
]

export function SkillsSection() {
    return (
        <section className="py-20 bg-muted/30">
            <div className="container px-4 mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Habilidades Técnicas</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Tecnologías y herramientas con las que trabajo para crear soluciones innovadoras
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skillCategories.map((category, index) => (
                        <Card key={index} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <CardTitle className="text-foreground font-bold text-2xl">{category.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {category.skills.map((skill, skillIndex) => (
                                        <Badge key={skillIndex} variant="default" className="text-xs text-white">
                                            {skill}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
