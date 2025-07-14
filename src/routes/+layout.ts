import { loadTranslations } from '$lib/translations';

export const prerender = true

export const load = async ({ url }: any) => {
    const { pathname } = url;

    const initLocale = 'en'; // get from cookie, user session, ...

    await loadTranslations(initLocale, pathname); // keep this just before the `return`

    return {};
}