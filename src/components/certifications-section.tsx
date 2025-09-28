import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, ExternalLink } from "lucide-react"
import { useI18n } from "@/i18n"
import { Button } from "./ui/button"

export function CertificationsSection() {
    const { t, dict } = useI18n()
    const providers = dict.certificationsSection.providers
    return (
        <section className="py-20 bg-muted/30">
            <div className="container px-4 mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">{t("certificationsSection.title")}</h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">{t("certificationsSection.subtitle")}</p>
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
                                    <Card
                                        key={certIndex}
                                        className="hover:shadow-lg transition-all duration-300 group border-0 bg-card/50 backdrop-blur-sm hover:bg-card/80 hover:-translate-y-1 pt-0"
                                    >
                                        <div className="relative h-auto w-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center border-b rounded-t-xl">
                                            {/* Certificate image would go here */}
                                            <img src={cert.image} className="w-full h-auto rounded-t-xl" alt={cert.name} />
                                            <div className="absolute top-2 right-2">
                                                <Badge variant="secondary" className="text-xs text-white">
                                                    {provider.provider}
                                                </Badge>
                                            </div>
                                        </div>

                                        <CardHeader className="pb-3">
                                            <CardTitle className="text-lg font-bold text-primary group-hover:text-accent transition-colors">
                                                {cert.name}
                                            </CardTitle>
                                        </CardHeader>

                                        <CardContent className="space-y-4">
                                            <p className="text-muted-foreground text-sm leading-relaxed">{cert.description}</p>

                                            <div className="flex flex-wrap gap-1.5">
                                                {cert.technologies.map((tech: string, techIndex: number) => (
                                                    <Badge key={techIndex} variant="outline" className="text-xs p-2 text-primary border-primary/20">
                                                        {tech}
                                                    </Badge>
                                                ))}
                                            </div>

                                            <div className="pt-2">
                                                <Button
                                                    variant="default"
                                                    size="sm"
                                                    className="w-full group-hover:bg-primary group-hover:border-primary transition-all duration-300 bg-primary py-5 font-bold"
                                                    asChild
                                                >
                                                    <a href={cert.url} target="_blank" rel="noopener noreferrer">
                                                        <ExternalLink className="w-4 h-4 mr-2" />
                                                        {t("certificationsSection.button")}
                                                    </a>
                                                </Button>
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

