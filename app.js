document.addEventListener("DOMContentLoaded", () => {
  const here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.menu a').forEach(a=>{
    const to = a.getAttribute('href');
    if (to === here) a.classList.add('active');
  });
});
