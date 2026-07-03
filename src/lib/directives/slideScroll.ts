import type { Action } from 'svelte/action';

type Params = { altElem?: HTMLElement | null };

export const slideScroll: Action<HTMLElement, Params | undefined> = (node, params) => {
  let altElem: HTMLElement | null = params?.altElem ?? null;
  let startY = 0;
  let endY = 0;

  function handleScroll(direction: 'up' | 'down') {
    if (direction === 'down') {
      const nextSibling = node.nextElementSibling || altElem?.nextElementSibling;
      if (nextSibling) {
        nextSibling.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest',
        });
      }
    } else {
      const previousSibling = node.previousElementSibling || altElem?.previousElementSibling;
      if (previousSibling) {
        previousSibling.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
          inline: 'nearest',
        });
      }
    }
  }

  const onWheel = (e: WheelEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const direction = e.deltaY > 0 ? 'down' : 'up';
    handleScroll(direction);
  };

  const onTouchStart = (e: TouchEvent) => {
    startY = e.touches[0].clientY;
  };

  const onTouchEnd = (e: TouchEvent) => {
    endY = e.changedTouches[0].clientY;
    const diffY = startY - endY;

    if (Math.abs(diffY) < 30) return; // Ignorar toques pequeños

    const direction = diffY > 0 ? 'down' : 'up';
    handleScroll(direction);
  };

  node.addEventListener('wheel', onWheel, { passive: false });
  node.addEventListener('touchstart', onTouchStart, { passive: true });
  node.addEventListener('touchend', onTouchEnd, { passive: true });

  return {
    update(newParams) {
      altElem = newParams?.altElem ?? null;
    },
    destroy() {
      node.removeEventListener('wheel', onWheel);
      node.removeEventListener('touchstart', onTouchStart);
      node.removeEventListener('touchend', onTouchEnd);
    },
  };
};
