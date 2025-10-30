// ====== RESET VISUAL STATE (load lần đầu) ======
function resetVisualState() {
  document.body.classList.remove('blur', 'fade-out');
  document.querySelectorAll('.modal').forEach(m => m.classList.remove('show'));
  document.querySelectorAll('.dropdown.open').forEach(d => d.classList.remove('open'));
  // kick-off reveal đầu trang
  document.querySelectorAll('.reveal').forEach(el => {
    if (el.classList.contains('in')) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) el.classList.add('in');
  });
}

document.addEventListener('DOMContentLoaded', resetVisualState);

// ====== HANDLE BFCACHE / BACK-FORWARD ======
window.addEventListener('pageshow', (e) => {
  // nếu trang được khôi phục từ cache hoặc là back/forward, reset lại
  const nav = performance.getEntriesByType && performance.getEntriesByType('navigation')[0];
  const isBackForward = nav && nav.type === 'back_forward';
  if (e.persisted || isBackForward) {
    resetVisualState();
  }
});

// ===== DROPDOWN =====
document.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-dropdown] > button');
  const dropdown = e.target.closest('[data-dropdown]');
  if (btn && dropdown) {
    e.preventDefault();
    dropdown.classList.toggle('open');
  }
  document.querySelectorAll('.dropdown.open').forEach(d => {
    if (!d.contains(e.target)) d.classList.remove('open');
  });
});

// ===== MODAL HELPERS (không auto mở) =====
function openModal(id){
  const m = document.getElementById(id);
  if(!m) return;
  m.classList.add('show');
  document.body.classList.add('blur');
}
function closeModal(id){
  const m = document.getElementById(id);
  if(!m) return;
  m.classList.remove('show');
  document.body.classList.remove('blur');
}
document.addEventListener('click', (e) => {
  if (e.target.matches('.modal-close')) {
    const m = e.target.closest('.modal');
    if (m && m.id) closeModal(m.id);
  }
  if (e.target.classList.contains('modal')) {
    const m = e.target;
    if (m && m.id) closeModal(m.id);
  }
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal.show').forEach(m => closeModal(m.id));
  }
});

// ===== REVEAL ON SCROLL =====
const onScrollReveal = () => {
  document.querySelectorAll('.reveal').forEach(el => {
    if (el.classList.contains('in')) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) el.classList.add('in');
  });
};
window.addEventListener('scroll', onScrollReveal, {passive:true});

// ===== NAV LINKS FADE-OUT TRANSITION =====
document.addEventListener('click', (e) => {
  const a = e.target.closest('a.nav-link, .nav a, .dropdown-menu a, .btn.nav-link, .btn[href]');
  if (!a) return;
  const href = a.getAttribute('href');
  if (!href || href.startsWith('#') || href.startsWith('mailto:')) return;

  // Cho phép mở tab mới (Ctrl/Cmd/Middle)
  if (e.metaKey || e.ctrlKey || e.button === 1) return;

  e.preventDefault();
  // tránh fade khi link là anchor nội trang
  if (href.startsWith('#')) { window.location.hash = href; return; }
  document.body.classList.add('fade-out');
  setTimeout(() => { window.location.href = href; }, 180);
});

// ===== FORM ASYNC (Formspree) — optional an toàn =====
document.addEventListener('submit', async (e) => {
  const form = e.target.closest('form[data-async]');
  if (!form) return;
  e.preventDefault();
  const data = new FormData(form);
  try {
    const r = await fetch(form.action, {method:'POST', body:data, headers:{'Accept':'application/json'}});
    if (r.ok) {
      alert('Gửi thành công! Cảm ơn bạn đã đồng hành cùng FRV 💚');
      form.reset();
    } else {
      alert('Có lỗi khi gửi biểu mẫu. Bạn vui lòng thử lại giúp tụi mình nhé!');
    }
  } catch(err){
    alert('Mạng không ổn định. Vui lòng thử lại!');
  }
});

// ===== ASSET PATH FIX (auto root vs /vietnamese/) =====
(function fixAssetPaths(){
  const inVi = location.pathname.includes('/vietnamese/');
  const ASSETS = inVi ? '../assets/' : 'assets/';
  document.querySelectorAll('img[data-asset]').forEach(img=>{
    if (!img.getAttribute('src')) img.src = ASSETS + img.getAttribute('data-asset');
    img.onerror = () => {
      img.onerror = null;
      img.src = (inVi ? 'assets/' : '../assets/') + img.getAttribute('data-asset');
    };
  });
})();
