const filterButtons = document.querySelectorAll('.filter-button');
const projectCards = document.querySelectorAll('.project-card');

function applyFilter(filter) {
  filterButtons.forEach((button) => {
    const active = button.dataset.filter === filter;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
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

applyFilter('all');
