import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone } from "lucide-react"
import toast from "react-hot-toast"
import { useI18n } from "@/i18n"

export function ContactSection() {
    const { t } = useI18n()
    return (
        <section className="py-20">
            <div className="container px-4 mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t("contactSection.title")}</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        {t("contactSection.subtitle")}
                    </p>
                </div>

                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-2xl font-semibold text-foreground mb-6">{t("contactSection.infoTitle")}</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                        <Mail className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-foreground">{t("contactSection.emailLabel")}</p>
                                        <p className="text-muted-foreground">fernandooibarra@gmail.com</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                        <Phone className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-foreground">{t("contactSection.phoneLabel")}</p>
                                        <p className="text-muted-foreground">(662) 291-4052</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                        <MapPin className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-foreground">{t("contactSection.locationLabel")}</p>
                                        <p className="text-muted-foreground">{t("contactSection.locationValue")}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle className="font-bold text-xl">{t("contactSection.formTitle")}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Input placeholder={t("contactSection.namePlaceholder")} />
                                    </div>
                                    <div>
                                        <Input type="email" placeholder={t("contactSection.emailPlaceholder")} />
                                    </div>
                                </div>
                                <div>
                                    <Input placeholder={t("contactSection.subjectPlaceholder")} />
                                </div>
                                <div>
                                    <Textarea placeholder={t("contactSection.messagePlaceholder")} rows={5} className="resize-none" />
                                </div>
                                <Button
                                    className="w-full h-10 cursor-pointer"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        toast.success(t("contactSection.toastSuccess"))
                                    }}
                                >
                                    {t("contactSection.sendButton")}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}

