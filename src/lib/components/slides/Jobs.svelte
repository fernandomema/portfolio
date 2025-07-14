<script lang="ts">
    import { PortfolioData } from "$lib/PortfolioData";
    import Slide from "$lib/components/Slide.svelte";
    import { horizontalWheelScroll } from "$lib/utils/horizontalScrollWheel";
    import { t } from '$lib/translations';

    import IconBriefcase from '@tabler/icons-svelte/IconBriefcase.svelte';
    import IconUser from '@tabler/icons-svelte/IconUser.svelte';
    import { slideScroll } from "$lib/directives/slideScroll";
    import { onMount } from "svelte";

    let slide: HTMLElement;
    let altElem: HTMLElement | null = null;
    $: altElem = slide?.closest('[data-container="slider"]') as HTMLElement | null;
</script>
  
<Slide class="bg-red-400 {$$restProps.class || ''}" enableScroll={false}>
    <div slot="content" class="text-white overflow-x-hidden flex snap-x snap-mandatory h-full" id="test" bind:this={slide}>
        {#if slide}
            <div class="relative snap-start h-full max-h-screen min-w-full flex flex-col items-center justify-center bg-gradient-to-br from-yellow-500/30 to-red-400/10 overflow-hidden" use:slideScroll={{altElem}}>
                <div class="flex flex-col items-center gap-4 z-10">
                    <div class="bg-white/80 rounded-full p-6 shadow-lg mb-2">
                        <IconBriefcase stroke={2} size={64} class="stroke-yellow-500"></IconBriefcase>
                    </div>
                    <h2 class="text-4xl sm:text-5xl font-extrabold tracking-tight text-yellow-100 drop-shadow-lg text-center">
                        {$t('previousJobs')}
                    </h2>
                    <p class="text-yellow-50 text-lg max-w-xl text-center mt-2 px-4">
                        Un repaso visual a mi experiencia profesional reciente.<br class="hidden sm:block"/> Desliza para ver los detalles de cada puesto.
                    </p>
                </div>
                <div class="absolute -top-20 -left-20 w-72 h-72 bg-yellow-400/20 rounded-full blur-2xl z-0"></div>
                <div class="absolute bottom-0 right-0 w-40 h-40 bg-red-400/20 rounded-full blur-2xl z-0"></div>
                <div class="absolute left-[60px] bg-white top-0 h-[70px] w-[5px] -translate-x-1/2"></div>
                <div class="absolute w-[80px] h-[80px] bg-white top-[70px] left-[60px] rounded-full -translate-x-1/2 flex justify-center items-center">
                    <IconUser stroke={2} size={40} class="stroke-blue-500"></IconUser>
                </div>
                <div class="absolute left-[60px] bg-white bottom-0 h-[70px] w-[5px] -translate-x-1/2"></div>
                <div class="absolute w-[80px] h-[80px] bg-white bottom-[70px] left-[60px] rounded-full -translate-x-1/2 flex justify-center items-center">
                    <IconBriefcase stroke={2} size={40} class="stroke-yellow-500"></IconBriefcase>
                </div>
            </div>
            {#each PortfolioData.jobs as job}
                <div class="snap-start min-w-full" use:slideScroll={{altElem}}>
                    <div class="relative min-w-screen h-full flex flex-col justify-center items-center p-8 overflow-hidden">
                        <!-- Fondos decorativos -->
                        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-gradient-to-br from-yellow-500/20 via-red-500/10 to-yellow-500/20 blur-3xl transform -rotate-12 animate-pulse"></div>
                        <div class="absolute top-0 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"></div>
                        <div class="absolute bottom-0 left-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl"></div>
                        
                        <!-- Contenido -->
                        <div class="relative z-10 max-w-4xl w-full">
                            <div class="flex flex-col items-center gap-8">
                                <!-- Título y empresa -->
                                <div class="text-center">
                                    <h3 class="text-4xl sm:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                                        {job.name}
                                    </h3>
                                    <div class="flex items-center justify-center gap-3 text-yellow-200">
                                        <IconBriefcase stroke={2} size={24} class="stroke-yellow-400"/>
                                        <span class="text-2xl">{job.business}</span>
                                    </div>
                                </div>

                                <!-- Fecha -->
                                <div class="flex items-center gap-3 text-yellow-100/80 backdrop-blur-sm bg-white/5 px-4 py-2 rounded-full">
                                    <span>
                                        {new Date(job.dates.start).toLocaleDateString('es-ES', { year: 'numeric', month: 'long' })}
                                    </span>
                                    <span class="text-yellow-400">→</span>
                                    <span>
                                        {job.dates.end ? new Date(job.dates.end).toLocaleDateString('es-ES', { year: 'numeric', month: 'long' }) : 'Presente'}
                                    </span>
                                </div>

                                <!-- Descripción -->
                                <p class="text-white/90 text-center text-lg leading-relaxed max-w-2xl backdrop-blur-sm bg-white/5 p-6 rounded-2xl">
                                    {job.description}
                                </p>

                                <!-- Tecnologías -->
                                <div class="flex flex-wrap justify-center gap-3 max-w-2xl">
                                    {#each job.technologies as tech}
                                        <span class="backdrop-blur-sm bg-gradient-to-r from-yellow-500/20 to-red-500/20 px-4 py-2 rounded-full text-yellow-100 text-sm border border-yellow-500/20 hover:border-yellow-400/40 transition-colors duration-300 hover:scale-105 transform cursor-default">
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
    <slot slot="floating"></slot>
</Slide>