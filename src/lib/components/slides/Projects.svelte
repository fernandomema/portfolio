<script lang="ts">
    import { PortfolioData } from "$lib/PortfolioData";
    import Slide from "$lib/components/Slide.svelte";
    import { slideScroll } from "$lib/directives/slideScroll";
    import { base } from '$app/paths';

    let slide: HTMLElement | undefined = $state();
    let altElem: HTMLElement | null = $derived(slide?.closest('[data-container="slider"]') as HTMLElement | null);
    let hoverIndex = $state<number | null>(null);

    const accentMap: Record<string, { dot: string; ring: string; soft: string; strong: string }> = {
        amber:   { dot: 'bg-amber-300',   ring: 'ring-amber-300/40',   soft: 'text-amber-200/70',   strong: 'text-amber-300' },
        indigo:  { dot: 'bg-indigo-300',  ring: 'ring-indigo-300/40',  soft: 'text-indigo-200/70',  strong: 'text-indigo-300' },
        rose:    { dot: 'bg-rose-300',    ring: 'ring-rose-300/40',    soft: 'text-rose-200/70',    strong: 'text-rose-300' },
        yellow:  { dot: 'bg-yellow-300',  ring: 'ring-yellow-300/40',  soft: 'text-yellow-200/70',  strong: 'text-yellow-300' },
        emerald: { dot: 'bg-emerald-300', ring: 'ring-emerald-300/40', soft: 'text-emerald-200/70', strong: 'text-emerald-300' },
        violet:  { dot: 'bg-violet-300',  ring: 'ring-violet-300/40',  soft: 'text-violet-200/70',  strong: 'text-violet-300' },
    };

    function playVideo(node: HTMLVideoElement) {
        node.muted = true;
        const tryPlay = () => {
            const p = node.play();
            if (p && typeof p.catch === 'function') p.catch(() => {});
        };
        tryPlay();
        const onCanPlay = () => tryPlay();
        node.addEventListener('canplay', onCanPlay);
        const onInteraction = () => tryPlay();
        window.addEventListener('pointerdown', onInteraction, { once: true });
        window.addEventListener('keydown', onInteraction, { once: true });
        window.addEventListener('scroll', onInteraction, { once: true, passive: true });
        window.addEventListener('touchstart', onInteraction, { once: true, passive: true });
        return {
            destroy() {
                node.removeEventListener('canplay', onCanPlay);
                window.removeEventListener('pointerdown', onInteraction);
                window.removeEventListener('keydown', onInteraction);
                window.removeEventListener('scroll', onInteraction);
                window.removeEventListener('touchstart', onInteraction);
            }
        };
    }

    function inlineSvg(node: HTMLElement, src: string) {
        let aborted = false;
        const load = async (url: string) => {
            try {
                const res = await fetch(url);
                if (!res.ok || aborted) return;
                const text = await res.text();
                if (aborted) return;
                node.innerHTML = text;
            } catch {
                if (!aborted) node.innerHTML = '';
            }
        };
        load(src);
        return {
            update(newSrc: string) {
                if (newSrc) load(newSrc);
            },
            destroy() {
                aborted = true;
                node.innerHTML = '';
            }
        };
    }
</script>

