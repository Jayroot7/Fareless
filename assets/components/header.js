// assets/components/header.js
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('header-container');
  if (!container) return;

  // 1. Calculate pathPrefix dynamically based on current folder depth
  const pathSegments = window.location.pathname.split('/').filter(Boolean);
  
  // Account for GitHub Pages repo name (e.g., username.github.io/repository-name/)
  const isGitHubPages = window.location.hostname.endsWith('github.io');
  const relevantSegments = isGitHubPages ? pathSegments.slice(1) : pathSegments;
  
  // Ignore 'index.html' if it's explicitly in the address bar
  if (relevantSegments.length > 0 && relevantSegments[relevantSegments.length - 1].includes('.')) {
    relevantSegments.pop();
  }

  // Count remaining folders: 0 depth = './', 1 depth = '../', 2 depth = '../../', etc.
  const depth = relevantSegments.length;
  const pathPrefix = depth > 0 ? '../'.repeat(depth) : './';

  // 2. Inject Header HTML
  container.innerHTML = `
    <header>
      <div class="logo">
        <a href="${pathPrefix}index.html" class="logo-link">
          <span class="dot"></span>Fareless
        </a>
      </div>

      <div class="header-right">
        <div class="menu-wrap">
          <button class="hamburger-btn" id="hamburger-btn" aria-label="Open menu" aria-expanded="false">
            <span></span>
            <span></span>
            <span></span>
          </button>
          <nav class="dropdown-menu" id="dropdown-menu">
            <a href="${pathPrefix}pages/travel_calculator/">Tourist Calculator</a>
            <a href="${pathPrefix}pages/travel_info/">Travel Tips</a>
            <div class="divider-line"></div>
            <a href="${pathPrefix}pages/login/">Portal Login</a>
          </nav>
        </div>
      </div>
    </header>
  `;

  // 3. Hamburger Interactivity
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const dropdownMenu = document.getElementById('dropdown-menu');

  if (!hamburgerBtn || !dropdownMenu) return;

  function closeMenu() {
    hamburgerBtn.classList.remove('open');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    dropdownMenu.classList.remove('show');
  }

  hamburgerBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = dropdownMenu.classList.toggle('show');
    hamburgerBtn.classList.toggle('open', isOpen);
    hamburgerBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.menu-wrap')) closeMenu();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
});
