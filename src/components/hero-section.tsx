import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"
import { useI18n } from "@/i18n/use-i18n"

export function HeroSection() {
    const { t } = useI18n()

    return (
        <section
            id="inicio"
            className="min-h-[88svh] flex items-center pt-32 pb-24 relative overflow-hidden"
        >
            <div className="container-page relative">
                <div className="max-w-[64rem]">
                    <div className="mb-8">
                        <p
                            className="text-eyebrow uppercase text-signal-ink rise-in"
                            style={{ "--rise-delay": "0ms" } as React.CSSProperties}
                        >
                            {t("hero.eyebrow")}
                        </p>
                        <span
                            aria-hidden="true"
                            className="draw-x block h-px w-full max-w-[28rem] bg-border-strong mt-4"
                        />
                    </div>

                    <h1
                        className="text-display-1 text-foreground text-balance mb-8 max-w-[11ch] rise-in"
                        style={{ "--rise-delay": "60ms" } as React.CSSProperties}
                    >
                        {t("hero.name")}
                    </h1>

                    <h2
                        className="text-display-3 text-foreground font-normal mb-10 max-w-[42rem] rise-in"
                        style={{ "--rise-delay": "120ms" } as React.CSSProperties}
                    >
                        {t("hero.role")}
                    </h2>

                    <p
                        className="text-lead text-foreground/85 max-w-[46rem] text-pretty mb-10 rise-in"
                        style={{ "--rise-delay": "180ms" } as React.CSSProperties}
                    >
                        {t("hero.description")}
                    </p>

                    <p
                        className="text-mono-sm text-muted-foreground mb-12 max-w-[42rem] rise-in"
                        style={{ "--rise-delay": "240ms" } as React.CSSProperties}
                    >
                        {t("hero.metricsInline")}
                    </p>

                    <div
                        className="flex flex-col sm:flex-row gap-3 mb-12 rise-in"
                        style={{ "--rise-delay": "300ms" } as React.CSSProperties}
                    >
                        <Button
                            asChild
                            className="group h-12 px-6 text-body font-semibold bg-foreground text-background hover:bg-foreground/90"
                        >
                            <a href="#proyectos">
                                {t("hero.ctaProjects")}
                                <ArrowDown className="h-4 w-4 group-hover:translate-y-0.5 transition-transform" />
                            </a>
                        </Button>
                        <a
                            href="/cv/fernando-ibarra-cv-es.pdf"
                            download="fernando-ibarra-cv-es.pdf"
                            className="inline-flex items-center justify-center h-12 px-2 text-body font-semibold text-foreground underline decoration-border-strong decoration-1 underline-offset-[6px] hover:decoration-foreground transition-colors rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                        >
                            {t("hero.ctaCv")}
                        </a>
                    </div>

                    <p
                        className="text-mono-sm text-signal-ink rise-in max-w-[42rem]"
                        style={{ "--rise-delay": "360ms" } as React.CSSProperties}
                    >
                        ● {t("hero.status")}
                    </p>
                </div>
            </div>
        </section>
    )
}
