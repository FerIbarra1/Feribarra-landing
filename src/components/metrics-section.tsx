import { useI18n } from "@/i18n/use-i18n"
import { useInView } from "@/hooks/use-in-view"
import { useCountUp } from "@/hooks/use-count-up"

/**
 * Splits a display string into the count-up number and the trailing suffix.
 * The dictionary stores strings like "11", "4+" — so we count the integer
 * portion and reattach the suffix afterwards.
 */
function splitValue(value: string) {
    const match = value.match(/^(\d+)(.*)$/)
    return match ? { number: Number(match[1]), suffix: match[2] } : null
}

function Metric({
    value,
    label,
    qualifier,
    active,
    index,
}: {
    value: string
    label: string
    qualifier: string
    active: boolean
    index: number
}) {
    const parts = splitValue(value)
    const counted = useCountUp(parts?.number ?? 0, active && parts !== null)
    const shown = parts ? `${counted}${parts.suffix}` : value

    // Stagger each metric by 110ms. Number lands first, label rises just as
    // the count settles, qualifier last. The aria-label carries the final
    // value so screen readers never hear the ticking digits.
    const numberDelay = 200 + index * 140
    const labelDelay = numberDelay + 380
    const qualDelay = labelDelay + 120

    return (
        <div
            className="border-l border-border-strong pl-6 relative"
            style={{ ["--rise-delay" as never]: `${numberDelay}ms` } as React.CSSProperties}
        >
            <p
                aria-label={`${value} ${label}`}
                className="text-metric tabular text-foreground leading-none tick-up"
                style={{ ["--tick-delay" as never]: `${numberDelay}ms` } as React.CSSProperties}
            >
                <span className="inline-block rise-in" style={{ ["--rise-delay" as never]: `${numberDelay}ms` } as React.CSSProperties}>
                    {shown}
                </span>
            </p>
            <p
                className="text-meta text-muted-foreground uppercase tracking-wide mt-3 rise-in"
                style={{ ["--rise-delay" as never]: `${labelDelay}ms` } as React.CSSProperties}
            >
                {label}
            </p>
            <p
                className="text-mono-sm text-muted-foreground/80 mt-2 rise-in"
                style={{ ["--rise-delay" as never]: `${qualDelay}ms` } as React.CSSProperties}
            >
                {qualifier}
            </p>
        </div>
    )
}

export function MetricsSection() {
    const { t, dict } = useI18n()
    const items = dict.metrics.items
    const { ref, inView } = useInView<HTMLDivElement>()

    return (
        <section className="py-32 md:py-44 lg:py-56 border-y border-border">
            <div ref={ref} data-inview={inView} className="container-page reveal">
                <div className="mb-20">
                    <p
                        className="text-eyebrow uppercase text-signal-ink mb-8 rise-in"
                        style={{ ["--rise-delay" as never]: "0ms" } as React.CSSProperties}
                    >
                        {t("metrics.title")}
                    </p>
                    <h2 className="text-display-2 text-foreground text-balance mb-16 max-w-[24ch]">
                        <span
                            className="word-rise"
                            style={{ ["--word-i" as never]: "0", ["--word-base" as never]: "80ms" } as React.CSSProperties}
                        >
                            {t("metrics.intro").split(" ").slice(0, 6).join(" ")}
                        </span>
                    </h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
                    {items.map((m, i) => (
                        <Metric
                            key={i}
                            value={m.value}
                            label={m.label}
                            qualifier={m.qualifier}
                            active={inView}
                            index={i}
                        />
                    ))}
                </div>

                <p
                    className="text-mono-sm text-muted-foreground/80 mt-16 md:mt-20 max-w-[52rem] leading-relaxed rise-in"
                    style={{ ["--rise-delay" as never]: "1100ms" } as React.CSSProperties}
                >
                    {t("metrics.honestyFootnote")}
                </p>
            </div>
        </section>
    )
}
