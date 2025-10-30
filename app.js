// Handle fade-out when navigating between pages
document.querySelectorAll('a[href]').forEach(a => {
  const url = a.getAttribute('href') || '';
  if (url.startsWith('#') || url.startsWith('mailto:')) return;
  a.addEventListener('click', e => {
    if (e.metaKey || e.ctrlKey) return;
    e.preventDefault();
    document.body.classList.add('fade-out');
    setTimeout(() => { window.location.href = url; }, 200);
  });
});

// Dropdowns
document.addEventListener('click', e => {
  const isToggle = e.target.closest('[data-dropdown]');
  document.querySelectorAll('.dropdown').forEach(d => {
    if (isToggle && d.contains(isToggle)) d.classList.toggle('open');
    else d.classList.remove('open');
  });
});

// Scroll reveal animation
function initReveal(root = document) {
  const els = root.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach(el => (el.style.opacity = 1));
    return;
  }
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add('in');
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.15 });
  els.forEach(el => io.observe(el));
}
initReveal();

// Handle dropdown closing on scroll
window.addEventListener('scroll', () => {
  document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('open'));
});
