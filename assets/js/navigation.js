// ---------- Hamburger Navigation Dropdown Menu ----------
const hamburgerBtn = document.getElementById('hamburger-btn')
const dropdownMenu = document.getElementById('dropdown-menu')
function closeMenu() {
  hamburgerBtn.classList.remove('open')
  hamburgerBtn.setAttribute('aria-expanded', 'false')
  dropdownMenu.classList.remove('show')
}
hamburgerBtn.addEventListener('click', (e) => {
  e.stopPropagation()
  const isOpen = dropdownMenu.classList.toggle('show')
  hamburgerBtn.classList.toggle('open', isOpen)
  hamburgerBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false')
})
document.addEventListener('click', (e) => { if (!e.target.closest('.menu-wrap')) closeMenu() })
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu() })
