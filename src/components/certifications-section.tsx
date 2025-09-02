import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award } from "lucide-react"
import { useI18n } from "@/i18n"

export function CertificationsSection() {
    const { t, dict } = useI18n()
    const providers = dict.certificationsSection.providers
    return (
        <section className="py-20 bg-muted/30">
            <div className="container px-4 mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t("certificationsSection.title")}</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        {t("certificationsSection.subtitle")}
                    </p>
                </div>

                <div className="max-w-6xl mx-auto space-y-12">
                    {providers.map((provider: any, providerIndex: number) => (
                        <div key={providerIndex}>
                            <div className="flex items-center gap-3 mb-8">
                                <Award className="h-6 w-6 text-primary" />
                                <h3 className="text-2xl font-bold text-foreground">{provider.provider}</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {provider.certifications.map((cert: any, certIndex: number) => (
                                    <Card key={certIndex} className="hover:shadow-lg transition-shadow group">
                                        <CardHeader>
                                            <CardTitle className="text-xl font-bold text-primary group-hover:text-accent transition-colors">
                                                {cert.name}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{cert.description}</p>
                                            <div className="flex flex-wrap gap-2">
                                                {cert.technologies.map((tech: string, techIndex: number) => (
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

