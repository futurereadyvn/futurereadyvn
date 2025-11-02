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
/* ===== [PATCH] Chỉ bật CV modal ở trang About; chặn blur ở trang khác ===== */
(function(){
  const cvModalEl = document.getElementById('cvModal');
  const isAboutContext = !!cvModalEl || /\/about(\/|\.html)/.test(location.pathname);

  if (isAboutContext && cvModalEl) {
    // Nếu file em đang có sẵn logic openCV(...) cho mentor,
    // KHÔNG cần xoá; đoạn dưới chỉ đảm bảo hash/auto-open không chạy ở trang khác.
    if (location.hash){
      const id = location.hash.replace('#','');
      // Chỉ auto-open khi thật sự có mentor ID và đang trong About
      if (window.MENTORS && MENTORS[id]) {
        // cố gắng gọi openCV nếu hàm đã có sẵn
        try { window.openCV && window.openCV(id); } catch(_) {}
      }
    }
  } else {
    // Ở trang KHÔNG phải About: chắc chắn không còn blur/modal cũ
    document.body.classList.remove('blur','fade-out');
    // Xoá hash nếu có (#sally) để khỏi kích hoạt logic cũ
    if (location.hash) history.replaceState(null,'',location.pathname);
  }
})();
