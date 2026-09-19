import { useEffect, useRef, useState } from "react"

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches

export function useInView<T extends HTMLElement>(once = true) {
  const ref = useRef<T>(null)
  // Initialised from the media query rather than in the effect, so reduced-motion
  // users never see a frame of the un-animated state.
  const [inView, setInView] = useState<boolean>(prefersReducedMotion)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion()) {
      setInView(true)
      return
    }

    // threshold 0 + a negative rootMargin, not threshold > 0: the ratio is
    // intersected area ÷ target area, so an element taller than ~2.5 viewports
    // can never reach a positive threshold and would stay at opacity 0 forever.
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true)
          if (once) io.disconnect()
        }
      },
      { threshold: 0, rootMargin: "0px 0px -12% 0px" },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [once])

  return { ref, inView }
}
