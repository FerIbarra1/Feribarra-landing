import * as React from "react"
import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
    return (
        <textarea
            data-slot="textarea"
            className={cn(
                "border-input bg-card text-foreground",
                "flex field-sizing-content min-h-16 w-full rounded-md border px-3 py-2 text-base shadow-xs transition-colors outline-none",
                "placeholder:text-muted-foreground/80",
                "focus-visible:border-signal-ink focus-visible:ring-2 focus-visible:ring-signal-ink/30",
                "aria-invalid:ring-2 aria-invalid:border-signal-ink",
                "disabled:cursor-not-allowed disabled:opacity-50",
                "md:text-sm",
                className
            )}
            {...props}
        />
    )
}

export { Textarea }
