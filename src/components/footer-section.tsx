import { useI18n } from "@/i18n/use-i18n";
import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";

export function FooterSection() {
  const { t, dict } = useI18n();
  const k = dict.footer;
  const nav = dict.nav;

  const handleTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-border py-16">
      <div className="container-page">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-12 mb-12">
          <div>
            <p className="text-body text-foreground/85 max-w-[28rem]">
              {k.tagline}
            </p>
          </div>

          <div>
            <p className="text-eyebrow uppercase text-muted-foreground mb-4">
              {t("nav.experience")}
            </p>
            <ul className="space-y-2">
              {[
                { href: "#inicio", label: nav.home },
                { href: "#experiencia", label: nav.experience },
                { href: "#habilidades", label: nav.skills },
                { href: "#proyectos", label: nav.projects },
                { href: "#certificaciones", label: nav.certifications },
                { href: "#contacto", label: nav.contact },
              ].map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-meta text-foreground/85 hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-eyebrow uppercase text-muted-foreground mb-4">
              {t("hero.socialGithub")}
            </p>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/Feribarra1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-meta text-foreground/85 hover:text-foreground transition-colors inline-flex items-center gap-2"
                >
                  <Github className="h-4 w-4" aria-hidden="true" />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/feribarra1/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-meta text-foreground/85 hover:text-foreground transition-colors inline-flex items-center gap-2"
                >
                  <Linkedin className="h-4 w-4" aria-hidden="true" />
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="mailto:fernandooibarra@gmail.com"
                  className="text-meta text-foreground/85 hover:text-foreground transition-colors inline-flex items-center gap-2"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-mono-sm text-muted-foreground/70">
          <p>
            © {new Date().getFullYear()} Fernando Ibarra · {k.rights}
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#inicio"
              onClick={handleTop}
              className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
              aria-label={k.backToTop}
            >
              <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
              {k.backToTop}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
