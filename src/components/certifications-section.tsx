import { useState } from "react"
import { useI18n } from "@/i18n/use-i18n"
import { useInView } from "@/hooks/use-in-view"
import { X } from "lucide-react"

export function CertificationsSection() {
    const { t, dict } = useI18n()
    const providers = dict.certificationsSection.providers
    const [showAll, setShowAll] = useState(false)
    const [lightbox, setLightbox] = useState<{ src: string; title: string } | null>(null)
    const { ref, inView } = useInView<HTMLDivElement>()

    return (
        <section id="certificaciones" className="py-32 md:py-44 lg:py-56 border-t border-border">
            <div ref={ref} data-inview={inView} className="container-page reveal">
                <div className="mb-16">
                    <p className="text-eyebrow uppercase text-signal-ink mb-6">
                        {t("certificationsSection.title")}
                    </p>
                    <p className="text-lead text-foreground/85 max-w-[46rem] text-pretty">
                        {t("certificationsSection.subtitle")}
                    </p>
                </div>

                <div className="space-y-16">
                    {providers.map((provider, pIdx) => {
                        const certs = showAll
                            ? provider.certifications
                            : provider.certifications.slice(0, 6)
                        return (
                            <div key={pIdx}>
                                <div className="flex items-baseline justify-between mb-8 border-b border-border-strong pb-3">
                                    <h3 className="text-display-3 text-foreground text-[1.125rem] font-semibold tabular">
                                        {String(pIdx + 1).padStart(2, "0")}
                                    </h3>
                                    <span className="text-meta text-muted-foreground uppercase tracking-wide">
                                        {provider.provider}
                                    </span>
                                </div>

                                <ul className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {certs.map((cert, cIdx) => (
                                        <li key={cIdx}>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setLightbox({ src: cert.image, title: cert.name })
                                                }
                                                className="group relative aspect-[4/3] overflow-hidden border border-border rounded-md bg-card hover:border-signal-ink/50 transition-colors focus:outline-none focus:ring-2 focus:ring-ring/50 w-full text-left"
                                                aria-label={`${cert.name} — ${t("certificationsSection.button")}`}
                                            >
                                                <img
                                                    src={cert.image}
                                                    alt={cert.name}
                                                    width={1200}
                                                    height={900}
                                                    loading="lazy"
                                                    decoding="async"
                                                    className="w-full h-full object-cover object-center"
                                                />
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )
                    })}
                </div>

                <div className="mt-12 text-center">
                    <button
                        type="button"
                        onClick={() => setShowAll(!showAll)}
                        className="text-mono-sm border border-border-strong rounded-full px-5 py-2 hover:bg-accent transition-colors"
                    >
                        {showAll
                            ? t("certificationsSection.showLess")
                            : t("certificationsSection.showAll")}
                    </button>
                </div>
            </div>

            {lightbox && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-label={lightbox.title}
                    onClick={() => setLightbox(null)}
                    className="fixed inset-0 z-[100] bg-background/90 backdrop-blur-md flex items-center justify-center p-6 cursor-zoom-out"
                >
                    <button
                        type="button"
                        onClick={() => setLightbox(null)}
                        className="absolute top-4 right-4 p-2 rounded-md border border-border hover:bg-accent"
                        aria-label="Close"
                    >
                        <X className="h-5 w-5" />
                    </button>
                    <img
                        src={lightbox.src}
                        alt={lightbox.title}
                        width={1600}
                        height={1200}
                        className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg"
                    />
                </div>
            )}
        </section>
    )
}
