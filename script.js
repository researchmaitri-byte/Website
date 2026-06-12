const hdr = document.getElementById('hdr');
window.addEventListener('scroll', function () {
  hdr.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

// ── Mobile menu ──────────────────────────────────────────────────────
const mob = document.getElementById('mob');
function openMob()  { mob.classList.add('open'); requestAnimationFrame(function(){ mob.classList.add('visible'); }); }
function closeMob() { mob.classList.remove('visible'); setTimeout(function(){ mob.classList.remove('open'); }, 200); }
document.getElementById('ham').addEventListener('click', openMob);
document.getElementById('mobX').addEventListener('click', closeMob);

// ── Hero stat count-up ───────────────────────────────────────────────
function countUp(el) {
  var target = parseInt(el.dataset.count);
  var sfx    = el.dataset.sfx || '';
  var dur    = 950;
  var t0     = performance.now();
  function tick(now) {
    var p = Math.min((now - t0) / dur, 1);
    var e = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.floor(e * target) + sfx;
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
setTimeout(function () {
  document.querySelectorAll('.hm-num[data-count]').forEach(countUp);
}, 900);

// ── Scroll reveal ─────────────────────────────────────────────────────
var revealObs = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) {
    if (e.isIntersecting) { e.target.classList.add('in'); revealObs.unobserve(e.target); }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });
document.querySelectorAll('.fi, .fi-l, .fi-r').forEach(function(el){ revealObs.observe(el); });

// ── Service grid stagger ─────────────────────────────────────────────
document.querySelectorAll('.svc-grid').forEach(function(grid) {
  var svcs = Array.from(grid.querySelectorAll('.svc'));
  var obs = new IntersectionObserver(function(entries) {
    if (!entries[0].isIntersecting) return;
    svcs.forEach(function(svc, i) {
      svc.style.transitionDelay = (i * 0.07) + 's';
      svc.classList.add('in');
      setTimeout(function(){ svc.style.transitionDelay = '0s'; }, i * 70 + 420);
    });
    obs.unobserve(grid);
  }, { threshold: 0.1 });
  obs.observe(grid);
});

// ── Category heading line-draw ───────────────────────────────────────
document.querySelectorAll('.cat-head').forEach(function(head) {
  var obs = new IntersectionObserver(function(entries) {
    if (entries[0].isIntersecting) { head.classList.add('drawn'); obs.unobserve(head); }
  }, { threshold: 0.8 });
  obs.observe(head);
});

// ── Feature list stagger ─────────────────────────────────────────────
document.querySelectorAll('.feat-list').forEach(function(list) {
  var items = Array.from(list.querySelectorAll('li'));
  var obs = new IntersectionObserver(function(entries) {
    if (!entries[0].isIntersecting) return;
    items.forEach(function(li, i){ setTimeout(function(){ li.classList.add('in'); }, i * 80); });
    obs.unobserve(list);
  }, { threshold: 0.2 });
  obs.observe(list);
});

// ── Form submit ──────────────────────────────────────────────────────
document.getElementById('cbForm').addEventListener('submit', function(e) {
  e.preventDefault();
  var btn = document.getElementById('fBtn');
  btn.textContent = 'Sending\u2026';
  btn.disabled = true;
  setTimeout(function() {
    document.getElementById('formWrap').style.display = 'none';
    document.getElementById('formOk').classList.add('show');
  }, 1100);
});