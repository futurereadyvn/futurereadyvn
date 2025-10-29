// Dropdown logic
document.addEventListener('click', (e)=>{
  const isToggle = e.target.closest('[data-dropdown]');
  document.querySelectorAll('.dropdown').forEach(d=>{
    if(isToggle && d.contains(isToggle)){ d.classList.toggle('open'); }
    else d.classList.remove('open');
  });
});

// Modal system: fetch page into popup
const modal = document.querySelector('.modal');
const modalBackdrop = document.querySelector('.modal-backdrop');
const modalBody = document.querySelector('.modal-body');
const modalTitle = document.querySelector('.modal-title');
const closeBtn = document.querySelector('.modal-close');
const pageWrap = document.querySelector('.page-wrap');

function openModal(title, href){
  document.body.classList.add('blur');
  modal.classList.add('show');
  modalTitle.textContent = title || '';
  modalBody.innerHTML = '<p style="opacity:.6">Loading…</p>';
  // fetch content
  fetch(href).then(r=>r.text()).then(html=>{
    // extract only inside <main> if present
    const temp = document.createElement('div');
    temp.innerHTML = html;
    const main = temp.querySelector('main') || temp;
    modalBody.innerHTML = main.innerHTML;
  }).catch(err=>{
    modalBody.innerHTML = '<p style="color:#b00">Failed to load content.</p>';
  });
}

function closeModal(){
  modal.classList.remove('show');
  document.body.classList.remove('blur');
}

closeBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e)=>{
  if(e.target.classList.contains('modal-backdrop')) closeModal();
});
document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') closeModal(); });

// Intercept links with data-modal
document.querySelectorAll('[data-modal-link]').forEach(a=>{
  a.addEventListener('click', (e)=>{
    e.preventDefault();
    openModal(a.getAttribute('data-title') || a.textContent.trim(), a.getAttribute('href'));
  });
});

// Intercept CTA buttons too
document.querySelectorAll('[data-cta]').forEach(btn=>{
  btn.addEventListener('click', (e)=>{
    e.preventDefault();
    openModal(btn.getAttribute('data-title') || btn.textContent.trim(), btn.getAttribute('href'));
  });
});

// Generic AJAX form handler (Formspree)
document.addEventListener('submit', async (e)=>{
  const form = e.target;
  if(form.matches('[data-async]')){
    e.preventDefault();
    const submit = form.querySelector('button[type="submit"]');
    const original = submit.textContent;
    submit.disabled = true; submit.textContent = 'Sending…';
    try{
      const res = await fetch(form.action, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      });
      if(res.ok){
        form.reset();
        form.innerHTML = '<div style="padding:12px;background:#f7fffb;border:1px solid #e7fff4;border-radius:10px">Thank you! Your submission has been sent. We will reach out via email.</div>';
      }else{
        form.insertAdjacentHTML('beforeend','<p style="color:#b00">There was an error. Please try again or email us directly.</p>');
      }
    }catch(err){
      form.insertAdjacentHTML('beforeend','<p style="color:#b00">Network error. Please try again.</p>');
    }finally{
      if(submit){ submit.disabled=false; submit.textContent = original; }
    }
  }
});
