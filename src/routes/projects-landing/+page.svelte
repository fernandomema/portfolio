<script lang="ts">
import { page } from '$app/stores';
import { PortfolioData } from '../../lib/PortfolioData';
import IconRocket from '@tabler/icons-svelte/IconRocket.svelte';
import IconBrandGithub from '@tabler/icons-svelte/IconBrandGithub.svelte';
import IconExternalLink from '@tabler/icons-svelte/IconExternalLink.svelte';
import IconFilter from '@tabler/icons-svelte/IconFilter.svelte';
import IconX from '@tabler/icons-svelte/IconX.svelte';
import { onMount } from 'svelte';

// Proyectos filtrados
let filteredProjects: typeof PortfolioData.personalProjects = [];
let techParam = '';

// Tecnologías disponibles
let availableTechs: string[] = [];
let showFilters = false;

// Generar la lista de todas las tecnologías disponibles en los proyectos
onMount(() => {
  const techSet = new Set<string>();
  PortfolioData.personalProjects.forEach(project => {
    project.technologies.forEach(tech => {
      techSet.add(tech.label);
    });
  });
  availableTechs = Array.from(techSet).sort();
});

// Filtrar proyectos cuando cambia el parámetro tech
$: {
  techParam = $page.url.searchParams.get('tech') || '';
  filteredProjects = PortfolioData.personalProjects.filter((project) => {
    if (!techParam) return true;
    return project.technologies.some(t => t.label.toLowerCase() === techParam.toLowerCase());
  });
}

// Cambiar la URL cuando se selecciona un filtro
function setTechFilter(tech: string) {
  const url = new URL(window.location.href);
  if (tech) {
    url.searchParams.set('tech', tech);
  } else {
    url.searchParams.delete('tech');
  }
  window.history.pushState({}, '', url);
  
  // Forzar la actualización de la store page
  window.dispatchEvent(new PopStateEvent('popstate'));
  
  showFilters = false;
}
</script>

<div class="min-h-screen flex flex-col bg-gradient-to-br from-blue-500/30 via-purple-500/20 to-pink-500/30">
  <!-- Header con animación y título -->
  <header class="w-full flex flex-col items-center justify-center py-16 px-4 text-white relative overflow-hidden">
    <div class="absolute inset-0 bg-black/20 backdrop-blur-sm z-0"></div>
    
    <div class="relative z-10 flex flex-col items-center max-w-4xl mx-auto text-center">
      <div class="bg-white/80 rounded-full p-5 shadow-xl mb-6 animate-float">
        <IconRocket stroke={2} size={48} class="stroke-purple-500" />
      </div>
      
      <h1 class="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200">
        Portfolio de Proyectos
      </h1>
      
      <p class="text-lg md:text-xl max-w-2xl text-white/90 leading-relaxed">
        Explora mis proyectos personales, desarrollados con pasión y enfoque en la experiencia de usuario.
        {#if techParam}
          <span class="block mt-2">
            Mostrando proyectos con tecnología: <span class="font-semibold bg-white/20 px-2 py-1 rounded">{techParam}</span>
            <button on:click={() => setTechFilter('')} class="ml-2 text-white/80 hover:text-white" aria-label="Quitar filtro">
              <IconX size={18} />
            </button>
          </span>
        {/if}
      </p>
      
      <!-- Botón para mostrar/ocultar filtros -->
      <button 
        class="mt-6 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white flex items-center gap-2 transition-all transform hover:scale-105" 
        on:click={() => showFilters = !showFilters}
      >
        <IconFilter size={18} />
        {showFilters ? 'Ocultar filtros' : 'Filtrar por tecnología'}
      </button>
      
      <!-- Panel de filtros -->
      {#if showFilters}
        <div class="mt-4 p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl w-full max-w-2xl animate-fadeIn">
          <div class="flex flex-wrap gap-2 justify-center">
            {#each availableTechs as tech}
              <button 
                class="px-3 py-1.5 rounded-full text-sm font-medium transition-all {tech.toLowerCase() === techParam.toLowerCase() ? 'bg-white/30 text-white' : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'}"
                on:click={() => setTechFilter(tech)}
              >
                {tech}
              </button>
            {/each}
          </div>
        </div>
      {/if}
    </div>
  </header>

  <!-- Sección de proyectos -->
  <section class="flex-1 w-full max-w-7xl mx-auto px-4 py-12">
    {#if filteredProjects.length === 0}
      <div class="text-center p-12 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
        <p class="text-white text-xl">No se encontraron proyectos con la tecnología seleccionada.</p>
        <button 
          class="mt-4 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white transition-colors" 
          on:click={() => setTechFilter('')}
        >
          Ver todos los proyectos
        </button>
      </div>
    {:else}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each filteredProjects as project}
          <div class="backdrop-blur-lg bg-black/40 rounded-2xl overflow-hidden shadow-xl hover:transform hover:scale-[1.02] transition-all border border-white/20 group">
            <!-- Capa de fondo decorativa -->
            <div class="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-500/20 to-pink-500/20 opacity-70 group-hover:opacity-100 transition-opacity"></div>
            
            <div class="relative p-6 flex flex-col h-full z-10">
              <h2 class="text-2xl font-bold text-white mb-2 drop-shadow-sm">{project.name}</h2>
              
              <p class="text-white text-sm md:text-base leading-relaxed flex-grow mb-4 drop-shadow-sm">{project.description}</p>
              
              <div class="flex flex-wrap gap-2 mb-4">
                {#each project.technologies as tech}
                  <span class="text-xs px-2.5 py-1.5 rounded-full bg-white/15 text-white border border-white/15 shadow-sm backdrop-blur-sm">
                    {tech.label}
                  </span>
                {/each}
              </div>
              
              <div class="flex justify-between mt-auto pt-4 border-t border-white/15">
                {#if project.url}
                  <a 
                    href={project.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-1.5 text-white hover:text-blue-200 transition-colors text-sm font-medium"
                  >
                    <IconExternalLink size={16} />
                    <span>Ver proyecto</span>
                  </a>
                {/if}
                
                {#if project.github}
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-1.5 text-white hover:text-blue-200 transition-colors text-sm font-medium"
                  >
                    <IconBrandGithub size={16} />
                    <span>Ver código</span>
                  </a>
                {/if}
              </div>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </section>
</div>

<style>
  .animate-float {
    animation: float 3s ease-in-out infinite;
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-in-out;
  }
  
  @keyframes float {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
