import { useI18n } from "@/i18n/use-i18n"
import { useInView } from "@/hooks/use-in-view"

export function SkillsSection() {
    const { t, dict } = useI18n()
    const categories = dict.skillsSection.categories
    const { ref, inView } = useInView<HTMLDivElement>()

    return (
        <section id="habilidades" className="py-32 md:py-44 lg:py-56 border-t border-border">
            <div ref={ref} data-inview={inView} className="container-page reveal">
                <div className="mb-16">
                    <p className="text-eyebrow uppercase text-signal-ink mb-6">
                        {t("skillsSection.title")}
                    </p>
                    <p className="text-lead text-foreground/85 max-w-[46rem] text-pretty">
                        {t("skillsSection.subtitle")}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {categories.map((category, cIdx) => (
                        <div key={cIdx} className="space-y-1">
                            <div className="flex items-baseline justify-between border-b border-border-strong pb-3 mb-2">
                                <h3 className="text-display-3 text-foreground text-[1.125rem] font-semibold tabular">
                                    {String(cIdx + 1).padStart(2, "0")}
                                </h3>
                                <span className="text-meta text-muted-foreground uppercase tracking-wide">
                                    {category.title}
                                </span>
                            </div>

                            <ul className="divide-y divide-border">
                                {category.skills.map((skill) => (
                                    <li
                                        key={skill}
                                        className="py-2 px-1 text-body text-muted-foreground"
                                    >
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {dict.skillsSection.integrations && (
                    <div className="mt-16 pt-12 border-t border-border">
                        <p className="text-eyebrow uppercase text-muted-foreground mb-4">
                            {t("skillsSection.integrationsLabel")}
                        </p>
                        <ul className="flex flex-wrap gap-2">
                            {dict.skillsSection.integrations.map((s) => (
                                <li
                                    key={s}
                                    className="px-3 py-1.5 text-mono-sm border border-border rounded-full"
                                >
                                    {s}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </section>
    )
}
