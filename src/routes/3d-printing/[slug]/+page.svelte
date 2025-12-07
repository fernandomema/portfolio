<script lang="ts">
import { PortfolioData } from '$lib/PortfolioData';
import IconArrowLeft from '@tabler/icons-svelte/IconArrowLeft.svelte';
import IconClock from '@tabler/icons-svelte/IconClock.svelte';
import IconCube from '@tabler/icons-svelte/IconCube.svelte';
import IconShoppingCart from '@tabler/icons-svelte/IconShoppingCart.svelte';
import IconMail from '@tabler/icons-svelte/IconMail.svelte';
import type { PageData } from './$types';

export let data: PageData;

$: project = data.project;
$: relatedProjects = data.relatedProjects;
$: currentImageIndex = 0;
$: images = project.images || (project.image ? [project.image] : []);

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
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
  <title>{project.title} - Impresión 3D | {PortfolioData.user.name} {PortfolioData.user.firstSurname}</title>
  <meta name="description" content={project.description} />
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
  
  <!-- Back Navigation -->
  <div class="bg-white border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <a 
        href="/3d-printing" 
        class="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium transition-colors"
      >
        <IconArrowLeft size={20} />
        <span>Volver al portfolio</span>
      </a>
    </div>
  </div>

  <!-- Product Detail -->
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
      
      <!-- Image Gallery -->
      <div class="space-y-4">
        <div class="relative aspect-square bg-white rounded-2xl shadow-xl overflow-hidden">
          {#if images.length > 0}
            <img 
              src={images[currentImageIndex]} 
              alt={`${project.title} - Imagen ${currentImageIndex + 1}`}
              class="w-full h-full object-cover"
            />
            
            {#if images.length > 1}
              <button
                on:click={prevImage}
                class="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all"
                aria-label="Imagen anterior"
              >
                <IconArrowLeft size={24} class="stroke-gray-800" />
              </button>
              
              <button
                on:click={nextImage}
                class="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all"
                aria-label="Siguiente imagen"
              >
                <IconArrowLeft size={24} class="stroke-gray-800 rotate-180" />
              </button>
              
              <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {#each images as _, index}
                  <button
                    on:click={() => currentImageIndex = index}
                    class="w-2 h-2 rounded-full transition-all {currentImageIndex === index ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/75'}"
                    aria-label={`Ir a imagen ${index + 1}`}
                  />
                {/each}
              </div>
            {/if}
          {:else}
            <div class="w-full h-full bg-gradient-to-br from-purple-200 via-blue-200 to-pink-200 flex items-center justify-center">
              <IconCube size={120} class="stroke-white/50" stroke={1.5} />
            </div>
          {/if}
        </div>
        
        <!-- Thumbnail Gallery -->
        {#if images.length > 1}
          <div class="grid grid-cols-4 gap-4">
            {#each images as image, index}
              <button
                on:click={() => currentImageIndex = index}
                class="aspect-square rounded-lg overflow-hidden border-2 transition-all {currentImageIndex === index ? 'border-purple-600 shadow-md' : 'border-transparent hover:border-gray-300'}"
              >
                <img src={image} alt={`${project.title} - Miniatura ${index + 1}`} class="w-full h-full object-cover" />
              </button>
            {/each}
          </div>
        {/if}
      </div>

      <!-- Product Info -->
      <div class="space-y-6">
        <div>
          <span class="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-sm font-semibold rounded-full mb-3">
            {project.category}
          </span>
          <h1 class="text-4xl font-bold text-gray-900 mb-4">
            {project.title}
          </h1>
          
          {#if project.price}
            <div class="flex items-baseline gap-2 mb-6">
              <span class="text-5xl font-bold text-purple-600">{project.price}€</span>
              <span class="text-gray-500 text-lg">IVA incluido</span>
            </div>
          {/if}
        </div>

        <p class="text-lg text-gray-700 leading-relaxed">
          {project.description}
        </p>

        <!-- Specs -->
        <div class="bg-white rounded-xl p-6 shadow-md space-y-4">
          <h2 class="text-xl font-bold text-gray-900">Especificaciones</h2>
          
          <div class="grid grid-cols-2 gap-4">
            <div>
              <div class="flex items-center gap-2 text-gray-600 mb-1">
                <IconCube size={20} />
                <span class="font-medium">Material</span>
              </div>
              <p class="text-gray-900 font-semibold">{project.material}</p>
            </div>
            
            <div>
              <div class="flex items-center gap-2 text-gray-600 mb-1">
                <IconClock size={20} />
                <span class="font-medium">Tiempo de impresión</span>
              </div>
              <p class="text-gray-900 font-semibold">{project.printTime}</p>
            </div>
            
            {#if project.dimensions}
              <div class="col-span-2">
                <div class="flex items-center gap-2 text-gray-600 mb-1">
                  <IconCube size={20} />
                  <span class="font-medium">Dimensiones</span>
                </div>
                <p class="text-gray-900 font-semibold">{project.dimensions}</p>
              </div>
            {/if}
          </div>
        </div>

        <!-- Tags -->
        <div class="flex flex-wrap gap-2">
          {#each project.tags as tag}
            <span class="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-full">
              {tag}
            </span>
          {/each}
        </div>

        <!-- CTA Buttons -->
        <div class="space-y-3 pt-4">
          {#if project.price}
            <a
              href="mailto:{PortfolioData.user.email}?subject=Pedido: {project.title}&body=Hola, estoy interesado en el producto '{project.title}' por {project.price}€."
              class="w-full flex items-center justify-center gap-2 px-6 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-colors shadow-lg"
            >
              <IconShoppingCart size={24} />
              <span>Realizar pedido</span>
            </a>
          {:else}
            <a
              href="mailto:{PortfolioData.user.email}?subject=Consulta: {project.title}&body=Hola, me gustaría consultar sobre el producto '{project.title}'."
              class="w-full flex items-center justify-center gap-2 px-6 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-colors shadow-lg"
            >
              <IconMail size={24} />
              <span>Consultar disponibilidad</span>
            </a>
          {/if}
          
          <a
            href="mailto:{PortfolioData.user.email}?subject=Consulta: {project.title}"
            class="w-full flex items-center justify-center gap-2 px-6 py-4 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-xl transition-colors border-2 border-gray-200"
          >
            <IconMail size={24} />
            <span>Hacer una pregunta</span>
          </a>
        </div>

        <!-- Additional Info -->
        <div class="bg-blue-50 rounded-xl p-6 border border-blue-100">
          <h3 class="font-semibold text-gray-900 mb-2">📦 Información de envío</h3>
          <p class="text-sm text-gray-600">
            Tiempo de producción: 3-5 días laborables. Envío disponible a toda España.
            Contáctame para más detalles sobre envíos y personalizaciones.
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- Related Products -->
  {#if relatedProjects.length > 0}
    <div class="bg-white/50 py-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-3xl font-bold text-gray-900 mb-8">Proyectos relacionados</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {#each relatedProjects as related}
            <a 
              href="/3d-printing/{slugify(related.title)}"
              class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-1"
            >
              {#if related.images && related.images.length > 0}
                <img src={related.images[0]} alt={related.title} class="h-56 w-full object-cover" />
              {:else if related.image}
                <img src={related.image} alt={related.title} class="h-56 w-full object-cover" />
              {:else}
                <div class="h-56 bg-gradient-to-br from-purple-200 via-blue-200 to-pink-200 flex items-center justify-center">
                  <IconCube size={80} class="stroke-white/50" stroke={1.5} />
                </div>
              {/if}
              
              <div class="p-6">
                <div class="flex items-start justify-between mb-2">
                  <h3 class="text-xl font-bold text-gray-900">{related.title}</h3>
                  <span class="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full whitespace-nowrap">
                    {related.category}
                  </span>
                </div>
                
                {#if related.price}
                  <div class="mb-3">
                    <span class="text-2xl font-bold text-purple-600">{related.price}€</span>
                  </div>
                {/if}
                
                <p class="text-gray-600 text-sm line-clamp-2">
                  {related.description}
                </p>
              </div>
            </a>
          {/each}
        </div>
      </div>
    </div>
  {/if}

</div>
