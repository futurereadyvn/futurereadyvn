// Highlight current nav link
(function(){
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.menu a').forEach(a=>{
    try{
      const href = a.getAttribute('href')||'';
      if (href.endsWith(path)) a.classList.add('active');
    }catch(e){}
  });
})();

// Slide/fade transition between internal pages
(function(){
  const isInternal = (url)=>{
    try{ const u = new URL(url, location.href); return u.origin===location.origin; }catch(e){ return false; }
  };
  document.addEventListener('click', (e)=>{
    const a = e.target.closest('a');
    if(!a) return;
    const href = a.getAttribute('href')||'';
    if(href.startsWith('#') || href.startsWith('mailto:')) return;
    if(!isInternal(href)) return;
    e.preventDefault();
    document.documentElement.classList.add('leaving');
    setTimeout(()=>{ window.location.href = a.href; }, 180);
  });
})();
