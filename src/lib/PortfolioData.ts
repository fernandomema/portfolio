export const PortfolioData = {
    user: {
        name: "Fernando",
        firstSurname: "Merino",
        secondSurname: "Marquez",
        email: "fernandomema@gmail.com",
        phone: "+34 644 49 10 07",
        location: "Reus, Tarragona, España",
        bio: "Desarrollador fullstack con enfoque en la experiencia de usuario, interfaces limpias y rendimiento. Apasionado por crear productos útiles, intuitivos y visualmente agradables. Amante de los side-projects, la tecnología y la mejora continua.",
        github: "https://github.com/fernandomema",
        linkedin: "https://www.linkedin.com/in/fernandomema",
        application: "Fullstack Developer",
    },
    jobs: [{
        name: "Desarrollador Web",
        business: "Viajes Para Ti",
        technologies: [
            { label: "Symfony", icon: "symfony" },
            { label: "PHP", icon: "php" },
            { label: "JavaScript", icon: "javascript" },
            { label: "Web Components", icon: "html5" },
            { label: "Webpack", icon: "webpack" },
            { label: "Jest", icon: "jest" },
            { label: "CSS", icon: "css3" },
            { label: "LESS", icon: "less" },
            { label: "SCSS/SASS", icon: "sass" }
        ],
        dates: {
            start: new Date(2021, 7, 16),
            end: new Date(2025, 6, 7),
        },
        description: "Desarrollo y mantenimiento de componentes web personalizados reutilizables. Refactorización de legacy code con buenas prácticas y tests unitarios. Trabajo en un entorno colaborativo con metodología agile y enfoque en producto.",
        longDescription: `<div class="bg-white p-6 rounded-xl shadow-md">
  <h2 class="text-2xl font-bold text-gray-900 mb-2">Frontend Developer en Viajes Para Ti</h2>
  <p class="text-sm text-gray-600 mb-4">Desde septiembre de 2021 – Actualidad</p>
  
  <div class="space-y-4 text-gray-800 text-base leading-relaxed">
    <p>
      En mi rol como <strong>Frontend Developer</strong> en <strong>Viajes Para Ti</strong>, he formado parte del equipo técnico responsable del desarrollo y mantenimiento del ecosistema web que soporta una de las plataformas de viajes líderes en el sector. Mi foco principal ha sido el diseño y desarrollo de <strong>componentes web personalizados reutilizables</strong>, asegurando una integración coherente y optimizada dentro de múltiples áreas del sitio.
    </p>
    
    <p>
      He trabajado intensamente en la <strong>refactorización de código legacy</strong> escrito en Symfony, PHP y JavaScript, aplicando <strong>buenas prácticas</strong> de arquitectura, patrones modernos de desarrollo, y asegurando la calidad mediante <strong>tests unitarios con Jest</strong>. Esta labor ha contribuido a mejorar la mantenibilidad, escalabilidad y rendimiento del código base, reduciendo errores en producción y facilitando el onboarding de nuevos desarrolladores.
    </p>

    <p>
      Además, he colaborado estrechamente con otros equipos bajo una <strong>metodología Agile</strong> (Scrum), participando activamente en plannings, refinamientos y retrospectivas. Este enfoque colaborativo me ha permitido alinear mis entregas con los objetivos del producto, enfocándome no solo en la parte técnica sino también en aportar valor tangible al negocio y a la experiencia del usuario.
    </p>

    <p>
      Durante este tiempo he utilizado tecnologías como <span class="font-medium">Web Components</span>, <span class="font-medium">Webpack</span> y <span class="font-medium">CSS preprocessors (LESS, SCSS/SASS)</span>, así como herramientas internas para despliegue y control de versiones. Esta experiencia ha fortalecido mi perfil como desarrollador frontend con enfoque modular, rendimiento optimizado y visión de producto.
    </p>
  </div>

  <div class="mt-6">
    <h3 class="text-lg font-semibold text-gray-900 mb-2">Tecnologías utilizadas</h3>
    <ul class="flex flex-wrap gap-2">
      <li class="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">Symfony</li>
      <li class="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">PHP</li>
      <li class="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">JavaScript</li>
      <li class="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">Web Components</li>
      <li class="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">Webpack</li>
      <li class="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">Jest</li>
      <li class="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">CSS</li>
      <li class="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">LESS</li>
      <li class="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">SCSS/SASS</li>
    </ul>
  </div>
</div>
`
    }, {
        name: "Desarrollador Web",
        business: "OnWork",
        technologies: [
            { label: "Angular", icon: "angular" },
            { label: "TypeScript", icon: "typescript" },
            { label: "Node.js", icon: "nodejs" },
            { label: "Prisma", icon: "prisma" },
        ],
        dates: {
            start: new Date(2021, 1, 20),
            end: new Date(2021, 6, 30),
        },
        description: "Desarrollo de una plataforma backoffice para gestionar los clientes de la empresa. Permitiendo la gestión de usuarios, empresas, estadísticas y representación de gráficos.",
    }],
    studies: [{
        name: "Desarrollo de Aplicaciones Web (DAW)",
        school: "IES Baix Camp (Reus)",
        dates: {
            start: new Date(2018, 8, 12),
            end: new Date(2020, 4, 12),
        }
    }, {
        name: "Técnico en Sistemas Microinformáticos y Redes (SMR)",
        school: "IES Baix Camp (Reus)",
        dates: {
            start: new Date(2016, 8, 12),
            end: new Date(2018, 4, 12),
        }
    }],
    certifications: [
        {
            name: "Curso desarrollo FullStack con PHP y Laravel",
            hours: 275,
            year: 2021,
            institution: "Fundación Esplai",
            url: null
        },
        {
            name: "Curso de maquetación web con CSS",
            hours: 2,
            year: 2019,
            institution: "OpenWebinars",
            url: null
        },
        {
            name: "Curso de Fundamentos de progressive web apps",
            hours: 3,
            year: 2019,
            institution: "OpenWebinars",
            url: "https://openwebinars.net/cert/ZLeR6"
        },
        {
            name: "Curso Cisco cybersecurity essentials",
            hours: 30,
            year: 2018,
            institution: "Cisco networking academy",
            url: null
        }
    ],
    programmingLanguages: [
        {
            name: "JavaScript",
            color: "yellow",
            technologies: [
                { label: "Svelte"},
                { label: "SvelteKit", icon: "svelte" },
                { label: "Node.js", icon: "nodejs" },
                { label: "Remotion" },
                { label: "Jest" },
            ]
        },
        {
            name: "TypeScript",
            color: "blue",
            technologies: [
                { label: "SvelteKit", icon: "svelte" },
                { label: "tRPC" },
                { label: "Drizzle ORM", icon: "azuresqldatabase" },
                { label: "Prisma", icon: "prisma" },
                { label: "Zod" }
            ]
        },
        {
            name: "PHP",
            color: "violet",
            technologies: [
                { label: "Symfony", icon: "symfony" },
                { label: "Laravel", icon: "laravel" }
            ]
        },
        {
            name: "Template Engines",
            color: "green",
            technologies: [
                { label: "Twig", icon: "symfony" },
                { label: "blade", icon: "laravel" },
                { label: "ejs" }
            ]
        }, {
            name: "Services",
            color: "green",
            technologies: [
                { label: "Vercel" },
                { label: "Netlify" },
                { label: "Github pages", icon: "github" },
                { label: "Railway", icon: "heroku" },
                { label: "Dockploy", icon: "docker" },
                { label: "Coolify", icon: "docker" }
            ]
        }, {
            name: "Tech i touched some",
            color: "green",
            technologies: [
                { label: "Unity", icon: "unity" },
                { label: "AWS", icon: "amazonwebservices" },
                { label: "Arduino", icon: "arduino" },
                { label: "React", icon: "react" },
                { label: "Angular", icon: "angular" },
            ]
        }, {
            name: "CSS",
            color: "blue",
            technologies: [
                { label: "Tailwind", icon: "tailwindcss" },
                { label: "Bootstrap", icon: "bootstrap" },
                { label: "SCSS", icon: "sass" },
                { label: "LESS", icon: "less" }
            ]
        }, {
            name: "CI/CD",
            color: "blue",
            technologies: [
                { label: "GitHub Actions", icon: "github" },
                { label: "GitLab CI", icon: "gitlab" }
            ]
        },
        {
            name: "Project Management",
            color: "blue",
            technologies: [
                { label: "Jira", icon: "jira" },
                { label: "GitHub Projects", icon: "github" }
            ]
        },
        {
            name: "Design & Prototyping",
            color: "purple",
            technologies: [
                { label: "Figma Dev Mode", icon: "figma" }
            ]
        },
        {
            name: "Analytics & Monitoring",
            color: "red",
            technologies: [
                { label: "Google Analytics", icon: "google" },
                { label: "Sentry" },
                { label: "Umami.is" },
            ]
        }, {
            name: "Databases",
            color: "orange",
            technologies: [
                { label: "MySQL", icon: "mysql" },
                { label: "PostgreSQL", icon: "postgresql" },
                { label: "SQLite", icon: "sqlite" },
                { label: "MongoDB", icon: "mongodb" },
                { label: "Redis", icon: "redis" },
                { label: "TingoDB", icon: "tingodb" },
                { label: "Payload CMS", icon: "payload" },
            ]
        }, {
            name: "Version Control",
            color: "blue",
            technologies: [
                { label: "Git", icon: "git" },
                { label: "GitHub", icon: "github" },
                { label: "GitLab", icon: "gitlab" },
            ]
        }, {
            name: "Devices & Platforms",
            color: "green",
            technologies: [
                { label: "Raspberry Pi", icon: "raspberrypi" },
                { label: "Arduino", icon: "arduino" },
                { label: "ESP32", icon: "esp32" },
            ]
        }
    ],
    personalProjects: [
        {
            name: "Tragos Locos",
            description: "App para fiestas y reuniones donde los usuarios reciben retos, preguntas y minijuegos. Disponible en la web y optimizada para móvil.",
            url: "https://tragos-locos.servitimo.net",
            github: "https://github.com/fernandomema/drinking-game",
            technologies: [
                { label: "SvelteKit", icon: "svelte" },
                { label: "TypeScript", icon: "typescript" },
                { label: "Tailwind", icon: "tailwindcss" },
                { label: "Capacitor", icon: "capacitor" },
                { label: "Github Pages", icon: "github" },
                { label: "PWA", icon: "pwa" }
            ]
        },{
            name: "Zumito Framework",
            description: "Framework modular para crear bots de Discord en TypeScript, con arquitectura basada en plugins y sistema de comandos dinámicos.",
            url: "https://framework.zumito.dev",
            github: "https://github.com/zumitoTeam/zumito-framework",
            technologies: [
                { label: "TypeScript", icon: "typescript" },
                { label: "Discord.js", icon: "discordjs" },
                { label: "Node.js", icon: "nodejs" }
            ]
        },{
            name: "Game Show Stream Kit",
            description: "Software de escritorio para crear concursos tipo game show en directo integrada con OBS. ",
            github: "https://github.com/fernandomema/game-show-stream-kit/tree/V2",
            technologies: [
                { label: "Electron", icon: "electron" },
                { label: "SvelteKit", icon: "svelte" },
                { label: "WebSocket", icon: "javascript" },
                { label: "TypeScript", icon: "typescript" },
                { label: "Tailwind", icon: "tailwindcss" },
                { label: "OBS Integration", icon: "vscode" }
            ]
        }, {
            name: "Memeado",
            description: "API para generación de memes usando plantillas predefinidas. Permite pasar texto como parámetros y devuelve imágenes generadas al instante.",
            github: "https://github.com/fernandomema/memeado",
            url: "https://memeado.vercel.app/",
            technologies: [
                { label: "Next.js", icon: "nextjs" },
                { label: "TypeScript", icon: "typescript" },
                { label: "Sharp", icon: "nodejs" },
                { label: "canvas", icon: "javascript" },
                { label: "API REST", icon: "nodejs" }
            ]
        }
    ],
    softSkills: [
        { name: "Comunicación efectiva", description: "Expreso ideas de forma clara y escucho activamente." },
        { name: "Trabajo en equipo", description: "Colaboro y aporto en ambientes multidisciplinares." },
        { name: "Resolución de problemas", description: "Encuentro soluciones prácticas ante desafíos." },
        { name: "Pensamiento crítico", description: "Analizo situaciones y tomo decisiones informadas." },
        { name: "Gestión del tiempo", description: "Organizo tareas y cumplo plazos de entrega." },
        { name: "Adaptabilidad", description: "Me ajusto rápidamente a cambios y nuevas tecnologías." },
        { name: "Proactividad", description: "Tomo la iniciativa para mejorar procesos y resultados." },
        { name: "Aprendizaje continuo", description: "Busco y aplico nuevos conocimientos constantemente." }
    ],
    preferredStack: {
        frontend: "SvelteKit + TypeScript + Tailwind",
        backend: "SvelteKit + Prisma",
        infra: "Vercel / Railway / Coolify / Dockploy",
        ci: "GitHub Actions",
        analytics: "Umami.is / Sentry",
        why: "Me permite ir de 0 a producción rápidamente, con buena DX, rendimiento y control total."
    }
}
