<script lang="ts">
    import { PortfolioData } from "$lib/PortfolioData";
    import Slide from "$lib/components/Slide.svelte";
    import { fly, fade } from 'svelte/transition';
    import { cubicOut, backOut } from 'svelte/easing';
    import { onMount, tick } from 'svelte';
    import { userModalOpen } from '$lib/stores/userModal.svelte';
    import { base } from '$app/paths';

    interface Props {
        children?: import('svelte').Snippet;
        class?: string;
        floating?: import('svelte').Snippet;
    }

    let { children, class: className, floating }: Props = $props();

    let showDetails = $state(false);
    let mainContainer: HTMLElement | null = null;
    let openSince = 0;
    let closeBtn: HTMLButtonElement | undefined = $state();
    const OPEN_LOCK_MS = 400;

    $effect(() => {
        userModalOpen.value = showDetails;
    });

    onMount(() => {
        const handleScroll = () => {
            if (!showDetails) return;
            if (performance.now() - openSince < OPEN_LOCK_MS) return;
            showDetails = false;
        };
        mainContainer = document.getElementById('main-container');
        mainContainer?.addEventListener('scroll', handleScroll, { passive: true });
        return () => mainContainer?.removeEventListener('scroll', handleScroll);
    });

    $effect(() => {
        if (showDetails) {
            tick().then(() => closeBtn?.focus());
        }
    });

    function open() {
        showDetails = true;
        openSince = performance.now();
    }
    function close() { showDetails = false; }

    // Card open: 3D flip + scale + opacity (like lifting a glass panel)
    function flipIn(node: Element, { duration = 500, start = 0.9 }: { duration?: number; start?: number } = {}) {
        return {
            duration,
            easing: cubicOut,
            css: (t: number) => `
                opacity: ${t};
                transform: scale(${start + (1 - start) * t}) perspective(1400px) rotateX(${(1 - t) * 10}deg);
                transform-origin: center 25%;
            `
        };
    }

    // Card close: scale down + sink
    function scaleOut(node: Element, { duration = 220, end = 0.94 }: { duration?: number; end?: number } = {}) {
        return {
            duration,
            easing: cubicOut,
            css: (t: number) => `
                opacity: ${t};
                transform: scale(${end + (1 - end) * t}) translateY(${(1 - t) * 16}px);
            `
        };
    }

    // Icon entry: rotate from -90deg + scale + opacity
    function iconSpin(node: Element, { duration = 400, delay = 0, start = -90 }: { duration?: number; delay?: number; start?: number } = {}) {
        return {
            duration,
            delay,
            easing: backOut,
            css: (t: number) => `
                opacity: ${t};
                transform: rotate(${start + (0 - start) * t}deg) scale(${0.5 + 0.5 * t});
                display: inline-block;
            `
        };
    }
</script>

<svelte:window onkeydown={(e) => { if (e.key === 'Escape' && showDetails) close(); }} />

