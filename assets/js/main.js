(() => {
  const header = document.querySelector('[data-header]');
  const menu = document.querySelector('.menu-toggle');
  const navGroups = document.querySelectorAll('.nav-group');
  const searchPanel = document.querySelector('.search-panel');
  const searchToggle = document.querySelector('.search-toggle');
  const searchClose = document.querySelector('.search-close');
  const compactHeader = window.matchMedia('(max-width: 1100px)');
  const nav = document.querySelector('.site-nav');
  const setGroup = (group, open) => {
    group.classList.toggle('open', open);
    group.querySelector('button')?.setAttribute('aria-expanded', String(open));
  };
  const setMenu = open => {
    document.body.classList.toggle('nav-open', open);
    menu?.setAttribute('aria-expanded', String(open));
    const label = menu?.querySelector('.sr-only');
    if (label) label.textContent = open ? 'Close navigation' : 'Open navigation';
    if (nav) nav.inert = compactHeader.matches && !open;
    if (!open) navGroups.forEach(group => setGroup(group, false));
  };
  setMenu(false);
  compactHeader.addEventListener('change', () => setMenu(false));

  const setHeader = () => header?.classList.toggle('scrolled', window.scrollY > 12);
  setHeader();
  window.addEventListener('scroll', setHeader, { passive: true });

  menu?.addEventListener('click', () => {
    setMenu(!document.body.classList.contains('nav-open'));
  });

  navGroups.forEach(group => {
    const button = group.querySelector('button');
    button?.addEventListener('click', () => {
      const open = !group.classList.contains('open');
      navGroups.forEach(other => setGroup(other, false));
      setGroup(group, open);
    });
    group.addEventListener('pointerenter', event => {
      if (!compactHeader.matches && event.pointerType === 'mouse') setGroup(group, true);
    });
    group.addEventListener('pointerleave', () => {
      if (!compactHeader.matches && !group.contains(document.activeElement)) setGroup(group, false);
    });
    group.addEventListener('focusout', event => {
      if (!group.contains(event.relatedTarget)) setGroup(group, false);
    });
  });
  document.addEventListener('click', event => {
    navGroups.forEach(group => {
      if (!group.contains(event.target)) setGroup(group, false);
    });
  });

  const openSearch = () => {
    searchPanel.hidden = false;
    searchPanel.querySelector('input')?.focus();
  };
  const closeSearch = () => { searchPanel.hidden = true; searchToggle?.focus(); };
  searchToggle?.addEventListener('click', openSearch);
  searchClose?.addEventListener('click', closeSearch);
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      if (searchPanel && !searchPanel.hidden) { closeSearch(); return; }
      const openGroup = [...navGroups].find(group => group.classList.contains('open'));
      if (openGroup) {
        setGroup(openGroup, false);
        openGroup.querySelector('button')?.focus();
      } else if (document.body.classList.contains('nav-open')) {
        setMenu(false);
        menu?.focus();
      }
    }
    if (event.key === 'Tab' && document.body.classList.contains('nav-open') && searchPanel?.hidden) {
      const focusable = [...header.querySelectorAll('a,button')].filter(el => el.getClientRects().length && getComputedStyle(el).visibility !== 'hidden');
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });

  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
})();

