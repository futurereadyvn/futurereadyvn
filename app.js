(function(){
  document.addEventListener('DOMContentLoaded', ()=>{
    document.body.classList.add('fade-in');
    const here = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.menu a').forEach(a=>{
      const to = a.getAttribute('href');
      if (to && (to===here || (here==='' && to==='index.html'))) a.classList.add('active');
    });
  });

  function shouldIntercept(a){
    if(!a) return false;
    const href = a.getAttribute('href') || '';
    if(href.startsWith('#') || href.startsWith('mailto:') || a.target==='_blank') return false;
    const u = new URL(href, location.href);
    if(u.origin !== location.origin) return false;
    return true;
  }
  document.addEventListener('click', (e)=>{
    const a = e.target.closest('a');
    if(!shouldIntercept(a)) return;
    e.preventDefault();
    document.body.classList.remove('fade-in');
    document.body.classList.add('fade-out');
    setTimeout(()=>{ location.href = a.href; }, 160);
  }, true);
})();
