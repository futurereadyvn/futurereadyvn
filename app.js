(function(){
  document.addEventListener('DOMContentLoaded', ()=>{
    document.body.classList.add('page-enter');
    const here = location.pathname.replace(/\/index\.html$/, '');
    document.querySelectorAll('.menu a').forEach(a=>{
      const to = new URL(a.getAttribute('href'), location.href).pathname.replace(/\/index\.html$/, '');
      if(to===here){ a.classList.add('active'); }
    });
    if(!document.querySelector('link[rel="icon"]')){
      const l = document.createElement('link'); l.rel='icon'; l.href='/assets/favicon.png'; document.head.appendChild(l);
    }
  });
  function shouldIntercept(a){
    if(!a) return false;
    const href = a.getAttribute('href');
    if(!href || href.startsWith('#') || href.startsWith('mailto:') || a.target === '_blank') return false;
    const u = new URL(href, location.href);
    if(u.origin !== location.origin) return false;
    return true;
  }
  document.addEventListener('click', (e)=>{
    const a = e.target.closest('a');
    if(!shouldIntercept(a)) return;
    e.preventDefault();
    document.body.classList.add('page-leave');
    setTimeout(()=>{ location.href = a.href; }, 180);
  }, true);
})();
