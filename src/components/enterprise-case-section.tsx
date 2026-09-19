import { useI18n } from "@/i18n/use-i18n"
import { useInView } from "@/hooks/use-in-view"

export function EnterpriseCaseSection() {
    const { dict } = useI18n()
    const k = dict.enterpriseCase
    const { ref, inView } = useInView<HTMLDivElement>()
    return (
        <section className="py-32 md:py-44 lg:py-56">
            <div ref={ref} data-inview={inView} className="container-page reveal">
                <div className="max-w-[64rem]">
                    <p className="text-eyebrow uppercase text-signal-ink mb-8">
                        {k.eyebrow}
                    </p>

                    <h2 className="text-display-3 text-foreground text-balance mb-10">
                        {k.title}
                    </h2>

                    <div className="space-y-6 max-w-[48rem]">
                        {k.body.map((p, i) => (
                            <p key={i} className="text-body text-foreground/85 leading-relaxed">
                                {p}
                            </p>
                        ))}
                    </div>

                    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[52rem]">
                        <div className="border-l border-border-strong pl-6">
                            <p className="text-eyebrow uppercase text-muted-foreground mb-2">
                                {k.patternsLabel}
                            </p>
                            <p className="text-meta text-foreground/90">
                                {k.patterns}
                            </p>
                        </div>
                        <div className="border-l border-border-strong pl-6">
                            <p className="text-eyebrow uppercase text-muted-foreground mb-2">
                                {k.strategyMatrixLabel}
                            </p>
                            <p className="text-meta text-foreground/90 tabular">
                                {k.strategyMatrixValue}
                            </p>
                        </div>
                    </div>

                    <div className="mt-12 flex flex-wrap gap-2">
                        {k.tech.map((t) => (
                            <span
                                key={t}
                                className="px-3 py-1.5 text-mono-sm border border-border rounded-full"
                            >
                                {t}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
