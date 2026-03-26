/* ============================================
   OZTV BROADCAST EFFECTS ENGINE
   "Now broadcasting from the Greater Toronto Area"
   ============================================ */

// === SLIME CURSOR TRAIL ===
const sparkleEmojis = ['💚', '🟢', '☘️', '🧪', '📺', '⚡'];
let sparkleThrottle = 0;

document.addEventListener('mousemove', (e) => {
  sparkleThrottle++;
  if (sparkleThrottle % 3 !== 0) return;

  const sparkle = document.createElement('div');
  sparkle.className = 'sparkle';
  sparkle.textContent = sparkleEmojis[Math.floor(Math.random() * sparkleEmojis.length)];
  sparkle.style.left = (e.clientX + (Math.random() - 0.5) * 20) + 'px';
  sparkle.style.top = (e.clientY + (Math.random() - 0.5) * 20) + 'px';
  sparkle.style.fontSize = (12 + Math.random() * 16) + 'px';
  document.body.appendChild(sparkle);

  setTimeout(() => sparkle.remove(), 800);
});

// === FALLING TV DEBRIS ===
const snowEmojis = ['📺', '📡', '🎬', '📼', '🎮', '🟢', '🟣', '🟠'];

function createSnowflake() {
  const flake = document.createElement('div');
  flake.className = 'snowflake';
  flake.textContent = snowEmojis[Math.floor(Math.random() * snowEmojis.length)];
  flake.style.left = Math.random() * 100 + 'vw';
  flake.style.fontSize = (14 + Math.random() * 20) + 'px';
  flake.style.animationDuration = (4 + Math.random() * 6) + 's';
  flake.style.opacity = 0.4 + Math.random() * 0.6;
  document.body.appendChild(flake);

  setTimeout(() => flake.remove(), 10000);
}

setInterval(createSnowflake, 600);

// === FLOATING CHANNEL BUMPER EMOJIS ===
const floatEmojis = ['📺', '📡', '🎬', '📼', '🎵', '🟢', '🟣', '🎸', '🤘', '💀'];

function createFloatingEmoji() {
  const emoji = document.createElement('div');
  emoji.className = 'floating-emoji';
  emoji.textContent = floatEmojis[Math.floor(Math.random() * floatEmojis.length)];
  emoji.style.left = Math.random() * 100 + 'vw';
  emoji.style.animationDuration = (4 + Math.random() * 4) + 's';
  document.body.appendChild(emoji);

  setTimeout(() => emoji.remove(), 8000);
}

setInterval(createFloatingEmoji, 2000);

// === EYES THAT FOLLOW MOUSE ===
function initEyes() {
  const eyes = document.querySelectorAll('.eye');

  document.addEventListener('mousemove', (e) => {
    eyes.forEach(eye => {
      const pupil = eye.querySelector('.pupil');
      const rect = eye.getBoundingClientRect();
      const eyeCenterX = rect.left + rect.width / 2;
      const eyeCenterY = rect.top + rect.height / 2;

      const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);
      const maxDist = 10;
      const dist = Math.min(
        Math.hypot(e.clientX - eyeCenterX, e.clientY - eyeCenterY) / 10,
        maxDist
      );

      const x = Math.cos(angle) * dist;
      const y = Math.sin(angle) * dist;

      pupil.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
    });
  });
}

// === TV BROADCAST POPUP SYSTEM ===
const popupMessages = [
  { title: '📺 CHANNEL OZTV ALERT', icon: '📡', message: 'You are now tuned to OZTV — the only channel with a 100% acquisition rate!', buttons: ['Stay Tuned', 'Change Channel'] },
  { title: '⚠️ SIGNAL INTERRUPTION', icon: '📺', message: 'We are experiencing TOO MUCH TALENT in the broadcast area.', buttons: ['OK', 'Boost Signal'] },
  { title: '🎬 VIEWER POLL', icon: '🗳️', message: 'Should Omar go for acquisition #4? Call 1-800-GTM-WIZARD now!', buttons: ['YES', 'ABSOLUTELY YES'] },
  { title: '📼 VHS ALERT', icon: '📼', message: 'This broadcast is being recorded on VHS for archival purposes. Be kind, rewind.', buttons: ['Rewind', 'Fast Forward'] },
  { title: '🟢 SLIME TIME!', icon: '🟢', message: 'YOU JUST GOT SLIMED! (virtually)', buttons: ['Ewww', 'SLIME ME AGAIN'] },
  { title: '📡 SATELLITE UPLINK', icon: '🛰️', message: 'Acquiring satellite feed from Omar\'s acquisition headquarters...', buttons: ['Connect', 'Scramble Signal'] },
];

