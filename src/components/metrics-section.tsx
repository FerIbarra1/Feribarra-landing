import { useI18n } from "@/i18n/use-i18n"
import { useInView } from "@/hooks/use-in-view"
import { useCountUp } from "@/hooks/use-count-up"

// The dictionaries store display strings ("11", "4+"), so the numeric part is
// split out here and the suffix re-attached after counting.
function splitValue(value: string) {
    const match = value.match(/^(\d+)(.*)$/)
    return match ? { number: Number(match[1]), suffix: match[2] } : null
}

function Metric({ value, label, qualifier, active }: {
    value: string
    label: string
    qualifier: string
    active: boolean
}) {
    const parts = splitValue(value)
    const counted = useCountUp(parts?.number ?? 0, active && parts !== null)
    const shown = parts ? `${counted}${parts.suffix}` : value

    return (
        <div className="border-l border-border-strong pl-6">
            <p className="text-metric tabular text-foreground leading-none" aria-label={`${value} ${label}`}>
                {shown}
            </p>
            <p className="text-meta text-muted-foreground uppercase tracking-wide mt-3">
                {label}
            </p>
            <p className="text-mono-sm text-muted-foreground/80 mt-2">
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
                <p className="text-eyebrow uppercase text-signal-ink mb-12 md:mb-16">
                    {t("metrics.title")}
                </p>

                <p className="text-lead text-foreground max-w-[42rem] mb-20 md:mb-24 text-pretty">
                    {t("metrics.intro")}
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
                    {items.map((m, i) => (
                        <Metric
                            key={i}
                            value={m.value}
                            label={m.label}
                            qualifier={m.qualifier}
                            active={inView}
                        />
                    ))}
                </div>

                <p className="text-mono-sm text-muted-foreground/80 mt-12 md:mt-16 max-w-[52rem] leading-relaxed">
                    {t("metrics.honestyFootnote")}
                </p>
            </div>
        </section>
    )
}
