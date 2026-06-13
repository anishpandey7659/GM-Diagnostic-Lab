/* =========================================
   GM DIAGNOSTIC LAB — CORE SCRIPTS
   ========================================= */

/* ---------- Sticky Navbar ---------- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

/* ---------- Mobile Menu ---------- */
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');
mobileToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const icon = mobileToggle.querySelector('i');
  icon.classList.toggle('fa-bars');
  icon.classList.toggle('fa-times');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const icon = mobileToggle.querySelector('i');
    icon.classList.add('fa-bars');
    icon.classList.remove('fa-times');
  });
});

/* ---------- Active Link on Scroll ---------- */
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.pageYOffset;
  sections.forEach(sec => {
    const top = sec.offsetTop - 140;
    const height = sec.offsetHeight;
    const id = sec.getAttribute('id');
    const link = document.querySelector('.nav-links a[href="#' + id + '"]');
    if (link) {
      if (scrollY >= top && scrollY < top + height) {
        document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
});

/* ---------- Scroll Reveal ---------- */
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('active'), i * 60);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObserver.observe(el));

/* ---------- Counter Animation ---------- */
const counters = document.querySelectorAll('.stat-num span');
const animateCounter = (el) => {
  const target = +el.dataset.target;
  const suffix = el.dataset.suffix || '';
  const duration = 1800;
  const startTime = performance.now();
  const step = (now) => {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.floor(eased * target);
    el.textContent = value.toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target.toLocaleString() + suffix;
  };
  requestAnimationFrame(step);
};
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
counters.forEach(c => counterObserver.observe(c));

/* ---------- FAQ Accordion ---------- */
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const answer = item.querySelector('.faq-answer');
    const isActive = item.classList.contains('active');

    document.querySelectorAll('.faq-item').forEach(faq => {
      faq.classList.remove('active');
      faq.querySelector('.faq-answer').style.maxHeight = null;
    });

    if (!isActive) {
      item.classList.add('active');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});
// init open state
document.querySelectorAll('.faq-item.active').forEach(item => {
  const answer = item.querySelector('.faq-answer');
  answer.style.maxHeight = answer.scrollHeight + 'px';
});

/* ---------- Testimonial Slider ---------- */
const track = document.getElementById('testimonialTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let slideIndex = 0;
const getVisibleCount = () => window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;
const updateSlider = () => {
  const cards = track.querySelectorAll('.testimonial-card');
  const totalSlides = cards.length - getVisibleCount() + 1;
  if (slideIndex < 0) slideIndex = totalSlides - 1;
  if (slideIndex > totalSlides - 1) slideIndex = 0;
  const cardWidth = cards[0].offsetWidth + 28;
  track.style.transform = `translateX(-${slideIndex * cardWidth}px)`;
};
prevBtn.addEventListener('click', () => { slideIndex--; updateSlider(); });
nextBtn.addEventListener('click', () => { slideIndex++; updateSlider(); });
window.addEventListener('resize', updateSlider);
setInterval(() => { slideIndex++; updateSlider(); }, 6000);

/* ---------- Back to Top ---------- */
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 500) backToTop.classList.add('visible');
  else backToTop.classList.remove('visible');
});
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ---------- Search Handler ---------- */
function handleSearch() {
  const query = document.getElementById('searchInput').value.trim();
  if (!query) {
    document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
    return;
  }
  const match = [...document.querySelectorAll('.service-card h3, .package-card h3, .doctor-info h4')]
    .find(el => el.textContent.toLowerCase().includes(query.toLowerCase()));
  if (match) {
    match.scrollIntoView({ behavior: 'smooth', block: 'center' });
  } else {
    alert('No results found for: ' + query);
  }
}

/* ---------- Smooth scroll for all anchor links ---------- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 90;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    }
  });
});



// const revealObserver = new IntersectionObserver((entries) => {
//   entries.forEach((entry, i) => {
//     if (entry.isIntersecting) {
//       setTimeout(() => entry.target.classList.add('active'), i * 60);
//       revealObserver.unobserve(entry.target);
//     }
//   });
// }, { threshold: 0.05 }); // ← was 0.12