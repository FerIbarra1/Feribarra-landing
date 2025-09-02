export const es = {
  lang: "es",
  nav: {
    home: "Inicio",
    experience: "Experiencia",
    skills: "Habilidades",
    projects: "Proyectos",
    certifications: "Certificaciones",
    contact: "Contacto",
  },
  hero: {
    name: "Fernando Ibarra",
    role: "Desarrollador Full Stack",
    description:
      "Desarrollador React con más de 4 años de experiencia creando aplicaciones web y móviles escalables y de alto rendimiento.",
    ctaProjects: "Ver Proyectos",
    ctaContact: "Contactar",
    socialGithub: "GitHub",
    socialLinkedin: "LinkedIn",
    socialEmail: "Email",
  },
  projectsSection: {
    title: "Mis Proyectos",
    subtitle:
      "Una selección de proyectos que demuestran mis habilidades en desarrollo full‑stack",
    viewProject: "Ver Proyecto",
    tech: "Tecnologías",
    prev: "Anterior",
    next: "Siguiente",
  },
  experienceSection: {
    title: "Experiencia Profesional",
    subtitle: "Mi trayectoria profesional desarrollando soluciones tecnológicas innovadoras",
  },
  skillsSection: {
    title: "Habilidades Técnicas",
    subtitle:
      "Tecnologías y herramientas con las que trabajo para crear soluciones innovadoras",
    categories: [
      { title: "Frontend", skills: [
        "React.js","React Native","Next.js","TypeScript","JavaScript","Tailwind CSS","Shadcn/UI","Bootstrap","CSS","SASS"
      ]},
      { title: "Backend", skills: ["Node.js","Nest.js","Express.js"] },
      { title: "Bases de Datos", skills: ["PostgreSQL","MongoDB","TypeORM","Prisma"] },
      { title: "DevOps & Herramientas", skills: ["Docker","Git","GitHub","WebSockets","NPM"] },
      { title: "Otros", skills: ["OpenAI API","Firebase","Zustand","TanStack Query","React Router"] },
    ],
  },
  certificationsSection: {
    title: "Certificaciones",
    subtitle: "Formación continua y certificaciones que respaldan mi experiencia técnica",
    providers: [
      {
        provider: "Microsoft",
        certifications: [
          {
            name: "Software Development Fundamentals",
            description:
              "Fundamentos del desarrollo de software, principios de programación y mejores prácticas.",
            technologies: ["C#", ".NET", "Arquitectura de Software", "OOP"],
          },
          {
            name: "Generative AI Fundamentals",
            description:
              "Fundamentos de IA generativa, modelos de lenguaje y aplicaciones prácticas.",
            technologies: ["AI", "Machine Learning", "GPT", "Azure AI"],
          },
          {
            name: "Systems Administration Career Fundamentals",
            description:
              "Administración de sistemas, infraestructura y gestión de servidores.",
            technologies: ["Windows Server", "PowerShell", "Active Directory", "Networking"],
          },
        ],
      },
      {
        provider: "DevTalles",
        certifications: [
          {
            name: "TypeScript",
            description:
              "Desarrollo avanzado con TypeScript, tipos, interfaces y patrones de diseño.",
            technologies: ["TypeScript", "JavaScript", "Type Safety", "OOP"],
          },
          {
            name: "React & React PRO",
            description:
              "Desarrollo completo con React, hooks, context, patrones avanzados y optimización.",
            technologies: ["React", "Hooks", "Context API", "Performance"],
          },
          {
            name: "Next.js",
            description:
              "Framework de React para aplicaciones full‑stack con SSR, SSG y API routes.",
            technologies: ["Next.js", "SSR", "SSG", "API Routes"],
          },
          {
            name: "Node.js & Nest.js",
            description:
              "Desarrollo backend con Node.js y el framework empresarial Nest.js.",
            technologies: ["Node.js", "Nest.js", "Express", "REST APIs"],
          },
          {
            name: "Zustand & TanStack Query",
            description:
              "Gestión de estado y manejo de datos asíncronos en aplicaciones React.",
            technologies: ["Zustand", "TanStack Query", "State Management", "Caching"],
          },
          {
            name: "OpenAI & AI with React + NestJS",
            description:
              "Integración de IA en aplicaciones web usando OpenAI API con React y NestJS.",
            technologies: ["OpenAI API", "AI Integration", "React", "NestJS"],
          },
        ],
      },
    ],
  },
  contactSection: {
    title: "Contacto",
    subtitle: "¿Tienes un proyecto en mente? Me encantaría escucharte",
    infoTitle: "Información de Contacto",
    emailLabel: "Email",
    phoneLabel: "Teléfono",
    locationLabel: "Ubicación",
    locationValue: "Hermosillo, Sonora, México",
    formTitle: "Envíame un mensaje",
    namePlaceholder: "Nombre",
    emailPlaceholder: "Email",
    subjectPlaceholder: "Asunto",
    messagePlaceholder: "Mensaje",
    sendButton: "Enviar Mensaje",
    toastSuccess: "¡Mensaje enviado correctamente!",
  },
  footer: {
    copyright: "© 2025 Fernando Ibarra. Todos los derechos reservados.",
  },
  experiences: [
    {
      company: "INOWU Development",
      position: "Full Stack Developer",
      period: "Dic 2023 – Presente",
      location: "Hermosillo, Sonora, México (Híbrido)",
      description: [
        "Desarrollo full‑stack con React, Next.js, Nest.js, PostgreSQL",
        "Construcción y mantenimiento de aplicaciones web responsivas y APIs",
        "Resolución de problemas complejos en proyectos nacionales e internacionales",
      ],
      technologies: ["React", "Next.js", "Nest.js", "PostgreSQL"],
    },
    {
      company: "IGRTEC",
      position: "React Native Team Lead",
      period: "Sep 2023 – Dic 2024",
      location: "Remoto",
      description: [
        "Lideré un equipo de desarrolladores móviles construyendo apps multiplataforma",
        "Implementé mejores prácticas en calidad de código y optimización de rendimiento",
        "Gestión de control de versiones y metodologías ágiles",
      ],
      technologies: ["React Native", "TypeScript", "Git", "Team Leadership"],
    },
  ],
  projects: [
    {
      id: 1,
      title: "Votométrica",
      description:
        "Plataforma inteligente para conteo de votos en tiempo real: digitaliza actas, valida con IA (OCR) y muestra resultados en mapas con actualizaciones periódicas, enfocada en rapidez, claridad y transparencia.",
      imageKey: "ProyectoVotometrica",
      technologies: ["Next JS", "React", "TypeScript", "TypeORM", "PostgreSQL", "Leaflet/Maps", "OCR/IA"],
      liveUrl: "https://www.votometrica.com",
      githubUrl: "#",
      colors: { primary: "#0a97b0", secondary: "#0a97b080", accent: "#0a97b0", shadow: "14 165 233" },
    },
    {
      id: 2,
      title: "RealDeal JC",
      description:
        "E‑commerce de coleccionables y juguetes con catálogo dinámico y experiencia de compra rápida. Marca con estética ‘mint’ sobre fondo oscuro para resaltar producto.",
      imageKey: "ProyectoRealDeal",
      technologies: ["Next JS", "React", "TypeScript", "Stripe", "MongoDB", "Node JS"],
      liveUrl: "https://www.realdealjc.com",
      githubUrl: "#",
      colors: { primary: "#19b64f", secondary: "#19b64f", accent: "#19b64f", shadow: "183 245 200" },
    },
    {
      id: 3,
      title: "WFacturas",
      description:
        "Sistema de facturación y timbrado CFDI con dashboard, autofactura y planes de timbres; orientado a eficiencia, seguridad y actualización continua con lineamientos del SAT.",
      imageKey: "ProyectoWFacturas",
      technologies: ["Next JS", "React", "TypeScript", "Node JS", "PostgreSQL", "CFDI", "Timbrado SAT"],
      liveUrl: "https://wfacturas.com",
      githubUrl: "#",
      colors: { primary: "#4ca647", secondary: "#4ca647", accent: "#4ca647", shadow: "22 163 74" },
    },
    {
      id: 4,
      title: "VR VideoRemixes",
      description:
        "Plataforma por suscripción para explorar y descargar packs de videoremixes (tendencias, géneros y colecciones), con cuenta/migración y secciones de soporte y planes.",
      imageKey: "ProyectoVR",
      technologies: ["Next JS", "React", "TypeScript", "Nest JS", "Redis", "AWS S3", "Prisma"],
      liveUrl: "https://videoremixespacks.com",
      githubUrl: "#",
      colors: { primary: "#ec0932", secondary: "#ec0932", accent: "#ec0932", shadow: "6 182 212" },
    },
    {
      id: 5,
      title: "Entrify",
      description:
        "Gestión de acceso físico con QR dinámicos y verificación de identidad; control en tiempo real para residencial y corporativo, con demo y servicios (lector QR, diseño de punto de acceso).",
      imageKey: "ProyectoEntrify",
      technologies: ["Next JS", "React", "TypeScript", "SASS"],
      liveUrl: "https://www.entrify.mx",
      githubUrl: "#",
      colors: { primary: "#1b263b", secondary: "#1b263b", accent: "#1b263b", shadow: "14 165 233" },
    },
  ],
}

export type EsDict = typeof es
