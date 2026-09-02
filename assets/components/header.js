// assets/components/header.js
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('header-container');
  if (!container) return;
  
  // --- AUTOMATIC PATH CALCULATION ---
  // 1. Get container attribute if defined, otherwise calculate automatically
  // Handles relative routing when nested in subfolders
 let pathPrefix = container.dataset.pathPrefix;

  if (pathPrefix === undefined) {
    // Determine depth by counting directories inside pathname
    const pathSegments = window.location.pathname.split('/').filter(Boolean);
    
    // Check if hosted on GitHub Pages Project site (username.github.io/repo-name/)
    const isGitHubPages = window.location.hostname.endsWith('github.io');
    
    // Ignore repo name in segment count if on GH Pages
    const relevantSegments = isGitHubPages ? pathSegments.slice(1) : pathSegments;
    
    // Exclude 'index.html' if present at the end of URL
    if (relevantSegments.length > 0 && relevantSegments[relevantSegments.length - 1].includes('.')) {
      relevantSegments.pop();
    }

    // Number of steps back to root (e.g. pages/travel_calculator = 2 steps = ../../)
    const depth = relevantSegments.length;
    pathPrefix = depth > 0 ? '../'.repeat(depth) : './';
  }

  // 1. Inject Header HTML Markup
  container.innerHTML = `
    <header>
      <div class="logo">
        <a href="https://fareless.app" class="logo-link">
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

  // 2. Attach Self-Contained Menu Interactivity
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const dropdownMenu = document.getElementById('dropdown-menu');

  if (!hamburgerBtn || !dropdownMenu) return;

  function closeMenu() {
    hamburgerBtn.classList.remove('open');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    dropdownMenu.classList.remove('show');
  }

  // Toggle dropdown menu
  hamburgerBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = dropdownMenu.classList.toggle('show');
    hamburgerBtn.classList.toggle('open', isOpen);
    hamburgerBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Close when clicking outside menu wrapper
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.menu-wrap')) closeMenu();
  });

  // Close when pressing Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
});
