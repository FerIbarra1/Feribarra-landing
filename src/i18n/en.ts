export const en = {
  lang: "en",
  nav: {
    home: "Home",
    experience: "Experience",
    skills: "Skills",
    projects: "Projects",
    certifications: "Certifications",
    contact: "Contact",
  },
  hero: {
    name: "Fernando Ibarra",
    role: "Full Stack Developer",
    description:
      "React developer with 4+ years of experience building scalable, high‑performance web and mobile applications.",
    ctaProjects: "View Projects",
    ctaContact: "Contact",
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
  },
  experienceSection: {
    title: "Professional Experience",
    subtitle: "My journey building innovative technology solutions",
  },
  skillsSection: {
    title: "Technical Skills",
    subtitle:
      "Technologies and tools I use to build innovative solutions",
    categories: [
      { title: "Frontend", skills: [
        "React.js","React Native","Next.js","TypeScript","JavaScript","Tailwind CSS","Shadcn/UI","Bootstrap","CSS","SASS"
      ]},
      { title: "Backend", skills: ["Node.js","Nest.js","Express.js"] },
      { title: "Databases", skills: ["PostgreSQL","MongoDB","TypeORM","Prisma"] },
      { title: "DevOps & Tools", skills: ["Docker","Git","GitHub","WebSockets","NPM"] },
      { title: "Other", skills: ["OpenAI API","Firebase","Zustand","TanStack Query","React Router"] },
    ],
  },
  certificationsSection: {
    title: "Certifications",
    subtitle: "Continuous learning and certifications backing my technical expertise",
    providers: [
      {
        provider: "Microsoft",
        certifications: [
          {
            name: "Software Development Fundamentals",
            description:
              "Software development fundamentals, programming principles and best practices.",
            technologies: ["C#", ".NET", "Software Architecture", "OOP"],
          },
          {
            name: "Generative AI Fundamentals",
            description:
              "Generative AI fundamentals, language models and practical applications.",
            technologies: ["AI", "Machine Learning", "GPT", "Azure AI"],
          },
          {
            name: "Systems Administration Career Fundamentals",
            description:
              "Systems administration, infrastructure and server management.",
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
              "Advanced TypeScript development: types, interfaces and design patterns.",
            technologies: ["TypeScript", "JavaScript", "Type Safety", "OOP"],
          },
          {
            name: "React & React PRO",
            description:
              "Complete React development: hooks, context, advanced patterns and performance.",
            technologies: ["React", "Hooks", "Context API", "Performance"],
          },
          {
            name: "Next.js",
            description:
              "React framework for full‑stack apps with SSR, SSG and API routes.",
            technologies: ["Next.js", "SSR", "SSG", "API Routes"],
          },
          {
            name: "Node.js & Nest.js",
            description:
              "Backend development with Node.js and the enterprise Nest.js framework.",
            technologies: ["Node.js", "Nest.js", "Express", "REST APIs"],
          },
          {
            name: "Zustand & TanStack Query",
            description:
              "State management and async data handling in React applications.",
            technologies: ["Zustand", "TanStack Query", "State Management", "Caching"],
          },
          {
            name: "OpenAI & AI with React + NestJS",
            description:
              "AI integration in web apps using the OpenAI API with React and NestJS.",
            technologies: ["OpenAI API", "AI Integration", "React", "NestJS"],
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
    namePlaceholder: "Name",
    emailPlaceholder: "Email",
    subjectPlaceholder: "Subject",
    messagePlaceholder: "Message",
    sendButton: "Send Message",
    toastSuccess: "Message sent successfully!",
  },
  footer: {
    copyright: "© 2025 Fernando Ibarra. All rights reserved.",
  },
  experiences: [
    {
      company: "INOWU Development",
      position: "Full Stack Developer",
      period: "Dec 2023 – Present",
      location: "Hermosillo, Sonora, Mexico (Hybrid)",
      description: [
        "Full‑stack development with React, Next.js, Nest.js, PostgreSQL",
        "Build and maintain responsive web applications and APIs",
        "Solve complex problems across national and international projects",
      ],
      technologies: ["React", "Next.js", "Nest.js", "PostgreSQL"],
    },
    {
      company: "IGRTEC",
      position: "React Native Team Lead",
      period: "Sep 2023 – Dec 2024",
      location: "Remote",
      description: [
        "Led a mobile team building cross‑platform apps",
        "Implemented best practices in code quality and performance optimization",
        "Version control management and agile methodologies",
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
      githubUrl: "#",
      colors: { primary: "#0a97b0", secondary: "#0a97b080", accent: "#0a97b0", shadow: "14 165 233" },
    },
    {
      id: 2,
      title: "RealDeal JC",
      description:
        "Collectibles and toys e‑commerce with a dynamic catalog and fast checkout. Brand uses a mint aesthetic over dark background to highlight products.",
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
        "CFDI invoicing and stamping system with dashboard, self‑invoicing and stamp plans; focused on efficiency, security and continuous updates aligned with SAT guidelines.",
      imageKey: "ProyectoWFacturas",
      technologies: ["Next JS", "React", "TypeScript", "Node JS", "PostgreSQL", "CFDI", "SAT Stamping"],
      liveUrl: "https://wfacturas.com",
      githubUrl: "#",
      colors: { primary: "#4ca647", secondary: "#4ca647", accent: "#4ca647", shadow: "22 163 74" },
    },
    {
      id: 4,
      title: "VR VideoRemixes",
      description:
        "Subscription platform to explore and download videoremix packs (trending, genres and collections), with accounts/migration plus support and plans sections.",
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
        "Physical access control with dynamic QR and identity verification; real‑time control for residential and corporate use, with demo and services (QR reader, access point design).",
      imageKey: "ProyectoEntrify",
      technologies: ["Next JS", "React", "TypeScript", "SASS"],
      liveUrl: "https://www.entrify.mx",
      githubUrl: "#",
      colors: { primary: "#1b263b", secondary: "#1b263b", accent: "#1b263b", shadow: "14 165 233" },
    },
  ],
}

export type EnDict = typeof en
