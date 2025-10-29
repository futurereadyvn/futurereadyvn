document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.btn');
    links.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            document.body.classList.add('fade-out');
            setTimeout(() => {
                window.location.href = link.getAttribute('href');
            }, 800);
        });
    });
});

const style = document.createElement('style');
style.innerHTML = `
.fade-out {
    opacity: 0;
    transition: opacity 0.8s ease;
}`;
document.head.appendChild(style);
