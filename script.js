'use strict';
/* ════════════════════════════════════════
   PARAG PATEL CYBER — script.js v4.2
   Final: sRGB · physicalLights · float
   · smooth pulse · IO 0.2 · particle glow
════════════════════════════════════════ */

/* ── HELPERS ── */
const $ = id => document.getElementById(id);
const isMobile = () => innerWidth < 600;

/* ── DEBOUNCE / RAF-THROTTLE ── */
function rafThrottle(fn) {
  let raf = false;
  return function (...args) { if (raf) return; raf = true; requestAnimationFrame(() => { fn.apply(this, args); raf = false; }); };
}

/* ── LOADER ── */
const LLINES = [
  { t: '<span class="tp">$</span> sudo init paragpatelcyber.com --secure', d: 0 },
  { t: '<span style="color:#555">[sudo] password: ••••••••</span>', d: 350 },
  { t: '<span style="color:var(--ng)">✓</span> Authentication passed. Welcome, Parag.', d: 700 },
  { t: '<span class="tp">$</span> loading modules...', d: 1050 },
  { t: '<span style="color:#555">  → encryption engine............OK</span>', d: 1350 },
  { t: '<span style="color:#555">  → steganography detector.......OK</span>', d: 1600 },
  { t: '<span style="color:#555">  → SOC threat monitor...........OK</span>', d: 1850 },
  { t: '<span style="color:#555">  → digital forensics suite......OK</span>', d: 2100 },
  { t: '<span style="color:var(--nb)">→ All systems nominal. Launching portfolio...</span>', d: 2400 },
];
const llEl = $('ll');
LLINES.forEach(({ t, d }) => setTimeout(() => { const el = document.createElement('div'); el.className = 'tl2'; el.innerHTML = t; llEl.appendChild(el); }, d));
let lp = 0;
const lpEl = $('lp'), lbfEl = $('lbf');
const li = setInterval(() => { lp = Math.min(lp + 1, 100); lbfEl.style.width = lp + '%'; lpEl.textContent = lp + '%'; if (lp >= 100) clearInterval(li); }, 30);
setTimeout(() => $('loader').classList.add('out'), 3200);

/* ── CURSOR (desktop only) ── */
const cur = $('cur'), curR = $('cur-ring');
if (!isMobile()) {
  let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; }, { passive: true });
  (function animCursor() {
    rx += (mx - rx) * .18; ry += (my - ry) * .18;
    cur.style.cssText += `;left:${mx}px;top:${my}px`;
    curR.style.cssText += `;left:${rx}px;top:${ry}px`;
    requestAnimationFrame(animCursor);
  })();
  document.querySelectorAll('a,button,.btn,.pc-card,.sc,.rc,.chip,.tcmd,.skcat,.showcase-chrome').forEach(el => {
    el.addEventListener('mouseenter', () => { cur.classList.add('big'); curR.classList.add('big'); }, { passive: true });
    el.addEventListener('mouseleave', () => { cur.classList.remove('big'); curR.classList.remove('big'); }, { passive: true });
  });
} else {
  // Hide custom cursor on mobile
  if (cur) cur.style.display = 'none';
  if (curR) curR.style.display = 'none';
  document.body.style.cursor = 'auto';
}

/* ── UNIFIED SCROLL HANDLER (single listener, rAF-throttled) ── */
const spEl = $('sp');
// Register all scroll-driven effects here — zero duplicate listeners
const _scrollCbs = [];
function registerScroll(fn) { _scrollCbs.push(fn); }
const _masterScroll = rafThrottle(() => _scrollCbs.forEach(fn => fn()));
window.addEventListener('scroll', _masterScroll, { passive: true });

// 1) Scroll progress bar + section reveal
registerScroll(function () {
  const tot = document.body.scrollHeight - innerHeight;
  if (tot > 0) spEl.style.width = (scrollY / tot * 100) + '%';
  document.querySelectorAll('.rv:not(.vis)').forEach(el => {
    if (el.getBoundingClientRect().top < innerHeight * .91) {
      el.classList.add('vis');
      el.querySelectorAll('.ski-fill').forEach(b => b.style.width = b.dataset.w + '%');
      el.querySelectorAll('[data-count]').forEach(c => {
        const target = +c.dataset.count, big = target > 100;
        let cv = big ? target - 60 : 0, step = big ? 60 / 40 : target / 40;
        const t = setInterval(() => { cv = Math.min(cv + step, target); c.textContent = Math.floor(cv) + (big ? '' : '+'); if (cv >= target) { c.textContent = target + (big ? '' : '+'); clearInterval(t); } }, 40);
      });
    }
  });
});
setTimeout(_masterScroll, 3400);

/* ── GRID CANVAS ── */
const gc = $('gc'), gctx = gc.getContext('2d');
function drawGrid() {
  gc.width = innerWidth; gc.height = innerHeight;
  gctx.clearRect(0, 0, gc.width, gc.height);
  gctx.strokeStyle = '#00d4ff'; gctx.lineWidth = .4;
  for (let x = 0; x < gc.width; x += 60) { gctx.beginPath(); gctx.moveTo(x, 0); gctx.lineTo(x, gc.height); gctx.stroke(); }
  for (let y = 0; y < gc.height; y += 60) { gctx.beginPath(); gctx.moveTo(0, y); gctx.lineTo(gc.width, y); gctx.stroke(); }
}
drawGrid();

