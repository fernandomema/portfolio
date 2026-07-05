import type { Action } from 'svelte/action';

type Params = { altElem?: HTMLElement | null };

function isVisible(el: Element | null | undefined): el is HTMLElement {
    if (!(el instanceof HTMLElement)) return false;
    const style = getComputedStyle(el);
    return style.display !== 'none' && style.visibility !== 'hidden';
}

function findVisibleSibling(
    start: Element | null | undefined,
    direction: 'next' | 'prev',
    fallback: HTMLElement | null
): HTMLElement | null {
    let el: Element | null = start ?? (direction === 'next' ? fallback?.nextElementSibling ?? null : fallback?.previousElementSibling ?? null);
    while (el) {
        if (isVisible(el)) return el;
        el = direction === 'next' ? el.nextElementSibling : el.previousElementSibling;
    }
    return null;
}

export const slideScroll: Action<HTMLElement, Params | undefined> = (node, params) => {
    let altElem: HTMLElement | null = params?.altElem ?? null;

    function handleScroll(direction: 'up' | 'down') {
        const start = direction === 'down'
            ? (node.nextElementSibling ?? null)
            : (node.previousElementSibling ?? null);
        const sibling = findVisibleSibling(start, direction === 'down' ? 'next' : 'prev', altElem);
        if (sibling) {
            sibling.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest',
            });
        }
    }

    const onWheel = (e: WheelEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const direction = e.deltaY > 0 ? 'down' : 'up';
        handleScroll(direction);
    };

    node.addEventListener('wheel', onWheel, { passive: false });

    return {
        update(newParams) {
            altElem = newParams?.altElem ?? null;
        },
        destroy() {
            node.removeEventListener('wheel', onWheel);
        },
    };
};
