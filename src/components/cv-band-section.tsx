import { useI18n } from "@/i18n/use-i18n"
import { useInView } from "@/hooks/use-in-view"
import { Download } from "lucide-react"

export function CvBandSection() {
    const { dict } = useI18n()
    const k = dict.cvBand
    const { ref, inView } = useInView<HTMLDivElement>()

    return (
        <section className="py-24 md:py-32 border-y border-border bg-card/50">
            <div ref={ref} data-inview={inView} className="container-page reveal">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 max-w-[64rem]">
                    <div>
                        <h2 className="text-display-3 text-foreground text-balance mb-2">
                            {k.title}
                        </h2>
                        <p className="text-body text-muted-foreground max-w-[36rem]">
                            {k.subtitle}
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                        <a
                            href="/cv/fernando-ibarra-cv-es.pdf"
                            download="fernando-ibarra-cv-es.pdf"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-foreground text-background text-body font-semibold hover:opacity-90 transition-opacity"
                        >
                            <Download className="h-4 w-4" aria-hidden="true" />
                            {k.downloadEs}
                        </a>
                        <a
                            href="/cv/fernando-ibarra-cv-en.pdf"
                            download="fernando-ibarra-cv-en.pdf"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md border border-border-strong text-body font-semibold hover:bg-card transition-colors"
                        >
                            <Download className="h-4 w-4" aria-hidden="true" />
                            {k.downloadEn}
                        </a>
                    </div>
                </div>

                <p className="text-mono-sm text-muted-foreground/70 mt-6 tabular">
                    {k.meta}
                </p>
            </div>
        </section>
    )
}
