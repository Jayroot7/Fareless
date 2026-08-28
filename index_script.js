import { createClient } from 'https://esm.sh/@supabase/supabase-js'

const supabaseUrl = 'https://tjtccacswjvmpcsczosd.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqdGNjYWNzd2p2bXBjc2N6b3NkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYxMzA5NzYsImV4cCI6MjEwMTcwNjk3Nn0.VhF0imXq1wQ0kpJnI9w1rwJeMkKmlmjQeC25W31vbtc'
const supabase = createClient(supabaseUrl, supabaseKey)

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

form.addEventListener('submit', async function(e){
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
  submitBtn.disabled = true;
  submitBtn.textContent = "Joining...";
  msg.textContent = '';
  msg.className = 'form-msg';

  const { error } = await supabase
    .from('waitlist_signups')
    .insert({ email: value, source: 'landing_page' });

  if (error) {
    emailInput.disabled = false;
    submitBtn.disabled = false;
    submitBtn.textContent = "Notify me";

    // Unique constraint violation = already signed up, treat as a soft success
    if (error.code === '23505') {
      msg.textContent = "You're already on the list — we'll be in touch!";
      msg.className = 'form-msg success';
      submitBtn.textContent = "You're on the list ✓";
      submitBtn.disabled = true;
      return;
    }

    msg.textContent = "Something went wrong — please try again.";
    msg.className = 'form-msg error';
    return;
  }

  submitBtn.textContent = "You're on the list ✓";
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
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu() })
