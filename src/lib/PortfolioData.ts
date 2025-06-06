export const PortfolioData = {
    user: {
        name: "Fernando",
        firstSurname: "Merino",
        secondSurname: "Marquez",
        email: "fernandomema@gmail.com",
        phone: "+34 644 49 10 07",
        location: "Reus, Tarragona, España",
        bio: "Desarrollador frontend con enfoque en la experiencia de usuario, interfaces limpias y rendimiento. Apasionado por crear productos que sean útiles, intuitivos y visualmente agradables. Amante de los side-projects, la tecnología y los videojuegos narrativos.",
        github: "https://github.com/fernandomema",
        linkedin: "https://www.linkedin.com/in/fernandomema",
        website: "https://fernandomema.dev"
    },
    jobs: [{
        name: "Frontend Developer",
        business: "Viajes Para Ti",
        technologies: ["Symfony", "PHP", "JavaScript", "Web Components", "Webpack", "Jest", "CSS", "LESS", "SCSS/SASS"],
        dates: {
            start: new Date(2021, 8, 16),
            end: undefined,
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
    }],
    studies: [{
        name: "Desarrollo de Aplicaciones Web (DAW)",
        school: "IES Baix Camp (Reus)",
        dates: {
            start: new Date(2018, 9, 12),
            end: new Date(2020, 5, 12),
        }
    }],
    programmingLanguages: [
        {
            name: "JavaScript",
            color: "yellow",
            technologies: [
                { name: "Svelte" },
                { name: "SvelteKit" },
                { name: "Node.js" },
                { name: "Remotion" },
                { name: "Jest" },
                { name: "Playwright" }
            ]
        },
        {
            name: "TypeScript",
            color: "blue",
            technologies: [
                { name: "SvelteKit" },
                { name: "tRPC" },
                { name: "Drizzle ORM" },
                { name: "Zod" }
            ]
        },
        {
            name: "PHP",
            color: "violet",
            technologies: [
                { name: "Symfony" },
                { name: "Laravel" },
            ]
        },
        {
            name: "Template Engines",
            color: "green",
            technologies: [
                { name: "Twig" },
                { name: "blade" },
                { name: "ejs" },
            ]
        }, {
            name: "Services",
            color: "green",
            technologies: [
                { name: "Vercel" },
                { name: "Netlify" },
                { name: "Github pages" },
                { name: "Railway" },
                { name: "Dockploy" },
                { name: "Coolify" },
            ]
        }, {
            name: "Tech i touched some",
            color: "green",
            technologies: [
                { name: "Unity" },
                { name: "AWS" },
            ]
        }, {
            name: "CSS",
            color: "blue",
            technologies: [
                { name: "Tailwind" },
                { name: "Bootstrap" },
                { name: "SCSS" },
                { name: "LESS" },
            ]
        }, {
            name: "CI/CD",
            color: "blue",
            technologies: [
                { name: "GitHub Actions" },
                { name: "GitLab CI" },
            ]
        },
        {
            name: "Project Management",
            color: "blue",
            technologies: [
                { name: "Jira" },
                { name: "GitHub Projects" },
            ]
        },
        {
            name: "Design & Prototyping",
            color: "purple",
            technologies: [
                { name: "Figma Dev Mode" },
            ]
        },
        {
            name: "Analytics & Monitoring",
            color: "red",
            technologies: [
                { name: "Google Analytics" },
                { name: "Sentry" },
                { name: "Umami.is" },
            ]
        }
    ],
    personalProjects: [
        {
            name: "Tragos Locos",
            description: "App para fiestas y reuniones donde los usuarios reciben retos, preguntas y minijuegos. Disponible en la web y optimizada para móvil.",
            url: "https://tragoslocos.bytebop.com",
            technologies: ["SvelteKit", "TypeScript", "Tailwind", "Remotion", "Vercel"]
        },{
            name: "Zumito Framework",
            description: "Framework modular para crear bots de Discord en TypeScript, con arquitectura basada en plugins y sistema de comandos dinámicos.",
            url: "https://framework.zumito.dev",
            technologies: ["TypeScript", "Discord.js", "Node.js", "Modular Architecture"]
        },{
            name: "Game Show Stream Kit",
            description: "Software de escritorio para crear concursos tipo game show en directo integrada con OBS. ",
            url: "https://github.com/byFercho/game-show-stream-kit",
            technologies: ["SvelteKit", "WebSocket", "TypeScript", "Tailwind", "OBS Integration"]
        }, {
            name: "Memeado",
            description: "API para generación de memes usando plantillas predefinidas. Permite pasar texto como parámetros y devuelve imágenes generadas al instante.",
            url: "https://github.com/fernandomema/memeado",
            technologies: ["Next.js", "TypeScript", "Sharp", "API REST"]
        }, {
            name: "Letter to the World",
            description: "Plataforma acogedora para enviar cartas anónimas y reconfortantes a desconocidos de todo el mundo.",
            url: "https://lettertotheworld.bytebop.com",
            technologies: ["SvelteKit", "TypeScript", "Drizzle ORM", "SQLite"]
        }, {
            name: "Split The Price",
            description: "Marketplace con sorteos cooperativos de tarjetas regalo donde los participantes dividen el precio del premio.",
            url: "https://split.bytebop.com",
            technologies: ["SvelteKit", "Stripe", "tRPC", "Planetscale", "Tailwind"]
        },
        {
            name: "Ecos de Medianoche",
            description: "Aventura cooperativa en pixel art, estilo novela visual, donde los jugadores toman decisiones en grupo.",
            url: "https://ecos.bytebop.com",
            technologies: ["SvelteKit", "Canvas API", "Custom Engine", "Pixel Art"]
        }
    ],
    toolsAndSkills: [
        "Git", "GitHub", "Figma", "Stripe", "Firebase", "PlanetScale", "Vercel", "Vitest", "Docker (nivel básico)"
    ]
}
