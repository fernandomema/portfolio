<script lang="ts">
  import Slide from '$lib/components/Slide.svelte';
  import IconCode from '@tabler/icons-svelte/IconCode.svelte';
  import { slideScroll } from "$lib/directives/slideScroll";
  import { PortfolioData } from "$lib/PortfolioData";
  import { fade, fly } from 'svelte/transition';

  let slide: HTMLElement;
  let altElem: HTMLElement | null = null;
  $: altElem = slide?.closest('[data-container="slider"]') as HTMLElement | null;

  // Agrupación de categorías lógicas para mostrar
  const categories = [
    {
      name: 'Lenguajes & Frameworks',
      items: PortfolioData.programmingLanguages.filter(lang =>
        ['JavaScript', 'TypeScript', 'PHP'].includes(lang.name)
      )
    },
    {
      name: 'Frontend',
      items: PortfolioData.programmingLanguages.filter(lang =>
        ['CSS', 'Template Engines'].includes(lang.name)
      )
    },
    {
      name: 'DevOps & Tools',
      items: [
        ...PortfolioData.programmingLanguages.filter(lang =>
          ['Services', 'CI/CD', 'Analytics & Monitoring', 'Project Management', 'Design & Prototyping', 'Tech i touched some'].includes(lang.name)
        ),
        {
          name: 'Otras Herramientas',
          color: 'blue',
          technologies: PortfolioData.toolsAndSkills.map(tool => ({ name: tool }))
        }
      ]
    },
  ];

  let activeSkill: string | null = null;

  function getColorHex(color: string): string {
    switch (color) {
      case 'yellow': return '#f7df1e';
      case 'blue': return '#3178c6';
      case 'violet': return '#7952b3';
      case 'green': return '#3c873a';
      case 'purple': return '#6b46c1';
      case 'red': return '#ef4444';
      default: return '#64748b';
    }
  }
</script>

<Slide class="bg-transparent" enableScroll={false}>
  <slot slot="floating">
    <div class="absolute left-[60px] top-0 h-[70px] w-[5px] -translate-x-1/2 bg-gradient-to-b from-yellow-500/80 to-red-400/60"></div>
    <div class="absolute left-[60px] bottom-0 h-[70px] w-[5px] -translate-x-1/2 bg-gradient-to-t from-yellow-500/80 to-red-400/60"></div>
    <div class="absolute w-[80px] h-[80px] bg-white top-[70px] left-[60px] rounded-full -translate-x-1/2 flex justify-center items-center">
        <IconCode stroke={2} size={40} class="stroke-blue-500"></IconCode>
    </div>
    <div class="absolute w-[80px] h-[80px] bg-white bottom-[70px] left-[60px] rounded-full -translate-x-1/2 flex justify-center items-center">
        <IconCode stroke={2} size={40} class="stroke-blue-500"></IconCode>
    </div>
  </slot>
  <div slot="content" class="text-white overflow-x-hidden flex snap-x snap-mandatory h-full" bind:this={slide}>
    {#if slide}
      <!-- Portada -->
      <div class="relative snap-start h-full max-h-screen min-w-full flex flex-col items-center justify-center bg-gradient-to-br from-yellow-500/30 to-red-400/10 overflow-hidden" use:slideScroll={{altElem}}>
        <div class="flex flex-col items-center gap-4 z-10" in:fly={{y: 20, duration: 800, delay: 200}}>
          <div class="bg-white/80 rounded-full p-6 shadow-lg mb-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <IconCode stroke={2} size={64} class="stroke-yellow-500" />
          </div>
          <h2 class="text-4xl sm:text-5xl font-extrabold tracking-tight text-yellow-900 drop-shadow-lg text-center">
            Tecnologías
          </h2>
          <p class="text-yellow-800 text-lg max-w-xl text-center mt-2 px-4">
            Un vistazo a mis habilidades técnicas.<br class="hidden sm:block"/> Desliza para explorar cada categoría.
          </p>
        </div>
        <div class="absolute -top-20 -left-20 w-72 h-72 bg-yellow-400/20 rounded-full blur-2xl z-0 animate-pulse"></div>
        <div class="absolute bottom-0 right-0 w-40 h-40 bg-red-400/20 rounded-full blur-2xl z-0 animate-pulse"></div>
      </div>

      <!-- Subslides por categoría y paginación visual -->
      {#each categories as category, cidx}
        {#each Array(Math.ceil(category.items.length / 4)) as _, pageIdx}
          <div class="snap-start min-w-full flex items-center justify-center p-8" use:slideScroll={{altElem}}>
            <div class="w-full max-w-2xl flex flex-col gap-8" in:fly={{y: 30, duration: 600, delay: 100*cidx}}>
              <h3 class="text-3xl font-bold text-yellow-900 mb-2 flex items-center gap-3">
                <span class="inline-block w-3 h-3 rounded-full animate-pulse" style="background: linear-gradient(135deg,#f7df1e,#ef4444,#3178c6);"></span>
                {category.name}
                <span class="ml-2 text-base text-yellow-700/60 font-normal">{category.items.length > 4 ? `${pageIdx+1}/${Math.ceil(category.items.length/4)}` : ''}</span>
              </h3>
              <div class="flex flex-col gap-6">
                {#each category.items.slice(pageIdx*4, pageIdx*4+4) as skill, i}
                  <div class="flex flex-col gap-1" in:fly|local={{y: 20, duration: 400, delay: i*80}}>
                    <div class="flex items-center gap-3">
                      <div class="w-5 h-5 rounded-full border-2 border-white shadow" style="background-color: {getColorHex(skill.color)}"></div>
                      <span class="text-lg font-semibold text-yellow-900">{skill.name}</span>
                    </div>
                    <div class="flex flex-wrap gap-2 mt-1 pl-8">
                      {#each skill.technologies as tech, j}
                        <span class="bg-yellow-100/80 text-yellow-900 px-2 py-1 rounded-full text-xs font-semibold shadow-sm transition-all duration-200 hover:bg-yellow-200 hover:scale-105 animate-bounceIn" style="animation-delay: {j*40}ms">{tech.name}</span>
                      {/each}
                    </div>
                  </div>
                {/each}
              </div>
            </div>
          </div>
        {/each}
      {/each}
    {/if}
  </div>
</Slide>