<Slide class="bg-gradient-to-br from-blue-500/30 via-purple-500/20 to-pink-500/30" enableScroll={false}>
    {#snippet content()}
        <div class="text-white overflow-x-hidden flex snap-x snap-mandatory h-full" bind:this={slide}>
            {#if slide}
                <!-- Portada -->
                <div class="relative snap-start h-full max-h-screen min-w-full flex flex-col items-center justify-center overflow-hidden" use:slideScroll={{altElem}}>
                    <div class="absolute inset-0 pointer-events-none" style="background: radial-gradient(circle at 30% 20%, rgba(255,255,255,0.08) 0px, transparent 50%), radial-gradient(circle at 70% 80%, rgba(255,255,255,0.06) 0px, transparent 50%);"></div>
                    <div class="flex flex-col items-center gap-4 z-10 px-6">
                        <div class="bg-white/10 rounded-full p-6 shadow-2xl ring-1 ring-white/20 backdrop-blur-sm">
                            <span class="icon-[tabler--rocket] size-16 text-white"></span>
                        </div>
                        <h2 class="text-5xl sm:text-7xl font-black tracking-tighter leading-none text-center">
                            Side projects<br/><span class="text-white/40">that shipped.</span>
                        </h2>
                        <p class="text-white/55 text-lg max-w-xl text-center mt-2">
                            Cosas que construí por curiosidad, para aprender, o porque<br class="hidden sm:block"/> nadie más las iba a construir.
                        </p>
                        <span class="mt-4 inline-flex items-center gap-2 text-xs text-white/50 font-mono">
                            <span class="icon-[tabler--arrow-autofit-width] size-4"></span>
                            desliza para explorar
                        </span>
                    </div>
                </div>

                <!-- ===== Reusable snippets ===== -->
                {#snippet yearStatus(project, accent)}
                    <div class="flex items-center gap-3 text-sm">
                        <span class="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">{project.year}</span>
                        <span class="w-1 h-1 rounded-full bg-white/30"></span>
                        <span class="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.2em] px-2.5 py-0.5 rounded-full border {accent.ring} {accent.soft}">
                            <span class="w-1.5 h-1.5 rounded-full {project.status === 'Active' ? 'bg-emerald-400 animate-pulse' : 'bg-white/40'}"></span>
                            {project.status}
                        </span>
                    </div>
                {/snippet}

                {#snippet visual(project)}
                    <a
                        href={project.url ?? project.github ?? '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="group block relative w-full h-full rounded-3xl overflow-hidden bg-gradient-to-br {project.gradient} shadow-2xl ring-1 ring-white/10"
                    >
                        <div class="absolute inset-0 opacity-30" style="background-image: radial-gradient(circle, rgba(255,255,255,0.4) 1.5px, transparent 1.5px); background-size: 22px 22px;"></div>
                        <div class="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-30 bg-white"></div>
                        <div class="absolute -bottom-24 -left-24 w-72 h-72 rounded-full blur-3xl opacity-20 bg-white"></div>
                        {#if project.media?.type === 'video'}
                            <video
                                class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                style="transition-timing-function: cubic-bezier(0.32, 0.72, 0, 1);"
                                src="{base}/{project.media.src}"
                                autoplay loop muted playsinline preload="auto"
                                disablepictureinpicture disableremoteplayback
                                use:playVideo
                            ></video>
                        {:else if project.media?.type === 'image' && project.media.src.endsWith('.svg')}
                            <div
                                class="inlined-svg absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                                style="transition-timing-function: cubic-bezier(0.32, 0.72, 0, 1);"
                                use:inlineSvg={`${base}/${project.media.src}`}
                            ></div>
                        {:else if project.media?.type === 'image'}
                            <img
                                class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                style="transition-timing-function: cubic-bezier(0.32, 0.72, 0, 1);"
                                src="{base}/{project.media.src}"
                                alt={project.name}
                                loading="lazy"
                                decoding="async"
                            />
                        {:else}
                            <div class="absolute inset-0 flex items-center justify-center">
                                <span class="icon-[{project.tablerIcon}] size-40 lg:size-56 text-white/90 drop-shadow-2xl transition-transform duration-700 group-hover:scale-110 group-hover:rotate-6" style="transition-timing-function: cubic-bezier(0.32, 0.72, 0, 1);"></span>
                            </div>
                        {/if}
                        <div class="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/50 to-transparent flex items-end p-5">
                            <span class="text-white/90 text-xs font-mono uppercase tracking-[0.2em] flex items-center gap-2">
                                <span class="icon-[tabler--arrow-up-right] size-3.5"></span>
                                {project.url ? 'view demo' : 'view code'}
                            </span>
                        </div>
                    </a>
                {/snippet}

                {#snippet body(project, accent)}
                    <p class="text-white/75 text-base sm:text-lg leading-relaxed max-w-xl">{project.description}</p>
                    {#if project.highlights?.length}
                        <ul class="space-y-2">
                            {#each project.highlights as highlight}
                                <li class="flex items-start gap-3 text-white/80 text-sm leading-relaxed">
                                    <span class="w-1.5 h-1.5 mt-2 rounded-full {accent.dot} shrink-0"></span>
                                    <span>{highlight}</span>
                                </li>
                            {/each}
                        </ul>
                    {/if}
                    <div class="flex flex-wrap gap-1.5">
                        {#each project.technologies as tech}
                            <span class="text-[11px] font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/65 hover:text-white hover:border-white/20 transition-colors">
                                {tech.label}
                            </span>
                        {/each}
                    </div>
                {/snippet}

                {#snippet buttons(project)}
                    {#if project.url}
                        <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            class="group/btn inline-flex items-center gap-1 pl-4 pr-1 py-1 rounded-full bg-white text-slate-950 text-sm font-semibold transition-transform duration-500 hover:scale-[1.04] active:scale-[0.97]"
                            style="transition-timing-function: cubic-bezier(0.32, 0.72, 0, 1);"
                        >
                            Ver demo
                            <span class="w-7 h-7 rounded-full bg-slate-950 text-white flex items-center justify-center transition-transform duration-500 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" style="transition-timing-function: cubic-bezier(0.32, 0.72, 0, 1);">
                                <span class="icon-[tabler--arrow-up-right] size-3.5"></span>
                            </span>
                        </a>
                    {/if}
                    {#if project.github}
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white text-sm font-semibold transition-all duration-300"
                        >
                            <span class="icon-[tabler--brand-github] size-4"></span>
                            Ver código
                        </a>
                    {/if}
                {/snippet}

                <!-- ===== Proyectos: 2 slides en mobile (imagen+título / info) + 1 combinado en desktop ===== -->
                {#each PortfolioData.personalProjects as project, i (project.name)}
                    {@const accent = accentMap[project.accent ?? ''] ?? { dot: 'bg-white/60', ring: 'ring-white/20', soft: 'text-white/60', strong: 'text-white' }}
                    {@const isEven = i % 2 === 0}
                    {@const isHovered = hoverIndex === i}

                    <!-- MOBILE · Página 1: imagen + título + hint -->
                    <div
                        class="snap-start min-w-full h-full flex flex-col items-center justify-center px-6 gap-8 lg:hidden"
                        use:slideScroll={{altElem}}
                    >
                        <div class="w-52 max-w-[52vw] aspect-square">
                            {@render visual(project)}
                        </div>
                        <div class="flex flex-col items-center gap-3 text-center max-w-sm">
                            <h3 class="text-4xl font-black tracking-tighter leading-none text-white drop-shadow-md">
                                {project.name}
                            </h3>
                        </div>
                        <span class="inline-flex items-center gap-2 text-xs text-white/50 font-mono">
                            <span class="icon-[tabler--arrow-narrow-right] size-4"></span>
                            desliza para ver más
                        </span>
                    </div>

                    <!-- MOBILE · Página 2: toda la info -->
                    <div
                        class="snap-start min-w-full h-full flex items-center justify-center px-6 lg:hidden relative z-[60]"
                        use:slideScroll={{altElem}}
                    >
                        <div class="w-full max-w-md h-[80vh] max-h-[640px] flex flex-col backdrop-blur-md bg-black/15 rounded-3xl p-6 ring-1 ring-white/10 overflow-hidden">
                            <div class="flex-1 min-h-0 overflow-y-auto pr-2 -mr-2 space-y-6 project-scroll">
                                {@render body(project, accent)}
                            </div>
                            <div class="pt-5 mt-4 border-t border-white/10 shrink-0 bg-black/15 -mx-6 px-6 -mb-6 pb-6 backdrop-blur-sm flex flex-wrap items-center gap-3">
                                {@render buttons(project)}
                            </div>
                        </div>
                    </div>

                    <!-- DESKTOP · Combinado -->
                    <div
                        class="relative snap-start min-w-full h-full flex items-center justify-center px-4 sm:px-10 lg:px-20 hidden lg:flex"
                        use:slideScroll={{altElem}}
                    >
                        <div class="relative mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-12 items-stretch w-full max-w-6xl lg:max-h-[460px]">
                            <span
                                class="absolute -top-4 lg:-top-8 select-none pointer-events-none font-black text-[8rem] lg:text-[12rem] leading-none {accent.soft} transition-all duration-700 {isEven ? 'left-2 lg:left-0' : 'right-2 lg:right-0'}"
                                style="transition-timing-function: cubic-bezier(0.32, 0.72, 0, 1); transform: translateY({isHovered ? '-12px' : '0'});"
                            >
                                {String(i + 1).padStart(2, '0')}
                            </span>
                            <div class="{isEven ? 'lg:order-1' : 'lg:order-2'} lg:col-span-5 self-stretch lg:aspect-square lg:max-w-[460px] mx-auto">
                                {@render visual(project)}
                            </div>
                            <div class="{isEven ? 'lg:order-2' : 'lg:order-1'} lg:col-span-7 text-white self-stretch h-full flex flex-col backdrop-blur-md bg-black/15 rounded-3xl p-4 lg:p-8 ring-1 ring-white/10 overflow-hidden">
                                <div class="shrink-0 mb-4">
                                    {@render yearStatus(project, accent)}
                                </div>
                                <h3 class="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-none mb-5 text-white drop-shadow-md shrink-0">
                                    {project.name}
                                </h3>
                                <div class="flex-1 min-h-0 overflow-y-auto pr-2 -mr-2 space-y-6 project-scroll">
                                    {@render body(project, accent)}
                                </div>
                                <div class="pt-5 mt-4 border-t border-white/10 shrink-0 bg-black/15 -mx-4 px-4 lg:-mx-8 lg:px-8 -mb-4 pb-4 lg:-mb-8 lg:pb-8 backdrop-blur-sm flex flex-wrap items-center gap-3">
                                    {@render buttons(project)}
                                </div>
                            </div>
                        </div>
                    </div>
                {/each}
            {/if}
        </div>
    {/snippet}

    {#snippet floating()}
        <!-- Línea de navegación -->
        <div class="absolute left-[60px] bg-white top-0 h-[70px] w-[5px] -translate-x-1/2" style="z-index: 55;"></div>
        <div class="absolute w-[80px] h-[80px] bg-white top-[70px] left-[60px] rounded-full -translate-x-1/2 flex justify-center items-center" style="z-index: 55;">
            <span class="icon-[tabler--code] size-10 text-yellow-500"></span>
        </div>
        <div class="absolute left-[60px] bg-white bottom-0 h-[70px] w-[5px] -translate-x-1/2" style="z-index: 55;"></div>
        <div class="absolute w-[80px] h-[80px] bg-white bottom-[70px] left-[60px] rounded-full -translate-x-1/2 flex justify-center items-center" style="z-index: 55;">
            <span class="icon-[tabler--arrow-up] size-10 text-blue-500"></span>
        </div>
    {/snippet}
</Slide>

<style>
    .inlined-svg :global(svg) {
        width: 100%;
        height: 100%;
        display: block;
    }

    .project-scroll {
        scrollbar-width: thin;
        scrollbar-color: rgba(255, 255, 255, 0.18) transparent;
    }

    .project-scroll::-webkit-scrollbar {
        width: 6px;
    }

    .project-scroll::-webkit-scrollbar-track {
        background: transparent;
    }

    .project-scroll::-webkit-scrollbar-thumb {
        background-color: rgba(255, 255, 255, 0.18);
        border-radius: 9999px;
    }

    .project-scroll::-webkit-scrollbar-thumb:hover {
        background-color: rgba(255, 255, 255, 0.3);
    }
</style>
