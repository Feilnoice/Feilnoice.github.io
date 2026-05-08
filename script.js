const yearNode = document.getElementById("year");
const tabLinks = document.querySelectorAll(".tab-link");
const tabPanels = document.querySelectorAll(".tab-panel");
const filterChips = document.querySelectorAll(".filter-chip");
const portfolioCards = document.querySelectorAll(".portfolio-card");

if (yearNode) {
  yearNode.textContent = String(new Date().getFullYear());
}

function setActiveTab(target) {
  tabLinks.forEach((tab) => {
    const active = tab.dataset.tabTarget === target;
    tab.classList.toggle("is-active", active);
    tab.setAttribute("aria-selected", String(active));
    tab.tabIndex = active ? 0 : -1;
  });

  tabPanels.forEach((panel) => {
    const active = panel.dataset.tabPanel === target;
    panel.classList.toggle("is-active", active);
    panel.hidden = !active;
  });

  const nextHash = `#${target}`;
  if (window.location.hash !== nextHash) {
    history.replaceState(null, "", nextHash);
  }
}

function setActiveFilter(filter) {
  filterChips.forEach((chip) => {
    chip.classList.toggle("is-active", chip.dataset.filter === filter);
  });

  portfolioCards.forEach((card) => {
    const visible = filter === "all" || card.dataset.category === filter;
    card.hidden = !visible;
  });
}

function syncTabFromHash() {
  const hashTab = window.location.hash.replace("#", "");
  const hasHashMatch = Array.from(tabLinks).some((tab) => tab.dataset.tabTarget === hashTab);

  if (hasHashMatch) {
    setActiveTab(hashTab);
  }
}

tabLinks.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    setActiveTab(tab.dataset.tabTarget);
  });

  tab.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") {
      return;
    }

    event.preventDefault();
    const move = event.key === "ArrowRight" ? 1 : -1;
    const nextIndex = (index + move + tabLinks.length) % tabLinks.length;
    const nextTab = tabLinks[nextIndex];
    nextTab.focus();
    setActiveTab(nextTab.dataset.tabTarget);
  });
});

filterChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    setActiveFilter(chip.dataset.filter);
  });
});

window.addEventListener("hashchange", syncTabFromHash);

if (window.location.hash) {
  syncTabFromHash();
}

const activeFromMarkup = document.querySelector(".tab-link.is-active")?.dataset.tabTarget || "portfolio";
setActiveTab(activeFromMarkup);

setActiveFilter("all");
