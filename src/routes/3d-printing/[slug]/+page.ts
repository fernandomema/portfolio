import { PortfolioData } from '$lib/PortfolioData';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = ({ params }) => {
    const project = PortfolioData.printing3D.projects.find(
        p => slugify(p.title) === params.slug
    );

    if (!project) {
        throw error(404, 'Proyecto no encontrado');
    }

    // Obtener proyectos relacionados (misma categoría, excluyendo el actual)
    const relatedProjects = PortfolioData.printing3D.projects
        .filter(p => p.category === project.category && slugify(p.title) !== params.slug)
        .slice(0, 3);

    return {
        project,
        relatedProjects
    };
};

function slugify(text: string): string {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

export function entries() {
    return PortfolioData.printing3D.projects.map(project => ({
        slug: slugify(project.title)
    }));
}
