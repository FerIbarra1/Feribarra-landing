import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, MapPin } from "lucide-react"
import { useI18n } from "@/i18n"

export function ExperienceSection() {
    const { t, dict } = useI18n()
    return (
        <section className="py-20">
            <div className="container px-4 mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
                        {t("experienceSection.title")}</h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
                        {t("experienceSection.subtitle")}
                    </p>
                </div>

                <div className="max-w-4xl mx-auto space-y-8">
                    {dict.experiences.map((exp: any, index: number) => (
                        <Card key={index} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                    <div>
                                        <CardTitle className="text-xl text-primary">{exp.position}</CardTitle>
                                        <h3 className="text-lg font-semibold text-foreground">{exp.company}</h3>
                                    </div>
                                    <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-2">
                                            <CalendarDays className="h-4 w-4" />
                                            {exp.period}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="h-4 w-4" />
                                            {exp.location}
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 mb-4">
                                    {exp.description.map((item: string, itemIndex: number) => (
                                        <li key={itemIndex} className="text-muted-foreground flex items-start gap-2">
                                            <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                                <div className="flex flex-wrap gap-2">
                                    {exp.technologies.map((tech: string, techIndex: number) => (
                                        <span key={techIndex} className="px-3 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20">
                                            {tech}
                                        </span>
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

