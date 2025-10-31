/* Reset visuals (khỏi blur/back) */
function resetVisualState(){
  document.body.classList.remove('blur','fade-out');
  document.querySelectorAll('.dropdown.open').forEach(d=>d.classList.remove('open'));
  document.querySelectorAll('.reveal').forEach(el=>{
    if(el.classList.contains('in')) return;
    const r = el.getBoundingClientRect();
    if(r.top < window.innerHeight - 80) el.classList.add('in');
  });
}
document.addEventListener('DOMContentLoaded', resetVisualState);
window.addEventListener('pageshow', (e)=>{ if(e.persisted) resetVisualState(); });

/* Dropdown toggle + click outside to close */
document.addEventListener('click', (e)=>{
  const btn = e.target.closest('[data-dropdown] > button');
  const dd  = e.target.closest('[data-dropdown]');
  if(btn && dd){ e.preventDefault(); dd.classList.toggle('open'); }
  document.querySelectorAll('.dropdown.open').forEach(d=>{ if(!d.contains(e.target)) d.classList.remove('open'); });
});

/* Asset-path loader (root & /vietnamese/) */
(function fixAssetPaths(){
  const inVi = location.pathname.includes('/vietnamese/');
  const ASSETS = inVi ? '../assets/' : 'assets/';
  document.querySelectorAll('img[data-asset]').forEach(img=>{
    const file = img.getAttribute('data-asset');
    if(!img.getAttribute('src')) img.src = ASSETS + file;
    img.onerror = ()=>{ img.onerror=null; img.src = (inVi ? 'assets/' : '../assets/') + file; };
  });
})();
