// Navbar scroll state
const navbar = document.getElementById('navbar');
const scrollBug = document.getElementById('scrollBug');
let previousScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
  if (scrollBug) {
    const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    const progress = Math.min(window.scrollY / maxScroll, 1);
    const isMovingDown = window.scrollY >= previousScrollY;
    if (window.scrollY > 90) {
      scrollBug.classList.add('is-visible');
      scrollBug.classList.toggle('is-reversing', !isMovingDown);
      scrollBug.style.left = `${5 + progress * 82}%`;
      scrollBug.style.top = `${18 + progress * 58}%`;
    } else {
      scrollBug.classList.remove('is-visible');
    }
    previousScrollY = window.scrollY;
  }
}, { passive: true });

// Micro-simulação de incidente: uma demonstração rápida do impacto de encontrar
// um produto quebrado. Aparece na entrada e aguarda a recuperação automática.
const incidentDemo = document.getElementById('incidentDemo');
const incidentContinue = document.getElementById('incidentContinue');
const incidentTitle = document.getElementById('incidentTitle');
const incidentMessage = document.getElementById('incidentMessage');
const incidentReveal = document.getElementById('incidentReveal');

if (incidentDemo) {
  let incidentTimer;

  const finishIncident = () => {
    clearTimeout(incidentTimer);
    incidentDemo.classList.add('incident-demo--revealed');
    const isEnglish = document.documentElement.lang === 'en';
    incidentTitle.textContent = isEnglish ? 'You are in.' : 'Agora você entrou.';
    incidentMessage.textContent = isEnglish ? 'The page recovered. No data was lost.' : 'A página se recuperou. Nenhum dado foi perdido.';
    incidentContinue.textContent = isEnglish ? 'Go to portfolio' : 'Ir para o site';
    incidentContinue.hidden = false;
    incidentReveal.classList.add('is-visible');
    incidentContinue.focus();
  };

  const closeIncident = () => {
    clearTimeout(incidentTimer);
    document.body.classList.remove('incident-open');
    incidentDemo.classList.add('is-closing');
    window.setTimeout(() => incidentDemo.remove(), 260);
  };

  incidentDemo.hidden = false;
  document.body.classList.add('incident-open');
  incidentTimer = window.setTimeout(finishIncident, 4000);
  incidentContinue.addEventListener('click', closeIncident);
  incidentDemo.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeIncident();
  });
}

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
});

// Close mobile nav on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', false);
  });
});

// Scroll-reveal (Intersection Observer — no external lib)
const revealEls = document.querySelectorAll(
  '.card, .diff-card, .projeto-card, .tag, .contact-link'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity    = '1';
      entry.target.style.transform  = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach((el, i) => {
  el.style.opacity    = '0';
  el.style.transform  = 'translateY(22px)';
  el.style.transition = `opacity .4s ease ${i * 0.035}s, transform .4s ease ${i * 0.035}s`;
  observer.observe(el);
});
