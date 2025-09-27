import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { ExperienceSection } from "@/components/experience-section"
import { SkillsSection } from "@/components/skills-section"
import { CertificationsSection } from "@/components/certifications-section"
import { ContactSection } from "@/components/contact-section"
import { ProjectsSection } from "./components/projects-section"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />

      <section id="inicio" className="py-20">
        <HeroSection />
      </section>

      <section id="experiencia" className="py-20">
        <ExperienceSection />
      </section>

      <section id="habilidades" className="py-20">
        <SkillsSection />
      </section>

      <section id="proyectos" className="py-20">
        <ProjectsSection />
      </section>

      <section id="certificaciones" className="py-20">
        <CertificationsSection />
      </section>

      <section id="contacto" className="pt-20">
        <ContactSection />
      </section>
    </main>
  )
}

