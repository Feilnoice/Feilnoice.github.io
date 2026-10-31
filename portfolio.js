const buttons = [...document.querySelectorAll('.filter-button')];
const projects = [...document.querySelectorAll('.portfolio-project')];
const links = [...document.querySelectorAll('.project-index a')];
let visible = projects;
let scheduled = false;
function markCurrent() {
  scheduled = false;
  if (!visible.length) return;
  const threshold = document.querySelector('.filter-row').getBoundingClientRect().bottom + 24;
  let current = visible[0];
  for (const project of visible) {
    if (project.getBoundingClientRect().top <= threshold) current = project;
    else break;
  }
  if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) current = visible.at(-1);
  for (const link of links) {
    if (link.dataset.project === current.id) {
      const changed = !link.hasAttribute('aria-current');
      link.setAttribute('aria-current', 'location');
      if (changed) {
        const index = link.parentElement;
        if (link.offsetTop < index.scrollTop) index.scrollTop = link.offsetTop;
        else if (link.offsetTop + link.offsetHeight > index.scrollTop + index.clientHeight) index.scrollTop = link.offsetTop + link.offsetHeight - index.clientHeight + 16;
      }
    }
    else link.removeAttribute('aria-current');
  }
}
function applyFilter(filter, updateURL = false) {
  if (!buttons.some(button => button.dataset.filter === filter)) filter = 'all';
  for (const button of buttons) {
    const active = button.dataset.filter === filter;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  }
  for (const element of [...projects, ...links]) element.hidden = filter !== 'all' && element.dataset.category !== filter;
  visible = projects.filter(project => !project.hidden);
  if (updateURL) {
    const url = new URL(location.href);
    url.searchParams.set('category', filter);
    url.hash = 'portfolio';
    history.pushState(null, '', url);
    document.querySelector('#portfolio').scrollIntoView({behavior:'instant'});
  }
  markCurrent();
}
buttons.forEach(button => button.addEventListener('click', () => applyFilter(button.dataset.filter, true)));
window.addEventListener('scroll', () => {
  if (!scheduled) { scheduled = true; requestAnimationFrame(markCurrent); }
}, {passive:true});
window.addEventListener('resize', markCurrent);
window.addEventListener('popstate', () => applyFilter(new URLSearchParams(location.search).get('category') || 'all'));
document.querySelector('.project-stream').addEventListener('load', markCurrent, true);
applyFilter(new URLSearchParams(location.search).get('category') || 'all');
const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
if (target && target.classList.contains('portfolio-project') && target.hidden) applyFilter(target.dataset.category);
