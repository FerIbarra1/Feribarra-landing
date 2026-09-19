import { useI18n } from "@/i18n/use-i18n"
import { useInView } from "@/hooks/use-in-view"

export function EducationSection() {
    const { t, dict } = useI18n()
    const ed = dict.educationSection
    const lang = dict.languagesSection
    const { ref, inView } = useInView<HTMLDivElement>()

    return (
        <section id="formacion" className="py-32 md:py-44 lg:py-56 border-t border-border">
            <div ref={ref} data-inview={inView} className="container-page reveal">
                <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-16">
                    <div>
                        <p className="text-eyebrow uppercase text-signal-ink mb-6">
                            {t("educationSection.title")}
                        </p>
                        <h3 className="text-display-3 text-foreground text-balance mb-4">
                            {ed.degree}
                        </h3>
                        <p className="text-body text-foreground/85 mb-2">
                            {ed.institution}
                        </p>
                        <p className="text-mono-sm text-muted-foreground tabular">
                            {ed.period}
                            <span className="mx-2 text-border-strong">·</span>
                            {ed.location}
                        </p>
                    </div>

                    <div className="md:border-l md:border-border md:pl-10">
                        <p className="text-eyebrow uppercase text-signal-ink mb-6">
                            {t("languagesSection.title")}
                        </p>
                        <ul className="space-y-3">
                            {lang.items.map((l, i) => (
                                <li
                                    key={i}
                                    className="flex items-baseline justify-between border-b border-border pb-3 last:border-0"
                                >
                                    <span className="text-body text-foreground">
                                        {l.language}
                                    </span>
                                    <span className="text-meta text-muted-foreground">
                                        {l.level}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}
