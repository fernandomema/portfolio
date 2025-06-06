<script lang="ts">
    import { PortfolioData } from "$lib/PortfolioData";
    import Slide from "$lib/components/Slide.svelte";
    import { slideScroll } from "$lib/directives/slideScroll";
    import IconRocket from '@tabler/icons-svelte/IconRocket.svelte';
    import IconBrandGithub from '@tabler/icons-svelte/IconBrandGithub.svelte';
    import IconExternalLink from '@tabler/icons-svelte/IconExternalLink.svelte';
    import IconCode from '@tabler/icons-svelte/IconCode.svelte';
    import IconUser from '@tabler/icons-svelte/IconUser.svelte';

    let slide: HTMLElement;
    let altElem: HTMLElement | null = null;
    $: altElem = slide?.closest('[data-container="slider"]') as HTMLElement | null;
</script>

<Slide class="bg-gradient-to-br from-blue-500/30 via-purple-500/20 to-pink-500/30" enableScroll={false}>
    <div slot="content" class="text-white overflow-x-hidden flex snap-x snap-mandatory h-full" bind:this={slide}>
        {#if slide}
            <!-- Portada -->
            <div class="relative snap-start h-full max-h-screen min-w-full flex flex-col items-center justify-center overflow-hidden" use:slideScroll={{altElem}}>
                <div class="flex flex-col items-center gap-4 z-10">
                    <div class="bg-white/80 rounded-full p-6 shadow-lg mb-2">
                        <IconRocket stroke={2} size={64} class="stroke-purple-500" />
                    </div>
                    <h2 class="text-4xl sm:text-5xl font-extrabold tracking-tight text-white drop-shadow-lg text-center">
                        Proyectos Personales
                    </h2>
                    <p class="text-white text-lg max-w-xl text-center mt-2 px-4">
                        Una selección de proyectos que he desarrollado por pasión y aprendizaje.<br class="hidden sm:block"/> Desliza para explorarlos.
                    </p>
                </div>
            </div>

            <!-- Proyectos -->
            {#each PortfolioData.personalProjects as project}
                <div class="relative snap-start min-w-full flex items-center justify-center p-8" use:slideScroll={{altElem}}>
                    <div class="relative z-10 w-full max-w-4xl">
                        <div class="backdrop-blur-md bg-white/10 rounded-2xl p-8 border border-white/20">
                            <div class="flex flex-col gap-6">
                                <!-- Título y enlaces -->
                                <div class="text-center">
                                    <h3 class="text-3xl sm:text-4xl font-bold text-white mb-4 drop-shadow-lg">
                                        {project.name}
                                    </h3>
                                    <div class="flex justify-center gap-4">
                                        <a 
                                            href={project.url} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            class="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                                        >
                                            <IconExternalLink size={20} />
                                            <span>Ver proyecto</span>
                                        </a>
                                    </div>
                                </div>

                                <!-- Descripción -->
                                <p class="text-white/90 text-center text-lg leading-relaxed max-w-2xl mx-auto">
                                    {project.description}
                                </p>

                                <!-- Tecnologías -->
                                <div class="flex flex-wrap justify-center gap-3">
                                    {#each project.technologies as tech}
                                        <span class="backdrop-blur-sm bg-white/5 px-4 py-2 rounded-full text-white/90 text-sm border border-white/10 hover:border-white/30 transition-colors duration-300">
                                            {tech}
                                        </span>
                                    {/each}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            {/each}
        {/if}
    </div>

    <div slot="floating">
        <!-- Línea de navegación -->
        <div class="absolute left-[60px] bg-white top-0 h-[70px] w-[5px] -translate-x-1/2"></div>
        <div class="absolute w-[80px] h-[80px] bg-white top-[70px] left-[60px] rounded-full -translate-x-1/2 flex justify-center items-center">
            <IconCode stroke={2} size={40} class="stroke-blue-500"></IconCode>
        </div>
        <div class="absolute left-[60px] bg-white bottom-0 h-[70px] w-[5px] -translate-x-1/2"></div>
        <div class="absolute w-[80px] h-[80px] bg-white bottom-[70px] left-[60px] rounded-full -translate-x-1/2 flex justify-center items-center">
            <IconUser stroke={2} size={40} class="stroke-blue-500"></IconUser>
        </div>
    </div>
</Slide>
