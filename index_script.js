// Animated waitlist counter
const counterEl = document.getElementById('counter');
const target = 1247;
let current = 0;
const duration = 1800;
const startTime = performance.now();

function animateCounter(now){
  const progress = Math.min((now - startTime) / duration, 1);
  const eased = 1 - Math.pow(1 - progress, 3);
  current = Math.floor(eased * target);
  counterEl.textContent = current.toLocaleString();
  if (progress < 1) requestAnimationFrame(animateCounter);
}
requestAnimationFrame(animateCounter);

// Email signup form
const form = document.getElementById('signup-form');
const emailInput = document.getElementById('email');
const submitBtn = document.getElementById('submit-btn');
const msg = document.getElementById('form-msg');
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

form.addEventListener('submit', function(e){
  e.preventDefault();
  const value = emailInput.value.trim();

  if (!emailPattern.test(value)) {
    emailInput.classList.remove('error');
    void emailInput.offsetWidth; // restart animation
    emailInput.classList.add('error');
    msg.textContent = "That doesn't look like a valid email — try again.";
    msg.className = 'form-msg error';
    return;
  }

  emailInput.classList.remove('error');
  emailInput.disabled = true;
  submitBtn.textContent = "You're on the list ✓";
  submitBtn.disabled = true;
  msg.textContent = "We'll email " + value + " the moment Fareless opens.";
  msg.className = 'form-msg success';

  // Bump the waitlist counter by one
  const bumped = current + 1;
  counterEl.textContent = bumped.toLocaleString();
});

emailInput.addEventListener('input', function(){
  emailInput.classList.remove('error');
  msg.textContent = '';
});

// Store badges aren't live yet — show a quick tooltip instead of going nowhere
document.querySelectorAll('.store-badge').forEach(function(badge){
  let hideTimer;
  badge.addEventListener('click', function(e){
    e.preventDefault();
    badge.classList.add('show-tip');
    clearTimeout(hideTimer);
    hideTimer = setTimeout(function(){ badge.classList.remove('show-tip'); }, 1800);
  });
});

// ---------- Auth guard ----------
async function initAuth() {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    window.location.href = 'login.html'
    return null
  }
  return session.user
}

function renderUserPill(user) {
  const pill = document.getElementById('user-pill')
  const emailEl = document.getElementById('user-email')
  const avatarEl = document.getElementById('user-avatar')
  const email = user.email || 'Account'
  emailEl.textContent = email
  avatarEl.textContent = email.charAt(0).toUpperCase()
  pill.style.display = 'flex'
}


// ---------- Hamburger menu ----------
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

document.getElementById('logout-btn').addEventListener('click', async () => {
  await supabase.auth.signOut()
  window.location.href = 'login.html'
});