<Slide class={`bg-blue-400 ${className ?? ''}`} {floating}>
    {#snippet content()}
        <div class="relative w-full h-full">
            <!-- Main view: always mounted. Gracefully recedes when modal opens. -->
            <div
                class="absolute inset-0 flex justify-center items-center p-4 sm:p-8 transition-all duration-700 ease-out {showDetails ? 'opacity-20 scale-[0.94] blur-[3px] saturate-50 pointer-events-none' : 'opacity-100 scale-100 blur-0 saturate-100'}"
            >
                <div class="flex flex-col sm:flex-row gap-6 sm:gap-8 text-white max-w-4xl w-full mx-auto">
                    <div class="flex flex-col items-center sm:items-start gap-4">
                        <div class="relative">
                            <img
                                src="{base}/avatar.png"
                                alt="Profile"
                                class="relative rounded-full w-32 h-32 sm:w-40 sm:h-40 object-cover shadow-lg transition-all duration-700"
                            >
                            <!-- Pulsing glow ring when modal is open -->
                            {#if showDetails}
                                <span
                                    class="absolute inset-0 rounded-full pointer-events-none"
                                    style="box-shadow: 0 0 0 2px rgba(255,255,255,0.4), 0 0 40px 8px rgba(255,255,255,0.25); animation: pulse-ring 2s ease-in-out infinite;"
                                ></span>
                            {/if}
                        </div>
                        <div class="flex flex-col gap-2 items-center sm:items-start">
                        <div class="flex items-center gap-2 text-blue-100 text-sm">
                            <span class="icon-[tabler--map-pin] size-[18px]"></span>
                            <span>{PortfolioData.user.location}</span>
                        </div>
                            <div class="text-blue-100 text-sm">{PortfolioData.user.email}</div>
                        </div>
                    </div>

                    <div class="flex flex-col gap-4 text-center sm:text-left justify-center">
                        <h1 class="text-3xl sm:text-4xl font-semibold">
                            {PortfolioData.user.name} {PortfolioData.user.firstSurname} {PortfolioData.user.secondSurname}
                        </h1>
                        {#if PortfolioData.user.application}
                            <p class="text-xl sm:text-2xl text-blue-100">
                                {PortfolioData.user.application}
                            </p>
                        {/if}
                        <button
                            onclick={open}
                            class="inline-flex items-center gap-2 text-blue-100 hover:text-white transition-all duration-300 text-sm group mx-auto sm:mx-0 cursor-pointer {showDetails ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100'}"
                        >
                            <span class="icon-[tabler--info-circle] size-5 transition-transform group-hover:rotate-12 group-hover:scale-110"></span>
                            <span>Ver más información</span>
                            <span class="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-300 text-xs">→</span>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Modal: glass overlay within the User slide -->
            {#if showDetails}
                <div
                    class="absolute inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
                    transition:fade={{ duration: 200 }}
                >
                    <!-- Backdrop: lighter dark with blur, click to close -->
                    <button
                        class="absolute inset-0 cursor-pointer bg-slate-900/30 backdrop-blur-sm"
                        onclick={close}
                        aria-label="Cerrar modal"
                        transition:fade={{ duration: 200 }}
                    ></button>

                    <!-- Modal card -->
                    <div class="relative z-10 w-full max-w-2xl max-h-[calc(100vh-2rem)]" style="filter: drop-shadow(0 25px 50px rgba(0,0,0,0.4));">
                        <div
                            class="relative w-full max-w-2xl max-h-[calc(100vh-2rem)] overflow-y-auto rounded-2xl p-6 sm:p-8 text-white bg-white/15 backdrop-blur-2xl backdrop-saturate-150"
                            style="box-shadow: inset 0 1px 0 0 rgba(255,255,255,0.2);"
                            in:flipIn={{ duration: 500, start: 0.9 }}
                            out:scaleOut={{ duration: 220, end: 0.94 }}
                            role="dialog"
                            tabindex="-1"
                            aria-modal="true"
                            aria-labelledby="about-title"
                        >
                            <!-- Close X: rotating circle on hover -->
                            <button
                                bind:this={closeBtn}
                                onclick={close}
                                aria-label="Cerrar"
                                class="group absolute top-4 right-4 w-10 h-10 z-20 flex items-center justify-center rounded-full text-white/90 hover:text-white transition-all duration-300 cursor-pointer hover:bg-white/20 hover:scale-110 hover:rotate-90 focus:outline-none focus:ring-2 focus:ring-white/50"
                            >
                                <span class="icon-[tabler--x] size-5 block transition-transform"></span>
                            </button>

                            <!-- Heading -->
                            <h2
                                id="about-title"
                                class="text-3xl font-bold text-white mb-4 pr-12"
                                in:fly={{ y: 16, duration: 500, delay: 120, easing: cubicOut }}
                                out:fade={{ duration: 120 }}
                            >
                                Sobre mí
                            </h2>

                            <!-- Bio -->
                            <p
                                class="text-blue-50/90 leading-relaxed mb-6"
                                in:fly={{ y: 12, duration: 450, delay: 220, easing: cubicOut }}
                                out:fade={{ duration: 120 }}
                            >
                                {PortfolioData.user.bio}
                            </p>

                            <!-- Contact items with rotating icons -->
                            <div
                                class="space-y-2.5 text-blue-50/80 text-sm mb-6"
                                in:fly={{ y: 12, duration: 450, delay: 300, easing: cubicOut }}
                                out:fade={{ duration: 120 }}
                            >
                                <div class="group flex items-center gap-3 px-3 py-2 -mx-3 rounded-lg transition-colors duration-200 hover:bg-white/10">
                                    <span
                                        class="icon-[tabler--map-pin] size-5 text-white/70 group-hover:text-white transition-all duration-300 group-hover:scale-110"
                                        in:iconSpin={{ duration: 400, delay: 380 }}
                                    ></span>
                                    <span>{PortfolioData.user.location}</span>
                                </div>
                                <div class="group flex items-center gap-3 px-3 py-2 -mx-3 rounded-lg transition-colors duration-200 hover:bg-white/10">
                                    <span
                                        class="icon-[tabler--mail] size-5 text-white/70 group-hover:text-white transition-all duration-300 group-hover:scale-110"
                                        in:iconSpin={{ duration: 400, delay: 440 }}
                                    ></span>
                                    <span>{PortfolioData.user.email}</span>
                                </div>
                                <div class="group flex items-center gap-3 px-3 py-2 -mx-3 rounded-lg transition-colors duration-200 hover:bg-white/10">
                                    <span
                                        class="icon-[tabler--phone] size-5 text-white/70 group-hover:text-white transition-all duration-300 group-hover:scale-110"
                                        in:iconSpin={{ duration: 400, delay: 500 }}
                                    ></span>
                                    <span>{PortfolioData.user.phone}</span>
                                </div>
                            </div>

                            <!-- Volver button with shine on hover -->
                            <button
                                onclick={close}
                                class="group relative w-full font-semibold py-3 px-4 rounded-xl transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 bg-white text-blue-500 shadow-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-white/50"
                                style="box-shadow: 0 4px 14px rgba(0,0,0,0.15); transition-property: transform, box-shadow, color;"
                                onmouseenter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 28px rgba(0,0,0,0.25)'; }}
                                onmouseleave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(0,0,0,0.15)'; }}
                                in:fly={{ y: 16, duration: 500, delay: 600, easing: cubicOut }}
                                out:fade={{ duration: 120 }}
                            >
                                <!-- Shine sweep on hover -->
                                <span
                                    class="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none"
                                    style="background: linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.3) 50%, transparent 100%);"
                                ></span>
                                <span class="icon-[tabler--arrow-left] size-5 relative z-10 transition-transform group-hover:-translate-x-1"></span>
                                <span class="relative z-10">Volver</span>
                            </button>

                            <!-- Esc hint -->
                            <p
                                class="text-center text-xs text-white/40 mt-4 font-light"
                                in:fade={{ duration: 400, delay: 700 }}
                                out:fade={{ duration: 120 }}
                            >
                                Pulsa <kbd class="px-1.5 py-0.5 rounded bg-white/10 border border-white/20 text-white/60 font-mono text-[10px]">Esc</kbd> para cerrar
                            </p>
                        </div>
                    </div>
                </div>
            {/if}
        </div>
    {/snippet}
</Slide>

<style>
    @keyframes draw-line {
        from { transform: scaleX(0); opacity: 0; }
        to { transform: scaleX(1); opacity: 1; }
    }
    @keyframes pulse-ring {
        0%, 100% { box-shadow: 0 0 0 2px rgba(255,255,255,0.4), 0 0 40px 8px rgba(255,255,255,0.25); }
        50% { box-shadow: 0 0 0 3px rgba(255,255,255,0.5), 0 0 50px 12px rgba(255,255,255,0.35); }
    }
</style>