// Embed the existing assistant only after a visitor chooses to open it.
(() => {
  const widget = document.querySelector('[data-chat-widget]');
  if (!widget) return;
  const launcher = widget.querySelector('.its-chat-launcher');
  const panel = widget.querySelector('.its-chat-panel');
  const close = widget.querySelector('.its-chat-close');
  const content = widget.querySelector('.its-chat-content');
  const status = widget.querySelector('.its-chat-status');
  const chatbotURL = 'https://company-chatbot-5c6r.onrender.com/';
  let iframe;
  let loadingTimer;

  // Follow the visual viewport when a mobile keyboard reduces the available area.
  const fitViewport = () => {
    const viewport = window.visualViewport;
    if (!viewport) return;
    widget.style.setProperty('--chat-viewport-height', `${viewport.height}px`);
    widget.style.setProperty('--chat-viewport-bottom', `${Math.max(0, window.innerHeight - viewport.height - viewport.offsetTop)}px`);
  };
  const closeChat = () => {
    if (panel.open) panel.close();
  };
  panel.addEventListener('close', () => {
    launcher.setAttribute('aria-expanded', 'false');
    launcher.focus({preventScroll: true});
    // Keep the iframe mounted and its source unchanged to retain this conversation.
  });
  panel.addEventListener('cancel', event => {
    event.preventDefault();
    closeChat();
  });
  close.addEventListener('click', closeChat);
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && panel.open) {
      event.preventDefault();
      closeChat();
    }
  });
  launcher.addEventListener('click', () => {
    if (typeof panel.showModal !== 'function') {
      window.open(chatbotURL, '_blank', 'noopener,noreferrer');
      return;
    }
    fitViewport();
    panel.showModal();
    launcher.setAttribute('aria-expanded', 'true');
    close.focus({preventScroll: true});
    if (iframe) return;
    status.hidden = false;
    status.textContent = 'Loading the assistant...';
    iframe = document.createElement('iframe');
    iframe.title = 'ITSIPL Assistant';
    // Delegate microphone use only to this chatbot origin. The chatbot/browser
    // still controls permission prompts; the host never requests microphone access.
    iframe.setAttribute('allow', 'microphone https://company-chatbot-5c6r.onrender.com');
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    iframe.addEventListener('load', () => {
      clearTimeout(loadingTimer);
      status.hidden = true;
      // Cross-origin load events do not prove that embedding or the chat API worked.
    });
    iframe.addEventListener('error', () => {
      clearTimeout(loadingTimer);
      status.textContent = 'The assistant could not load here. Please use Open in new tab.';
      status.hidden = false;
    });
    loadingTimer = setTimeout(() => {
      status.textContent = 'Still loading? You can also use Open in new tab.';
    }, 20000);
    iframe.src = chatbotURL;
    content.append(iframe);
  });
  window.visualViewport?.addEventListener('resize', fitViewport);
  window.visualViewport?.addEventListener('scroll', fitViewport);
  window.addEventListener('resize', fitViewport, {passive: true});
  launcher.hidden = false;
})();
// Native scrolling keeps the approved partner cards usable with touch or a trackpad.
(() => {
  document.querySelectorAll('.technology-partners').forEach(section => {
    const list = section.querySelector('.technology-partner-grid');
    const cards = [...list.children];
    const controls = section.querySelector('.technology-partner-controls');
    const prev = section.querySelector('.technology-partner-prev');
    const next = section.querySelector('.technology-partner-next');
    const status = section.querySelector('.technology-partner-status');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let scrollTimer;
    const maxScroll = () => Math.max(0, list.scrollWidth - list.clientWidth);
    const step = () => cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : list.clientWidth;
    const update = () => {
      prev.setAttribute('aria-disabled', String(list.scrollLeft <= 1));
      next.setAttribute('aria-disabled', String(list.scrollLeft >= maxScroll() - 1));
      const viewport = list.getBoundingClientRect();
      const visible = cards.map((card,index) => ({rect:card.getBoundingClientRect(),index}))
        .filter(({rect}) => rect.right > viewport.left + 1 && rect.left < viewport.right - 1);
      if (visible.length) status.textContent = `${visible[0].index + 1}\u2013${visible.at(-1).index + 1} of ${cards.length}`;
    };
    const goTo = (left, instant = false) => {
      list.scrollTo({left: Math.max(0, Math.min(left, maxScroll())), behavior: instant || reducedMotion.matches ? 'instant' : 'smooth'});
      if (instant) update();
    };
    const move = direction => {
      const gap = step() - cards[0].offsetWidth;
      const count = Math.max(1, Math.round((list.clientWidth + gap) / step()));
      goTo((Math.round(list.scrollLeft / step()) + direction * count) * step());
    };
    prev.addEventListener('click', () => { if (prev.getAttribute('aria-disabled') !== 'true') move(-1); });
    next.addEventListener('click', () => { if (next.getAttribute('aria-disabled') !== 'true') move(1); });
    list.addEventListener('keydown', event => {
      // Links retain normal Tab/Enter behaviour; list focus provides slider keys.
      if (event.target !== list || event.altKey || event.ctrlKey || event.metaKey) return;
      const targets = {ArrowLeft:list.scrollLeft-step(), ArrowRight:list.scrollLeft+step(), Home:0, End:maxScroll()};
      if (Object.hasOwn(targets,event.key)) { event.preventDefault(); goTo(targets[event.key]); }
    });
    list.addEventListener('focusin', event => {
      const card = cards.find(card => card.contains(event.target));
      if (!card) return;
      const viewport = list.getBoundingClientRect();
      const rect = card.getBoundingClientRect();
      if (rect.left < viewport.left || rect.right > viewport.right) goTo(card.offsetLeft-cards[0].offsetLeft, true);
    });
    list.addEventListener('scroll', () => {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(update, 120);
    }, {passive:true});
    list.addEventListener('scrollend', update);
    const revealHash = () => {
      let id;
      try { id = decodeURIComponent(window.location.hash.slice(1)); } catch { return; }
      const card = cards.find(card => card.id && card.id === id);
      if (card) goTo(card.offsetLeft-cards[0].offsetLeft, true);
    };
    window.addEventListener('hashchange', revealHash);
    new ResizeObserver(update).observe(list);
    controls.hidden = false;
    revealHash();
    update();
  });
})();

// Reserve a footer-only home for the launcher, without moving an active chat iframe.
(() => {
  const footer = document.querySelector('.reference-home .site-footer');
  const widget = document.querySelector('[data-chat-widget]');
  if (!footer || !widget || !('IntersectionObserver' in window)) return;
  const launcher = widget.querySelector('.its-chat-launcher');
  if (!launcher) return;
  footer.append(launcher);
  const observer = new IntersectionObserver(([entry]) => {
    footer.classList.toggle('chat-docked', entry.isIntersecting);
  });
  observer.observe(footer);
})();