let popupCount = 0;
const MAX_POPUPS = 3;

function showFakePopup() {
  if (popupCount >= MAX_POPUPS) return;

  const msg = popupMessages[Math.floor(Math.random() * popupMessages.length)];
  const popup = document.createElement('div');
  popup.className = 'fake-popup active';
  popup.style.top = (50 + Math.random() * 300) + 'px';
  popup.style.left = (50 + Math.random() * (window.innerWidth - 450)) + 'px';

  popup.innerHTML = `
    <div class="fake-popup-titlebar">
      <span>${msg.title}</span>
      <span class="close-btn" onclick="this.closest('.fake-popup').remove(); popupCount--;">X</span>
    </div>
    <div class="fake-popup-body">
      <div class="popup-icon">${msg.icon}</div>
      <p>${msg.message}</p>
      ${msg.buttons.map(b => `<button onclick="this.closest('.fake-popup').remove(); popupCount--; showFakePopup();">${b}</button>`).join(' ')}
    </div>
  `;

  document.body.appendChild(popup);
  popupCount++;

  // Make it draggable
  makeDraggable(popup);
}

function makeDraggable(el) {
  const titlebar = el.querySelector('.fake-popup-titlebar');
  let offsetX, offsetY, isDragging = false;

  titlebar.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - el.offsetLeft;
    offsetY = e.clientY - el.offsetTop;
    el.style.zIndex = 10000 + popupCount;
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    el.style.left = (e.clientX - offsetX) + 'px';
    el.style.top = (e.clientY - offsetY) + 'px';
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
  });
}

// Show first popup after 5 seconds, then randomly
setTimeout(showFakePopup, 5000);
setTimeout(showFakePopup, 15000);
setTimeout(showFakePopup, 30000);

// === VISITOR COUNTER (FAKE, obviously) ===
function initVisitorCounter() {
  const counter = document.getElementById('visitor-count');
  if (!counter) return;

  // Generate a convincingly fake number
  let count = 48173 + Math.floor(Math.random() * 1000);
  const digits = counter.querySelectorAll('.odo-digit');

  function updateCounter() {
    count += Math.floor(Math.random() * 3);
    const str = count.toString().padStart(digits.length, '0');
    digits.forEach((d, i) => {
      d.textContent = str[i];
    });
  }

  updateCounter();
  setInterval(updateCounter, 3000 + Math.random() * 5000);
}

// === DANCING LETTERS ===
function initDancingLetters() {
  document.querySelectorAll('.dance-text').forEach(el => {
    const text = el.textContent;
    el.textContent = '';
    [...text].forEach((char, i) => {
      const span = document.createElement('span');
      span.className = 'dance-letter';
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.animationDelay = (i * 0.08) + 's';
      // YTV/MuchMusic color scheme
      const colors = ['#39ff14', '#7B2D8E', '#FF6B00', '#FFD700', '#FF1493', '#39ff14', '#7B2D8E'];
      span.style.color = colors[i % colors.length];
      el.appendChild(span);
    });
  });
}

