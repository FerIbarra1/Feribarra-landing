import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, MessageCircle, Phone, Send, Sparkles } from "lucide-react"
import toast from "react-hot-toast"
import { useI18n } from "@/i18n"

export function ContactSection() {
    const { t } = useI18n()
    return (
        <section className="py-20 bg-background relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-accent/10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(117,190,218,0.1),transparent_50%)]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(136,204,238,0.08),transparent_50%)]"></div>
            </div>

            <div className="absolute top-20 left-10 w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center animate-float backdrop-blur-sm">
                <MessageCircle className="w-8 h-8 text-primary" />
            </div>
            <div
                className="absolute top-40 right-20 w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center animate-float backdrop-blur-sm"
                style={{ animationDelay: "1s" }}
            >
                <Sparkles className="w-6 h-6 text-accent" />
            </div>

            <div className="container px-4 mx-auto relative z-10">
                <div className="text-center mb-16 animate-on-scroll">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-balance">
                        <span className="gradient-text">{t("contactSection.title")}</span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
                        {t("contactSection.subtitle")}
                    </p>
                </div>

                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="space-y-6">
                            <div className="group">
                                <Card className="overflow-hidden border-0 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
                                    <CardContent className="p-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                                <Mail className="h-6 w-6 text-primary" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-foreground mb-1">{t("contactSection.emailLabel")}</p>
                                                <p className="text-muted-foreground text-sm">fernandooibarra@gmail.com</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="group">
                                <Card className="overflow-hidden border-0 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
                                    <CardContent className="p-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                                                <Phone className="h-6 w-6 text-secondary" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-foreground mb-1">{t("contactSection.phoneLabel")}</p>
                                                <p className="text-muted-foreground text-sm">(662) 291-4052</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="group">
                                <Card className="overflow-hidden border-0 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
                                    <CardContent className="p-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                                                <MapPin className="h-6 w-6 text-accent" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-foreground mb-1">{t("contactSection.locationLabel")}</p>
                                                <p className="text-muted-foreground text-sm">{t("contactSection.locationValue")}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                        <div className="lg:col-span-2">
                            <Card className="overflow-hidden border-0 bg-card/50 backdrop-blur-sm">
                                <CardContent className="p-8">
                                    <div className="mb-8">
                                        <h3 className="text-2xl font-bold text-foreground mb-2">{t("contactSection.formTitle")}</h3>
                                        <p className="text-muted-foreground">{t("contactSection.formSubtitle")}</p>
                                    </div>

                                    <form className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-foreground">{t("contactSection.namePlaceholder")}</label>
                                                <Input
                                                    placeholder={t("contactSection.namePlaceholder")}
                                                    className="bg-background/50 border-border focus:border-primary/50 focus:ring-primary/20 mt-2"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-foreground">{t("contactSection.emailPlaceholder")}</label>
                                                <Input
                                                    type="email"
                                                    placeholder={t("contactSection.emailPlaceholder")}
                                                    className="bg-background/50 border-border focus:border-primary/50 focus:ring-primary/20 mt-2"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-foreground">{t("contactSection.subjectPlaceholder")}</label>
                                            <Input
                                                placeholder={t("contactSection.subjectPlaceholder")}
                                                className="bg-background/50 border-border focus:border-primary/50 focus:ring-primary/20 mt-2"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-foreground">{t("contactSection.messagePlaceholder")}</label>
                                            <Textarea
                                                placeholder={t("contactSection.messagePlaceholder")}
                                                rows={5}
                                                className="bg-background/50 border-border focus:border-primary/50 focus:ring-primary/20 mt-2 resize-none h-32"
                                            />
                                        </div>

                                        <div className="flex gap-4 pt-4">
                                            <Button
                                                className="flex-1 cursor-pointer py-6 group text-white text-base font-bold bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-accent transition-all duration-500 transform hover:scale-105 shadow-lg hover:shadow-primary/25"
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    toast.success(t("contactSection.toastSuccess"))
                                                }}
                                            >
                                                <Send className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                                {t("contactSection.sendButton")}
                                            </Button>
                                        </div>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    <div className="text-center mt-16">
                        <div className="max-w-2xl mx-auto">
                            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                                {t("contactSection.footerTitle")}
                            </h3>
                            <p className="text-muted-foreground mb-8 text-lg">
                                {t("contactSection.footerSubtitle")}
                            </p>
                            {/* <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <Button
                                    size="lg"
                                    className="group bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-accent transition-all duration-500 transform hover:scale-105 shadow-lg hover:shadow-primary/25 px-8 py-4"
                                >
                                    Comenzar Proyecto
                                    <ArrowUpRight className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </Button>
                                <span className="text-muted-foreground">o</span>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="group gradient-border hover:bg-primary/5 transition-all duration-300 px-8 py-4 bg-transparent"
                                >
                                    Ver Mi Trabajo
                                </Button>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

