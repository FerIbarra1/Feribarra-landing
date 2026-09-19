export const es = {
  lang: "es",
  nav: {
    home: "Inicio",
    experience: "Experiencia",
    skills: "Habilidades",
    projects: "Proyectos",
    certifications: "Certificaciones",
    education: "Formación",
    contact: "Contacto",
    menuOpen: "Abrir menú",
    menuClose: "Cerrar menú",
    downloadCv: "Descargar CV",
  },
  hero: {
    name: "Fernando Ibarra",
    eyebrow: "SENIOR BACKEND ENGINEER · HERMOSILLO, MX · REMOTO",
    role: "Senior Backend / Full Stack Developer",
    description:
      "Diseño y llevo a producción sistemas backend distribuidos: microservicios con NestJS, motores de pago dirigidos por mensajería, y el trabajo poco vistoso de hacerlos correctos bajo carga.",
    ctaProjects: "Ver el trabajo",
    ctaContact: "Contactar",
    ctaCv: "Descargar CV",
    status: "Disponible para proyectos · Actualmente en Rocket Code",
    stackLine: "NestJS · RabbitMQ · Redis · SQL Server · React",
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
    title: "Stack Técnico",
    subtitle:
      "Tecnologías y herramientas, con el contexto donde las usé.",
    usedInLabel: "Usado en",
    integrationsLabel: "Integraciones",
    integrations: [
      "Sistemas de pago", "Sistemas legacy", "APIs de terceros", "Keycloak", "OpenAI API", "Firebase"
    ],
    categories: [
      {
        title: "Frontend", usedIn: "Trabajo de cliente · Proyectos propios", skills: [
          "React", "React Native", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "shadcn/ui", "Zustand", "TanStack Query", "React Router", "React Hook Form", "Zod"
        ]
      },
      { title: "Backend", usedIn: "Plataforma de seguros · Trabajo de cliente", skills: ["Node.js", "NestJS", "Express.js", "REST APIs", "Microservices", "WebSockets"] },
      { title: "Arquitectura y Mensajería", usedIn: "Plataforma de seguros", skills: ["Clean Architecture", "Hexagonal (Ports & Adapters)", "DDD", "RabbitMQ", "Redis", "BullMQ", "Comunicación asíncrona"] },
      { title: "Bases de Datos", usedIn: "Plataforma de seguros · Trabajo de cliente", skills: ["SQL Server", "PostgreSQL", "MongoDB", "Prisma", "TypeORM"] },
      { title: "DevOps & Herramientas", usedIn: "Plataforma de seguros", skills: ["Docker", "Git", "GitLab CI", "ArgoCD", "Kubernetes", "NPM", "PNPM", "Sentry"] },
    ],
  },
  certificationsSection: {
    title: "Certificaciones",
    subtitle: "Formación continua y certificaciones que respaldan mi experiencia técnica",
    button: "Ver Certificado",
    showAll: "Ver las 15 certificaciones de DevTalles",
    showLess: "Mostrar menos",
    providers: [
      {
        provider: "Microsoft",
        certifications: [
          {
            name: "Generative AI Professional Essentials, by Microsoft and LinkedIn",
            description:
              "Aprende los fundamentos de la IA generativa (LLMs, prompts, riesgos y ética) y cómo aplicarla en el trabajo con herramientas como Microsoft Copilot para automatizar tareas y potenciar la creatividad.",
            technologies: ["Inteligencia Artificial", "IA Generativa"],
            url: "https://www.linkedin.com/learning/certificates/557f513e7ac29edaff10120c047fcaa20e14f49ad5cb22ada78fb992a133c298",
            image: "/certifications/KZfZAxN-1200.webp",
          },
          {
            name: "Microsoft and LinkedIn Systems Administration Career Essentials",
            description:
              "Panorama del rol de SysAdmin: administración de entornos on-premise y cloud, virtualización, almacenamiento, seguridad, herramientas clave y ruta de desarrollo profesional.",
            technologies: ["System Administration"],
            url: "https://www.linkedin.com/learning/certificates/6102dccfffdf2a7957f2b873e9b085e337a12fb2e79240241ce644d998838a5d",
            image: "/certifications/j6bKiCz-1200.webp",
          },
          {
            name: "Professional Fundamentals of Software Development, by Microsoft and LinkedIn",
            description:
              "Fundamentos de desarrollo de software: pensamiento computacional, estructuras de datos y control de flujo, principios de programación y buenas prácticas aplicadas a distintos lenguajes.",
            technologies: ["Software Development", "Programming"],
            url: "https://www.linkedin.com/learning/certificates/099ea9806183134afcfa1ba686fc97525ac1e387ae7838aee28dd6db7fa5d48a",
            image: "/certifications/Ey2UJyU-1200.webp",
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
            image: "/certifications/G0ct8M7-1200.webp",
          },
          {
            name: "React: De cero a experto ( Hooks y MERN )",
            description:
              "React 100% con Hooks: estado, contexto, router, pruebas unitarias/integración, patrones avanzados y proyectos MERN orientados a producción.",
            technologies: ["React", "Hooks", "Context API", "React Router", "Testing Library/Jest", "MongoDB", "Express", "Node", "Firebase", "Bootstrap", "CSS"],
            url: "https://cursos.devtalles.com/certificates/1tufqctqtl",
            image: "/certifications/uOyBwvP-1200.webp",
          },
          {
            name: "React PRO: Lleva tus bases al siguiente nivel",
            description:
              "Perfecciona bases de React con patrones intermedios/avanzados, optimización de rendimiento, composición de componentes y mejores prácticas con Hooks.",
            technologies: ["PWA", "NPM", "Formik", "React"],
            url: "https://cursos.devtalles.com/certificates/6pal3nwfr8",
            image: "/certifications/WzpvI6C-1200.webp",
          },
          {
            name: "React: De cero a experto (edición actualizada)",
            description:
              "Actualización del curso de React: repaso de fundamentos y adopción de las prácticas vigentes del ecosistema, con Hooks, composición de componentes y patrones modernos de desarrollo.",
            technologies: ["React", "Hooks", "TypeScript"],
            url: "https://cursos.devtalles.com/certificates/grfoac6egq",
            image: "/certifications/nssarnF-1200.webp",
          },
          {
            name: "TypeScript: Tu completa guía y manual de mano.",
            description:
              "TypeScript de principio a fin: tipado estático, interfaces, genéricos, util types, configuración del compilador y uso con frameworks modernos.",
            technologies: ["Typescript"],
            url: "https://cursos.devtalles.com/certificates/hbll5frkg7",
            image: "/certifications/DgrWi3k-1200.webp",
          },
          {
            name: "OpenAI: Ejercicios prácticos y asistentes con React + NestJS",
            description:
              "Integración práctica de OpenAI: consumo desde Node/NestJS y frontend en React para chat/completions, generación/edición de imágenes, audio TTS/STT y asistentes.",
            technologies: ["Nest", "React", "OpenAI API"],
            url: "https://cursos.devtalles.com/certificates/hmg7rnngij",
            image: "/certifications/vbdUQvc-1200.webp",
          },
          {
            name: "TanStack Query - Un poderoso gestor de estado asíncrono.",
            description:
              "Uso profesional de TanStack Query para datos remotos: caché, invalidaciones, reintentos, sincronización en segundo plano, SSR y patrones de fetching en React.",
            technologies: ["TanStack Query", "React"],
            url: "https://cursos.devtalles.com/certificates/irg3nsjnzj",
            image: "/certifications/3OZvkWV-1200.webp",
          },
          {
            name: "React Router: Navegación declarativa y framework",
            description:
              "React Router como librería y como framework: rutas anidadas, loaders/acciones, protección de rutas, manejo de sesiones y despliegue con Docker.",
            technologies: ["React Router", "React"],
            url: "https://cursos.devtalles.com/certificates/etbadnszea",
            image: "/certifications/kHXedJz-1200.webp",
          },
          {
            name: "Zustand: Gestor de estado para React",
            description:
              "Gestor de estado ligero para React: stores tipados, middlewares, persistencia, slices y patrones para reemplazar Redux/Context en casos comunes.",
            technologies: ["Zustand", "React"],
            url: "https://cursos.devtalles.com/certificates/igzbv9zjly",
            image: "/certifications/dF9hMUJ-1200.webp",
          },
          {
            name: "Next.js: El framework de React para producción",
            description:
              "Next.js de forma integral: enrutamiento, data-fetching, SSR/SSG, optimización, TypeScript y ejercicios orientados a apps listas para producción.",
            technologies: ["Next.js", "React"],
            url: "https://cursos.devtalles.com/certificates/f5vsw3jrvt",
            image: "/certifications/xKye8go-1200.webp",
          },
          {
            name: "GIT+GitHub: Todo un sistema de control de versiones de cero",
            description:
              "Control de versiones profesional con Git y GitHub: flujo de trabajo, ramas, PRs, issues, wikis, tokens y colaboración en equipos.",
            technologies: ["Git", "GitHub"],
            url: "https://cursos.devtalles.com/certificates/60yhalceu6",
            image: "/certifications/1TU18ZR-1200.webp",
          },
          {
            name: "Shadcn/ui: Componentes accesibles y personalizables",
            description:
              "Implementación de shadcn/ui en proyectos Next.js: instalación, anatomía de componentes y construcción de un dashboard con Tailwind.",
            technologies: ["Tailwind", "Shadcn/UI"],
            url: "https://cursos.devtalles.com/certificates/ymsslzknzy",
            image: "/certifications/eYqQVQG-1200.webp",
          },
          {
            name: "Node.Js: De cero a experto",
            description:
              "Node.js práctico: CLI/HTTP/Express, pruebas, despliegues y Docker; desde fundamentos hasta patrones y casos de uso modernos.",
            technologies: ["Node", "Express", "WebSockets", "MongoDB", "PostgreSQL"],
            url: "https://cursos.devtalles.com/certificates/epjl1mza9y",
            image: "/certifications/94HoX2o-1200.webp",
          },
          {
            name: "Nest: Desarrollo backend escalable con Node",
            description:
              "NestJS de cero a producción: módulos, inyección de dependencias, guards/interceptors, websockets, Docker y despliegue de backends.",
            technologies: ["Nest", "TypeORM", "WebSockets", "Typescript", "PostgreSQL", "Docker"],
            url: "https://cursos.devtalles.com/certificates/bcdvt6t2hd",
            image: "/certifications/ylYZO0S-1200.webp",
          },
          {
            name: "NestJs + Reportes: Genera PDFs desde Node",
            description:
              "Generación de reportes PDF con NestJS: PdfMake, Chart.js, tablas, QR, estilos reutilizables, HTML→PDF y conexión a BD (Prisma/PostgreSQL).",
            technologies: ["Nest", "PostgreSQL"],
            url: "https://cursos.devtalles.com/certificates/a6dki5q26m",
            image: "/certifications/OadreRP-1200.webp",
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
    companyPlaceholder: "Empresa",
    messagePlaceholder: "Mensaje",
    sendButton: "Enviar Mensaje",
    footerTitle: "¿Listo para comenzar tu próximo proyecto?",
    footerSubtitle: "Conversemos sobre cómo puedo ayudarte a hacer realidad tus ideas",
    toastSuccess: "¡Mensaje enviado correctamente!",
    toastError: "Error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.",
    sending: "Enviando...",
  },
  metrics: {
    title: "Impacto",
    intro:
      "Contribuciones seleccionadas a una plataforma de seguros multi-inquilino — una flota de microservicios NestJS al servicio de marcas minoristas nacionales. Las cifras son conteos tomados del código.",
    items: [
      { value: "11", label: "microservicios", qualifier: "Clean Architecture + Hexagonal + DDD uniforme" },
      { value: "53", label: "estrategias de pago", qualifier: "detrás de un solo dispatcher (4 métodos × 18 dominios)" },
      { value: "63", label: "esquemas de base de datos", qualifier: "uno por inquilino por dominio" },
      { value: "4+", label: "años en producción", qualifier: "software enviado a usuarios reales" },
    ],
    honestyFootnote:
      "Proyecto en equipo. Contribuí a los servicios de pago y al SPA; no construí esto solo. Las cifras son conteos del código, no afirmaciones de autoría.",
  },
  enterpriseCase: {
    eyebrow: "PLATAFORMA EMPRESARIAL · 2025 — PRESENTE",
    title: "Una plataforma de seguros multi-inquilino",
    body: [
      "Once servicios backend en una flota NestJS, un SPA en React y seis realms de identidad. Trabajé en el dominio de pagos: una matriz de estrategias que cubre 4 métodos de pago sobre 18 dominios de producto, con dos puertas de entrada (REST y una cola RPC) convergiendo en un solo dispatcher.",
      "Arquitectura limpia (Ports & Adapters) con separación de dominios, comunicación entre servicios por RabbitMQ, trabajo asíncrono con Redis y BullMQ, y persistencia con Prisma sobre SQL Server — una base de datos por inquilino, resuelta desde el JWT en cada petición en lugar de migrar el esquema legacy compartido.",
    ],
    tech: ["NestJS", "RabbitMQ", "Redis", "Prisma", "SQL Server", "Keycloak", "Docker", "ArgoCD"],
    patternsLabel: "Patrones",
    patterns: "Clean Architecture · Ports & Adapters · DDD · database-per-tenant desde JWT",
    strategyMatrixLabel: "Matriz de estrategias",
    strategyMatrixValue: "53 estrategias · 4 métodos × 18 dominios",
  },
  educationSection: {
    title: "Formación",
    degree: "Licenciatura en Desarrollo de Software",
    institution: "Tecnológico Nacional de México, Campus Hermosillo",
    period: "Ago 2017 – Dic 2024",
    location: "Hermosillo, Sonora, México",
  },
  languagesSection: {
    title: "Idiomas",
    items: [
      { language: "Español", level: "Nativo" },
      { language: "English", level: "Competencia profesional básica" },
    ],
  },
  cvBand: {
    title: "El CV completo",
    subtitle: "Dos páginas con la trayectoria, el stack y las certificaciones.",
    downloadEs: "Descargar CV (ES)",
    downloadEn: "Download CV (EN)",
    meta: "PDF · 2 páginas",
  },
  theme: {
    toggle: "Cambiar tema",
    light: "Claro",
    dark: "Oscuro",
    system: "Sistema",
  },
  footer: {
    tagline: "Senior Backend / Full Stack Developer — sistemas distribuidos, microservicios y motores de pago.",
    rights: "Todos los derechos reservados.",
    backToTop: "Volver arriba",
    builtWith: "Hecho con React 19 · Vite 7 · Tailwind 4",
  },
  experiences: [
    {
      company: "Rocket Code",
      position: "Senior Backend Developer",
      period: "Nov 2025 – Presente",
      location: "Hermosillo, Sonora, México (Remoto)",
      description: [
        "Desarrollo y mantenimiento de servicios backend con Node.js, TypeScript y NestJS dentro de una arquitectura de microservicios.",
        "Implementación de comunicación entre microservicios mediante RabbitMQ, incluyendo mensajería, procesamiento asíncrono y preservación de correlationId en llamadas RPC.",
        "Desarrollo e integración de servicios de procesamiento de pagos, conectando microservicios nuevos con sistemas backend existentes.",
        "Análisis de la lógica de negocio legacy para asegurar que las nuevas implementaciones preserven el comportamiento funcional establecido.",
        "Diseño de la persistencia con Prisma sobre SQL Server, incluyendo atomicidad transaccional en flujos de pago.",
        "Containerización de servicios backend con Docker y preparación para distintos ambientes de despliegue.",
        "Resolución de problemas de integración, consistencia de datos y comunicación entre servicios distribuidos.",
      ],
      technologies: ["NestJS", "TypeScript", "Node.js", "RabbitMQ", "Redis", "Prisma", "SQL Server", "Docker"],
    },
    {
      company: "INOWU Development",
      position: "Full Stack Developer",
      period: "Dic 2023 – Nov 2025",
      location: "Hermosillo, Sonora, México (Híbrido)",
      description: [
        "Desarrollo full‑stack con React, Next.js, NestJS y PostgreSQL.",
        "Construcción y mantenimiento de aplicaciones web responsivas y APIs REST.",
        "Resolución de problemas técnicos complejos, mejorando rendimiento, estabilidad y confiabilidad.",
        "Participación en la modernización de sistemas existentes, incluyendo integración entre sistemas legacy y nuevas plataformas web.",
        "Implementación de procesos de sincronización entre sistemas legacy y plataformas cloud mediante procesos automatizados, triggers y servicios backend.",
      ],
      technologies: ["React", "Next.js", "NestJS", "PostgreSQL", "TypeScript"],
    },
    {
      company: "IGRTEC",
      position: "React Native Team Lead",
      period: "Sep 2023 – Dic 2024",
      location: "Remoto",
      description: [
        "Liderazgo de un equipo de desarrolladores enfocado en aplicaciones móviles multiplataforma con React Native.",
        "Definición y aplicación de buenas prácticas de desarrollo y organización del código.",
        "Revisión de código y apoyo técnico al equipo durante el desarrollo de funcionalidades.",
        "Implementación de estrategias para mejorar rendimiento, estabilidad y mantenibilidad de aplicaciones móviles.",
        "Coordinación de flujos de trabajo mediante Git y control de versiones.",
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
    },
    {
      id: 2,
      title: "RealDeal JC",
      description:
        "E‑commerce de coleccionables y juguetes con catálogo dinámico y experiencia de compra rápida. Marca con estética ‘mint’ sobre fondo oscuro para resaltar producto.",
      imageKey: "ProyectoRealDeal",
      technologies: ["Next JS", "React", "TypeScript", "Stripe", "MongoDB", "Node JS"],
      liveUrl: "https://www.realdealjc.com",
    },
    {
      id: 3,
      title: "WFacturas",
      description:
        "Sistema de facturación y timbrado CFDI con dashboard, autofactura y planes de timbres; orientado a eficiencia, seguridad y actualización continua con lineamientos del SAT.",
      imageKey: "ProyectoWFacturas",
      technologies: ["Next JS", "React", "TypeScript", "Node JS", "PostgreSQL", "CFDI", "Timbrado SAT"],
      liveUrl: "https://wfacturas.com",
    },
    {
      id: 4,
      title: "VR VideoRemixes",
      description:
        "Plataforma por suscripción para explorar y descargar packs de videoremixes (tendencias, géneros y colecciones), con cuenta/migración y secciones de soporte y planes.",
      imageKey: "ProyectoVR",
      technologies: ["Next JS", "React", "TypeScript", "Nest JS", "Redis", "AWS S3", "Prisma"],
      liveUrl: "https://videoremixespacks.com",
    },
    {
      id: 5,
      title: "Entrify",
      description:
        "Gestión de acceso físico con QR dinámicos y verificación de identidad; control en tiempo real para residencial y corporativo, con demo y servicios (lector QR, diseño de punto de acceso).",
      imageKey: "ProyectoEntrify",
      technologies: ["Next JS", "React", "TypeScript", "SASS"],
      liveUrl: "https://www.entrify.mx",
    },
  ],
}

export type EsDict = typeof es
