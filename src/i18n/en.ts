export const en = {
  lang: "en",
  nav: {
    home: "Home",
    experience: "Experience",
    skills: "Skills",
    projects: "Projects",
    certifications: "Certifications",
    education: "Education",
    contact: "Contact",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    downloadCv: "Download CV",
  },
  hero: {
    name: "Fernando Ibarra",
    eyebrow: "SENIOR BACKEND ENGINEER · HERMOSILLO, MX · REMOTE",
    role: "Senior Backend / Full Stack Developer",
    description:
      "I design and ship distributed backend systems — NestJS microservices, message-driven payment engines, and the unglamorous work of making them correct under load.",
    ctaProjects: "View the work",
    ctaContact: "Contact",
    ctaCv: "Download CV",
    status: "Available for projects · Currently at Rocket Code",
    stackLine: "NestJS · RabbitMQ · Redis · SQL Server · React",
    socialGithub: "GitHub",
    socialLinkedin: "LinkedIn",
    socialEmail: "Email",
  },
  projectsSection: {
    title: "My Projects",
    subtitle:
      "A selection of projects showcasing my full‑stack development skills",
    viewProject: "View Project",
    tech: "Tech",
    prev: "Previous",
    next: "Next",
    title2: "Featured Project",
    subtitle2:
      "My most recent and representative work",
  },
  experienceSection: {
    title: "Professional Experience",
    subtitle: "My journey building innovative technology solutions",
  },
  skillsSection: {
    title: "Technical Stack",
    subtitle:
      "Technologies and tools, with the context where I used them.",
    usedInLabel: "Used in",
    integrationsLabel: "Integrations",
    integrations: [
      "Payment systems", "Legacy systems", "Third-party APIs", "Keycloak", "OpenAI API", "Firebase"
    ],
    categories: [
      {
        title: "Frontend", usedIn: "Client work · Side projects", skills: [
          "React", "React Native", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "shadcn/ui", "Zustand", "TanStack Query", "React Router", "React Hook Form", "Zod"
        ]
      },
      { title: "Backend", usedIn: "Insurance platform · Client work", skills: ["Node.js", "NestJS", "Express.js", "REST APIs", "Microservices", "WebSockets"] },
      { title: "Architecture & Messaging", usedIn: "Insurance platform", skills: ["Clean Architecture", "Hexagonal (Ports & Adapters)", "DDD", "RabbitMQ", "Redis", "BullMQ", "Asynchronous communication"] },
      { title: "Databases", usedIn: "Insurance platform · Client work", skills: ["SQL Server", "PostgreSQL", "MongoDB", "Prisma", "TypeORM"] },
      { title: "DevOps & Tools", usedIn: "Insurance platform", skills: ["Docker", "Git", "GitLab CI", "ArgoCD", "Kubernetes", "NPM", "PNPM", "Sentry"] },
    ],
  },
  certificationsSection: {
    title: "Certifications",
    subtitle: "Continuous learning and certifications backing my technical expertise",
    button: "View Certificate",
    showAll: "Show all 15 DevTalles certifications",
    showLess: "Show less",
    providers: [
      {
        provider: "Microsoft",
        certifications: [
          {
            name: "Generative AI Professional Essentials, by Microsoft and LinkedIn",
            description:
              "Learn the fundamentals of generative AI (LLMs, prompts, risks, and ethics) and how to apply it in your work with tools like Microsoft Copilot to automate tasks and boost creativity.",
            technologies: ["Artificial Intelligence", "Generative AI"],
            url: "https://www.linkedin.com/learning/certificates/557f513e7ac29edaff10120c047fcaa20e14f49ad5cb22ada78fb992a133c298",
            image: "/certifications/KZfZAxN-1200.webp",
          },
          {
            name: "Microsoft and LinkedIn Systems Administration Career Essentials",
            description:
              "Overview of the SysAdmin role: managing on-premise and cloud environments, virtualization, storage, security, key tools, and career path.",
            technologies: ["System Administration"],
            url: "https://www.linkedin.com/learning/certificates/6102dccfffdf2a7957f2b873e9b085e337a12fb2e79240241ce644d998838a5d",
            image: "/certifications/j6bKiCz-1200.webp",
          },
          {
            name: "Professional Fundamentals of Software Development, by Microsoft and LinkedIn",
            description:
              "Software development fundamentals: computational thinking, data structures and flow control, programming principles and best practices applied to different languages.",
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
            name: "Modern JavaScript: A Guide to Mastering the Language",
            description:
              "From Zero to Advanced in Modern JavaScript: ES6+, Asynchrony, Modules, Patterns, and Best Practices for a Competitive Level in the Market.",
            technologies: ["JavaScript"],
            url: "https://cursos.devtalles.com/certificates/0ukjpjpu3m",
            image: "/certifications/G0ct8M7-1200.webp",
          },
          {
            name: "React: From Zero to Expert (Hooks and MERN)",
            description:
              "React 100% with Hooks: state, context, router, unit/integration testing, advanced patterns, and production-oriented MERN projects.",
            technologies: ["React", "Hooks", "Context API", "React Router", "Testing Library/Jest", "MongoDB", "Express", "Node", "Firebase", "Bootstrap", "CSS"],
            url: "https://cursos.devtalles.com/certificates/1tufqctqtl",
            image: "/certifications/uOyBwvP-1200.webp",
          },
          {
            name: "React PRO: Take your foundations to the next level",
            description:
              "Improve your React foundation with intermediate/advanced patterns, performance optimization, component composition, and best practices with Hooks.",
            technologies: ["PWA", "NPM", "Formik", "React"],
            url: "https://cursos.devtalles.com/certificates/6pal3nwfr8",
            image: "/certifications/WzpvI6C-1200.webp",
          },
          {
            name: "React: From Zero to Expert (updated edition)",
            description:
              "An update of the React course: revisits the fundamentals and moves to the practices the ecosystem uses today, with Hooks, component composition, and modern development patterns.",
            technologies: ["React", "Hooks", "TypeScript"],
            url: "https://cursos.devtalles.com/certificates/grfoac6egq",
            image: "/certifications/nssarnF-1200.webp",
          },
          {
            name: "TypeScript: Your Complete Guide and Handbook.",
            description:
              "TypeScript from start to finish: static typing, interfaces, generics, util types, compiler configuration, and use with modern frameworks.",
            technologies: ["Typescript"],
            url: "https://cursos.devtalles.com/certificates/hbll5frkg7",
            image: "/certifications/DgrWi3k-1200.webp",
          },
          {
            name: "OpenAI: Hands-on exercises and tutorials with React + NestJS",
            description:
              "Hands-on OpenAI integration: Node/NestJS consumption and React frontend for chat/completions, image generation/editing, TTS/STT audio, and assistants.",
            technologies: ["Nest", "React", "OpenAI API",],
            url: "https://cursos.devtalles.com/certificates/hmg7rnngij",
            image: "/certifications/vbdUQvc-1200.webp",
          },
          {
            name: "TanStack Query - A powerful asynchronous state manager.",
            description:
              "Professional use of TanStack Query for remote data: caching, invalidations, retries, background synchronization, SSR, and fetching patterns in React.",
            technologies: ["TanStack Query", "React"],
            url: "https://cursos.devtalles.com/certificates/irg3nsjnzj",
            image: "/certifications/3OZvkWV-1200.webp",
          },
          {
            name: "React Router: Declarative Navigation and Framework",
            description:
              "React Router as a library and as a framework: nested routes, loaders/actions, route protection, session management, and Docker deployment.",
            technologies: ["React Router", "React"],
            url: "https://cursos.devtalles.com/certificates/etbadnszea",
            image: "/certifications/kHXedJz-1200.webp",
          },
          {
            name: "Zustand: State Manager for React",
            description:
              "Lightweight state manager for React: typed stores, middleware, persistence, slices, and patterns to replace Redux/Context in common use cases.",
            technologies: ["Zustand", "React"],
            url: "https://cursos.devtalles.com/certificates/igzbv9zjly",
            image: "/certifications/dF9hMUJ-1200.webp",
          },
          {
            name: "Next.js: The React Framework for Production",
            description:
              "Next.js in its entirety: routing, data fetching, SSR/SSG, optimization, TypeScript, and exercises geared toward production-ready apps.",
            technologies: ["Next.js", "React"],
            url: "https://cursos.devtalles.com/certificates/f5vsw3jrvt",
            image: "/certifications/xKye8go-1200.webp",
          },
          {
            name: "GIT+GitHub: A complete version control system from scratch",
            description:
              "Professional version control with Git and GitHub: workflow, branches, PRs, issues, wikis, tokens, and team collaboration.",
            technologies: ["Git", "GitHub"],
            url: "https://cursos.devtalles.com/certificates/60yhalceu6",
            image: "/certifications/1TU18ZR-1200.webp",
          },
          {
            name: "Shadcn/ui: Accessible and customizable components",
            description:
              "Implementing shadcn/ui in Next.js projects: installation, component anatomy, and building a dashboard with Tailwind.",
            technologies: ["Tailwind", "Shadcn/UI"],
            url: "https://cursos.devtalles.com/certificates/ymsslzknzy",
            image: "/certifications/eYqQVQG-1200.webp",
          },
          {
            name: "Node.Js: From Zero to Expert",
            description:
              "Practical Node.js: CLI/HTTP/Express, Testing, Deployments, and Docker—from fundamentals to modern patterns and use cases.",
            technologies: ["Node", "Express", "WebSockets", "MongoDB", "PostgreSQL"],
            url: "https://cursos.devtalles.com/certificates/epjl1mza9y",
            image: "/certifications/94HoX2o-1200.webp",
          },
          {
            name: "Nest: Scalable backend development with Node",
            description:
              "NestJS from zero to production: modules, dependency injection, guards/interceptors, websockets, Docker, and backend deployment.",
            technologies: ["Nest", "TypeORM", "WebSockets", "Typescript", "PostgreSQL", "Docker"],
            url: "https://cursos.devtalles.com/certificates/bcdvt6t2hd",
            image: "/certifications/ylYZO0S-1200.webp",
          },
          {
            name: "NestJs + Reports: Generate PDFs from Node",
            description:
              "Generating PDF reports with NestJS: PdfMake, Chart.js, tables, QR codes, reusable styles, HTML→PDF, and database connection (Prisma/PostgreSQL).",
            technologies: ["Nest", "PostgreSQL"],
            url: "https://cursos.devtalles.com/certificates/a6dki5q26m",
            image: "/certifications/OadreRP-1200.webp",
          },
        ],
      },
    ],
  },
  contactSection: {
    title: "Contact",
    subtitle: "Got a project in mind? I’d love to hear about it",
    infoTitle: "Contact Information",
    emailLabel: "Email",
    phoneLabel: "Phone",
    locationLabel: "Location",
    locationValue: "Hermosillo, Sonora, Mexico",
    formTitle: "Send me a message",
    formSubtitle: "Let's work together on your next project",
    namePlaceholder: "Name",
    emailPlaceholder: "Email",
    subjectPlaceholder: "Subject",
    companyPlaceholder: "Company",
    messagePlaceholder: "Message",
    sendButton: "Send Message",
    footerTitle: "Ready to start your next project?",
    footerSubtitle: "Let's talk about how I can help you make your ideas a reality.",
    toastSuccess: "Message sent successfully!",
    toastError: "Failed to send message. Please try again later.",
    sending: "Sending...",
  },
  metrics: {
    title: "Impact",
    intro:
      "Selected contributions to a multi-tenant insurance platform — a NestJS microservice fleet serving national retail brands. Figures are counts taken from the codebase.",
    items: [
      { value: "11", label: "microservices", qualifier: "uniform Clean Architecture + Hexagonal + DDD" },
      { value: "53", label: "payment strategies", qualifier: "behind a single dispatcher (4 methods × 18 domains)" },
      { value: "63", label: "database schemas", qualifier: "one per tenant per domain" },
      { value: "4+", label: "years in production", qualifier: "software shipped to real users" },
    ],
    honestyFootnote:
      "Team project. I contributed to the payment services and the SPA; I did not build this alone. Numbers are counts from the codebase, not claims of authorship.",
  },
  enterpriseCase: {
    eyebrow: "ENTERPRISE PLATFORM · 2025 — PRESENT",
    title: "A multi-tenant insurance platform",
    body: [
      "Eleven backend services in a NestJS fleet, one React SPA, and six identity realms. I worked on the payment domain: a strategy matrix spanning 4 payment methods across 18 product domains, with two entry doors (REST and an RPC queue) converging on one dispatcher.",
      "Clean Architecture (Ports & Adapters) with domain separation, RabbitMQ service-to-service communication, Redis and BullMQ async work, and Prisma persistence on SQL Server — one database per tenant, resolved from the JWT on every request instead of migrating the shared legacy schema.",
    ],
    tech: ["NestJS", "RabbitMQ", "Redis", "Prisma", "SQL Server", "Keycloak", "Docker", "ArgoCD"],
    patternsLabel: "Patterns",
    patterns: "Clean Architecture · Ports & Adapters · DDD · database-per-tenant from JWT",
    strategyMatrixLabel: "Strategy matrix",
    strategyMatrixValue: "53 strategies · 4 methods × 18 domains",
  },
  educationSection: {
    title: "Education",
    degree: "Bachelor's Degree in Software Development",
    institution: "Tecnológico Nacional de México, Campus Hermosillo",
    period: "Aug 2017 – Dec 2024",
    location: "Hermosillo, Sonora, Mexico",
  },
  languagesSection: {
    title: "Languages",
    items: [
      { language: "Spanish", level: "Native" },
      { language: "English", level: "Basic professional proficiency" },
    ],
  },
  cvBand: {
    title: "The full CV",
    subtitle: "Two pages with the track record, the stack, and the certifications.",
    downloadEs: "Descargar CV (ES)",
    downloadEn: "Download CV (EN)",
    meta: "PDF · 2 pages",
  },
  theme: {
    toggle: "Toggle theme",
    light: "Light",
    dark: "Dark",
    system: "System",
  },
  footer: {
    tagline: "Senior Backend / Full Stack Developer — distributed systems, microservices, and payment engines.",
    rights: "All rights reserved.",
    backToTop: "Back to top",
    builtWith: "Built with React 19 · Vite 7 · Tailwind 4",
  },
  experiences: [
    {
      company: "Rocket Code",
      position: "Senior Backend Developer",
      period: "Nov 2025 – Present",
      location: "Hermosillo, Sonora, Mexico (Remote)",
      description: [
        "Develop and maintain backend services with Node.js, TypeScript, and NestJS within a microservice architecture.",
        "Implement inter-service communication over RabbitMQ, including messaging, asynchronous processing, and correlationId preservation in RPC calls.",
        "Develop and integrate payment-processing services, connecting new microservices with existing backend systems.",
        "Analyze legacy business logic to ensure new implementations preserve established functional behavior.",
        "Design persistence with Prisma on SQL Server, including transactional atomicity in payment flows.",
        "Containerize backend services with Docker and prepare them for different deployment environments.",
        "Troubleshoot integration issues, data-consistency problems, and communication between distributed services.",
      ],
      technologies: ["NestJS", "TypeScript", "Node.js", "RabbitMQ", "Redis", "Prisma", "SQL Server", "Docker"],
    },
    {
      company: "INOWU Development",
      position: "Full Stack Developer",
      period: "Dec 2023 – Nov 2025",
      location: "Hermosillo, Sonora, Mexico (Hybrid)",
      description: [
        "Full‑stack development with React, Next.js, NestJS, and PostgreSQL.",
        "Built and maintained responsive web applications and REST APIs.",
        "Solved complex technical problems while improving performance, stability, and reliability.",
        "Contributed to modernizing existing systems, including legacy-to-web platform integration.",
        "Implemented synchronization processes between legacy systems and cloud platforms using automated processes, triggers, and backend services.",
      ],
      technologies: ["React", "Next.js", "NestJS", "PostgreSQL", "TypeScript"],
    },
    {
      company: "IGRTEC",
      position: "React Native Team Lead",
      period: "Sep 2023 – Dec 2024",
      location: "Remote",
      description: [
        "Led a team of developers building cross-platform mobile applications with React Native.",
        "Established software development best practices and code organization standards.",
        "Performed code reviews and provided technical guidance to team members.",
        "Implemented strategies to improve mobile application performance, stability, and maintainability.",
        "Coordinated development workflows using Git and version control.",
      ],
      technologies: ["React Native", "TypeScript", "Git", "Team Leadership"],
    },
  ],
  projects: [
    {
      id: 1,
      title: "Votométrica",
      description:
        "Smart platform for real‑time vote counting: digitizes tally sheets, validates with AI (OCR) and displays results on maps with periodic updates — focused on speed, clarity and transparency.",
      imageKey: "ProyectoVotometrica",
      technologies: ["Next JS", "React", "TypeScript", "TypeORM", "PostgreSQL", "Leaflet/Maps", "OCR/AI"],
      liveUrl: "https://www.votometrica.com",
    },
    {
      id: 2,
      title: "RealDeal JC",
      description:
        "Collectibles and toys e‑commerce with a dynamic catalog and fast checkout. Brand uses a mint aesthetic over dark background to highlight products.",
      imageKey: "ProyectoRealDeal",
      technologies: ["Next JS", "React", "TypeScript", "Stripe", "MongoDB", "Node JS"],
      liveUrl: "https://www.realdealjc.com",
    },
    {
      id: 3,
      title: "WFacturas",
      description:
        "CFDI invoicing and stamping system with dashboard, self‑invoicing and stamp plans; focused on efficiency, security and continuous updates aligned with SAT guidelines.",
      imageKey: "ProyectoWFacturas",
      technologies: ["Next JS", "React", "TypeScript", "Node JS", "PostgreSQL", "CFDI", "SAT Stamping"],
      liveUrl: "https://wfacturas.com",
    },
    {
      id: 4,
      title: "VR VideoRemixes",
      description:
        "Subscription platform to explore and download videoremix packs (trending, genres and collections), with accounts/migration plus support and plans sections.",
      imageKey: "ProyectoVR",
      technologies: ["Next JS", "React", "TypeScript", "Nest JS", "Redis", "AWS S3", "Prisma"],
      liveUrl: "https://videoremixespacks.com",
    },
    {
      id: 5,
      title: "Entrify",
      description:
        "Physical access control with dynamic QR and identity verification; real‑time control for residential and corporate use, with demo and services (QR reader, access point design).",
      imageKey: "ProyectoEntrify",
      technologies: ["Next JS", "React", "TypeScript", "SASS"],
      liveUrl: "https://www.entrify.mx",
    },
  ],
}

export type EnDict = typeof en
