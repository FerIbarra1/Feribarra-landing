import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { MetricsSection } from "@/components/metrics-section"
import { ExperienceSection } from "@/components/experience-section"
import { SkillsSection } from "@/components/skills-section"
import { EnterpriseCaseSection } from "@/components/enterprise-case-section"
import { ProjectsSection } from "./components/projects-section"
import { CertificationsSection } from "@/components/certifications-section"
import { EducationSection } from "@/components/education-section"
import { CvBandSection } from "@/components/cv-band-section"
import { ContactSection } from "@/components/contact-section"
import { FooterSection } from "@/components/footer-section"

export default function Home() {
    return (
        <>
            <Navigation />
            <main>
                <HeroSection />
                <MetricsSection />
                <ExperienceSection />
                <SkillsSection />
                <EnterpriseCaseSection />
                <ProjectsSection />
                <CertificationsSection />
                <EducationSection />
                <CvBandSection />
                <ContactSection />
            </main>
            <FooterSection />
        </>
    )
}
