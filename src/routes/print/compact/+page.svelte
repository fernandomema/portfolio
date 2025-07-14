<script lang="ts">
	import { PortfolioData } from '$lib/PortfolioData';
	import { onMount } from 'svelte';

	function formatDate(date: Date): string {
		return date.toLocaleDateString('es-ES', { 
			month: 'short', 
			year: 'numeric' 
		});
	}

	function calculateExperience(startDate: Date, endDate?: Date): string {
		const end = endDate || new Date();
		const months = (end.getFullYear() - startDate.getFullYear()) * 12 + (end.getMonth() - startDate.getMonth());
		const years = Math.floor(months / 12);
		const remainingMonths = months % 12;
		
		if (years === 0) {
			return `${remainingMonths}m`;
		} else if (remainingMonths === 0) {
			return `${years}a`;
		} else {
			return `${years}a ${remainingMonths}m`;
		}
	}

	function printDocument() {
		window.print();
	}
</script>

<svelte:head>
	<title>CV Compacto - {PortfolioData.user.name} {PortfolioData.user.firstSurname}</title>
	<style>
		@media print {
			body {
				font-size: 10pt;
				line-height: 1.3;
				color: black;
				background: white;
			}
			
			.no-print {
				display: none !important;
			}
			
			.print-avoid-break {
				page-break-inside: avoid;
			}
			
			.a4-container {
				width: 210mm;
				height: 297mm;
				margin: 0;
				padding: 15mm;
				box-sizing: border-box;
				overflow: hidden;
			}
			
			.shadow-lg, .shadow-md, .shadow-sm { 
				box-shadow: none !important; 
			}
			
			* {
				-webkit-print-color-adjust: exact !important;
				print-color-adjust: exact !important;
			}
		}
		
		@page {
			size: A4;
			margin: 0;
		}
	</style>
</svelte:head>

