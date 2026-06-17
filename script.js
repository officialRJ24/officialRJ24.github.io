$ cat > ~/script.js << 'ENDJS'
/* ============================================
   RJ24 — script.js
   Handles: nav scroll, mobile menu, reveal,
   currency modal, lead form, bar animation,
   stat counters, discount badge
   ============================================ */

/* ── NAV SCROLL ── */
window.addEventListener('scroll', function () {
  document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 20);
});

/* ── SMOOTH SCROLL ── */
function scrollTo(id) {
  var el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ── MOBILE MENU ── */
function toggleMenu() {
  var menu = document.getElementById('mob-menu');
  if (!menu) return;
  menu.classList.toggle('open');
  document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
}

/* ── SCROLL REVEAL ── */
var revealObs = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(function (el) {
  revealObs.observe(el);
});

/* ── MOCKUP BAR ANIMATION ── */
var barObs = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.m-bar-fill').forEach(function (bar) {
        var target = bar.getAttribute('style').match(/width:(\d+%)/);
        if (target) {
          bar.style.width = '0';
          setTimeout(function () { bar.style.width = target[1]; }, 300);
        }
      });
      barObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

var mockup = document.querySelector('.mockup');
if (mockup) barObs.observe(mockup);

/* ── STAT COUNTER ANIMATION ── */
function animateCounter(el, target, suffix) {
  var start = 0;
  var duration = 1600;
  var step = target / (duration / 16);
  var timer = setInterval(function () {
    start += step;
    if (start >= target) { start = target; clearInterval(timer); }
    el.textContent = Math.floor(start) + (suffix || '');
  }, 16);
}

var statObs = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      var nums = entry.target.querySelectorAll('.stat-num[data-count]');
      nums.forEach(function (el) {
        var target = parseInt(el.getAttribute('data-count'), 10);
        var suffix = el.getAttribute('data-suffix') || '';
        animateCounter(el, target, suffix);
      });
      statObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

var statsRow = document.querySelector('.hero-stats');
if (statsRow) statObs.observe(statsRow);

/* ── DISCOUNT BADGE ON HOVER ── */
var getBtn = document.getElementById('get-btn');
var badge  = document.getElementById('discount-badge');
if (getBtn && badge) {
  getBtn.addEventListener('mouseenter', function () { badge.style.display = 'inline-block'; });
  getBtn.addEventListener('mouseleave', function () { badge.style.display = 'none'; });
}

/* ── CURRENCY MODAL ── */
function openCurrencyModal() {
  var modal = document.getElementById('currency-modal');
  if (!modal) return;
  modal.style.display = 'flex';
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  var closeBtn = modal.querySelector('[data-close]');
  if (closeBtn) closeBtn.focus();
}

function closeCurrencyModal() {
  var modal = document.getElementById('currency-modal');
  if (!modal) return;
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function pay(currency) {
  closeCurrencyModal();
  if (currency === 'INR') {
    var upiLink = 'upi://pay?pa=rajt66679-1@oksbi&pn=RJ24+Health&am=249&cu=INR&tn=Cycle+Calm+by+RJ24';
    window.location.href = upiLink;
  } else if (currency === 'USD') {
    window.open('https://rzp.io/rzp/cyclecalm-usd', '_blank');
  } else if (currency === 'GBP') {
    window.open('https://rzp.io/rzp/cyclecalm-gbp', '_blank');
  } else if (currency === 'EUR') {
    window.open('https://rzp.io/rzp/cyclecalm-eur', '_blank');
  }
}

/* INR panel toggle */
function toggleINR() {
  var panel = document.getElementById('inr-panel');
  if (panel) panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
}

/* Close modal on backdrop click */
var currencyModal = document.getElementById('currency-modal');
if (currencyModal) {
  currencyModal.addEventListener('click', function (e) {
    if (e.target === currencyModal) closeCurrencyModal();
  });
}

/* Close modal on Escape */
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && currencyModal && currencyModal.style.display === 'flex') {
    closeCurrencyModal();
  }
});

/* ── LEAD FORM ── */
function submitLead(e) {
  e.preventDefault();
  var name  = document.getElementById('lead-name').value.trim();
  var email = document.getElementById('lead-email').value.trim();
  if (!name || !email) return;
  /* TODO: wire to your email service (Mailchimp, ConvertKit, etc.) */
  console.log('Lead:', name, email);
  document.querySelector('.lead-form').style.display = 'none';
  document.getElementById('lead-success').style.display = 'block';
}
ENDJS
echo "script.js written"
script.js written