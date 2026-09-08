// assets/components/header.js
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('footer-container');
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


  container.innerHTML = `
    <footer class="site-footer">
      <div class="footer-content">
        <p class="footer-tagline">Fareless - built for people who take more than one way to work.</p>
        <p class="footer-tagline">Want to Beta Test or become a Dev? Join the waitlist for updates.</p>
        <p class="footer-copyright">&copy; ${new Date().getFullYear()} Fareless. All rights reserved.</p>
      </div>

      <ul>
        <li><a href="${pathPrefix}/pages/terms-and-conditions/">Terms and Conditions</a></li>
        <li><a href="${pathPrefix}/pages/privacy-notice/">Privacy Notice</a></li>
      </ul>
      
    </footer>
  `;
});
