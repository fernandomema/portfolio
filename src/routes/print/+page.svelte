<script lang="ts">
    import { page } from '$app/stores';
	import { PortfolioData } from '$lib/PortfolioData';
	import { onMount } from 'svelte';

	let printMode = false;

	onMount(() => {
		// Verificar si estamos en modo impresión
		const urlParams = new URLSearchParams(window.location.search);
		printMode = urlParams.get('print') === 'true';
	});

	function formatDate(date: Date): string {
		return date.toLocaleDateString('es-ES', { 
			month: 'long', 
			year: 'numeric' 
		});
	}

	function calculateExperience(startDate: Date, endDate?: Date): string {
		const end = endDate || new Date();
		const months = (end.getFullYear() - startDate.getFullYear()) * 12 + (end.getMonth() - startDate.getMonth());
		const years = Math.floor(months / 12);
		const remainingMonths = months % 12;
		
		if (years === 0) {
			return `${remainingMonths} mes${remainingMonths !== 1 ? 'es' : ''}`;
		} else if (remainingMonths === 0) {
			return `${years} año${years !== 1 ? 's' : ''}`;
		} else {
			return `${years} año${years !== 1 ? 's' : ''} y ${remainingMonths} mes${remainingMonths !== 1 ? 'es' : ''}`;
		}
	}

	function printDocument() {
		window.print();
	}
</script>

<svelte:head>
	<title>CV - {PortfolioData.user.name} {PortfolioData.user.firstSurname}</title>
	<link rel="stylesheet" type='text/css' href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
	<style>
@media print {
  @page {
	size: A4;
	margin: 0;
	@bottom-center {
	  content: counter(page) " / " counter(pages);
	  font-size: 10pt;
	  color: #888;
	  font-family: sans-serif;
	}
  }
  html, body {
	width: 210mm;
				min-height: 297mm;
				font-size: 11pt;
				line-height: 1.4;
				color: black;
				background: white;
			}
			.no-print {
				display: none !important;
			}
			.print-break {
				page-break-before: always;
			}
			.print-avoid-break {
				page-break-inside: avoid;
			}
			.a4-container {
				width: 100%;
				min-width: 210mm;
				max-width: 210mm;
				min-height: 297mm;
				margin: 0 !important;
				padding: 0 !important;
				box-sizing: border-box;
				background: white !important;
			}
			header {
				padding-bottom: 1rem !important;
			}
			header.bg-gradient-to-r {
				background: #3b82f6 !important;
				-webkit-print-color-adjust: exact !important;
				print-color-adjust: exact !important;
				color-adjust: exact !important;
			}
			header svg {
				color: #bfdbfe !important;
				-webkit-print-color-adjust: exact !important;
				print-color-adjust: exact !important;
				color-adjust: exact !important;
			}
			header .bg-blue-700, header .bg-blue-800, header .bg-indigo-900 {
				background-color: rgba(30, 64, 175, 0.5) !important;
				-webkit-print-color-adjust: exact !important;
				print-color-adjust: exact !important;
				color-adjust: exact !important;
			}
			header .text-blue-50, header .text-blue-100, header .text-blue-200, header .text-white {
				color: white !important;
				-webkit-print-color-adjust: exact !important;
				print-color-adjust: exact !important;
				color-adjust: exact !important;
			}
			.shadow-lg, .shadow-md, .shadow-sm, .shadow, .hover\:shadow-md { 
				box-shadow: none !important; 
			}
			section {
				margin-bottom: 8mm !important;
				padding: 0 10mm !important;
			}
			h2 {
				font-size: 16pt !important;
				margin-bottom: 8pt !important;
				color: #1e40af !important; /* blue-800 */
				-webkit-print-color-adjust: exact !important;
				print-color-adjust: exact !important;
				color-adjust: exact !important;
			}
			h3 {
				font-size: 13pt !important;
				color: #1e3a8a !important; /* blue-900 */
				-webkit-print-color-adjust: exact !important;
				print-color-adjust: exact !important;
				color-adjust: exact !important;
			}
			.bg-blue-800.bg-opacity-30, .bg-blue-800.bg-opacity-40, .bg-blue-500.bg-opacity-30 {
				background-color: rgba(30, 64, 175, 0.2) !important;
				-webkit-print-color-adjust: exact !important;
				print-color-adjust: exact !important;
				color-adjust: exact !important;
			}
			.border-blue-400, .border-blue-500 {
				border-color: #60a5fa !important;
				-webkit-print-color-adjust: exact !important;
				print-color-adjust: exact !important;
				color-adjust: exact !important;
			}
			.bg-gradient-to-br {
				background: rgba(30, 64, 175, 0.1) !important;
				-webkit-print-color-adjust: exact !important;
				print-color-adjust: exact !important;
				color-adjust: exact !important;
			}
			.text-sm {
				font-size: 9pt !important;
			}
			.text-xs {
				font-size: 8pt !important;
			}
			.p-5 {
				padding: 0.75rem !important;
			}
			.p-4 {
				padding: 0.5rem !important;
			}
			.print-compact-grid {
				display: grid !important;
				grid-template-columns: repeat(2, 1fr) !important;
				gap: 1rem !important;
			}
			* {
				-webkit-print-color-adjust: exact !important;
				print-color-adjust: exact !important;
				color-adjust: exact !important;
			}
			
		}
	</style>