<div class="min-h-screen bg-gray-50 print:bg-white">
	<!-- Botón de impresión -->
	<div class="no-print fixed top-4 right-4 z-50">
		<button
			on:click={printDocument}
			class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg transition-colors duration-200 flex items-center gap-2 text-sm"
		>
			<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/>
			</svg>
			Imprimir CV
		</button>
	</div>

	<!-- Contenido del CV compacto -->
	<div class="a4-container max-w-4xl mx-auto bg-white print:shadow-none shadow-lg">
		
		<!-- Cabecera compacta -->
		<header class="border-b border-gray-300 pb-3 mb-4">
			<h1 class="text-2xl font-bold text-gray-900 mb-1">
				{PortfolioData.user.name} {PortfolioData.user.firstSurname} {PortfolioData.user.secondSurname}
			</h1>
			<p class="text-sm text-gray-600 mb-2">{PortfolioData.user.bio}</p>
			
			<div class="grid grid-cols-3 gap-2 text-xs text-gray-600">
				<div>📧 {PortfolioData.user.email}</div>
				<div>📱 {PortfolioData.user.phone}</div>
				<div>📍 {PortfolioData.user.location}</div>
				<div>🔗 github.com/fernandomema</div>
				<div>💼 linkedin.com/in/fernandomema</div>
				<div>🌐 fernandomema.dev</div>
			</div>
		</header>

		<!-- Contenido en dos columnas -->
		<div class="grid grid-cols-3 gap-4 text-xs">
			
			<!-- Columna izquierda (2/3) -->
			<div class="col-span-2 space-y-4">
				
				<!-- Experiencia Laboral -->
				<section>
					<h2 class="text-sm font-bold text-gray-900 mb-2 border-b border-blue-600 pb-1">
						EXPERIENCIA LABORAL
					</h2>
					
					{#each PortfolioData.jobs as job}
						<div class="mb-3">
							<div class="flex justify-between items-start mb-1">
								<div>
									<h3 class="text-sm font-semibold text-gray-900">{job.name}</h3>
									<p class="text-xs text-blue-600 font-medium">{job.business}</p>
								</div>
								<div class="text-xs text-gray-600 text-right">
									<div>{formatDate(job.dates.start)} - {job.dates.end ? formatDate(job.dates.end) : 'Actual'}</div>
									<div class="text-xs text-gray-500">({calculateExperience(job.dates.start, job.dates.end)})</div>
								</div>
							</div>
							
							<p class="text-xs text-gray-700 mb-2 leading-relaxed">{job.description}</p>
							
							<div class="flex flex-wrap gap-1">
								{#each job.technologies.slice(0, 6) as tech}
									<span class="bg-blue-100 text-blue-800 text-xs px-1 py-0.5 rounded">
										{tech}
									</span>
								{/each}
								{#if job.technologies.length > 6}
									<span class="text-xs text-gray-500">+{job.technologies.length - 6} más</span>
								{/if}
							</div>
						</div>
					{/each}
				</section>

				<!-- Proyectos Destacados -->
				<section>
					<h2 class="text-sm font-bold text-gray-900 mb-2 border-b border-blue-600 pb-1">
						PROYECTOS DESTACADOS
					</h2>
					
					<div class="grid grid-cols-1 gap-2">
						{#each PortfolioData.personalProjects.slice(0, 4) as project}
							<div class="border border-gray-200 rounded p-2">
								<h3 class="text-sm font-semibold text-gray-900 mb-1">{project.name}</h3>
								<p class="text-xs text-gray-700 mb-1 leading-relaxed">{project.description}</p>
								
								<div class="flex flex-wrap gap-1 mb-1">
									{#each project.technologies.slice(0, 4) as tech}
										<span class="bg-green-100 text-green-800 text-xs px-1 py-0.5 rounded">
											{tech}
										</span>
									{/each}
								</div>
								
								<p class="text-xs text-gray-500 break-all">{project.url}</p>
							</div>
						{/each}
					</div>
				</section>
			</div>

			<!-- Columna derecha (1/3) -->
			<div class="space-y-4">
				
				<!-- Educación -->
				<section>
					<h2 class="text-sm font-bold text-gray-900 mb-2 border-b border-blue-600 pb-1">
						EDUCACIÓN
					</h2>
					
					{#each PortfolioData.studies as study}
						<div class="mb-2">
							<h3 class="text-sm font-semibold text-gray-900">{study.name}</h3>
							<p class="text-xs text-gray-600">{study.school}</p>
							<p class="text-xs text-gray-500">
								{formatDate(study.dates.start)} - {formatDate(study.dates.end)}
							</p>
						</div>
					{/each}
				</section>

				<!-- Habilidades Técnicas -->
				<section>
					<h2 class="text-sm font-bold text-gray-900 mb-2 border-b border-blue-600 pb-1">
						HABILIDADES TÉCNICAS
					</h2>
					
					{#each PortfolioData.programmingLanguages.slice(0, 6) as category}
						<div class="mb-2">
							<h3 class="text-xs font-semibold text-gray-900 mb-1">{category.name}</h3>
							<div class="flex flex-wrap gap-1">
								{#each category.technologies.slice(0, 4) as tech}
									<span class="bg-gray-100 text-gray-800 text-xs px-1 py-0.5 rounded">
										{tech.name}
									</span>
								{/each}
							</div>
						</div>
					{/each}
				</section>

				<!-- Herramientas -->
				<section>
					<h2 class="text-sm font-bold text-gray-900 mb-2 border-b border-blue-600 pb-1">
						HERRAMIENTAS
					</h2>
					
					<div class="flex flex-wrap gap-1">
						{#each PortfolioData.toolsAndSkills as tool}
							<span class="bg-purple-100 text-purple-800 text-xs px-1 py-0.5 rounded">
								{tool}
							</span>
						{/each}
					</div>
				</section>
			</div>
		</div>

		<!-- Footer -->
		<footer class="text-center text-gray-500 text-xs pt-3 border-t border-gray-200 mt-4">
			<p>CV generado el {new Date().toLocaleDateString('es-ES')}</p>
		</footer>
	</div>
</div>
