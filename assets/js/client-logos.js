(() => {
  document.querySelectorAll('.its-clients').forEach(section => {
    const list = section.querySelector('.its-client-grid');
    const cards = [...list.children];
    const controls = section.querySelector('.its-client-controls');
    const arrows = section.querySelector('.its-client-arrows');
    const prev = section.querySelector('.its-client-prev');
    const next = section.querySelector('.its-client-next');
    const expand = section.querySelector('.its-client-expand');
    const status = section.querySelector('.its-client-status');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let expanded = false;
    let savedScroll = 0;
    let scrollTimer;
    section.classList.add('is-slider');
    controls.hidden = false;

    const maxScroll = () => Math.max(0, list.scrollWidth - list.clientWidth);
    const update = () => {
      if (expanded) return;
      prev.setAttribute('aria-disabled', String(list.scrollLeft <= 1));
      next.setAttribute('aria-disabled', String(list.scrollLeft >= maxScroll() - 1));
      const viewport = list.getBoundingClientRect();
      const visible = cards.map((card, index) => ({rect: card.getBoundingClientRect(), index}))
        .filter(({rect}) => rect.right > viewport.left + 1 && rect.left < viewport.right - 1);
      if (visible.length) status.textContent = `${visible[0].index + 1}\u2013${visible.at(-1).index + 1} of ${cards.length}`;
    };
    const goTo = left => list.scrollTo({left: Math.max(0, Math.min(left, maxScroll())), behavior: reducedMotion.matches ? 'instant' : 'smooth'});
    const move = direction => {
      const step = cards[1].offsetLeft - cards[0].offsetLeft;
      const count = Math.max(1, Math.round((list.clientWidth + (step - cards[0].offsetWidth)) / step));
      goTo((Math.round(list.scrollLeft / step) + direction * count) * step);
    };
    prev.addEventListener('click', () => { if (prev.getAttribute('aria-disabled') !== 'true') move(-1); });
    next.addEventListener('click', () => { if (next.getAttribute('aria-disabled') !== 'true') move(1); });
    list.addEventListener('keydown', event => {
      if (expanded || event.altKey || event.ctrlKey || event.metaKey) return;
      const step = cards[1].offsetLeft - cards[0].offsetLeft;
      const targets = {ArrowLeft: list.scrollLeft - step, ArrowRight: list.scrollLeft + step, Home: 0, End: maxScroll()};
      if (Object.hasOwn(targets, event.key)) { event.preventDefault(); goTo(targets[event.key]); }
    });
    list.addEventListener('scroll', () => {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(update, 120);
    }, {passive: true});
    list.addEventListener('scrollend', update);
    expand.addEventListener('click', () => {
      expanded = !expanded;
      if (expanded) savedScroll = list.scrollLeft;
      section.classList.toggle('is-expanded', expanded);
      expand.setAttribute('aria-expanded', String(expanded));
      expand.textContent = expanded ? 'Show client slider' : 'View all clients';
      arrows.hidden = expanded;
      list.removeAttribute('aria-describedby');
      if (!expanded) {
        list.setAttribute('aria-describedby', 'its-client-help');
        list.scrollTo({left: savedScroll, behavior: 'instant'});
        // Keep the activated control visible when the tall grid collapses.
        expand.focus({preventScroll: true});
        const rect = expand.getBoundingClientRect();
        if (rect.top < 90 || rect.bottom > window.innerHeight) expand.scrollIntoView({block: 'center', behavior: 'instant'});
      }
      update();
    });
    new ResizeObserver(update).observe(list);
    update();
  });
})();
