document.querySelectorAll('[data-demo]').forEach(demo => {
  const buttons = [...demo.querySelectorAll('[data-step]')];
  const stages = [...demo.querySelectorAll('[data-stage]')];
  const captions = [...demo.querySelectorAll('[data-caption]')];
  const toggle = demo.querySelector('[data-toggle]');
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0;
  let visible = false;
  let userPaused = false;
  let interactionPaused = false;
  let timer;

  function show(index) {
    current = index;
    buttons.forEach((button, step) => {
      button.classList.toggle('is-active', step === index);
      button.setAttribute('aria-pressed', String(step === index));
    });
    stages.forEach((stage, step) => {
      stage.hidden = step !== index;
      stage.classList.toggle('is-active', step === index);
    });
    captions.forEach((caption, step) => { caption.hidden = step !== index; });
  }

  function updatePlayback() {
    clearInterval(timer);
    toggle.hidden = motion.matches;
    const playing = !motion.matches && visible && !userPaused && !interactionPaused && document.visibilityState === 'visible';
    toggle.textContent = userPaused ? '▶' : 'Ⅱ';
    toggle.setAttribute('aria-label', userPaused ? demo.dataset.playLabel : demo.dataset.pauseLabel);
    toggle.title = userPaused ? demo.dataset.playLabel : demo.dataset.pauseLabel;
    if (playing) timer = setInterval(() => show((current + 1) % stages.length), 4200);
  }

  buttons.forEach((button, index) => button.addEventListener('click', () => {
    show(index);
    updatePlayback();
  }));
  toggle.addEventListener('click', () => {
    userPaused = !userPaused;
    updatePlayback();
  });
  demo.addEventListener('pointerenter', () => { interactionPaused = true; updatePlayback(); });
  demo.addEventListener('pointerleave', () => { interactionPaused = false; updatePlayback(); });
  demo.addEventListener('focusin', () => { interactionPaused = true; updatePlayback(); });
  demo.addEventListener('focusout', event => {
    if (!demo.contains(event.relatedTarget)) { interactionPaused = false; updatePlayback(); }
  });
  document.addEventListener('visibilitychange', updatePlayback);
  motion.addEventListener('change', updatePlayback);
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      visible = entries.some(entry => entry.isIntersecting);
      updatePlayback();
    }, { threshold: .35 });
    observer.observe(demo);
  } else {
    visible = true;
  }
  show(0);
  updatePlayback();
});