/* ── PARTICLES ── */
const pc2 = $('pc'), pctx = pc2.getContext('2d');
pc2.width = innerWidth; pc2.height = innerHeight;
// Fewer particles on mobile for perf
const PART_COUNT = isMobile() ? 0 : 55;
const parts = Array.from({ length: PART_COUNT }, () => ({ x: Math.random() * pc2.width, y: Math.random() * pc2.height, vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35, r: Math.random() * 1.5 + .5, a: Math.random() }));
function animP() {
  pctx.clearRect(0, 0, pc2.width, pc2.height);
  parts.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0) p.x = pc2.width; if (p.x > pc2.width) p.x = 0;
    if (p.y < 0) p.y = pc2.height; if (p.y > pc2.height) p.y = 0;
    pctx.beginPath(); pctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    pctx.fillStyle = `rgba(0,212,255,${p.a * .5})`; pctx.fill();
  });
  for (let i = 0; i < parts.length; i++)for (let j = i + 1; j < parts.length; j++) {
    const dx = parts[i].x - parts[j].x, dy = parts[i].y - parts[j].y, d = Math.sqrt(dx * dx + dy * dy);
    if (d < 110) {
      pctx.beginPath(); pctx.moveTo(parts[i].x, parts[i].y); pctx.lineTo(parts[j].x, parts[j].y);
      pctx.strokeStyle = `rgba(0,212,255,${.12 * (1 - d / 110)})`; pctx.lineWidth = .5; pctx.stroke();
    }
  }
  requestAnimationFrame(animP);
}
animP();
window.addEventListener('resize', rafThrottle(() => { drawGrid(); pc2.width = innerWidth; pc2.height = innerHeight; }));

