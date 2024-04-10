export const PortfolioData = {
    user: {
        name: "Fernando",
        firstSurname: "Merino",
        secondSurname: "Marquez",
        email: "fernandomema@gmail.com",
        phone: "+34 644 49 10 07",
    },
    jobs: [{
        name: "Frontend Developer",
        bussiness: "Viajes Para Ti",
        technologies: ["Symfony", "PhP", "JavaScript", "Web-components", "Webpack", "Jest", "css", "less", "scss/sass"],
        dates: {
            start: new Date(2021, 8, 16),
            end: undefined,
        }
    }], 
    studies: [{
        name: "Desarrollo de aplicaciones web (DAW)",
        school: "IES Baix Camp (Reus)",
        dates: {
            start: new Date(2018, 9, 12),
            end: new Date(2020, 5, 12),
        }
    }],
    programmingLanguages: [{
        name: "JavaScript",
        color: "yellow",
        technologies: [{
            name: "Svelte",
        }, {
            name: "SvelteKit"
        }]
    }]
}