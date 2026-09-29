document.querySelectorAll('.portfolio-menu').forEach((menu) => {
  const trigger = menu.querySelector('summary');
  document.addEventListener('click', (event) => {
    if (!menu.contains(event.target)) menu.open = false;
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu.open) {
      menu.open = false;
      trigger.focus();
    }
  });
  menu.addEventListener('focusout', (event) => {
    if (!menu.contains(event.relatedTarget)) menu.open = false;
  });
});

const returnCategories = {
  all: 'All',
  'character-design': 'Character Design',
  illustration: 'Illustration',
  '3d': '3D'
};
const requestedOrigin = new URLSearchParams(window.location.search).get('from');
const returnCategory = Object.prototype.hasOwnProperty.call(returnCategories, requestedOrigin)
  ? requestedOrigin : 'all';
document.querySelectorAll('.back-link').forEach((link) => {
  link.href = '../index.html?category=' + returnCategory + '#portfolio';
  link.textContent = '← Back to ' + returnCategories[returnCategory];
});
