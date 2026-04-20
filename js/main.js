/* ============================================================
   ASTRO TAROT — main.js
   Include this on every page:
   <script src="js/main.js"></script>  (root)
   <script src="../../js/main.js"></script>  (subpages)
   ============================================================ */

/* ── STARFIELD CANVAS ── */
(function initStars() {
  const canvas = document.getElementById('stars-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let stars = [];

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function build() {
    stars = [];
    for (let i = 0; i < 240; i++) {
      stars.push({
        x:     Math.random() * canvas.width,
        y:     Math.random() * canvas.height,
        r:     Math.random() * 1.4 + 0.2,
        speed: Math.random() * 0.008 + 0.003,
        phase: Math.random() * Math.PI * 2,
      });
    }
  }

  function draw(t) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(s => {
      const a = 0.3 + 0.7 * Math.abs(Math.sin(s.phase + t * s.speed));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,250,230,${a})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  resize(); build(); requestAnimationFrame(draw);
  window.addEventListener('resize', () => { resize(); build(); });
})();

/* ── FLOATING PARTICLES ── */
(function initParticles() {
  function spawn() {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 4 + 2;
    p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random() * 100}vw;
      background:${Math.random() > 0.5 ? '#d4a843' : '#c084fc'};
      animation-duration:${Math.random() * 12 + 8}s;
      animation-delay:${Math.random() * 4}s;
    `;
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 20000);
  }
  setInterval(spawn, 1800);
})();

/* ── SCROLL REVEAL ── */
(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.12 });
  els.forEach(el => obs.observe(el));
})();

/* ── MOBILE NAV TOGGLE ── */
(function initNav() {
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.site-nav .nav-links');
  if (!toggle || !links) return;
  toggle.addEventListener('click', () => links.classList.toggle('open'));
  // Close on link click
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => links.classList.remove('open'));
  });
})();

/* ── ACTIVE NAV LINK ── */
(function highlightNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.site-nav .nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href && href.split('#')[0] === path) a.classList.add('active');
  });
})();
