/* DJ Welker — shared site behaviour. Loaded deferred on every page. */
(function () {
  'use strict';
  var d = document, b = d.body;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Proof Mode (remembers your choice) ---------- */
  var proofBtn = d.getElementById('proofBtn');
  function setProof(on) {
    b.classList.toggle('proof', on);
    if (proofBtn) proofBtn.setAttribute('aria-pressed', on ? 'true' : 'false');
    try { localStorage.setItem('dj-proof', on ? '1' : '0'); } catch (e) {}
  }
  if (proofBtn) {
    var saved = '0';
    try { saved = localStorage.getItem('dj-proof') || '0'; } catch (e) {}
    if (saved === '1') setProof(true);
    proofBtn.addEventListener('click', function () { setProof(!b.classList.contains('proof')); });
    // keyboard shortcut: P (ignored while typing)
    d.addEventListener('keydown', function (e) {
      var t = e.target || {};
      var typing = /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName || '') || t.isContentEditable;
      if (!typing && !e.metaKey && !e.ctrlKey && !e.altKey && (e.key === 'p' || e.key === 'P')) {
        e.preventDefault(); setProof(!b.classList.contains('proof'));
      }
    });
  }

  /* ---------- Mobile navigation ---------- */
  var toggle = d.getElementById('navToggle'), links = d.getElementById('navLinks');
  function closeNav() {
    if (!toggle || !links) return;
    links.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); b.classList.remove('nav-open');
  }
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      b.classList.toggle('nav-open', open);
    });
    links.addEventListener('click', function (e) { if (e.target.tagName === 'A') closeNav(); });
    d.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeNav(); });
    window.addEventListener('resize', function () { if (window.innerWidth > 900) closeNav(); });
  }

  /* ---------- Back to top ---------- */
  var top = d.getElementById('toTop');
  if (top) {
    var onScroll = function () { top.classList.toggle('show', window.scrollY > 700); };
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
    top.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
      var brand = d.querySelector('.brand'); if (brand) brand.focus({ preventScroll: true });
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealables = d.querySelectorAll('.reveal');
  if (revealables.length) {
    if (reduce || !('IntersectionObserver' in window)) {
      revealables.forEach(function (el) { el.classList.add('in'); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      revealables.forEach(function (el) { io.observe(el); });
    }
  }

  /* ---------- Harden external links ---------- */
  d.querySelectorAll('a[href^="http"]').forEach(function (a) {
    if (a.hostname && a.hostname !== location.hostname) {
      a.setAttribute('rel', 'noopener noreferrer');
      if (!a.hasAttribute('target')) a.setAttribute('target', '_blank');
    }
  });

  /* ---------- Copy-to-clipboard buttons ---------- */
  d.querySelectorAll('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var val = btn.getAttribute('data-copy'), done = function () {
        var old = btn.textContent; btn.textContent = 'Copied';
        setTimeout(function () { btn.textContent = old; }, 1400);
      };
      if (navigator.clipboard) { navigator.clipboard.writeText(val).then(done, done); } else { done(); }
    });
  });

  /* ---------- Current year in footers ---------- */
  d.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
