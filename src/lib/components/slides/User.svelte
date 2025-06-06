<script lang="ts">
    import { PortfolioData } from "$lib/PortfolioData";
    import Slide from "$lib/components/Slide.svelte";
    import IconBrandGithub from '@tabler/icons-svelte/IconBrandGithub.svelte';
    import IconBrandLinkedin from '@tabler/icons-svelte/IconBrandLinkedin.svelte';
    import IconWorld from '@tabler/icons-svelte/IconWorld.svelte';
    import IconMapPin from '@tabler/icons-svelte/IconMapPin.svelte';
    import IconInfoCircle from '@tabler/icons-svelte/IconInfoCircle.svelte';
    import IconX from '@tabler/icons-svelte/IconX.svelte';
    import { fade, fly } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
    import { onMount } from 'svelte';

    let showDetails = false;
    let mainContainer: HTMLElement;

    onMount(() => {
        const handleScroll = () => {
            if (showDetails) {
                showDetails = false;
            }
        };

        mainContainer = document.getElementById('main-container');
        if (mainContainer) {
            mainContainer.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (mainContainer) {
                mainContainer.removeEventListener('scroll', handleScroll);
            }
        };
    });
</script>

<Slide class="bg-blue-400 {$$restProps.class || ''}">
    <div slot="content" class="w-full h-full flex justify-center items-center p-4 sm:p-8">
        <div class="relative w-full h-full flex justify-center items-center overflow-hidden">
            {#if !showDetails}
            <div 
                class="flex flex-col sm:flex-row gap-6 sm:gap-8 text-white max-w-4xl w-full mx-auto"
                in:fade={{ duration: 1200, delay: 2200 }}
                out:fade={{ duration: 150 }}
            >
                <div class="flex flex-col items-center sm:items-start gap-4">
                    <img src="/avatar.png" alt="Profile" class="rounded-full w-32 h-32 sm:w-40 sm:h-40 object-cover shadow-lg">
                    <div class="flex flex-col gap-2 items-center sm:items-start">
                        <div class="flex items-center gap-2 text-blue-100 text-sm">
                            <IconMapPin size={18} />
                            <span>{PortfolioData.user.location}</span>
                        </div>
                        <div class="text-blue-100 text-sm">{PortfolioData.user.email}</div>
                    </div>
                </div>
                
                <div class="flex flex-col gap-4 text-center sm:text-left justify-center">
                    <h1 class="text-3xl sm:text-4xl font-semibold">
                        {PortfolioData.user.name} {PortfolioData.user.firstSurname} {PortfolioData.user.secondSurname}
                    </h1>
                    {#if PortfolioData.user.slogan}
                        <p class="text-xl sm:text-2xl text-blue-100">
                            {PortfolioData.user.slogan}
                        </p>
                    {/if}
                    <button 
                        on:click={() => showDetails = true}
                        class="inline-flex items-center gap-2 text-blue-100 hover:text-white transition-colors text-sm group mx-auto sm:mx-0"
                    >
                        <IconInfoCircle size={20} class="transition-transform group-hover:rotate-12" />
                        <span>Ver más información</span>
                    </button>
                </div>
            </div>
            {:else}
            <div 
                class="max-w-2xl w-full mx-auto text-white"
                in:fade={{ duration: 300, delay: 700 }}
                out:fade={{ duration: 150 }}
            >
                <div class="flex justify-between items-start mb-6">
                    <h2 class="text-2xl font-semibold">Sobre mí</h2>
                    <button 
                        on:click={() => showDetails = false}
                        class="p-2 -m-2 hover:text-blue-200 transition-colors"
                    >
                        <IconX size={24} class="hover:rotate-90 transition-transform" />
                    </button>
                </div>
                
                <div class="space-y-6" in:fade={{ duration: 200, delay: 900 }}>
                    <p class="text-blue-50 leading-relaxed">{PortfolioData.user.bio}</p>
                    <div class="flex flex-col gap-3 text-blue-100">
                        <div class="flex items-center gap-2">
                            <IconMapPin size={20} />
                            <span>{PortfolioData.user.location}</span>
                        </div>
                        <div class="flex items-center gap-2 text-sm">
                            <span>{PortfolioData.user.email}</span>
                            <span class="text-blue-200">·</span>
                            <span>{PortfolioData.user.phone}</span>
                        </div>
                    </div>
                </div>
            </div>
            {/if}
        </div>
    </div>
    <slot slot="floating"></slot>
</Slide>