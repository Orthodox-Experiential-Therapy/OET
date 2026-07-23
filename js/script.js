document.getElementById('year').textContent = new Date().getFullYear();

const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('is-visible'));
}

/* ---------- Mobile menu ---------- */
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

function closeMenu() {
  mobileMenu.classList.remove('open');
  menuBtn.setAttribute('aria-expanded', 'false');
}
function openMenu() {
  mobileMenu.classList.add('open');
  menuBtn.setAttribute('aria-expanded', 'true');
}

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('open');
    isOpen ? closeMenu() : openMenu();
  });

  // Close after tapping any link inside the menu
  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  // Close on outside tap
  document.addEventListener('click', (e) => {
    if (!mobileMenu.classList.contains('open')) return;
    if (mobileMenu.contains(e.target) || menuBtn.contains(e.target)) return;
    closeMenu();
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // Close automatically if resized back up to desktop width
  window.addEventListener('resize', () => {
    if (window.innerWidth > 820) closeMenu();
  });
}
