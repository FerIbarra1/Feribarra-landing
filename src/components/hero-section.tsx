import { ArrowDown } from "lucide-react"
import { useI18n } from "@/i18n/use-i18n"

/**
 * Splits a string into <span> tokens, each marked --word-i so the
 * `word-rise` keyframe can stagger them in. A space-only string between
 * tokens keeps word-spacing intact.
 */
function StaggerWords({
    text,
    baseDelay = 0,
    step = 55,
    as: Tag = "span",
}: {
    text: string
    baseDelay?: number
    step?: number
    as?: "span" | "h1" | "h2" | "p"
}) {
    const words = text.split(/(\s+)/)
    return (
        <Tag
            className="block"
            style={
                {
                    ["--word-base" as never]: `${baseDelay}ms`,
                    ["--word-step" as never]: `${step}ms`,
                } as React.CSSProperties
            }
        >
            {words.map((w, i) =>
                /\s+/.test(w) ? (
                    <span key={i}>{w}</span>
                ) : (
                    <span
                        key={i}
                        className="word-rise"
                        style={{ ["--word-i" as never]: String(i) } as React.CSSProperties}
                    >
                        {w}
                    </span>
                ),
            )}
        </Tag>
    )
}

export function HeroSection() {
    const { t } = useI18n()

    return (
        <section
            id="inicio"
            className="min-h-[88svh] flex items-center pt-32 pb-24 relative overflow-hidden"
        >
            <div className="container-page relative">
                <div className="max-w-[64rem]">
                    {/* Eyebrow: pill text + hairline that draws in together */}
                    <div className="mb-10 rise-in" style={{ ["--rise-delay" as never]: "0ms" } as React.CSSProperties}>
                        <p className="text-eyebrow uppercase text-signal-ink">
                            {t("hero.eyebrow")}
                        </p>
                        <span
                            aria-hidden="true"
                            className="draw-x block h-px w-full max-w-[28rem] bg-border-strong mt-4"
                            style={{ ["--draw-delay" as never]: "240ms" } as React.CSSProperties}
                        />
                    </div>

                    {/* Display name: each word rises in sequence */}
                    <h1 className="text-display-1 text-foreground text-balance mb-8 max-w-[11ch]">
                        <StaggerWords text={t("hero.name")} baseDelay={140} step={70} as="span" />
                    </h1>

                    {/* Role: also stagger, slightly tighter cadence */}
                    <h2 className="text-display-3 text-foreground font-normal mb-10 max-w-[42rem]">
                        <StaggerWords text={t("hero.role")} baseDelay={520} step={45} as="span" />
                    </h2>

                    {/* Lead paragraph fades up, slightly later */}
                    <p
                        className="text-lead text-foreground/85 max-w-[46rem] text-pretty mb-12 rise-in"
                        style={{ ["--rise-delay" as never]: "1080ms" } as React.CSSProperties}
                    >
                        {t("hero.description")}
                    </p>

                    {/* CTAs — solid pill + ghost link. The wrapper rises in; the
                        arrow inside the primary button has its own tiny descent on
                        hover (CSS-only, no JS). */}
                    <div
                        className="flex flex-col sm:flex-row gap-3 mb-10 rise-in"
                        style={{ ["--rise-delay" as never]: "1240ms" } as React.CSSProperties}
                    >
                        <a
                            href="#proyectos"
                            className="group inline-flex items-center justify-center gap-2 h-12 px-6 text-body font-semibold bg-foreground text-background rounded-sm transition-[transform,background-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:bg-foreground/90 outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                        >
                            <span>{t("hero.ctaProjects")}</span>
                            <ArrowDown className="h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0.5 group-hover:translate-x-0.5" />
                        </a>
                        <a
                            href="/cv/fernando-ibarra-cv-es.pdf"
                            download="fernando-ibarra-cv-es.pdf"
                            className="inline-flex items-center justify-center h-12 px-2 text-body font-semibold text-foreground underline decoration-border-strong decoration-1 underline-offset-[6px] hover:decoration-foreground transition-colors rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                        >
                            {t("hero.ctaCv")}
                        </a>
                    </div>

                    {/* Status line: live dot + label, last to arrive */}
                    <p
                        className="flex items-center gap-2.5 text-mono-sm text-signal-ink rise-in max-w-[42rem]"
                        style={{ ["--rise-delay" as never]: "1400ms" } as React.CSSProperties}
                    >
                        <span className="live-dot" aria-hidden="true" />
                        <span>{t("hero.status")}</span>
                    </p>
                </div>
            </div>
        </section>
    )
}
