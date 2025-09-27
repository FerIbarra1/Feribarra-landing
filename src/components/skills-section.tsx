"use client"

import { useI18n } from "@/i18n"
import { useState } from "react"

export function SkillsSection() {
    const { t, dict } = useI18n()
    const categories = dict.skillsSection.categories
    const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

    return (
        <section className="py-20 bg-muted/30">
            <div className="container px-4 mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
                        {t("skillsSection.title")}
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
                        {t("skillsSection.subtitle")}
                    </p>
                </div>

                <div className="max-w-8xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
                        {categories.map((category: any, cIdx: number) => (
                            <div key={cIdx} className="space-y-6">
                                <div className="space-y-2">
                                    <h3 className="text-xl font-semibold text-foreground tracking-tight">
                                        {category.title}
                                    </h3>
                                    <div className="w-12 h-0.5 bg-primary" />
                                </div>

                                <div className="space-y-3">
                                    {category.skills.map((skill: string, sIdx: number) => (
                                        <div
                                            key={sIdx}
                                            className="group cursor-pointer"
                                            onMouseEnter={() => setHoveredSkill(`${cIdx}-${sIdx}`)}
                                            onMouseLeave={() => setHoveredSkill(null)}
                                        >
                                            <div className="flex items-center justify-between py-2 px-3 rounded-lg transition-all duration-200 hover:bg-muted/50">
                                                <span className="text-foreground font-medium group-hover:text-primary transition-colors">
                                                    {skill}
                                                </span>
                                                <div className="flex items-center space-x-2">
                                                    <div className="flex space-x-1">
                                                        {[...Array(5)].map((_, i) => (
                                                            <div
                                                                key={i}
                                                                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${hoveredSkill === `${cIdx}-${sIdx}`
                                                                    ? i < 4
                                                                        ? "bg-primary"
                                                                        : "bg-muted"
                                                                    : "bg-muted"
                                                                    }`}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* {additional.length > 0 && (
                        <div className="mt-16 pt-16 border-t border-border">
                            <div className="text-center mb-8">
                                <h3 className="text-xl font-semibold text-foreground mb-2">
                                    {t("lang") === "es" ? "Tecnologías Adicionales" : "Additional Technologies"}
                                </h3>
                                <p className="text-muted-foreground">
                                    {t("lang") === "es"
                                        ? "Otras herramientas y tecnologías que utilizo"
                                        : "Other tools and technologies I use"}
                                </p>
                            </div>

                            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
                                {additional.map((skill: string, index: number) => (
                                    <Badge
                                        key={index}
                                        variant="outline"
                                        className="px-4 py-2 text-sm hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                                    >
                                        {skill}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )} */}
                </div>
            </div>
        </section>
    )
}
