<script lang="ts">
import { PortfolioData } from '$lib/PortfolioData';
import IconPrinter from '@tabler/icons-svelte/IconPrinter.svelte';
import IconCube from '@tabler/icons-svelte/IconCube.svelte';
import IconClock from '@tabler/icons-svelte/IconClock.svelte';
import IconFilter from '@tabler/icons-svelte/IconFilter.svelte';
import IconX from '@tabler/icons-svelte/IconX.svelte';
import { fade, fly } from 'svelte/transition';

const { intro, equipment, materials, projects, categories, stats } = PortfolioData.printing3D;

let selectedCategory = 'Todos';
let showFilters = false;

$: filteredProjects = selectedCategory === 'Todos' 
  ? projects 
  : projects.filter(p => p.category === selectedCategory);

function setCategory(category: string) {
  selectedCategory = category;
  showFilters = false;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
</script>

<svelte:head>
  <title>Portfolio Impresión 3D - {PortfolioData.user.name} {PortfolioData.user.firstSurname}</title>
  <meta name="description" content="Portfolio de proyectos de impresión 3D, desde prototipos funcionales hasta piezas decorativas." />
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
  
  <!-- Hero Section -->
  <section class="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <div class="text-center">
        <div class="inline-flex items-center justify-center p-4 bg-purple-100 rounded-full mb-6">
          <IconPrinter size={48} class="stroke-purple-600" stroke={2} />
        </div>
        <h1 class="text-5xl sm:text-6xl font-bold text-gray-900 mb-4">
          {intro.title}
        </h1>
        <p class="text-xl sm:text-2xl text-purple-600 font-medium mb-6">
          {intro.subtitle}
        </p>
        <p class="text-lg text-gray-600 max-w-3xl mx-auto">
          {intro.description}
        </p>
      </div>

      <!-- Stats -->
      <div class="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div class="bg-white rounded-2xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform">
          <div class="text-4xl font-bold text-purple-600 mb-2">{stats.totalProjects}</div>
          <div class="text-gray-600 font-medium">Proyectos</div>
        </div>
        <div class="bg-white rounded-2xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform">
          <div class="text-4xl font-bold text-blue-600 mb-2">{stats.totalPrintTime}</div>
          <div class="text-gray-600 font-medium">Tiempo de impresión</div>
        </div>
        <div class="bg-white rounded-2xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform">
          <div class="text-4xl font-bold text-green-600 mb-2">{stats.favoriteMaterial}</div>
          <div class="text-gray-600 font-medium">Material favorito</div>
        </div>
      </div>
    </div>
  </section>

  <!-- Projects Section -->
  <section class="py-16 px-4 sm:px-6 lg:px-8 bg-white/50">
    <div class="max-w-7xl mx-auto">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h2 class="text-3xl font-bold text-gray-900">Proyectos</h2>
        
        <!-- Filters - Desktop -->
        <div class="hidden sm:flex gap-2 flex-wrap">
          {#each categories as category}
            <button
              on:click={() => setCategory(category)}
              class="px-4 py-2 rounded-lg font-medium transition-all {selectedCategory === category ? 'bg-purple-600 text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-gray-100'}"
            >
              {category}
            </button>
          {/each}
        </div>

        <!-- Filters - Mobile -->
        <div class="sm:hidden relative w-full">
          <button
            on:click={() => showFilters = !showFilters}
            class="w-full flex items-center justify-between px-4 py-2 bg-white rounded-lg shadow-md"
          >
            <span class="flex items-center gap-2">
              <IconFilter size={20} />
              <span class="font-medium">{selectedCategory}</span>
            </span>
            {#if showFilters}
              <IconX size={20} />
            {:else}
              <IconFilter size={20} />
            {/if}
          </button>
          
          {#if showFilters}
            <div 
              class="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl z-10 overflow-hidden"
              transition:fly={{ y: -10, duration: 200 }}
            >
              {#each categories as category}
                <button
                  on:click={() => setCategory(category)}
                  class="w-full px-4 py-3 text-left hover:bg-purple-50 transition-colors {selectedCategory === category ? 'bg-purple-100 text-purple-700 font-semibold' : 'text-gray-700'}"
                >
                  {category}
                </button>
              {/each}
            </div>
          {/if}
        </div>
      </div>

      <!-- Projects Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each filteredProjects as project (project.title)}
          <a 
            href="/3d-printing/{slugify(project.title)}"
            class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-1 block"
            transition:fade={{ duration: 200 }}
          >
            <!-- Image or Placeholder -->
            {#if project.images && project.images.length > 0}
              <img src={project.images[0]} alt={project.title} class="h-56 w-full object-cover" />
            {:else if project.image}
              <img src={project.image} alt={project.title} class="h-56 w-full object-cover" />
            {:else}
              <div class="h-56 bg-gradient-to-br from-purple-200 via-blue-200 to-pink-200 flex items-center justify-center">
                <IconCube size={80} class="stroke-white/50" stroke={1.5} />
              </div>
            {/if}
            
            <div class="p-6">
              <div class="flex items-start justify-between mb-2">
                <h3 class="text-xl font-bold text-gray-900">{project.title}</h3>
                <span class="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
                  {project.category}
                </span>
              </div>
              
              {#if project.price}
                <div class="mb-3">
                  <span class="text-2xl font-bold text-purple-600">{project.price}€</span>
                </div>
              {/if}
              
              <p class="text-gray-600 mb-4 text-sm leading-relaxed">
                {project.description}
              </p>
              
              <div class="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <div class="flex items-center gap-1">
                  <IconClock size={16} />
                  <span>{project.printTime}</span>
                </div>
                <div class="flex items-center gap-1">
                  <div class="w-3 h-3 rounded-full bg-purple-500"></div>
                  <span>{project.material}</span>
                </div>
              </div>
              
              <div class="flex flex-wrap gap-2">
                {#each project.tags as tag}
                  <span class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    {tag}
                  </span>
                {/each}
              </div>
            </div>
          </a>
        {/each}
      </div>

      {#if filteredProjects.length === 0}
        <div class="text-center py-16">
          <p class="text-gray-500 text-lg">No hay proyectos en esta categoría.</p>
        </div>
      {/if}
    </div>
  </section>

  <!-- Equipment Section -->
  <section class="py-16 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">Equipo</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each equipment as printer}
          <div class="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-xl transition-shadow">
            <div class="flex items-center gap-3 mb-4">
              <IconCube size={32} class="stroke-purple-600" stroke={2} />
              <div>
                <h3 class="text-xl font-bold text-gray-900">{printer.name}</h3>
                <span class="text-sm text-purple-600 font-medium">{printer.type}</span>
              </div>
            </div>
            <div class="space-y-2 text-sm text-gray-600">
              <div class="flex justify-between">
                <span class="font-medium">Volumen:</span>
                <span>{printer.specs.buildVolume}</span>
              </div>
              <div class="flex justify-between">
                <span class="font-medium">Resolución:</span>
                <span>{printer.specs.layerResolution}</span>
              </div>
              <div class="flex justify-between">
                <span class="font-medium">Nozzle:</span>
                <span>{printer.specs.nozzle}</span>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Materials Section -->
  <section class="py-16 px-4 sm:px-6 lg:px-8 bg-white/50">
    <div class="max-w-7xl mx-auto">
      <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">Materiales</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {#each materials as material}
          <div class="bg-white rounded-xl shadow-md p-6 border-l-4 hover:shadow-xl transition-shadow" style="border-color: {material.color}">
            <h3 class="text-2xl font-bold text-gray-900 mb-2">{material.name}</h3>
            <p class="text-sm text-gray-600">{material.usage}</p>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Footer CTA -->
  <section class="py-16 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto text-center bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-12 shadow-2xl">
      <h2 class="text-3xl font-bold text-white mb-4">¿Tienes un proyecto en mente?</h2>
      <p class="text-purple-100 text-lg mb-8">
        Puedo ayudarte a materializarlo con impresión 3D
      </p>
      <a 
        href="mailto:{PortfolioData.user.email}"
        class="inline-block px-8 py-3 bg-white text-purple-600 font-bold rounded-lg hover:bg-purple-50 transition-colors shadow-lg"
      >
        Contáctame
      </a>
    </div>
  </section>

</div>
