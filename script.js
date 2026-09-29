const filterButtons = document.querySelectorAll('.filter-button');
const projectCards = document.querySelectorAll('.project-card');

function applyFilter(filter) {
  if (!['all', 'character-design', 'illustration', '3d'].includes(filter)) filter = 'all';
  filterButtons.forEach((button) => {
    const active = button.dataset.filter === filter;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });


  projectCards.forEach((card) => {
    card.querySelectorAll('a[href]').forEach((link) => {
      const destination = new URL(link.getAttribute('href'), window.location.href);
      destination.searchParams.set('from', filter);
      link.href = destination.href;
    });
  });

  projectCards.forEach((card) => {
    card.hidden = filter !== 'all' && card.dataset.category !== filter;
  });
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    applyFilter(button.dataset.filter);
  });
});

applyFilter(new URLSearchParams(window.location.search).get('category') || 'all');
