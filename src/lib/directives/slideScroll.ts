export function slideScroll(node: HTMLElement, params?: { altElem: HTMLElement | undefined | null }) {
  let startY = 0;
  let endY = 0;

  // Soporte para escritorio (rueda del ratón)
  node.addEventListener('wheel', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const direction = e.deltaY > 0 ? 'down' : 'up';
    handleScroll(direction);
  }, { passive: false });

  // Soporte para móviles (gesto táctil)
  node.addEventListener('touchstart', (e) => {
    startY = e.touches[0].clientY;
  }, { passive: true });

  node.addEventListener('touchend', (e) => {
    endY = e.changedTouches[0].clientY;
    const diffY = startY - endY;

    if (Math.abs(diffY) < 30) return; // Ignorar toques pequeños

    const direction = diffY > 0 ? 'down' : 'up';
    handleScroll(direction);
  }, { passive: true });

  function handleScroll(direction: 'up' | 'down') {
    if (direction === 'down') {
      const nextSibling = node.nextElementSibling || params?.altElem?.nextElementSibling;
      if (nextSibling) {
        nextSibling.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest',
        });
      }
    } else {
      const previousSibling = node.previousElementSibling || params?.altElem?.previousElementSibling;
      if (previousSibling) {
        previousSibling.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
          inline: 'nearest',
        });
      }
    }
  }
}