</svelte:head>

<div class="min-h-screen bg-gray-50 print:bg-white">
	<!-- Botón de impresión mejorado (solo visible en pantalla) -->
	<div class="no-print fixed top-4 right-4 z-50">
		<button
			on:click={printDocument}
			class="relative overflow-hidden group bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 transform hover:translate-y-[-2px]"
		>
			<span class="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
			<span class="absolute -inset-x-1 top-0 h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent opacity-30"></span>
			<span class="absolute -inset-y-1 right-0 w-px bg-gradient-to-b from-transparent via-blue-300 to-transparent opacity-30"></span>
			<span class="absolute -inset-x-1 bottom-0 h-px bg-gradient-to-r from-transparent via-indigo-300 to-transparent opacity-30"></span>
			<span class="absolute -inset-y-1 left-0 w-px bg-gradient-to-b from-transparent via-indigo-300 to-transparent opacity-30"></span>
			<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/>
			</svg>
			<span class="font-medium">Imprimir CV</span>
		</button>
	</div>

	<!-- Contenido principal del CV -->
	<div class="a4-container max-w-4xl mx-auto bg-white print:shadow-none shadow-xl overflow-hidden">
		
		<!-- Cabecera con diseño premium y profesional optimizado para impresión -->
		<header class="relative print-avoid-break bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white pb-6">
			<!-- Patrón geométrico para dar profundidad -->
			<div class="absolute inset-0 overflow-hidden opacity-10">
				<div class="absolute top-0 left-0 w-full h-full">
					{#each Array(10) as _, i}
						<div class="absolute bg-white" style="height: 1px; width: 100%; top: {i * 20}px; left: 0; opacity: 0.5;"></div>
					{/each}
					{#each Array(20) as _, i}
						<div class="absolute bg-white" style="width: 1px; height: 100%; left: {i * 40}px; top: 0; opacity: 0.3;"></div>
					{/each}
				</div>
			</div>
			
			<!-- Elementos decorativos para más impacto visual -->
			<div class="absolute top-0 right-0 w-72 h-72 bg-blue-300 opacity-10 rounded-full -mr-20 -mt-20"></div>
			<div class="absolute top-20 right-40 w-36 h-36 bg-indigo-200 opacity-10 rounded-full"></div>
			<div class="absolute bottom-0 left-0 w-48 h-48 bg-blue-200 opacity-10 rounded-full -ml-10 -mb-10"></div>
			<div class="absolute bottom-20 left-30 w-24 h-24 bg-indigo-300 opacity-10 rounded-full"></div>
			<div class="absolute top-40 left-1/4 w-16 h-16 bg-white opacity-5 rounded-full"></div>
			<div class="absolute bottom-10 right-1/4 w-20 h-20 bg-white opacity-5 rounded-full"></div>
			
			<!-- Franja superior decorativa con acento -->
			<div class="relative">
				<div class="h-8 bg-gradient-to-r from-blue-900 to-indigo-900"></div>
				<div class="absolute top-8 left-0 w-full h-2 bg-gradient-to-r from-blue-400 to-indigo-300"></div>
			</div>
			
			<!-- Contenido principal con mejor espaciado -->
			<div class="relative z-10 px-8 pt-8">
				<!-- Badge de posición profesional -->
				<div class="inline-block mb-4">
					<span class="bg-blue-500 bg-opacity-30 text-white text-sm font-medium px-3 py-1 rounded-full border border-blue-400 border-opacity-30">
						{PortfolioData.user.application}</span>
					</span>
				</div>
				
				<!-- Estructura mejorada con grid para mejor alineación -->
				<div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
					<!-- Columna izquierda: Nombre y bio -->
					<div class="md:col-span-8">
						<!-- Nombre con diseño más impactante -->
						<h1 class="text-4xl font-bold tracking-tight leading-tight">
							<div class="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-3">
								<span class="bg-blue-800 bg-opacity-40 px-3 py-1 inline-block transform -skew-x-6 border-l-4 border-blue-400">
									{PortfolioData.user.name}
								</span> 
								<span class="text-blue-50">{PortfolioData.user.firstSurname} {PortfolioData.user.secondSurname}</span>
							</div>
						</h1>
						
						<!-- Separador estilizado -->
						<div class="flex items-center mb-4">
							<div class="h-1 w-20 bg-blue-400 rounded-full"></div>
							<div class="h-px w-32 bg-blue-300 bg-opacity-50 ml-2"></div>
						</div>
						
						<!-- Bio con mejor formato -->
						<p class="text-lg text-blue-50 leading-relaxed mb-2 max-w-3xl">{PortfolioData.user.bio}</p>
						
					
					</div>
					
					<!-- Columna derecha: Info de contacto más profesional -->
					<div class="md:col-span-4 flex flex-col gap-3 bg-gradient-to-br from-blue-800 to-indigo-900 bg-opacity-40 p-5 rounded-lg border border-blue-400 border-opacity-20 shadow-inner">
						<h3 class="text-blue-200 font-medium text-sm uppercase tracking-widest mb-1 flex items-center">
							<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
							</svg>
							Contacto
						</h3>
						
						<div class="flex items-center gap-3">
							<div class="bg-blue-700 bg-opacity-50 p-1.5 rounded">
								<svg class="w-4 h-4 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
								</svg>
							</div>
							<span class="text-sm text-blue-50">{PortfolioData.user.email}</span>
						</div>
						
						<div class="flex items-center gap-3">
							<div class="bg-blue-700 bg-opacity-50 p-1.5 rounded">
								<svg class="w-4 h-4 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
								</svg>
							</div>
							<span class="text-sm text-blue-50">{PortfolioData.user.phone}</span>
						</div>
						
						<div class="flex items-center gap-3">
							<div class="bg-blue-700 bg-opacity-50 p-1.5 rounded">
								<svg class="w-4 h-4 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
								</svg>
							</div>
							<span class="text-sm text-blue-50">{PortfolioData.user.location}</span>
						</div>

						<div class="h-px w-full bg-gradient-to-r from-blue-400 to-transparent my-2"></div>
						
						<div class="flex items-center gap-3">
							<div class="bg-blue-700 bg-opacity-50 p-1.5 rounded">
								<svg class="w-4 h-4 text-blue-200" fill="currentColor" viewBox="0 0 24 24">
									<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
								</svg>
							</div>
					<a href={PortfolioData.user.github} class="text-sm text-blue-50 hover:text-white" target="_blank" rel="noopener noreferrer">
						{PortfolioData.user.github.replace(/https?:\/\/(www\.)?github.com\//, '')}
					</a>
						</div>
						
						<div class="flex items-center gap-3">
							<div class="bg-blue-700 bg-opacity-50 p-1.5 rounded">
								<svg class="w-4 h-4 text-blue-200" fill="currentColor" viewBox="0 0 24 24">
									<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
								</svg>
							</div>
							<a href={PortfolioData.user.linkedin} class="text-sm text-blue-50 hover:text-white" target="_blank" rel="noopener noreferrer">
								{PortfolioData.user.linkedin.replace(/https?:\/\/(www\.)?linkedin.com\/in\//, '')}
							</a>
						</div>
						
						{#if PortfolioData.user.website}
							<div class="flex items-center gap-3">
								<div class="bg-blue-700 bg-opacity-50 p-1.5 rounded">
									<svg class="w-4 h-4 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"/>
									</svg>
								</div>
								<a href={PortfolioData.user.website} class="text-sm text-blue-50 hover:text-white" target="_blank" rel="noopener noreferrer">
									{PortfolioData.user.website.replace(/https?:\/\/(www\.)?/, '')}
								</a>
							</div>
						{/if}
					</div>
				</div>
			</div>
			
			<!-- Separador decorativo inferior con doble línea -->
			<div class="relative mt-6">
				<div class="h-1 bg-gradient-to-r from-blue-500 to-indigo-400"></div>
				<div class="h-3 bg-gradient-to-r from-blue-900 to-indigo-900"></div>
			</div>
		</header>

		<!-- Experiencia Laboral con diseño mejorado -->
			<section class="px-8 pb-6 mb-6 print-avoid-break">
			<h2 class="text-2xl font-bold text-blue-800 mb-6 relative inline-block pt-6">
				<div class="flex items-center">
					<svg class="w-6 h-6 mr-2 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
					</svg>
					<span class="relative z-10">Experiencia Laboral</span>
				</div>
				<span class="h-1 w-full block bg-gradient-to-r from-blue-600 to-blue-400 opacity-80 rounded-full absolute left-0 bottom-0"></span>
			</h2>
			
			{#each PortfolioData.jobs as job}
				<div class="mb-8 print-avoid-break relative bg-white p-5 rounded-lg border-l-4 border-blue-600 shadow-sm hover:shadow-md transition-shadow duration-300">
					<!-- Elementos decorativos sutiles -->
					<div class="absolute top-0 right-0 w-20 h-20 bg-blue-50 opacity-60 rounded-bl-full -mt-2 -mr-2 z-0"></div>
					
					<div class="relative z-10 flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4">
						<div>
							<h3 class="text-xl font-semibold text-gray-900 flex items-center">
								<span>{job.name}</span>
							</h3>
							<p class="text-lg text-blue-700 font-medium flex items-center">
								<span>{job.business}</span>
							</p>
						</div>
						<div class="text-gray-600 text-sm mt-2 sm:mt-0 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100">
							<p class="font-medium">{formatDate(job.dates.start)} - {job.dates.end ? formatDate(job.dates.end) : 'Actualidad'}</p>
							<p class="text-xs text-blue-700 font-medium mt-1">{calculateExperience(job.dates.start, job.dates.end)}</p>
						</div>
					</div>
					
					<div class="mb-4 relative z-10">
						<p class="text-gray-700 leading-relaxed bg-white">{job.description}</p>
					</div>
					
					<div class="mb-2 relative z-10">
						<h4 class="text-sm font-semibold text-gray-900 mb-2 flex items-center">
							<svg class="w-4 h-4 text-blue-600 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
							</svg>
							Tecnologías:
						</h4>
						<div class="flex flex-wrap gap-2">
							{#each job.technologies as tech}
								<div class="flex items-center gap-1.5 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full shadow-sm border border-blue-200 border-opacity-40">
									<i class="devicon-{tech.icon || tech.label.toLowerCase()}-plain colored text-sm"></i>
									<span>{tech.label}</span>
								</div>
							{/each}
						</div>
					</div>
				</div>
			{/each}
		</section>

		<!-- Educación con diseño mejorado -->
		<section class="px-8 pb-6 print-avoid-break mt-6">
			<h2 class="text-2xl font-bold text-blue-800 mb-6 relative inline-block pt-6">
				<div class="flex items-center">
					<svg class="w-6 h-6 mr-2 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
					</svg>
					<span class="relative z-10">Educación</span>
				</div>
				<span class="h-1 w-full block bg-gradient-to-r from-blue-600 to-blue-400 opacity-80 rounded-full absolute left-0 bottom-0"></span>
			</h2>
		
			{#each PortfolioData.studies as study}
				<div class="mb-4 bg-white p-4 rounded-lg shadow-sm border-l-4 border-indigo-500 hover:shadow-md transition-shadow duration-300">
					<div class="flex flex-col sm:flex-row sm:justify-between sm:items-start">
						<div>
							<h3 class="text-lg font-semibold text-gray-900">{study.name}</h3>
							<p class="text-indigo-700 font-medium">{study.school}</p>
						</div>
						<div class="text-gray-600 text-sm mt-2 sm:mt-0 bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-100">
							<p class="font-medium">{formatDate(study.dates.start)} - {formatDate(study.dates.end)}</p>
						</div>
					</div>
				</div>
			{/each}
		</section>

		<!-- Certificaciones con diseño mejorado -->
		<section class="px-8 pb-6 print-avoid-break mt-6">
			<h2 class="text-2xl font-bold text-blue-800 mb-6 relative inline-block pt-6">
				<div class="flex items-center">
					<svg class="w-6 h-6 mr-2 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
					</svg>
					<span class="relative z-10">Certificaciones</span>
				</div>
				<span class="h-1 w-full block bg-gradient-to-r from-blue-600 to-blue-400 opacity-80 rounded-full absolute left-0 bottom-0"></span>
			</h2>
		
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				{#each PortfolioData.certifications as cert}
					<div class="mb-3 bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-500 hover:shadow-md transition-shadow duration-300">
						<div class="flex flex-col">
							<div class="flex justify-between items-start mb-2">
								<h3 class="text-base font-semibold text-gray-900">{cert.name}</h3>
								<div class="text-white text-xs font-medium px-2 py-1 rounded-full bg-green-600">
									{cert.year}
								</div>
							</div>
							<div class="flex justify-between items-center">
								<p class="text-sm text-green-700 font-medium">{cert.institution}</p>
								{#if cert.hours > 5}
									<div class="text-gray-600 text-xs bg-green-50 px-2 py-1 rounded-lg border border-green-100">
										{cert.hours} horas
									</div>
								{/if}
							</div>
							{#if cert.url}
								<div class="mt-2">
									<a href={cert.url} target="_blank" rel="noopener noreferrer" class="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1">
										<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
										</svg>
										Ver certificado
									</a>
								</div>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		</section>

		<!-- Habilidades Técnicas con diseño mejorado -->
			<section class="px-8 pb-6 mb-6 print-avoid-break">
				<h2 class="text-2xl font-bold text-blue-800 mb-6 relative inline-block pt-6">
					<div class="flex items-center">
						<svg class="w-6 h-6 mr-2 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
						</svg>
						<span class="relative z-10">Habilidades Técnicas</span>
					</div>
					<span class="h-1 w-full block bg-gradient-to-r from-blue-600 to-blue-400 opacity-80 rounded-full absolute left-0 bottom-0"></span>
				</h2>
			
				<div class="grid grid-cols-1 md:grid-cols-2 gap-6 print-compact-grid">
					{#each PortfolioData.programmingLanguages as category, i}
						<div class="print-avoid-break bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100" style="border-top-width: 3px; border-top-color: {category.color === 'blue' ? '#3b82f6' : category.color === 'green' ? '#10b981' : category.color === 'yellow' ? '#f59e0b' : category.color === 'red' ? '#ef4444' : category.color === 'purple' ? '#8b5cf6' : category.color === 'violet' ? '#8b5cf6' : '#3b82f6'};">
							<h3 class="text-lg font-semibold text-gray-900 mb-3 flex items-center">
								<span class="w-2 h-2 rounded-full mr-2" style="background-color: {category.color === 'blue' ? '#3b82f6' : category.color === 'green' ? '#10b981' : category.color === 'yellow' ? '#f59e0b' : category.color === 'red' ? '#ef4444' : category.color === 'purple' ? '#8b5cf6' : category.color === 'violet' ? '#8b5cf6' : '#3b82f6'};"></span>
								{category.name}
							</h3>
							<div class="flex flex-wrap gap-2">
								{#each category.technologies as tech}
									<div class="flex items-center gap-2 bg-white text-gray-800 text-xs font-medium px-3 py-2 rounded-full shadow-sm hover:shadow transition-shadow duration-200 border border-gray-100">									
										<i class="devicon-{tech.icon || tech.label.toLowerCase()}-plain colored text-sm"></i>
										<span>{tech.label}</span>
									</div>
								{/each}
							</div>
						</div>
					{/each}
				</div>
			</section>

		<!-- Proyectos Destacados con diseño mejorado -->
		<section class="px-8 pb-6 mb-6 print-break">
			<h2 class="text-2xl font-bold text-blue-800 mb-6 relative inline-block pt-6">
				<div class="flex items-center">
					<svg class="w-6 h-6 mr-2 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
					</svg>
					<span class="relative z-10">Proyectos Destacados</span>
				</div>
				<span class="h-1 w-full block bg-gradient-to-r from-blue-600 to-blue-400 opacity-80 rounded-full absolute left-0 bottom-0"></span>
			</h2>
			
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
				{#each PortfolioData.personalProjects.slice(0, 6) as project}
					<div class="print-avoid-break bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden">
						<!-- Decoración visual mejorada -->
						<div class="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-400 to-indigo-500 opacity-10 rounded-bl-full"></div>
						<div class="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-blue-400 to-indigo-500 opacity-5 rounded-tr-full"></div>
						
						<div class="relative z-10">
							<div class="flex items-center mb-2">
								<div class="w-1.5 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full mr-2"></div>
								<h3 class="text-lg font-semibold text-gray-900">{project.name}</h3>
							</div>
							
							<p class="text-gray-700 text-sm mb-3 leading-relaxed">{project.description}</p>
							
							<div class="flex flex-wrap gap-1.5 mb-3">
								{#each project.technologies as tech}
									<div class="flex items-center gap-1.5 bg-gradient-to-r from-blue-50 to-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-1 rounded-full shadow-sm border border-indigo-200 border-opacity-30">
										<i class="devicon-{tech.icon || tech.label.toLowerCase()}-plain colored text-sm"></i>
										<span>{tech.label}</span>
									</div>
								{/each}
							</div>
							
							<!-- Links con diseño mejorado -->
							<div class="flex items-center gap-3 mt-2">
								{#if project.github}
									<a href={project.github} class="text-xs text-blue-700 hover:text-blue-900 flex items-center gap-1" target="_blank" rel="noopener noreferrer">
										<svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
											<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
										</svg>
										GitHub
									</a>
								{/if}
								{#if project.url}
									<a href={project.url} class="text-xs text-blue-700 hover:text-blue-900 flex items-center gap-1" target="_blank" rel="noopener noreferrer">
										<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
										</svg>
										Ver Proyecto
									</a>
								{/if}
							</div>
						</div>
					</div>
				{/each}
			</div>
		</section>

		
		<!-- Soft Skills -->
		<section class="px-8 pb-6 mb-6 print-avoid-break">
			<h2 class="text-2xl font-bold text-blue-800 mb-6 relative inline-block pt-6">
				<div class="flex items-center">
					<svg class="w-6 h-6 mr-2 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
					</svg>
					<span class="relative z-10">Habilidades Personales</span>
				</div>
				<span class="h-1 w-full block bg-gradient-to-r from-blue-600 to-blue-400 opacity-80 rounded-full absolute left-0 bottom-0"></span>
			</h2>
			
			<div class="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-5 border border-purple-200 shadow-sm relative overflow-hidden">
				<!-- Elementos decorativos sutiles -->
				<div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400 to-indigo-500 opacity-5 rounded-bl-full"></div>
				<div class="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-400 to-indigo-500 opacity-5 rounded-tr-full"></div>
				
				<div class="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
					{#each PortfolioData.softSkills as skill, index}
						<div class="flex bg-white rounded-lg shadow-sm border border-purple-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
							<div class="flex items-center justify-center w-2 bg-gradient-to-b from-purple-500 to-indigo-600"></div>
							<div class="flex p-4 w-full">
								<div class="w-full">
									<h3 class="font-semibold text-purple-800 mb-1">{skill.name}</h3>
									<p class="text-sm text-purple-700">{skill.description}</p>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</section>

		<!-- Stack Preferido -->
		{#if PortfolioData.preferredStack}
			<section class="px-8 pb-6 mb-6 print-avoid-break">
<h2 class="text-2xl font-bold text-blue-800 mb-6 relative inline-block pt-6">
  <div class="flex items-center">
	<svg class="w-6 h-6 mr-2 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
	  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
	</svg>
	<span class="relative z-10">Stack Preferido</span>
  </div>
  <span class="h-1 w-full block bg-gradient-to-r from-blue-600 to-blue-400 opacity-80 rounded-full absolute left-0 bottom-0"></span>
</h2>
				
				<div class="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200 shadow-sm relative overflow-hidden">
					<!-- Elementos decorativos sutiles -->
					<div class="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-400 to-indigo-500 opacity-5 rounded-bl-full"></div>
					<div class="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-400 to-indigo-500 opacity-5 rounded-tr-full"></div>
					
					<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 relative z-10">
						<div class="flex items-start gap-3 bg-white p-3 rounded-lg border border-blue-100 shadow-sm">
							<div class="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-2 rounded-lg">
								<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
								</svg>
							</div>
							<div>
								<h3 class="text-blue-800 font-semibold text-sm">Frontend</h3>
								<p class="text-blue-900">{PortfolioData.preferredStack.frontend}</p>
							</div>
						</div>
						
						<div class="flex items-start gap-3 bg-white p-3 rounded-lg border border-blue-100 shadow-sm">
							<div class="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-2 rounded-lg">
								<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
								</svg>
							</div>
							<div>
								<h3 class="text-indigo-800 font-semibold text-sm">Backend</h3>
								<p class="text-indigo-900">{PortfolioData.preferredStack.backend}</p>
							</div>
						</div>
						
						<div class="flex items-start gap-3 bg-white p-3 rounded-lg border border-blue-100 shadow-sm">
							<div class="bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-2 rounded-lg">
								<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
								</svg>
							</div>
							<div>
								<h3 class="text-cyan-800 font-semibold text-sm">Infraestructura</h3>
								<p class="text-cyan-900">{PortfolioData.preferredStack.infra}</p>
							</div>
						</div>
						
						<div class="flex items-start gap-3 bg-white p-3 rounded-lg border border-blue-100 shadow-sm">
							<div class="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-2 rounded-lg">
								<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
								</svg>
							</div>
							<div>
								<h3 class="text-green-800 font-semibold text-sm">CI/CD</h3>
								<p class="text-green-900">{PortfolioData.preferredStack.ci}</p>
							</div>
						</div>
						
						<div class="flex items-start gap-3 bg-white p-3 rounded-lg border border-blue-100 shadow-sm md:col-span-2">
							<div class="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-2 rounded-lg">
								<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
								</svg>
							</div>
							<div>
								<h3 class="text-purple-800 font-semibold text-sm">Analytics</h3>
								<p class="text-purple-900">{PortfolioData.preferredStack.analytics}</p>
							</div>
						</div>
					</div>
					
					<div class="bg-white bg-opacity-70 p-4 rounded-lg border border-blue-200 relative z-10">
						<div class="flex gap-2 items-center mb-2">
							<svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
							</svg>
							<h3 class="text-blue-800 font-semibold text-sm">¿Por qué este stack?</h3>
						</div>
						<p class="text-blue-800 text-sm">{PortfolioData.preferredStack.why}</p>
					</div>
				</div>
			</section>
		{/if}

		<!-- Enfoque Profesional -->
		<section class="px-8 pb-6 mb-6 print-avoid-break">
			<h2 class="text-2xl font-bold text-blue-800 mb-6 relative inline-block pt-6">
				<div class="flex items-center">
					<svg class="w-6 h-6 mr-2 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
					</svg>
					<span class="relative z-10">Enfoque Profesional</span>
				</div>
				<span class="h-1 w-full block bg-gradient-to-r from-blue-600 to-blue-400 opacity-80 rounded-full absolute left-0 bottom-0"></span>
			</h2>
			
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
				<!-- Filosofía Fullstack -->
				<div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-200 shadow-sm relative overflow-hidden">
					<div class="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-400 to-indigo-500 opacity-10 rounded-bl-full"></div>
					
					<h3 class="text-lg font-semibold text-blue-800 mb-4 flex items-center">
						<svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
						Filosofía Fullstack
					</h3>
					
					<div class="space-y-3">
						<div class="flex items-start gap-3">
							<div class="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center">
								<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
								</svg>
							</div>
							<div>
								<h4 class="font-medium text-blue-900">Soluciones integrales</h4>
								<p class="text-sm text-blue-800">Desarrollo de punta a punta, desde la interfaz de usuario hasta las bases de datos y API.</p>
							</div>
						</div>
						
						<div class="flex items-start gap-3">
							<div class="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center">
								<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
								</svg>
							</div>
							<div>
								<h4 class="font-medium text-blue-900">Arquitectura escalable</h4>
								<p class="text-sm text-blue-800">Diseño de sistemas modulares, optimizados y preparados para crecimiento futuro.</p>
							</div>
						</div>
						
						<div class="flex items-start gap-3">
							<div class="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center">
								<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
								</svg>
							</div>
							<div>
								<h4 class="font-medium text-blue-900">Calidad de código</h4>
								<p class="text-sm text-blue-800">Énfasis en buenas prácticas, testing, y mantenibilidad en todas las capas del desarrollo.</p>
							</div>
						</div>
					</div>
				</div>
				
				<!-- Áreas de especialización -->
				<div class="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-5 border border-indigo-200 shadow-sm relative overflow-hidden">
					<div class="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-400 to-purple-500 opacity-10 rounded-bl-full"></div>
					
					<h3 class="text-lg font-semibold text-indigo-800 mb-4 flex items-center">
						<svg class="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
						</svg>
						Áreas de especialización
					</h3>
					
					<div class="grid grid-cols-2 gap-3">
						<div class="bg-white p-3 rounded-lg shadow-sm border border-indigo-100">
							<div class="flex items-center gap-2 mb-1">
								<svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
								</svg>
								<h4 class="font-medium text-indigo-900 text-sm">Frontend</h4>
							</div>
							<ul class="text-xs text-indigo-800 space-y-1 pl-2">
								<li>• UX/UI optimizada</li>
								<li>• Interfaces modulares</li>
								<li>• Rendimiento web</li>
							</ul>
						</div>
						
						<div class="bg-white p-3 rounded-lg shadow-sm border border-indigo-100">
							<div class="flex items-center gap-2 mb-1">
								<svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" />
								</svg>
								<h4 class="font-medium text-indigo-900 text-sm">Backend</h4>
							</div>
							<ul class="text-xs text-indigo-800 space-y-1 pl-2">
								<li>• APIs RESTful</li>
								<li>• ORM y bases de datos</li>
								<li>• Autenticación segura</li>
							</ul>
						</div>
						
						<div class="bg-white p-3 rounded-lg shadow-sm border border-indigo-100">
							<div class="flex items-center gap-2 mb-1">
								<svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
								</svg>
								<h4 class="font-medium text-indigo-900 text-sm">DevOps</h4>
							</div>
							<ul class="text-xs text-indigo-800 space-y-1 pl-2">
								<li>• CI/CD automatizado</li>
								<li>• Despliegue ágil</li>
								<li>• Monitorización</li>
							</ul>
						</div>
						
						<div class="bg-white p-3 rounded-lg shadow-sm border border-indigo-100">
							<div class="flex items-center gap-2 mb-1">
								<svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
								</svg>
								<h4 class="font-medium text-indigo-900 text-sm">Integración</h4>
							</div>
							<ul class="text-xs text-indigo-800 space-y-1 pl-2">
								<li>• Sistemas heterogéneos</li>
								<li>• Microservicios</li>
								<li>• APIs de terceros</li>
							</ul>
						</div>
					</div>
				</div>
				
				<!-- Metodología de trabajo -->
				<div class="md:col-span-2 bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-5 border border-blue-200 shadow-sm relative overflow-hidden">
					<div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400 to-green-500 opacity-5 rounded-bl-full"></div>
					
					<h3 class="text-lg font-semibold text-blue-800 mb-3 flex items-center">
						<svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
						</svg>
						Metodología de trabajo
					</h3>
					
					<div class="grid grid-cols-1 md:grid-cols-4 gap-2">
						<div class="bg-white bg-opacity-70 p-3 rounded-lg border border-blue-100 shadow-sm flex flex-col items-center text-center">
							<div class="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-2">1</div>
							<h4 class="font-medium text-blue-900 text-sm mb-1">Análisis</h4>
							<p class="text-xs text-blue-800">Entender las necesidades y objetivos del proyecto.</p>
						</div>
						
						<div class="bg-white bg-opacity-70 p-3 rounded-lg border border-blue-100 shadow-sm flex flex-col items-center text-center">
							<div class="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-2">2</div>
							<h4 class="font-medium text-blue-900 text-sm mb-1">Planificación</h4>
							<p class="text-xs text-blue-800">Definir arquitectura, tecnologías y flujo de trabajo.</p>
						</div>
						
						<div class="bg-white bg-opacity-70 p-3 rounded-lg border border-blue-100 shadow-sm flex flex-col items-center text-center">
							<div class="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-2">3</div>
							<h4 class="font-medium text-blue-900 text-sm mb-1">Desarrollo</h4>
							<p class="text-xs text-blue-800">Implementación con metodologías ágiles y enfoque incremental.</p>
						</div>
						
						<div class="bg-white bg-opacity-70 p-3 rounded-lg border border-blue-100 shadow-sm flex flex-col items-center text-center">
							<div class="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-2">4</div>
							<h4 class="font-medium text-blue-900 text-sm mb-1">Mejora continua</h4>
							<p class="text-xs text-blue-800">Optimización, mantenimiento y evolución constante.</p>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Footer -->
		<footer class="text-center text-gray-500 text-sm py-6 border-t border-gray-200 print-avoid-break bg-gray-50 mt-[6px] absolute w-full z-10">
			<div class="flex flex-col items-center justify-center">
				<p class="mb-2">CV actualizado el {new Date().toLocaleDateString('es-ES', { 
					year: 'numeric', 
					month: 'long', 
					day: 'numeric' 
				})}</p>
				
				<div class="flex items-center gap-2 mb-2">
					<span class="text-xs text-gray-400">Diseñado y desarrollado con</span>
					<div class="flex items-center gap-1">
						<span class="bg-gradient-to-r from-orange-100 to-orange-200 text-orange-800 text-xs px-2 py-0.5 rounded-md border border-orange-300 shadow-sm">
							<span class="font-semibold">Svelte</span><span class="text-orange-700">Kit</span>
						</span>
						<span class="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 text-xs px-2 py-0.5 rounded-md border border-blue-300 shadow-sm">
							<span class="font-semibold">Type</span><span class="text-blue-700">Script</span>
						</span>
						<span class="bg-gradient-to-r from-cyan-100 to-cyan-200 text-cyan-800 text-xs px-2 py-0.5 rounded-md border border-cyan-300 shadow-sm">
							<span class="font-semibold">Tailwind</span><span class="text-cyan-700">CSS</span>
						</span>
					</div>
				</div>
				
				<p class="text-xs text-gray-400">© {new Date().getFullYear()} {PortfolioData.user.name} {PortfolioData.user.firstSurname} • CV interactivo disponible en <a href="/" class="text-blue-500 hover:underline">{$page.url.toString().replace('/print', '')}</a></p>
			</div>
		</footer>
	</div>
</div>
