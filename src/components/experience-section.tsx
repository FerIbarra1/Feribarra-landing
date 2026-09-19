import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useI18n } from "@/i18n/use-i18n"
import { useInView } from "@/hooks/use-in-view"

export function ExperienceSection() {
    const { t, dict } = useI18n()
    const experiences = dict.experiences
    const currentIdx = 0
    const { ref, inView } = useInView<HTMLDivElement>()

    return (
        <section id="experiencia" className="py-32 md:py-44 lg:py-56">
            <div ref={ref} data-inview={inView} className="container-page reveal">
                <div className="mb-16">
                    <p className="text-eyebrow uppercase text-signal-ink mb-6">
                        {t("experienceSection.title")}
                    </p>
                    <p className="text-lead text-foreground/85 max-w-[46rem] text-pretty">
                        {t("experienceSection.subtitle")}
                    </p>
                </div>

                <div className="relative max-w-[60rem]">
                    <div className="absolute left-[7.5rem] md:left-[10rem] top-0 bottom-0 w-px bg-border hidden md:block" aria-hidden="true" />

                    <ul className="space-y-12">
                        {experiences.map((exp, i) => {
                            const isCurrent = i === currentIdx
                            return (
                                <li key={i} className="relative md:pl-32">
                                    <div
                                        className={`absolute left-[7.5rem] md:left-[10rem] top-3 -translate-x-1/2 w-3 h-3 rounded-full hidden md:block ${
                                            isCurrent
                                                ? "bg-signal-ink ring-4 ring-signal-ink/20"
                                                : "bg-border-strong"
                                        }`}
                                        aria-hidden="true"
                                    />

                                    <Card
                                        className={`group transition-all duration-300 ${
                                            isCurrent
                                                ? "border-signal-ink/30 shadow-sm"
                                                : "border-border opacity-90"
                                        } bg-card`}
                                    >
                                        <CardHeader>
                                            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                                                <div>
                                                    <CardTitle className="text-display-3 text-foreground">
                                                        {exp.position}
                                                    </CardTitle>
                                                    <p className="text-body text-signal-ink mt-1">
                                                        {exp.company}
                                                    </p>
                                                </div>
                                                <div className="text-mono-sm text-muted-foreground tabular shrink-0">
                                                    {exp.period}
                                                </div>
                                            </div>
                                            <p className="text-mono-sm text-muted-foreground/80 mt-1">
                                                {exp.location}
                                            </p>
                                        </CardHeader>

                                        <CardContent>
                                            <ul className="space-y-2 mb-6">
                                                {exp.description.map((d, idx) => (
                                                    <li
                                                        key={idx}
                                                        className="text-body text-foreground/85 leading-relaxed flex items-start gap-3"
                                                    >
                                                        <span className="mt-2.5 w-1 h-1 rounded-full bg-signal-ink shrink-0" aria-hidden="true" />
                                                        <span>{d}</span>
                                                    </li>
                                                ))}
                                            </ul>

                                            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border">
                                                {exp.technologies.map((t) => (
                                                    <span
                                                        key={t}
                                                        className="px-2.5 py-1 text-mono-sm border border-border rounded-md text-muted-foreground"
                                                    >
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </section>
    )
}
