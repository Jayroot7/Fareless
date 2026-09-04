document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('footer-container');
  if (!container) return;

  // Uses data-path-prefix for relative link handling if footer links are added later
  const pathPrefix = container.dataset.pathPrefix || '';

  container.innerHTML = `
    <footer class="site-footer">
      <div class="footer-content">
        <p class="footer-tagline">Fareless - built for people who take more than one way to work.</p>
        <p class="footer-tagline">Want to Beta Test or become a Dev? Join the waitlist for updates.</p>
        <p class="footer-copyright">&copy; ${new Date().getFullYear()} Fareless. All rights reserved.</p>
      </div>
    </footer>
  `;
});