/* ── HAMBURGER / MOBILE MENU ── */
const hbg = $('hbg'), mm = $('mm'), bd = $('bd');
let scrollPos = 0;
function openM() {
  scrollPos = window.scrollY;
  hbg.classList.add('open'); mm.classList.add('open'); bd.classList.add('open');
  // Save scroll position and lock
  document.body.style.overflow = 'hidden';
  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollPos}px`;
  document.body.style.width = '100%';
}
function closeM() {
  hbg.classList.remove('open'); mm.classList.remove('open'); bd.classList.remove('open');
  document.body.style.overflow = '';
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = '';
  window.scrollTo(0, scrollPos);
}
hbg.addEventListener('click', () => hbg.classList.contains('open') ? closeM() : openM());
bd.addEventListener('click', closeM);
document.querySelectorAll('.mlink').forEach(a => a.addEventListener('click', closeM));
// Close on Escape
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeM(); });

/* ── TYPING ANIMATION ── */
const phrases = ['Cybersecurity Enthusiast', 'Future SOC Analyst', 'Ethical Hacker', 'Digital Forensics Learner', 'Cyber Defense Specialist', 'SOC Analyst in Progress', 'Building Real Security Systems'];
let pi = 0, ci = 0, del = false;
const typedEl = $('typed');
function typeLoop() {
  const ph = phrases[pi];
  if (!del && ci <= ph.length) { typedEl.textContent = ph.slice(0, ci++); setTimeout(typeLoop, 80); }
  else if (!del) { del = true; setTimeout(typeLoop, 2200); }
  else if (del && ci > 0) { typedEl.textContent = ph.slice(0, ci--); setTimeout(typeLoop, 38); }
  else { del = false; pi = (pi + 1) % phrases.length; setTimeout(typeLoop, 300); }
}
setTimeout(typeLoop, 3500);

/* ── THREE.JS CYBER GLOBE (final v4.2) ── */
(function initThreeGlobe() {
  const canvas = $('three-canvas');
  if (!canvas || isMobile()) { if (canvas) canvas.style.display = 'none'; return; }

  // three.min.js is loaded as a <script> in index.html before this file
  bootGlobe();

  function bootGlobe() {
    const W = 260, H = 260;
    canvas.width = W; canvas.height = H;
    canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
    canvas.style.pointerEvents = 'auto';

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);
    // ── Renderer quality flags ──
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.physicallyCorrectLights = true;
    renderer.shadowMap.enabled = false; // no shadows needed — saves GPU

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 3.2);

    // 2 lights only
    scene.add(new THREE.AmbientLight(0x003355, 3));
    const pBlue = new THREE.PointLight(0x00d4ff, 6, 10); pBlue.position.set(2, 2, 2); scene.add(pBlue);

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    const geo = new THREE.SphereGeometry(1, 32, 32);
    const coreMat = new THREE.MeshPhongMaterial({ color: 0x001428, emissive: 0x001020, shininess: 60, transparent: true, opacity: 0.95 });
    const core = new THREE.Mesh(geo, coreMat); globeGroup.add(core);

    const wireMat = new THREE.MeshBasicMaterial({ color: 0x00d4ff, wireframe: true, transparent: true, opacity: 0.18 });
    const wire = new THREE.Mesh(new THREE.SphereGeometry(1.002, 24, 24), wireMat); globeGroup.add(wire);

    const wire2Mat = new THREE.MeshBasicMaterial({ color: 0x00ff88, wireframe: true, transparent: true, opacity: 0.07 });
    const wire2 = new THREE.Mesh(new THREE.SphereGeometry(1.005, 12, 12), wire2Mat); globeGroup.add(wire2);

    // ── Neon Glow Ring ──
    const glowRing = new THREE.Mesh(
      new THREE.TorusGeometry(1.5, 0.03, 16, 100),
      new THREE.MeshBasicMaterial({ color: 0x00ff88, transparent: true, opacity: 0.15, blending: THREE.AdditiveBlending })
    );
    glowRing.rotation.x = Math.PI / 2;
    globeGroup.add(glowRing);

    function makeGlow(col, op) {
      const c2 = document.createElement('canvas'); c2.width = 64; c2.height = 64;
      const ctx = c2.getContext('2d');
      const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      g.addColorStop(0, col.replace(')', `,${op})`).replace('rgb', 'rgba'));
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g; ctx.fillRect(0, 0, 64, 64);
      return new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(c2), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
    }
    const halo1 = new THREE.Sprite(makeGlow('rgb(0,212,255)', 0.22)); halo1.scale.set(3.8, 3.8, 1); scene.add(halo1);
    const halo2 = new THREE.Sprite(makeGlow('rgb(0,255,136)', 0.10)); halo2.scale.set(5, 5, 1); scene.add(halo2);

    // ── Subtle Shadow ──
    const shadowGeo = new THREE.PlaneGeometry(3, 3);
    const shadowTex = new THREE.CanvasTexture((function () {
      const c = document.createElement('canvas'); c.width = 64; c.height = 64;
      const ctx = c.getContext('2d');
      const grd = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grd.addColorStop(0, 'rgba(0,212,255,0.25)');
      grd.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grd; ctx.fillRect(0, 0, 64, 64);
      return c;
    })());
    const shadowMat = new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -1.6;
    scene.add(shadowPlane);

    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.38, 0.005, 2, 64), new THREE.MeshBasicMaterial({ color: 0x00d4ff, transparent: true, opacity: 0.55 }));
    ring.rotation.x = Math.PI / 2.2; ring.rotation.z = 0.3; globeGroup.add(ring);
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(1.6, 0.003, 2, 48), new THREE.MeshBasicMaterial({ color: 0x00ff88, transparent: true, opacity: 0.3 }));
    ring2.rotation.x = Math.PI / 4; ring2.rotation.y = 0.8; globeGroup.add(ring2);

    const orb = new THREE.Mesh(new THREE.SphereGeometry(0.022, 6, 6), new THREE.MeshBasicMaterial({ color: 0x00ff88 })); globeGroup.add(orb);

    // ── PARTICLES: slight intensity variation per particle for smoother glow ──
    const ptCount = 120;
    const ptGeo = new THREE.BufferGeometry();
    const ptPos = new Float32Array(ptCount * 3), ptCol = new Float32Array(ptCount * 3);
    for (let i = 0; i < ptCount; i++) {
      const phi = Math.acos(-1 + 2 * Math.random()), theta = Math.random() * Math.PI * 2, r = 1.25 + Math.random() * .9;
      ptPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      ptPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      ptPos[i * 3 + 2] = r * Math.cos(phi);
      const blue = Math.random() > .5;
      const intensity = 0.6 + Math.random() * 0.4; // 0.6–1.0 per-particle brightness variation
      ptCol[i * 3] = 0;
      ptCol[i * 3 + 1] = blue ? 0.83 * intensity : 1.0 * intensity;
      ptCol[i * 3 + 2] = blue ? 1.0 * intensity : 0.53 * intensity;
    }
    ptGeo.setAttribute('position', new THREE.BufferAttribute(ptPos, 3));
    ptGeo.setAttribute('color', new THREE.BufferAttribute(ptCol, 3));
    const points = new THREE.Points(ptGeo, new THREE.PointsMaterial({ size: .04, vertexColors: true, transparent: true, opacity: .85, sizeAttenuation: true }));
    globeGroup.add(points);

    let targetRX = 0, targetRY = 0, curRX = 0, curRY = 0;
    let scrollZ = 0, hovered = false, clickPulse = 0, glowScale = 1;
    let globePaused = false;
    const clock = new THREE.Clock();
    const FPS_INTERVAL = 1000 / 60;
    let lastFrameTime = 0;

    registerScroll(() => { scrollZ = Math.min(scrollY / innerHeight, 1); });

    document.addEventListener('mousemove', e => {
      targetRY = (e.clientX / innerWidth - .5) * 0.8;
      targetRX = -(e.clientY / innerHeight - .5) * 0.5;
    }, { passive: true });
    canvas.addEventListener('mouseenter', () => { hovered = true; });
    canvas.addEventListener('mouseleave', () => { hovered = false; });
    canvas.addEventListener('click', () => { clickPulse = 1; showToast('🌐 Cyber Globe activated!'); });

    // ── Tab visibility pause (no duplicate — single listener) ──
    document.addEventListener('visibilitychange', () => {
      globePaused = document.hidden;
      if (!globePaused) clock.start();
    });

    // ── IntersectionObserver threshold → 0.2 ──
    new IntersectionObserver(entries => {
      globePaused = !entries[0].isIntersecting;
      if (!globePaused) clock.start();
    }, { threshold: 0.2 }).observe(canvas);

    function animate(now) {
      requestAnimationFrame(animate);
      if (globePaused) return;
      if (now - lastFrameTime < FPS_INTERVAL) return;
      const dt = Math.min((now - lastFrameTime) / 16.667, 2);
      lastFrameTime = now;

      const t = clock.getElapsedTime();
      curRX += (targetRX - curRX) * .06 * dt; curRY += (targetRY - curRY) * .06 * dt;

      // ── Floating effect ──
      globeGroup.position.y = Math.sin(t * 1.5) * 0.1;
      shadowPlane.material.opacity = Math.max(0, 0.8 - globeGroup.position.y * 5); // Shadow pulses with height

      core.rotation.y = t * 0.18 + curRY; core.rotation.x = curRX;
      wire.rotation.y = t * 0.22 + curRY; wire.rotation.x = curRX * 0.7;
      wire2.rotation.y = -t * 0.14; wire2.rotation.x = t * 0.05;
      points.rotation.y = t * 0.08; ring.rotation.z = t * 0.3; ring2.rotation.y = t * 0.2;
      glowRing.rotation.z = t * 0.15; glowRing.rotation.y = Math.sin(t * 0.5) * 0.1;

      const orbAngle = t * 1.4;
      orb.position.set(1.38 * Math.cos(orbAngle), Math.sin(t * 0.5) * 0.3, 1.38 * Math.sin(orbAngle));
      camera.position.z = 3.2 + scrollZ * 1.2;

      const targetGlow = hovered ? 1.3 : 1; glowScale += (targetGlow - glowScale) * .08 * dt;
      halo1.scale.set(3.8 * glowScale, 3.8 * glowScale, 1);
      pBlue.intensity = hovered ? 9 : 6; wireMat.opacity = hovered ? 0.28 : 0.18;

      // ── Click pulse scaling whole group ──
      if (clickPulse > 0) {
        const s = 1 + clickPulse * 0.12;
        globeGroup.scale.set(s, s, s);
        clickPulse *= 0.92;
        if (clickPulse < 0.005) { globeGroup.scale.set(1, 1, 1); clickPulse = 0; }
      }

      const breath = 1 + Math.sin(t * 1.8) * .05; halo2.scale.set(5 * breath, 5 * breath, 1);
      renderer.render(scene, camera);
    }
    requestAnimationFrame(animate);
  }
})();

/* ── SHOWCASE DASHBOARD ANIMATIONS ── */
(function initShowcase() {
  const nc = $('net-canvas-new');
  if (!nc) return;
  const resizeNC = () => { nc.width = nc.offsetWidth || 400; nc.height = nc.offsetHeight || 140; };
  resizeNC(); new ResizeObserver(resizeNC).observe(nc);
  const nctx = nc.getContext('2d');

  const nodes = Array.from({ length: 14 }, () => ({
    x: Math.random(), y: Math.random(),
    vx: (Math.random() - .5) * .004, vy: (Math.random() - .5) * .004,
    r: Math.random() * 3 + 2, pulse: Math.random() * Math.PI * 2,
    type: Math.random() < .2 ? 'threat' : Math.random() < .3 ? 'server' : 'endpoint'
  }));

  function drawNet(ts) {
    requestAnimationFrame(drawNet);
    if (netPaused || document.hidden) return;
    const { width: W2, height: H2 } = nc; if (!W2 || !H2) return;
    nctx.clearRect(0, 0, W2, H2);
    nodes.forEach(n => { n.x += n.vx; n.y += n.vy; n.pulse += .02; if (n.x < 0 || n.x > 1) n.vx *= -1; if (n.y < 0 || n.y > 1) n.vy *= -1; });
    nodes.forEach((a, i) => nodes.slice(i + 1).forEach(b => {
      const dx = (a.x - b.x) * W2, dy = (a.y - b.y) * H2, d = Math.sqrt(dx * dx + dy * dy);
      if (d < W2 * .28) {
        const alpha = .22 * (1 - d / (W2 * .28));
        nctx.beginPath(); nctx.moveTo(a.x * W2, a.y * H2); nctx.lineTo(b.x * W2, b.y * H2);
        nctx.strokeStyle = (a.type === 'threat' || b.type === 'threat') ? `rgba(255,51,102,${alpha})` : `rgba(0,212,255,${alpha})`;
        nctx.lineWidth = .7; nctx.stroke();
      }
    }));
    nodes.forEach(n => {
      const nx = n.x * W2, ny = n.y * H2, glow = Math.sin(n.pulse) * .3 + .7;
      const col = n.type === 'threat' ? '255,51,102' : n.type === 'server' ? '0,212,255' : '0,255,136';
      const grd = nctx.createRadialGradient(nx, ny, 0, nx, ny, n.r * 3);
      grd.addColorStop(0, `rgba(${col},${glow * .8})`); grd.addColorStop(1, `rgba(${col},0)`);
      nctx.fillStyle = grd; nctx.beginPath(); nctx.arc(nx, ny, n.r * 3, 0, Math.PI * 2); nctx.fill();
      nctx.fillStyle = `rgba(${col},1)`; nctx.beginPath(); nctx.arc(nx, ny, n.r, 0, Math.PI * 2); nctx.fill();
    });
    const beam = ((ts / 4000) % 1) * W2;
    const bg = nctx.createLinearGradient(beam - 20, 0, beam + 20, 0);
    bg.addColorStop(0, 'rgba(0,212,255,0)'); bg.addColorStop(.5, 'rgba(0,212,255,.12)'); bg.addColorStop(1, 'rgba(0,212,255,0)');
    nctx.fillStyle = bg; nctx.fillRect(beam - 20, 0, 40, H2);
  }
  requestAnimationFrame(drawNet);

  setInterval(() => {
    const t = $('kpi-threats'); if (t) t.textContent = 247 + Math.floor(Math.random() * 5);
    const a = $('kpi-alerts'); if (a) a.textContent = 12 + Math.floor(Math.random() * 4);
  }, 800);

  const ALERTS = [
    { cls: 'crit', time: '14:22:01', text: '🔴 CRITICAL: Brute force on SSH — 192.168.1.42' },
    { cls: 'warn', time: '14:21:44', text: '⚠ WARN: Unusual DNS query — endpoint #17' },
    { cls: 'ok', time: '14:21:12', text: '✔ OK: Firewall updated — 14 ACLs loaded' },
    { cls: 'info', time: '14:20:58', text: 'ℹ INFO: Nmap scan — 254 hosts enumerated' },
    { cls: 'crit', time: '14:22:33', text: '🔴 CRITICAL: SQL injection attempt blocked' },
    { cls: 'warn', time: '14:22:10', text: '⚠ WARN: Suspicious outbound — port 4444' },
    { cls: 'ok', time: '14:21:55', text: '✔ OK: Wazuh agent connected — host-07' },
    { cls: 'info', time: '14:21:30', text: 'ℹ INFO: TLS cert valid — Grade A+' },
  ];
  let alertIdx = 4;
  setInterval(() => {
    const area = $('sc-alert-area'); if (!area) return;
    const a = ALERTS[alertIdx % ALERTS.length];
    const row = document.createElement('div'); row.className = `sc-alert-row ${a.cls}`;
    row.style.cssText = 'opacity:0;transition:opacity .35s';
    row.innerHTML = `<div class="sc-alert-time">${a.time}</div><span>${a.text}</span>`;
    area.insertBefore(row, area.firstChild);
    requestAnimationFrame(() => requestAnimationFrame(() => row.style.opacity = '1'));
    if (area.children.length > 4) area.removeChild(area.lastChild);
    alertIdx++;
  }, 1500);

  const TERM_LINES = [
    { c: '#00ff88', t: '$ wazuh-agent status' }, { c: '#7ba7bc', t: '→ Active: running (14:00:01)' },
    { c: '#00ff88', t: '$ nmap -sV 192.168.1.0/24' }, { c: '#7ba7bc', t: '→ Scanning 254 hosts...' },
    { c: '#00d4ff', t: '→ 192.168.1.1 (router) ↑' }, { c: '#00d4ff', t: '→ 192.168.1.42 (server) ↑' },
    { c: '#ff3366', t: '⚠ Port 22 exposed on .42' }, { c: '#00ff88', t: '$ splunk search "failed login"' },
    { c: '#7ba7bc', t: '→ 18 events in last 1h' }, { c: '#ffaa00', t: '→ Source: 10.0.0.99 [MONITOR]' },
    { c: '#00ff88', t: '$ wireshark -i eth0 -f tcp' }, { c: '#7ba7bc', t: '→ Capture started on eth0' },
  ];
  let termI = 0; const scTerm = $('sc-term-out');
  function addTermLine() {
    if (!scTerm) return;
    const l = TERM_LINES[termI % TERM_LINES.length];
    const d = document.createElement('div'); d.style.color = l.c; d.textContent = l.t;
    scTerm.appendChild(d); if (scTerm.children.length > 8) scTerm.removeChild(scTerm.firstChild);
    scTerm.scrollTop = scTerm.scrollHeight; termI++;
  }
  setInterval(addTermLine, 700);

  /* Showcase tilt — mouse parallax on hero chrome */
  const chrome = $('showcase-chrome');
  if (chrome) {
    document.addEventListener('mousemove', rafThrottle(e => {
      const rect = chrome.getBoundingClientRect();
      const cx = rect.left + rect.width / 2, cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width * .6, dy = (e.clientY - cy) / rect.height * .5;
      if (scrollY < innerHeight) { chrome.style.transform = `perspective(1400px) rotateX(${2.5 - dy}deg) rotateY(${dx}deg)`; }
    }), { passive: true });
    chrome.addEventListener('mouseleave', () => { chrome.style.transform = 'perspective(1400px) rotateX(2.5deg)'; });
  }
  // Pause net-canvas animation when not visible
  let netPaused = false;
  new IntersectionObserver(entries => { netPaused = !entries[0].isIntersecting; }, { threshold: 0.01 }).observe(nc);
})();

/* ── SCROLL ZOOM & THREE CANVAS (via unified handler) ── */
(function () {
  const showcase = document.querySelector('.hero-showcase');
  const threeC = $('three-canvas');
  registerScroll(() => {
    const prog = Math.min(scrollY / innerHeight, 1);
    if (showcase) { showcase.style.transform = `scale(${1 - prog * .06})`; showcase.style.opacity = 1 - prog * .3; }
    if (threeC) { threeC.style.transform = `translateY(${prog * 50}px)`; threeC.style.opacity = 1 - prog * .7; }
  });
})();

/* ── MAGNETIC BUTTONS & MICRO INTERACTIONS ── */
document.querySelectorAll('.btn').forEach(b => {
  b.addEventListener('mousemove', function (e) { const r = this.getBoundingClientRect(), dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2); this.style.transform = `scale(1.02) translate(${dx * .14}px,${dy * .14}px)`; });
  b.addEventListener('mouseleave', function () { this.style.transform = ''; });
});

/* Card Tilt & Stats Animation */
document.querySelectorAll('.pc-card').forEach(c => {
  c.addEventListener('mousemove', e => {
    const r = c.getBoundingClientRect();
    c.style.transform = `perspective(1000px) rotateX(${-(e.clientY - r.top - r.height / 2) / 15}deg) rotateY(${(e.clientX - r.left - r.width / 2) / 15}deg) translateY(-8px)`;
  });
  c.addEventListener('mouseleave', () => c.style.transform = '');
});

document.querySelectorAll('.sc').forEach(s => {
  const n = s.querySelector('.sc-num');
  s.addEventListener('mouseenter', () => { if (n) n.style.transform = 'scale(1.15)'; n.style.transition = 'transform 0.3s ease' });
  s.addEventListener('mouseleave', () => { if (n) n.style.transform = 'scale(1)'; });
});

/* ── HACK MODE ── */
const hackBtn = $('hb');
hackBtn.addEventListener('click', () => {
  const on = document.body.classList.toggle('hm');
  hackBtn.classList.toggle('on', on);
  hackBtn.textContent = on ? '🔴 EXIT HACK' : '⚡ HACK';
  showToast(on ? '🔴 HACK MODE ACTIVATED' : '✓ Normal mode restored');
  drawGrid();
});

/* ── GITHUB API (cached · retry · timeout) ── */
async function loadGH() {
  const grid = $('repo-grid'), loader = $('repo-loader');
  const ALLOWED = ['encryption-app', 'Steganography-Tool-v1.0.0', 'cyberguard-password-analyzer'];
  const LANG_COLORS = { Python: '#3572A5', JavaScript: '#f1e05a', HTML: '#e34c26', CSS: '#563d7c', Shell: '#89e051', Java: '#b07219', C: '#555555', TypeScript: '#2b7489' };
  const CACHE_KEY = 'gh_repos_cache', CACHE_TTL = 10 * 60 * 1000; // 10 minutes

  function makeCard(name, desc, lang, stars, forks, url, updated) {
    const dot = LANG_COLORS[lang] || '#7ba7bc';
    const updatedStr = updated ? `Updated ${new Date(updated).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}` : '';;
    const a = document.createElement('a'); a.className = 'rc'; a.href = url; a.target = '_blank';
    a.innerHTML = `
      <div class="rc-name">⌥ ${name}</div>
      <div class="rc-desc">${desc}</div>
      <div class="rc-meta">
        <span style="display:flex;align-items:center;gap:4px">
          <span style="width:10px;height:10px;border-radius:50%;background:${dot};display:inline-block;box-shadow:0 0 4px ${dot}88;flex-shrink:0"></span>${lang || 'N/A'}
        </span>
        <span title="Stars">⭐ ${stars}</span>
        <span title="Forks">🍴 ${forks}</span>
        ${updatedStr ? `<span style="margin-left:auto;font-size:9px;opacity:.55">${updatedStr}</span>` : ''}
      </div>`;
    return a;
  }

  function renderFallback() {
    loader.innerHTML = '<span style="color:var(--t2);font-family:var(--mono);font-size:12px">// Pinned repos — GitHub</span>';
    [{ n: 'encryption-app', d: 'Full-featured AES/RSA encryption application.', l: 'Python', u: 'https://github.com/parag1020/encryption-app' },
    { n: 'Steganography-Tool-v1.0.0', d: 'LSB steganography tool for digital forensics.', l: 'Python', u: 'https://github.com/parag1020/Steganography-Tool-v1.0.0' },
    { n: 'cyberguard-password-analyzer', d: 'Real-time entropy-based password strength analyzer.', l: 'Python', u: 'https://github.com/parag1020/cyberguard-password-analyzer' },
    ].forEach(r => grid.appendChild(makeCard(r.n, r.d, r.l, '—', '—', r.u, null)));
  }

  // ── Check localStorage cache first ──
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const { ts, data } = JSON.parse(cached);
      if (Date.now() - ts < CACHE_TTL) {
        loader.style.display = 'none';
        data.forEach(r => grid.appendChild(makeCard(r.name, r.description, r.language, r.stars, r.forks, r.url, r.updated)));
        return;
      }
    }
  } catch { }

  // ── Fetch with retry (max 2 attempts) + 6s timeout ──
  async function fetchWithRetry(url, retries = 2) {
    for (let attempt = 0; attempt <= retries; attempt++) {
      const ctrl = new AbortController();
      const tid = setTimeout(() => ctrl.abort(), 6000);
      try {
        const res = await fetch(url, { signal: ctrl.signal });
        clearTimeout(tid);
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return await res.json();
      } catch (e) {
        clearTimeout(tid);
        if (attempt === retries) throw e;
        await new Promise(r => setTimeout(r, 800 * (attempt + 1))); // back-off
      }
    }
  }

  try {
    const repos = await fetchWithRetry('https://api.github.com/users/parag1020/repos?sort=updated&per_page=20');
    const filtered = repos
      .filter(r => ALLOWED.map(n => n.toLowerCase()).includes(r.name.toLowerCase()))
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    if (!filtered.length) throw 0;
    loader.style.display = 'none';
    // Cache for 10 min
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({
        ts: Date.now(),
        data: filtered.map(r => ({ name: r.name, description: r.description || 'Security project by Parag Patel.', language: r.language || 'Python', stars: r.stargazers_count, forks: r.forks_count, url: r.html_url, updated: r.updated_at }))
      }));
    } catch { }
    filtered.forEach(r => grid.appendChild(makeCard(r.name, r.description || 'Security project by Parag Patel.', r.language || 'Python', r.stargazers_count, r.forks_count, r.html_url, r.updated_at)));
  } catch {
    renderFallback();
  }
}
loadGH();

/* ── TERMINAL ── */
const CMDS = {
  help: () => [
    { c: 'res', t: '┌─ PARAGCYBER TERMINAL v3.0 ─────────────────┐' },
    { c: 'info', t: '  whoami    → Display analyst profile' },
    { c: 'info', t: '  about     → Detailed background' },
    { c: 'info', t: '  skills    → Technical capabilities' },
    { c: 'info', t: '  projects  → Real security tools' },
    { c: 'info', t: '  scan      → Run system scan' },
    { c: 'info', t: '  social    → Contact & social links' },
    { c: 'info', t: '  contact   → Get in touch' },
    { c: 'info', t: '  clear     → Clear terminal' },
    { c: 'res', t: '└─────────────────────────────────────────────┘' },
  ],
  whoami: () => [{ c: 'res', t: 'parag@paragcyber:~$ whoami' }, { c: 'info', t: 'Name     : Parag Patel' }, { c: 'info', t: 'Role     : Cybersecurity Enthusiast' }, { c: 'info', t: 'Target   : Future SOC Analyst' }, { c: 'info', t: 'Degree   : Integrated M.Sc. Cyber Security' }, { c: 'info', t: 'Period   : 2024 – 2029  ·  India 🇮🇳' }, { c: 'res', t: 'Status   : 🟢 Active · Building & Learning' }],
  about: () => [{ c: 'res', t: '[ PARAG PATEL — CYBER PROFILE ]' }, { c: 'info', t: 'Name:     Parag Patel' }, { c: 'info', t: 'Degree:   Integrated M.Sc. Cyber Security (2024–2029)' }, { c: 'info', t: 'Email:    paragpateld1020@gmail.com' }, { c: 'info', t: 'GitHub:   github.com/parag1020' }, { c: 'info', t: 'LinkedIn: linkedin.com/in/parag-patel-9593742a7' }, { c: 'res', t: 'Focus:    SOC Analysis · SIEM · Digital Forensics' }],
  skills: () => [{ c: 'res', t: '[ TECHNICAL SKILLS ]' }, { c: 'info', t: 'Languages : Python  Java  JavaScript  C' }, { c: 'info', t: 'Security  : SOC Analysis · SIEM · Threat Detection' }, { c: 'info', t: 'Tools     : Wireshark · Wazuh · Nmap · Splunk ✦' }, { c: 'info', t: 'Forensics : Autopsy · FTK Imager · StegoPEG' }, { c: 'res', t: '✦ Currently learning' }],
  projects: () => [{ c: 'res', t: '[ REAL SECURITY PROJECTS ]' }, { c: 'info', t: '01. Encryption App       → AES/RSA cryptographic tool' }, { c: 'info', t: '    github.com/parag1020/encryption-app' }, { c: 'info', t: '02. Steganography Tool   → LSB encoding/detection' }, { c: 'info', t: '    github.com/parag1020/Steganography-Tool-v1.0.0' }, { c: 'info', t: '03. CyberGuard Password  → Entropy strength analyzer' }, { c: 'info', t: '    github.com/parag1020/cyberguard-password-analyzer' }],
  scan: () => [{ c: 'res', t: '$ Initiating system scan...' }, { c: 'info', t: '[██████████] 100%  Scan complete' }, { c: 'res', t: '✔ Firewall       : Active — 14 rules' }, { c: 'res', t: '✔ SSL/TLS        : Grade A+' }, { c: 'res', t: '✔ Malware        : 0 signatures' }, { c: 'info', t: '⚠ Open CVEs      : 2 low-severity (monitor)' }, { c: 'res', t: 'Security Score   : 94 / 100' }],
  social: () => [{ c: 'res', t: '[ SOCIAL & CONTACT ]' }, { c: 'info', t: '📧  paragpateld1020@gmail.com' }, { c: 'info', t: '🐙  github.com/parag1020' }, { c: 'info', t: '💼  linkedin.com/in/parag-patel-9593742a7' }, { c: 'info', t: '💬  wa.me/917623086306' }, { c: 'res', t: '👉  Open to internships & SOC Analyst roles' }],
  contact: () => [{ c: 'res', t: '[ CONTACT INFORMATION ]' }, { c: 'info', t: 'Email:    paragpateld1020@gmail.com' }, { c: 'info', t: 'GitHub:   github.com/parag1020' }, { c: 'info', t: 'LinkedIn: linkedin.com/in/parag-patel-9593742a7' }, { c: 'info', t: 'WhatsApp: +91 76230 86306' }, { c: 'res', t: 'Status:   Open to internships & SOC Analyst roles' }],
};

const tOut = $('term-out'), tIn = $('ti');
function addL(txt, cls = 'info') { const d = document.createElement('div'); d.className = 'to ' + cls; d.textContent = txt; tOut.appendChild(d); tOut.scrollTop = tOut.scrollHeight; }
function typeLines(lines, idx = 0) { if (idx >= lines.length) return; addL(lines[idx].t, lines[idx].c); setTimeout(() => typeLines(lines, idx + 1), idx === 0 ? 0 : 60); }
function runCmd(cmd) {
  cmd = cmd.trim().toLowerCase(); if (!cmd) return;
  addL('parag@cyber:~$ ' + cmd, 'cmd');
  if (cmd === 'clear') { tOut.innerHTML = ''; return; }
  const fn = CMDS[cmd];
  if (fn) typeLines(fn()); else addL(`bash: ${cmd}: command not found — type 'help'`, 'err');
}
tIn.addEventListener('keydown', e => { if (e.key === 'Enter') { runCmd(tIn.value); tIn.value = ''; } });
window.runCmd = runCmd;

/* ── SCAN SYSTEM ── */
const STEPS = [
  { l: 'Scanning open ports...', r: 'Port 22/80/443 — Status verified ✔', c: 'ok', d: 250 },
  { l: 'Checking firewall rules...', r: 'Firewall: Active — 14 rules loaded ✔', c: 'ok', d: 550 },
  { l: 'Analyzing DNS configuration...', r: 'DNS: Secure — DNSSEC enabled ✔', c: 'ok', d: 850 },
  { l: 'Detecting malware signatures...', r: 'Malware: 0 signatures detected ✔', c: 'ok', d: 1150 },
  { l: 'SSL/TLS certificate verification...', r: 'Certificate: Valid — Grade A+ ✔', c: 'ok', d: 1450 },
  { l: 'CVE vulnerability assessment...', r: '⚠ 2 low-severity CVEs flagged — monitor', c: 'warn', d: 1750 },
  { l: 'Password policy compliance...', r: 'Entropy: Adequate — Score: 88/100 ✔', c: 'ok', d: 2050 },
  { l: 'Log integrity verification...', r: 'Logs: Untampered — Hash match ✔', c: 'ok', d: 2350 },
  { l: 'Compiling security report...', r: '', c: 'done', d: 2650 },
  { l: '', r: '══ SCAN COMPLETE — Security Score: 94/100 ✔ ══', c: 'done', d: 2850 },
];
function runScan() {
  const btn = $('scan-btn'), sbw = $('sbw'), sbf = $('sbf'), sl = $('scan-log'), lb = $('slabel'), sp2 = $('spct');
  btn.disabled = true; sbw.style.display = 'block'; sl.style.display = 'block';
  sl.innerHTML = '<div class="sl" style="color:var(--nb)">$ Starting Parag Patel Cyber Scanner v2.0...</div>';
  let p2 = 0; const pi2 = setInterval(() => { p2 = Math.min(p2 + 1, 100); sbf.style.width = p2 + '%'; sp2.textContent = p2 + '%'; if (p2 >= 100) clearInterval(pi2); }, 27);
  STEPS.forEach(({ l, r, c, d }) => {
    if (l) setTimeout(() => { lb.textContent = l; const el = document.createElement('div'); el.className = 'sl'; el.textContent = '→ ' + l; sl.appendChild(el); sl.scrollTop = sl.scrollHeight; }, d);
    if (r) setTimeout(() => { const el = document.createElement('div'); el.className = 'sl ' + c; el.textContent = '  ' + r; sl.appendChild(el); sl.scrollTop = sl.scrollHeight; }, d + 160);
  });
  setTimeout(() => { btn.disabled = false; btn.textContent = '▶ RUN AGAIN'; }, 3100);
}
window.runScan = runScan;

/* ── CONTACT FORM ── */
async function submitForm(e) {
  e.preventDefault();
  const name = $('cf-name').value.trim();
  const email = $('cf-email').value.trim();
  const msg = $('cf-msg').value.trim();
  const fs = $('fs');
  if (!name || !email || !msg) {
    fs.style.display = 'block';
    fs.className = 'err';
    fs.textContent = '✗ Please fill in all required fields.';
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    fs.style.display = 'block';
    fs.className = 'err';
    fs.textContent = '✗ Please enter a valid email address.';
    return;
  }
  fs.style.display = 'block';
  fs.className = '';
  fs.textContent = '⟳ Sending...';
  try {
    const response = await fetch("https://formspree.io/f/xkokogqy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: name,
        email: email,
        message: msg
      })
    });
    if (response.ok) {
      fs.className = 'ok';
      fs.textContent = '✓ Message sent successfully!';
      $('cform').reset();
    } else {
      fs.className = 'err';
      fs.textContent = '✗ Error sending message!';
    }
  } catch (error) {
    fs.className = 'err';
    fs.textContent = '✗ Network error!';
  }
}
window.submitForm = submitForm;
/* ── TOAST (spring animation via CSS) ── */
const toastEl = $('toast');
let toastTimer = null;
function showToast(msg = '✓ Copied!') {
  if (toastTimer) clearTimeout(toastTimer);
  toastEl.textContent = msg;
  toastEl.classList.remove('show');
  requestAnimationFrame(() => requestAnimationFrame(() => {
    toastEl.classList.add('show');
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2800);
  }));
}
function copyEmail() {
  navigator.clipboard.writeText('paragpateld1020@gmail.com')
    .then(() => showToast('✓ Email copied to clipboard!'))
    .catch(() => showToast('paragpateld1020@gmail.com'));
}
window.showToast = showToast;
window.copyEmail = copyEmail;

/* ── VOICE INTRO ── */
(function initVoice() {
  const overlay = $('voice-overlay'), skipBtn = $('vo-skip'), voTyped = $('vo-typed'), voiceBtn = $('voice-btn'), navWave = $('nav-wave');
  const VOICE_TEXT = 'Welcome to Parag Patel Cyber World';
  let voiceMuted = localStorage.getItem('voiceMuted') === 'true';
  let voiceActive = false, utter = null;

  function updateBtn() { voiceBtn.textContent = voiceMuted ? '🔇' : '🔊'; voiceBtn.classList.toggle('muted', voiceMuted); }
  updateBtn();

  function playClick() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator(), gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
      osc.start(); osc.stop(ctx.currentTime + 0.1);
    } catch (e) { }
  }

  function dismissOverlay() { overlay.classList.add('out'); voiceActive = false; navWave.classList.add('paused'); }

  function typeOverlay(cb) {
    let i = 0; voTyped.innerHTML = '<span class="cb"></span>';
    const iv = setInterval(() => {
      voTyped.innerHTML = VOICE_TEXT.slice(0, i++) + '<span class="cb"></span>';
      if (i > VOICE_TEXT.length) { clearInterval(iv); if (cb) setTimeout(cb, 1000); }
    }, 50);
  }

  function speak() {
    if (!('speechSynthesis' in window) || voiceMuted) return;

    const doSpeak = () => {
      const voices = speechSynthesis.getVoices();

      const msg = new SpeechSynthesisUtterance("Welcome to Parag Patel Cyber World");
      msg.rate = 0.9;
      msg.pitch = 1;
      msg.volume = 1;

      const voice =
        voices.find(v => v.lang === 'en-US') ||
        voices.find(v => v.lang.startsWith('en')) ||
        voices[0];

      if (voice) msg.voice = voice;

      speechSynthesis.speak(msg);
    };

    if (speechSynthesis.getVoices().length === 0) {
      speechSynthesis.onvoiceschanged = doSpeak;
    } else {
      doSpeak();
    }
  }

  function startIntro() {
    localStorage.setItem('voicePlayed', '1');
    setTimeout(() => { typeOverlay(dismissOverlay); speak(); }, 500);
    setTimeout(dismissOverlay, 6000);
  }

  if (localStorage.getItem('voicePlayed')) {
    dismissOverlay();
  } else {
    voTyped.innerHTML = '<span style="font-size:12px;color:var(--t2)">[ Click anywhere to initialize audio ]</span><span class="cb"></span>';
    const doStart = () => {
      overlay.removeEventListener('click', doStart);
      if (speechSynthesis.getVoices().length > 0) startIntro();
      else speechSynthesis.onvoiceschanged = startIntro;
    };
    overlay.addEventListener('click', doStart);
  }

  skipBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (utter) speechSynthesis.cancel();
    if (!localStorage.getItem('voicePlayed') && !voiceMuted) { speak(); }
    dismissOverlay();
    localStorage.setItem('voicePlayed', '1');
  });
  voiceBtn.addEventListener('click', () => {
    playClick();
    voiceMuted = !voiceMuted; localStorage.setItem('voiceMuted', voiceMuted); updateBtn();
    if (voiceMuted && 'speechSynthesis' in window) speechSynthesis.cancel();
    showToast(voiceMuted ? '🔇 Voice muted' : '🔊 Voice enabled');
  });
})();
