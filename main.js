/* =========================================================================
   main.js — shared chrome for every page.

   Holds the decorative pixel sprites, the background animations, the mobile
   nav drawer, the scroll-reveal observer, and the publication abstract modal.
   Every page loads this file, so the only markup a page has to repeat is the
   ~20-line <nav> block.

   Sprites live here rather than in the HTML because they are decoration, not
   content: keeping ~150 lines of <rect> out of each page keeps the pages
   readable. A page opts into one by leaving an empty placeholder element
   (see MOUNTS below); pages that omit the placeholder simply don't get it.
   ========================================================================= */
(function () {
  'use strict';

  /* ---------------------------------------------------------------------
     SPRITE MARKUP
     --------------------------------------------------------------------- */
  var SPRITES = {};

  SPRITES.rocket = `
<div class="pixel-sprite" id="rocket" style="top:90px;left:-140px;opacity:0;">
  <svg width="112" height="40" viewBox="0 0 28 10" xmlns="http://www.w3.org/2000/svg" style="image-rendering:pixelated;">
    <rect x="25" y="3" width="2" height="4" fill="#c8dcff"/>
    <rect x="27" y="4" width="1" height="2" fill="#aaccff"/>
    <rect x="10" y="2" width="15" height="6" fill="#dde8ff"/>
    <rect x="18" y="3" width="3" height="3" fill="#7ab4ff" opacity="0.85"/>
    <rect x="11" y="0" width="5" height="2" fill="#a0b8e0"/>
    <rect x="11" y="8" width="5" height="2" fill="#a0b8e0"/>
    <rect x="9" y="3" width="2" height="4" fill="#c8d8f0"/>
    <rect x="8" y="2" width="1" height="6" fill="#b0c4de"/>
    <rect x="4" y="3" width="5" height="4" fill="#ffe680" opacity="0.85"/>
    <rect x="1" y="4" width="4" height="2" fill="#ffb030" opacity="0.65"/>
    <rect x="0" y="4" width="2" height="2" fill="#ff6020" opacity="0.35"/>
  </svg>
</div>
`;

  SPRITES.shootingStar = `
<div class="pixel-sprite shooting-star-instance" id="shooting-star" style="opacity:0; top:0; left:0;">
  <svg width="80" height="10" viewBox="0 0 20 2" xmlns="http://www.w3.org/2000/svg" style="image-rendering:pixelated;">
    <rect x="19" y="0" width="1" height="1" fill="white" opacity="1"/>
    <rect x="16" y="0" width="3" height="1" fill="white" opacity="0.7"/>
    <rect x="11" y="0" width="5" height="1" fill="white" opacity="0.4"/>
    <rect x="5" y="1" width="6" height="1" fill="white" opacity="0.2"/>
    <rect x="0" y="1" width="5" height="1" fill="white" opacity="0.08"/>
  </svg>
</div>
`;

  SPRITES.solarSystem = `
      <div class="solar-system" style="opacity:0.88;">
        <div class="orbit-ring"></div>
        <div class="solar-sun">
          <svg width="44" height="44" viewBox="0 0 11 11" xmlns="http://www.w3.org/2000/svg" style="image-rendering:pixelated;">
            <rect x="5" y="0" width="1" height="2" fill="#ffe080" opacity="0.55"/>
            <rect x="5" y="9" width="1" height="2" fill="#ffe080" opacity="0.55"/>
            <rect x="0" y="5" width="2" height="1" fill="#ffe080" opacity="0.55"/>
            <rect x="9" y="5" width="2" height="1" fill="#ffe080" opacity="0.55"/>
            <rect x="1" y="1" width="1" height="1" fill="#ffd060" opacity="0.40"/>
            <rect x="9" y="1" width="1" height="1" fill="#ffd060" opacity="0.40"/>
            <rect x="1" y="9" width="1" height="1" fill="#ffd060" opacity="0.40"/>
            <rect x="9" y="9" width="1" height="1" fill="#ffd060" opacity="0.40"/>
            <rect x="3" y="2" width="5" height="1" fill="#ffe898" opacity="0.35"/>
            <rect x="3" y="8" width="5" height="1" fill="#ffe898" opacity="0.35"/>
            <rect x="2" y="3" width="1" height="5" fill="#ffe898" opacity="0.35"/>
            <rect x="8" y="3" width="1" height="5" fill="#ffe898" opacity="0.35"/>
            <rect x="3" y="3" width="5" height="5" fill="#ffd84a"/>
            <rect x="4" y="2" width="3" height="7" fill="#ffd84a"/>
            <rect x="2" y="4" width="7" height="3" fill="#ffd84a"/>
            <rect x="4" y="4" width="3" height="3" fill="#fff4a0"/>
            <rect x="5" y="3" width="1" height="5" fill="#fff4a0"/>
            <rect x="3" y="5" width="5" height="1" fill="#fff4a0"/>
            <rect x="5" y="5" width="1" height="1" fill="#ffffff"/>
          </svg>
        </div>
        <div class="orbit-arm">
          <div class="orbit-planet">
            <div class="moon-system">
              <svg width="52" height="52" viewBox="0 0 13 13" xmlns="http://www.w3.org/2000/svg" style="image-rendering:pixelated;display:block;">
                <rect x="4" y="0" width="5" height="1" fill="#7060c8"/>
                <rect x="2" y="1" width="9" height="1" fill="#8070d8"/>
                <rect x="1" y="2" width="11" height="1" fill="#9080e0"/>
                <rect x="0" y="3" width="13" height="7" fill="#b0a0f4"/>
                <rect x="1" y="10" width="11" height="1" fill="#9080e0"/>
                <rect x="2" y="11" width="9" height="1" fill="#8070d8"/>
                <rect x="4" y="12" width="5" height="1" fill="#7060c8"/>
                <rect x="2" y="3" width="3" height="2" fill="#d8d0ff" opacity="0.50"/>
                <rect x="2" y="5" width="2" height="1" fill="#d8d0ff" opacity="0.25"/>
                <rect x="0" y="6" width="13" height="2" fill="#5040a0" opacity="0.30"/>
                <rect x="8" y="8" width="3" height="1" fill="#6858b8" opacity="0.55"/>
                <rect x="3" y="10" width="2" height="1" fill="#6858b8" opacity="0.45"/>
              </svg>
              <div class="moon-arm">
                <div class="moon-body">
                  <svg width="16" height="16" viewBox="0 0 4 4" xmlns="http://www.w3.org/2000/svg" style="image-rendering:pixelated;display:block;">
                    <rect x="1" y="0" width="2" height="1" fill="#c8d4e4"/>
                    <rect x="0" y="1" width="4" height="2" fill="#d4dfee"/>
                    <rect x="1" y="3" width="2" height="1" fill="#b8c8d8"/>
                    <rect x="1" y="1" width="1" height="1" fill="#a8b8cc" opacity="0.60"/>
                    <rect x="2" y="2" width="1" height="1" fill="#a8b8cc" opacity="0.45"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
`;

  SPRITES.heroComet = `
      <div class="hero-deco" id="hd-comet" style="top:300px;right:60px;opacity:0;pointer-events:none;">
        <svg width="140" height="56" viewBox="0 0 35 14" xmlns="http://www.w3.org/2000/svg" style="image-rendering:pixelated;transform:rotate(-38deg);transform-origin:bottom left;">
          <rect x="0" y="7" width="6" height="1" fill="#3050a0" opacity="0.10"/>
          <rect x="4" y="6" width="6" height="2" fill="#5070c0" opacity="0.14"/>
          <rect x="8" y="6" width="6" height="2" fill="#6080d0" opacity="0.20"/>
          <rect x="12" y="5" width="6" height="3" fill="#70a0e0" opacity="0.30"/>
          <rect x="16" y="5" width="6" height="3" fill="#80b0e8" opacity="0.42"/>
          <rect x="20" y="4" width="6" height="5" fill="#90c0f0" opacity="0.55"/>
          <rect x="24" y="4" width="4" height="5" fill="#a8d0f8" opacity="0.65"/>
          <rect x="22" y="3" width="6" height="1" fill="#a8caf4" opacity="0.38"/>
          <rect x="27" y="3" width="4" height="7" fill="#d0e8ff" opacity="0.45"/>
          <rect x="28" y="2" width="4" height="9" fill="#e0f0ff" opacity="0.30"/>
          <rect x="31" y="5" width="3" height="4" fill="#ffffff" opacity="0.95"/>
          <rect x="30" y="5" width="1" height="4" fill="#e8f4ff" opacity="0.80"/>
          <rect x="31" y="4" width="3" height="1" fill="#e8f4ff" opacity="0.70"/>
          <rect x="25" y="5" width="1" height="1" fill="#ffffff" opacity="0.55"/>
        </svg>
      </div>
`;

  SPRITES.alien = `
        <svg width="64" height="80" viewBox="0 0 16 20" xmlns="http://www.w3.org/2000/svg" style="image-rendering:pixelated;">
          <rect x="5" y="0" width="1" height="2" fill="#80d890"/>
          <rect x="9" y="0" width="1" height="2" fill="#80d890"/>
          <rect x="4" y="0" width="1" height="1" fill="#a0ffb0"/>
          <rect x="10" y="0" width="1" height="1" fill="#a0ffb0"/>
          <rect x="3" y="2" width="9" height="1" fill="#70c880"/>
          <rect x="2" y="3" width="11" height="5" fill="#80d890"/>
          <rect x="3" y="8" width="9" height="1" fill="#70c880"/>
          <rect x="3" y="4" width="3" height="3" fill="#101820"/>
          <rect x="9" y="4" width="3" height="3" fill="#101820"/>
          <rect x="3" y="4" width="1" height="1" fill="white" opacity="0.7"/>
          <rect x="9" y="4" width="1" height="1" fill="white" opacity="0.7"/>
          <rect x="5" y="7" width="5" height="1" fill="#50a860"/>
          <rect x="4" y="6" width="1" height="1" fill="#50a860"/>
          <rect x="10" y="6" width="1" height="1" fill="#50a860"/>
          <rect x="4" y="9" width="7" height="5" fill="#70c880"/>
          <rect x="3" y="10" width="9" height="3" fill="#80d890"/>
          <rect x="6" y="10" width="3" height="2" fill="#50a060" opacity="0.5"/>
          <rect x="1" y="9" width="2" height="4" fill="#70c880"/>
          <rect x="0" y="12" width="2" height="2" fill="#60b870"/>
          <g class="alien-arm">
            <rect x="12" y="9" width="2" height="2" fill="#70c880"/>
            <rect x="13" y="7" width="2" height="3" fill="#70c880"/>
            <rect x="13" y="6" width="2" height="3" fill="#60b870"/>
            <rect x="14" y="5" width="2" height="2" fill="#80d890"/>
            <rect x="14" y="4" width="1" height="1" fill="#a0ffb0"/>
          </g>
          <rect x="5" y="14" width="2" height="4" fill="#60b870"/>
          <rect x="8" y="14" width="2" height="4" fill="#60b870"/>
          <rect x="4" y="17" width="3" height="2" fill="#409050"/>
          <rect x="8" y="17" width="3" height="2" fill="#409050"/>
          <rect x="0" y="9" width="1" height="5" fill="#888898"/>
          <rect x="1" y="9" width="3" height="2" fill="#ff6060" style="animation:flagSway 2s ease-in-out infinite;transform-origin:1px 9px"/>
        </svg>
`;

  SPRITES.abstractModal = `
  <div id="abstract-modal" class="abstract-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-title">
    <div class="abstract-modal-card">
      <button class="abstract-modal-close" aria-label="Close">&times;</button>
      <p class="abstract-modal-venue" id="modal-venue"></p>
      <h3 class="abstract-modal-title" id="modal-title"></h3>
      <p class="abstract-modal-authors" id="modal-authors"></p>
      <div class="abstract-modal-divider"></div>
      <p class="abstract-modal-label">Abstract</p>
      <p class="abstract-modal-text" id="modal-abstract"></p>
    </div>
  </div>
`;

  // Decorative bodies for the page background.
  //
  // Each planet is built on a true pixel-circle silhouette (the row widths
  // 4/8/10/12/14/14/16/16... are the standard rasterisation of a circle) rather
  // than a stack of rectangles, which is what made the first attempt look
  // lumpy. Shading runs light at the upper left to dark at the lower right on
  // every body, so they read as lit from the same direction.
  SPRITES.backdrop = `
<div class="space-backdrop" aria-hidden="true">

  <div class="space-body sb-ringed">
    <svg viewBox="0 0 28 20" xmlns="http://www.w3.org/2000/svg" style="image-rendering:pixelated;display:block;width:100%;height:auto;">
      <g fill="#8f6ad0" opacity="0.85">
        <rect x="1" y="9" width="5" height="1"/>
        <rect x="22" y="9" width="5" height="1"/>
      </g>
      <g fill="#c79bea">
        <rect x="12" y="2" width="4" height="1"/>
        <rect x="10" y="3" width="8" height="1"/>
        <rect x="9"  y="4" width="10" height="1"/>
        <rect x="8"  y="5" width="12" height="1"/>
        <rect x="7"  y="6" width="14" height="1"/>
        <rect x="7"  y="7" width="14" height="1"/>
        <rect x="6"  y="8" width="16" height="1"/>
        <rect x="6"  y="9" width="16" height="1"/>
        <rect x="6"  y="10" width="16" height="1"/>
        <rect x="6"  y="11" width="16" height="1"/>
        <rect x="7"  y="12" width="14" height="1"/>
        <rect x="7"  y="13" width="14" height="1"/>
        <rect x="8"  y="14" width="12" height="1"/>
        <rect x="9"  y="15" width="10" height="1"/>
        <rect x="10" y="16" width="8" height="1"/>
        <rect x="12" y="17" width="4" height="1"/>
      </g>
      <g fill="#7d55b4" opacity="0.55">
        <rect x="10" y="13" width="11" height="1"/>
        <rect x="11" y="14" width="9" height="1"/>
        <rect x="12" y="15" width="7" height="1"/>
        <rect x="13" y="16" width="5" height="1"/>
        <rect x="13" y="17" width="3" height="1"/>
      </g>
      <g fill="#ecd9ff" opacity="0.34">
        <rect x="10" y="4" width="5" height="1"/>
        <rect x="9"  y="5" width="5" height="1"/>
        <rect x="8"  y="6" width="4" height="1"/>
      </g>
      <g fill="#a074c8" opacity="0.40">
        <rect x="8"  y="9" width="5" height="1"/>
        <rect x="15" y="11" width="6" height="1"/>
      </g>
      <g fill="#e2cdfa">
        <rect x="1"  y="11" width="26" height="1" opacity="0.80"/>
        <rect x="0"  y="11" width="1"  height="1" opacity="0.40"/>
        <rect x="27" y="11" width="1"  height="1" opacity="0.40"/>
        <rect x="3"  y="12" width="8"  height="1" opacity="0.32"/>
        <rect x="17" y="12" width="8"  height="1" opacity="0.32"/>
      </g>
    </svg>
  </div>

  <div class="space-body sb-moon">
    <svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" style="image-rendering:pixelated;display:block;width:100%;height:auto;">
      <g fill="#dde6f4">
        <rect x="4" y="0"  width="4"  height="1"/>
        <rect x="2" y="1"  width="8"  height="1"/>
        <rect x="1" y="2"  width="10" height="1"/>
        <rect x="1" y="3"  width="10" height="1"/>
        <rect x="0" y="4"  width="12" height="1"/>
        <rect x="0" y="5"  width="12" height="1"/>
        <rect x="0" y="6"  width="12" height="1"/>
        <rect x="0" y="7"  width="12" height="1"/>
        <rect x="1" y="8"  width="10" height="1"/>
        <rect x="1" y="9"  width="10" height="1"/>
        <rect x="2" y="10" width="8"  height="1"/>
        <rect x="4" y="11" width="4"  height="1"/>
      </g>
      <g fill="#94a6c2" opacity="0.50">
        <rect x="5" y="8"  width="6" height="1"/>
        <rect x="5" y="9"  width="5" height="1"/>
        <rect x="6" y="10" width="4" height="1"/>
        <rect x="5" y="11" width="3" height="1"/>
      </g>
      <g fill="#8fa2c0" opacity="0.45">
        <rect x="3" y="3" width="2" height="2"/>
        <rect x="7" y="6" width="2" height="1"/>
        <rect x="2" y="6" width="1" height="1"/>
      </g>
    </svg>
  </div>

  <div class="space-body sb-far">
    <svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg" style="image-rendering:pixelated;display:block;width:100%;height:auto;">
      <g fill="#7d9ae6">
        <rect x="3" y="0" width="4"  height="1"/>
        <rect x="1" y="1" width="8"  height="1"/>
        <rect x="1" y="2" width="8"  height="1"/>
        <rect x="0" y="3" width="10" height="1"/>
        <rect x="0" y="4" width="10" height="1"/>
        <rect x="0" y="5" width="10" height="1"/>
        <rect x="0" y="6" width="10" height="1"/>
        <rect x="1" y="7" width="8"  height="1"/>
        <rect x="1" y="8" width="8"  height="1"/>
        <rect x="3" y="9" width="4"  height="1"/>
      </g>
      <g fill="#4f68b8" opacity="0.55">
        <rect x="1" y="7" width="8" height="1"/>
        <rect x="2" y="8" width="7" height="1"/>
        <rect x="3" y="9" width="4" height="1"/>
      </g>
      <rect x="0" y="4" width="10" height="1" fill="#5d78c8" opacity="0.40"/>
      <g fill="#c3d6ff" opacity="0.38">
        <rect x="2" y="1" width="3" height="1"/>
        <rect x="1" y="2" width="3" height="1"/>
      </g>
    </svg>
  </div>

  <div class="space-body sb-cluster">
    <svg viewBox="0 0 16 12" xmlns="http://www.w3.org/2000/svg" style="image-rendering:pixelated;display:block;width:100%;height:auto;">
      <g fill="#ffffff">
        <rect x="3" y="1" width="1" height="3" opacity="0.75"/>
        <rect x="2" y="2" width="3" height="1" opacity="0.75"/>
        <rect x="11" y="6" width="1" height="3" opacity="0.62"/>
        <rect x="10" y="7" width="3" height="1" opacity="0.62"/>
        <rect x="8" y="2" width="1" height="1" opacity="0.70"/>
        <rect x="14" y="3" width="1" height="1" opacity="0.48"/>
        <rect x="6" y="9" width="1" height="1" opacity="0.55"/>
        <rect x="1" y="8" width="1" height="1" opacity="0.40"/>
        <rect x="13" y="10" width="1" height="1" opacity="0.35"/>
      </g>
    </svg>
  </div>

</div>
`;

  /* ---------------------------------------------------------------------
     MOUNTING

     Each sprite is placed into a placeholder the page provides, or appended
     to <body> for the two that are position:fixed. A page that leaves out a
     placeholder simply does not get that sprite, and everything below guards
     for the element being absent.
     --------------------------------------------------------------------- */
  function mount(html, parent) {
    if (!parent) return null;
    var holder = document.createElement('div');
    holder.innerHTML = html.trim();
    var node = holder.firstElementChild;
    parent.appendChild(node);
    return node;
  }

  // The moving sprites belong to the landing page only. Every other page is
  // meant to read as quiet, so they are not mounted at all there -- the
  // starfield and gradients in the stylesheet still carry the identity. The
  // landing page is the one with the hero block.
  mount(SPRITES.backdrop, document.body);
  mount('<div class="content-scrim" aria-hidden="true"></div>', document.body);

  var isLanding = !!document.getElementById('hero');
  if (isLanding) {
    mount(SPRITES.rocket, document.body);
    mount(SPRITES.shootingStar, document.body);
  }

  // Hero decoration: only on the page that has the hero block.
  var heroDecor = document.getElementById('hero-decor');
  if (heroDecor) {
    mount(SPRITES.solarSystem, heroDecor);
    mount(SPRITES.heroComet, heroDecor);
  }

  // The alien waves from the contact card, wherever that card lives.
  var alienWrap = document.getElementById('alien');
  if (alienWrap) alienWrap.innerHTML = SPRITES.alien;

  // The abstract modal is only built if the page has something to show in it.
  var hasAbstracts = document.querySelector('[data-abstract]');
  if (hasAbstracts) mount(SPRITES.abstractModal, document.body);

  /* ---------------------------------------------------------------------
     SHOOTING STARS
     Fire on a random interval, and occasionally on scroll.
     --------------------------------------------------------------------- */
  var shootingStar = document.getElementById('shooting-star');
  var isAnimating = false;

  function randomRange(min, max) {
    return min + Math.random() * (max - min);
  }

  function launchRandomShootingStar() {
    if (isAnimating || !shootingStar) return;
    isAnimating = true;

    var startX = randomRange(0, window.innerWidth * 0.7);
    var startY = randomRange(window.innerHeight * 0.05, window.innerHeight * 0.85);
    var angleDeg = randomRange(-25, 25);
    var travelDist = window.innerWidth * randomRange(0.45, 0.9);
    var endX = startX + travelDist;
    var endY = startY + travelDist * Math.tan(angleDeg * Math.PI / 180);

    shootingStar.style.transition = 'none';
    shootingStar.style.opacity = '0';
    shootingStar.style.left = startX + 'px';
    shootingStar.style.top = startY + 'px';
    shootingStar.style.transform = 'rotate(' + angleDeg + 'deg)';
    void shootingStar.offsetHeight;

    var duration = randomRange(0.45, 1.1);
    shootingStar.style.transition =
      'left ' + duration + 's linear, top ' + duration + 's linear, opacity 0.12s linear';

    requestAnimationFrame(function () {
      shootingStar.style.opacity = '0.85';
      shootingStar.style.left = endX + 'px';
      shootingStar.style.top = endY + 'px';
      setTimeout(function () {
        shootingStar.style.opacity = '0';
        setTimeout(function () { isAnimating = false; }, 200);
      }, duration * 1000);
    });
  }

  function scheduleRandomStar() {
    setTimeout(function () {
      if (!isAnimating) launchRandomShootingStar();
      scheduleRandomStar();
    }, randomRange(2500, 8000));
  }

  var lastScrollFire = 0;
  window.addEventListener('scroll', function () {
    var now = Date.now();
    if (now - lastScrollFire > 1200 && !isAnimating && Math.random() < 0.28) {
      lastScrollFire = now;
      launchRandomShootingStar();
    }
  }, { passive: true });

  if (shootingStar) {
    setTimeout(function () { if (!isAnimating) launchRandomShootingStar(); }, 1800);
    scheduleRandomStar();
  }

  /* ---------------------------------------------------------------------
     ROCKET

     Flies across as you scroll. The old version keyed off the #projects and
     #about sections, which only existed on the single-page site. It now keys
     off scroll depth instead, so it behaves the same on every page: once on
     leaving the top, once around the middle, and it rearms at the top.
     --------------------------------------------------------------------- */
  var rocket = document.getElementById('rocket');
  var rocketActive = false;
  var rocketFrame = null;
  var rocketPhase = 0;
  var ROCKET_TRAVEL = 600;

  function launchRocket(laneY) {
    if (rocketActive || !rocket) return;
    rocketActive = true;

    rocket.style.transition = '';
    rocket.style.left = '-140px';
    rocket.style.top = laneY + 'px';
    rocket.style.opacity = '0.65';
    void rocket.offsetHeight;

    var startScrollY = window.scrollY;

    function animateRocket() {
      var progress = Math.min((window.scrollY - startScrollY) / ROCKET_TRAVEL, 1);
      rocket.style.left = (-140 + progress * (window.innerWidth + 280)) + 'px';

      if (progress < 1 && rocketActive) {
        rocketFrame = requestAnimationFrame(animateRocket);
      } else {
        if (rocketActive) {
          rocket.style.opacity = '0';
          rocketActive = false;
        }
        if (rocketFrame) {
          cancelAnimationFrame(rocketFrame);
          rocketFrame = null;
        }
      }
    }

    if (rocketFrame) cancelAnimationFrame(rocketFrame);
    rocketFrame = requestAnimationFrame(animateRocket);
  }

  function checkAndLaunchRocket() {
    if (!rocket) return;
    var scrollY = window.scrollY;
    var scrollable = document.body.scrollHeight - window.innerHeight;

    // Phase 0 -> 1: just past the top of the page.
    if (rocketPhase === 0 && scrollY > 80 && !rocketActive) {
      launchRocket(72 + Math.random() * 40);
      rocketPhase = 1;
      return;
    }

    // Phase 1 -> 2: around the middle, on pages long enough to have one.
    if (rocketPhase === 1 && !rocketActive && scrollable > 900 &&
        scrollY > scrollable * 0.5) {
      launchRocket(64 + Math.random() * 50);
      rocketPhase = 2;
      return;
    }

    // Back at the top: rearm.
    if (scrollY < 60) {
      rocketPhase = 0;
      if (rocketActive) {
        rocketActive = false;
        rocket.style.opacity = '0';
        if (rocketFrame) {
          cancelAnimationFrame(rocketFrame);
          rocketFrame = null;
        }
      }
    }
  }

  window.addEventListener('scroll', checkAndLaunchRocket, { passive: true });
  setTimeout(checkAndLaunchRocket, 100);

  /* ---------------------------------------------------------------------
     ALIEN - fades in while the contact card is on screen.
     --------------------------------------------------------------------- */
  var contactGlass = document.getElementById('contact-glass');
  if (alienWrap && contactGlass) {
    var alienObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        alienWrap.style.opacity = entry.isIntersecting ? '1' : '0';
      });
    }, { threshold: 0.3 });
    alienObs.observe(contactGlass);
  }

  /* ---------------------------------------------------------------------
     SCROLL REVEAL
     --------------------------------------------------------------------- */
  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal, .stagger').forEach(function (el) {
    revealObserver.observe(el);
  });

  /* ---------------------------------------------------------------------
     MOBILE NAV DRAWER
     --------------------------------------------------------------------- */
  var hamburger = document.getElementById('nav-hamburger');
  var drawer = document.getElementById('nav-drawer');

  function closeDrawer() {
    if (hamburger) hamburger.classList.remove('open');
    if (drawer) drawer.classList.remove('open');
  }

  if (hamburger && drawer) {
    hamburger.addEventListener('click', function () {
      var isOpen = hamburger.classList.toggle('open');
      drawer.classList.toggle('open', isOpen);
    });
    window.addEventListener('scroll', closeDrawer, { passive: true });
  }
  window.closeDrawer = closeDrawer;

  /* ---------------------------------------------------------------------
     ABSTRACT MODAL

     Wired by delegation, so a publication entry needs only a data-abstract
     attribute rather than an inline onclick handler.
     --------------------------------------------------------------------- */
  function openAbstractModal(el) {
    var modal = document.getElementById('abstract-modal');
    if (!modal) return;
    document.getElementById('modal-title').textContent = el.dataset.title || '';
    document.getElementById('modal-authors').textContent = el.dataset.authors || '';
    document.getElementById('modal-venue').textContent = el.dataset.venue || '';
    document.getElementById('modal-abstract').textContent = el.dataset.abstract || '';
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeAbstractModal() {
    var modal = document.getElementById('abstract-modal');
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (hasAbstracts) {
    document.querySelectorAll('[data-abstract]').forEach(function (el) {
      el.addEventListener('click', function () { openAbstractModal(el); });
      el.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openAbstractModal(el);
        }
      });
    });

    // Click the backdrop or the close button to dismiss.
    document.addEventListener('click', function (e) {
      if (e.target.id === 'abstract-modal' ||
          e.target.classList.contains('abstract-modal-close')) {
        closeAbstractModal();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeAbstractModal();
    });
  }

  window.openAbstractModal = openAbstractModal;
  window.closeAbstractModal = closeAbstractModal;

  /* ---------------------------------------------------------------------
     SUB-TABS

     Pages that carry a lot of content (Experience, Projects) show one group
     at a time instead of stacking every group into a long scroll. A group is
     marked up as:

       <div data-subtab-group>
         <div class="subtabs" role="tablist"> <button class="subtab"
              data-panel="research" ...> </div>
         <section class="subtab-panel" data-panel="research"> ... </section>
       </div>

     The panel name doubles as a URL hash, so experience.html#theses opens
     that group directly. A hash that names an element *inside* a panel (for
     example #jpl, which the home page links to) opens the panel holding it
     and scrolls there.
     --------------------------------------------------------------------- */
  function initSubtabGroup(group) {
    var tabs = Array.prototype.slice.call(group.querySelectorAll('.subtab'));
    var panels = Array.prototype.slice.call(group.querySelectorAll('.subtab-panel'));
    if (!tabs.length || !panels.length) return;

    function revealWithin(panel) {
      // A hidden panel never intersects the viewport, so the scroll-reveal
      // observer never fires for it and its children would stay at opacity 0.
      // Mark them visible as the panel opens.
      panel.querySelectorAll('.reveal, .stagger').forEach(function (el) {
        el.classList.add('visible');
      });
    }

    function activate(name, updateHash) {
      var match = panels.some(function (p) { return p.dataset.panel === name; });
      if (!match) return false;

      tabs.forEach(function (tab) {
        var on = tab.dataset.panel === name;
        tab.classList.toggle('active', on);
        tab.setAttribute('aria-selected', on ? 'true' : 'false');
        tab.tabIndex = on ? 0 : -1;
      });

      panels.forEach(function (panel) {
        var on = panel.dataset.panel === name;
        panel.classList.toggle('active', on);
        panel.hidden = !on;
        if (on) revealWithin(panel);
      });

      if (updateHash && window.history && window.history.replaceState) {
        window.history.replaceState(null, '', '#' + name);
      }
      return true;
    }

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        activate(tab.dataset.panel, true);
      });
    });

    // Left/right arrows move between tabs, per the usual tablist convention.
    var list = group.querySelector('.subtabs');
    if (list) {
      list.addEventListener('keydown', function (e) {
        var i = tabs.indexOf(document.activeElement);
        if (i === -1) return;
        var next = null;
        if (e.key === 'ArrowRight') next = tabs[(i + 1) % tabs.length];
        else if (e.key === 'ArrowLeft') next = tabs[(i - 1 + tabs.length) % tabs.length];
        else if (e.key === 'Home') next = tabs[0];
        else if (e.key === 'End') next = tabs[tabs.length - 1];
        if (!next) return;
        e.preventDefault();
        next.focus();
        activate(next.dataset.panel, true);
      });
    }

    // Opening state: honour the hash if it points at a panel or at something
    // inside one, otherwise fall back to the first tab.
    var hash = (window.location.hash || '').replace(/^#/, '');
    var opened = false;

    if (hash) {
      if (activate(hash, false)) {
        opened = true;
      } else {
        var target = document.getElementById(hash);
        var owner = target && target.closest ? target.closest('.subtab-panel') : null;
        if (owner && activate(owner.dataset.panel, false)) {
          opened = true;
          setTimeout(function () {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 80);
        }
      }
    }

    if (!opened) activate(tabs[0].dataset.panel, false);
  }

  document.querySelectorAll('[data-subtab-group]').forEach(initSubtabGroup);

})();
