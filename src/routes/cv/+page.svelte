<script lang="ts">
	import { PortfolioData } from '$lib/PortfolioData';
</script>

<svelte:head>
	<title>CV Imprimible - {PortfolioData.user.name} {PortfolioData.user.firstSurname}</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
	<div class="bg-white rounded-xl shadow-xl p-8 max-w-2xl w-full">
		<div class="text-center mb-8">
			<h1 class="text-3xl font-bold text-gray-900 mb-2">
				CV Imprimible
			</h1>
			<p class="text-xl text-gray-600 mb-4">
				{PortfolioData.user.name} {PortfolioData.user.firstSurname} {PortfolioData.user.secondSurname}
			</p>
			<p class="text-gray-500">
				Selecciona la versión que deseas imprimir
			</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
			<!-- Versión Estándar -->
			<div class="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-200">
				<div class="text-center mb-4">
					<div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
						<svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
						</svg>
					</div>
					<h2 class="text-xl font-semibold text-gray-900 mb-2">CV Estándar</h2>
					<p class="text-gray-600 text-sm mb-4">
						Versión completa y detallada. Incluye toda la información del portfolio con descripciones expandidas y mejor legibilidad.
					</p>
				</div>
				
				<div class="space-y-2 text-sm text-gray-500 mb-4">
					<div class="flex items-center gap-2">
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
						</svg>
						<span>Información completa</span>
					</div>
					<div class="flex items-center gap-2">
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
						</svg>
						<span>Todos los proyectos</span>
					</div>
					<div class="flex items-center gap-2">
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
						</svg>
						<span>2-3 páginas A4</span>
					</div>
				</div>
				
				<a 
					href="/print" 
					class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
				>
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
					</svg>
					Ver CV Estándar
				</a>
			</div>

			<!-- Versión Compacta -->
			<div class="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-200">
				<div class="text-center mb-4">
					<div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
						<svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
						</svg>
					</div>
					<h2 class="text-xl font-semibold text-gray-900 mb-2">CV Compacto</h2>
					<p class="text-gray-600 text-sm mb-4">
						Versión condensada en una sola página. Ideal para aplicaciones rápidas y cuando se requiere brevedad.
					</p>
				</div>
				
				<div class="space-y-2 text-sm text-gray-500 mb-4">
					<div class="flex items-center gap-2">
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
						</svg>
						<span>Información esencial</span>
					</div>
					<div class="flex items-center gap-2">
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
						</svg>
						<span>Proyectos destacados</span>
					</div>
					<div class="flex items-center gap-2">
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
						</svg>
						<span>1 página A4</span>
					</div>
				</div>
				
				<a 
					href="/print/compact" 
					class="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
				>
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
					</svg>
					Ver CV Compacto
				</a>
			</div>
		</div>

		<!-- Instrucciones -->
		<div class="mt-8 bg-gray-50 rounded-lg p-4">
			<h3 class="font-semibold text-gray-900 mb-2">💡 Instrucciones para imprimir:</h3>
			<ul class="text-sm text-gray-600 space-y-1">
				<li>• Haz clic en "Ver CV" para acceder a la versión deseada</li>
				<li>• Utiliza el botón "Imprimir CV" en la esquina superior derecha</li>
				<li>• Configura tu impresora para tamaño A4 y orientación vertical</li>
				<li>• Asegúrate de activar "Imprimir colores de fondo" para mejor resultado</li>
			</ul>
		</div>

		<!-- Enlaces adicionales -->
		<div class="mt-6 text-center">
			<a 
				href="/" 
				class="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200"
			>
				← Volver al portfolio interactivo
			</a>
		</div>
	</div>
</div>