// === TV STATIC BACKGROUND ===
function initTVStatic() {
  const canvas = document.getElementById('matrix-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  // Render at half resolution for performance
  const scale = 0.5;
  canvas.width = Math.floor(window.innerWidth * scale);
  canvas.height = Math.floor(window.innerHeight * scale);

  function draw() {
    const imageData = ctx.createImageData(canvas.width, canvas.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const v = Math.random() * 255;
      data[i] = data[i + 1] = data[i + 2] = v;
      data[i + 3] = 255;
    }
    ctx.putImageData(imageData, 0, 0);
  }

  setInterval(draw, 66); // ~15fps for performance

  window.addEventListener('resize', () => {
    canvas.width = Math.floor(window.innerWidth * scale);
    canvas.height = Math.floor(window.innerHeight * scale);
  });
}

// === LIVE CLOCK ===
function initLiveClock() {
  const el = document.getElementById('live-clock');
  if (!el) return;
  function update() {
    el.textContent = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  }
  update();
  setInterval(update, 1000);
}

// === VHS TIMESTAMP ===
function initVHSTimestamp() {
  const el = document.getElementById('vhs-time');
  if (!el) return;
  function update() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    el.textContent = h + ':' + m + ':' + s;
  }
  update();
  setInterval(update, 1000);
}

// === KONAMI CODE EASTER EGG ===
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
  if (e.key === konamiCode[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) {
      konamiIndex = 0;
      activateKonamiMode();
    }
  } else {
    konamiIndex = 0;
  }
});

function activateKonamiMode() {
  document.body.style.animation = 'spin360 2s linear';
  setTimeout(() => {
    document.body.style.animation = '';
    // Spawn 50 emojis
    for (let i = 0; i < 50; i++) {
      setTimeout(createFloatingEmoji, i * 50);
    }
    // Show special popup
    const popup = document.createElement('div');
    popup.className = 'fake-popup active';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.innerHTML = `
      <div class="fake-popup-titlebar">
        <span>📺 SECRET CHANNEL UNLOCKED!!! 🎮</span>
        <span class="close-btn" onclick="this.closest('.fake-popup').remove();">X</span>
      </div>
      <div class="fake-popup-body">
        <div class="popup-icon">🏆</div>
        <p style="font-size:16px;"><b>YOU FOUND THE KONAMI CODE!</b><br>You've unlocked OZTV's secret channel. Welcome to the inner circle.</p>
        <button onclick="this.closest('.fake-popup').remove();">I AM THE CHOSEN VIEWER</button>
      </div>
    `;
    document.body.appendChild(popup);
    makeDraggable(popup);
  }, 2000);
}

// === RIGHT-CLICK TROLL ===
document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  const popup = document.createElement('div');
  popup.className = 'fake-popup active';
  popup.style.top = e.clientY + 'px';
  popup.style.left = Math.min(e.clientX, window.innerWidth - 350) + 'px';
  popup.innerHTML = `
    <div class="fake-popup-titlebar">
      <span>📡 Signal Piracy Detected! 😏</span>
      <span class="close-btn" onclick="this.closest('.fake-popup').remove();">X</span>
    </div>
    <div class="fake-popup-body">
      <div class="popup-icon">🚫</div>
      <p>This broadcast is protected by <b>OZTV's proprietary signal encryption</b>.<br>Nice try, signal pirate!</p>
      <button onclick="this.closest('.fake-popup').remove();">I'm Sorry</button>
    </div>
  `;
  document.body.appendChild(popup);
  makeDraggable(popup);
});

// === INIT ALL EFFECTS ===
document.addEventListener('DOMContentLoaded', () => {
  initEyes();
  initVisitorCounter();
  initDancingLetters();
  initTVStatic();
  initLiveClock();
  initVHSTimestamp();

  // Start with a welcome broadcast
  setTimeout(() => {
    const welcomePopup = document.createElement('div');
    welcomePopup.className = 'fake-popup active';
    welcomePopup.style.top = '100px';
    welcomePopup.style.left = Math.max(50, (window.innerWidth / 2) - 200) + 'px';
    welcomePopup.innerHTML = `
      <div class="fake-popup-titlebar">
        <span>📺 WELCOME TO OZTV!</span>
        <span class="close-btn" onclick="this.closest('.fake-popup').remove();">X</span>
      </div>
      <div class="fake-popup-body">
        <div class="popup-icon">📡</div>
        <p><b>NOW BROADCASTING!</b><br>You are tuned to OZTV — Channel 03.<br>Please adjust your rabbit ears for optimal reception.</p>
        <button onclick="this.closest('.fake-popup').remove();">📺 Start Watching</button>
      </div>
    `;
    document.body.appendChild(welcomePopup);
    makeDraggable(welcomePopup);
  }, 1500);
});
