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
    title2: "Proyecto Destacado",
    subtitle2:
      "Mi trabajo más reciente y representativo",
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
      {
        title: "Frontend", skills: [
          "React.js", "React Native", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Shadcn/UI", "Bootstrap", "CSS", "SASS"
        ]
      },
      { title: "Backend", skills: ["Node.js", "Nest.js", "Express.js"] },
      { title: "Bases de Datos", skills: ["PostgreSQL", "MongoDB", "TypeORM", "Prisma"] },
      { title: "DevOps & Herramientas", skills: ["Docker", "Git", "GitHub", "WebSockets", "NPM"] },
      { title: "Otros", skills: ["OpenAI API", "Firebase", "Zustand", "TanStack Query", "React Router"] },
    ],
  },
  certificationsSection: {
    title: "Certificaciones",
    subtitle: "Formación continua y certificaciones que respaldan mi experiencia técnica",
    button: "Ver Certificado",
    providers: [
      {
        provider: "Microsoft",
        certifications: [
          {
            name: "Generative AI Professional Essentials, by Microsoft and LinkedIn",
            description:
              "Aprende los fundamentos de la IA generativa (LLMs, prompts, riesgos y ética) y cómo aplicarla en el trabajo con herramientas como Microsoft Copilot para automatizar tareas y potenciar la creatividad.",
            technologies: ["Inteligence Artificial", "AI Generative"],
            url: "https://www.linkedin.com/learning/certificates/557f513e7ac29edaff10120c047fcaa20e14f49ad5cb22ada78fb992a133c298",
            image: "https://i.imgur.com/KZfZAxN.jpeg",
          },
          {
            name: "Microsoft and LinkedIn Systems Administration Career Essentials",
            description:
              "Panorama del rol de SysAdmin: administración de entornos on-premise y cloud, virtualización, almacenamiento, seguridad, herramientas clave y ruta de desarrollo profesional.",
            technologies: ["System Administration"],
            url: "https://www.linkedin.com/learning/certificates/6102dccfffdf2a7957f2b873e9b085e337a12fb2e79240241ce644d998838a5d?trk=share_certificate",
            image: "https://i.imgur.com/j6bKiCz.jpeg",
          },
          {
            name: "Professional Fundamentals of Software Development, by Microsoft and LinkedIn",
            description:
              "Fundamentos de desarrollo de software: pensamiento computacional, estructuras de datos y control de flujo, principios de programación y buenas prácticas aplicadas a distintos lenguajes.",
            technologies: ["Software Development", "Programming"],
            url: "https://www.linkedin.com/learning/certificates/099ea9806183134afcfa1ba686fc97525ac1e387ae7838aee28dd6db7fa5d48a?trk=share_certificate",
            image: "https://i.imgur.com/Ey2UJyU.jpeg",
          },
        ],
      },
      {
        provider: "DevTalles",
        certifications: [
          {
            name: "JavaScript Moderno: Guía para dominar el lenguaje",
            description:
              "De cero a avanzado en JavaScript moderno: ES6+, asincronía, módulos, patrones y buenas prácticas para un nivel competitivo en el mercado.",
            technologies: ["JavaScript"],
            url: "https://cursos.devtalles.com/certificates/0ukjpjpu3m",
            image: "https://i.imgur.com/G0ct8M7.jpeg",
          },
          {
            name: "React: De cero a experto ( Hooks y MERN )",
            description:
              "React 100% con Hooks: estado, contexto, router, pruebas unitarias/integración, patrones avanzados y proyectos MERN orientados a producción.",
            technologies: ["React", "Hooks", "Context API", "React Router", "Testing Library/Jest", "MongoDB", "Express", "Node", "Firebase", "Bootstrap", "CSS"],
            url: "https://cursos.devtalles.com/certificates/1tufqctqtl",
            image: "https://i.imgur.com/uOyBwvP.jpeg",
          },
          {
            name: "React PRO: Lleva tus bases al siguiente nivel",
            description:
              "Perfecciona bases de React con patrones intermedios/avanzados, optimización de rendimiento, composición de componentes y mejores prácticas con Hooks.",
            technologies: ["PWA", "NPM", "Formik", "React"],
            url: "https://cursos.devtalles.com/certificates/6pal3nwfr8",
            image: "https://i.imgur.com/WzpvI6C.jpeg",
          },
          {
            name: "TypeScript: Tu completa guía y manual de mano.",
            description:
              "TypeScript de principio a fin: tipado estático, interfaces, genéricos, util types, configuración del compilador y uso con frameworks modernos.",
            technologies: ["Typescript"],
            url: "https://cursos.devtalles.com/certificates/hbll5frkg7",
            image: "https://i.imgur.com/DgrWi3k.jpeg",
          },
          {
            name: "OpenAI: Ejercicios prácticos y asistentes con React + NestJS",
            description:
              "Integración práctica de OpenAI: consumo desde Node/NestJS y frontend en React para chat/completions, generación/edición de imágenes, audio TTS/STT y asistentes.",
            technologies: ["Nest", "React", "OpenAI API"],
            url: "https://cursos.devtalles.com/certificates/hmg7rnngij",
            image: "https://i.imgur.com/vbdUQvc.jpeg",
          },
          {
            name: "TanStack Query - Un poderoso gestor de estado asíncrono.",
            description:
              "Uso profesional de TanStack Query para datos remotos: caché, invalidaciones, reintentos, sincronización en segundo plano, SSR y patrones de fetching en React.",
            technologies: ["TanStack Query", "React"],
            url: "https://cursos.devtalles.com/certificates/irg3nsjnzjl",
            image: "https://i.imgur.com/3OZvkWV.jpeg",
          },
          {
            name: "React Router: Navegación declarativa y framework",
            description:
              "React Router como librería y como framework: rutas anidadas, loaders/acciones, protección de rutas, manejo de sesiones y despliegue con Docker.",
            technologies: ["React Router", "React"],
            url: "https://cursos.devtalles.com/certificates/etbadnszea",
            image: "https://i.imgur.com/kHXedJz.jpeg",
          },
          {
            name: "Zustand: Gestor de estado para React",
            description:
              "Gestor de estado ligero para React: stores tipados, middlewares, persistencia, slices y patrones para reemplazar Redux/Context en casos comunes.",
            technologies: ["Zustand", "React"],
            url: "https://cursos.devtalles.com/certificates/igzbv9zjly",
            image: "https://i.imgur.com/dF9hMUJ.jpeg",
          },
          {
            name: "Next.js: El framework de React para producción",
            description:
              "Next.js de forma integral: enrutamiento, data-fetching, SSR/SSG, optimización, TypeScript y ejercicios orientados a apps listas para producción.",
            technologies: ["Next.js", "React"],
            url: "https://cursos.devtalles.com/certificates/f5vsw3jrvt",
            image: "https://i.imgur.com/xKye8go.jpeg",
          },
          {
            name: "GIT+GitHub: Todo un sistema de control de versiones de cero",
            description:
              "Control de versiones profesional con Git y GitHub: flujo de trabajo, ramas, PRs, issues, wikis, tokens y colaboración en equipos.",
            technologies: ["Git", "GitHub"],
            url: "https://cursos.devtalles.com/certificates/60yhalceu6",
            image: "https://i.imgur.com/1TU18ZR.jpeg",
          },
          {
            name: "Shadcn/ui: Componentes accesibles y personalizables",
            description:
              "Implementación de shadcn/ui en proyectos Next.js: instalación, anatomía de componentes y construcción de un dashboard con Tailwind.",
            technologies: ["Tailwind", "Shadcn/UI"],
            url: "https://cursos.devtalles.com/certificates/ymsslzknzy",
            image: "https://i.imgur.com/eYqQVQG.jpeg",
          },
          {
            name: "Node.Js: De cero a experto",
            description:
              "Node.js práctico: CLI/HTTP/Express, pruebas, despliegues y Docker; desde fundamentos hasta patrones y casos de uso modernos.",
            technologies: ["Node", "Express", "WebSockets", "MongoDB", "PostgreSQL"],
            url: "https://cursos.devtalles.com/certificates/epjl1mza9y",
            image: "https://i.imgur.com/94HoX2o.jpeg",
          },
          {
            name: "Nest: Desarrollo backend escalable con Node",
            description:
              "NestJS de cero a producción: módulos, inyección de dependencias, guards/interceptors, websockets, Docker y despliegue de backends.",
            technologies: ["Nest", "TypeORM", "WebSockets", "Typescript", "PostgreSQL", "Docker"],
            url: "https://cursos.devtalles.com/certificates/bcdvt6t2hd",
            image: "https://i.imgur.com/ylYZO0S.jpeg",
          },
          {
            name: "NestJs + Reportes: Genera PDFs desde Node",
            description:
              "Generación de reportes PDF con NestJS: PdfMake, Chart.js, tablas, QR, estilos reutilizables, HTML→PDF y conexión a BD (Prisma/PostgreSQL).",
            technologies: ["Nest", "PostgreSQL"],
            url: "https://cursos.devtalles.com/certificates/a6dki5q26m",
            image: "https://i.imgur.com/OadreRP.jpeg",
          },
        ],
      },
    ]
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
    formSubtitle: "Trabajemos juntos en tu próximo proyecto",
    namePlaceholder: "Nombre",
    emailPlaceholder: "Email",
    subjectPlaceholder: "Asunto",
    messagePlaceholder: "Mensaje",
    sendButton: "Enviar Mensaje",
    footerTitle: "¿Listo para comenzar tu próximo proyecto?",
    footerSubtitle: "Conversemos sobre cómo puedo ayudarte a hacer realidad tus ideas",
    toastSuccess: "¡Mensaje enviado correctamente!",
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
