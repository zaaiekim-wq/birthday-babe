/* ===== GIFT INTERACTION & FLOWER BLOOMING SCRIPT ===== */

const GIFT_CONFIG = {
  name: "zaa",
  heading: "Happy Birthday! ✨",
  subheading: "Sebuah kado spesial penuh doa & cinta untuk sayangku♡",
  message: `Bagaikan bunga yang mekar dengan indah dan menebarkan keharuman, semoga di usia barumu ini setiap hari selalu dipenuhi tawa, kesehatan, dan kebahagiaan yang melimpah.

Terima kasih sudah menjadi sosok yang begitu istimewa dan senantiasa membawa kehangatan bagi orang-orang di sekitarmu. Semoga semua impian dan doa terbaikmu segera terwujud nyata! ♡`,
  signoff: "— With all my love & best wishes ♡ —"
};

const $ = id => document.getElementById(id);

// Personalize Card from CONFIG
if ($('cardMessage')) $('cardMessage').innerHTML = GIFT_CONFIG.message.replace(/\n\n/g, '<br><br>');

// Audio handling
const audio = $('giftAudio');
const musicBtn = $('giftMusicBtn');
const musicLabel = $('giftMusicLabel');

function playMusic() {
  if (!audio) return;
  audio.play().then(() => {
    if (musicLabel) musicLabel.textContent = 'MUSIC ON';
    if (musicBtn) musicBtn.classList.add('playing');
  }).catch(() => {
    if (musicLabel) musicLabel.textContent = 'ADD MP3';
  });
}

if (musicBtn) {
  musicBtn.onclick = () => {
    if (audio.paused) playMusic();
    else {
      audio.pause();
      if (musicLabel) musicLabel.textContent = 'MUSIC OFF';
      musicBtn.classList.remove('playing');
    }
  };
}

// Magical Musical Chime (Web Audio API - Works seamlessly without external files!)
function playMagicChime() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    // Pentatonic scale chime notes: C5, E5, G5, B5, D6, E6
    const freqs = [523.25, 659.25, 783.99, 987.77, 1174.66, 1318.51];
    
    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.12);

      gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.12);
      gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + idx * 0.12 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.12 + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.12);
      osc.stop(ctx.currentTime + idx * 0.12 + 1.3);
    });
  } catch (e) {
    // Audio context fallback if blocked
  }
}

// Falling Flower Petals Shower
const petalsWrap = $('flowerPetalsWrap');
const petalIcons = ['🌸', '🌺', '🌷', '🌼', '🌹', '✨', '💖', '✿'];

function spawnPetal(isBurst = false) {
  if (!petalsWrap) return;
  const p = document.createElement('div');
  p.className = 'falling-petal';
  p.textContent = petalIcons[Math.floor(Math.random() * petalIcons.length)];

  const startX = Math.random() * 100;
  const duration = isBurst ? (3.5 + Math.random() * 3.5) : (6 + Math.random() * 6);
  const size = 14 + Math.random() * 16;
  const delay = Math.random() * 1.2;

  p.style.left = startX + 'vw';
  p.style.fontSize = size + 'px';
  p.style.animationDuration = duration + 's';
  p.style.animationDelay = delay + 's';

  petalsWrap.appendChild(p);

  setTimeout(() => {
    p.remove();
  }, (duration + delay + 1) * 1000);
}

function rainPetals(count = 25, isBurst = false) {
  for (let i = 0; i < count; i++) {
    setTimeout(() => spawnPetal(isBurst), i * (isBurst ? 35 : 180));
  }
}

// Continuous subtle ambient falling petals
let ambientInterval = setInterval(() => {
  spawnPetal(false);
}, 900);

// Gift Box Opening & Flower Blooming Sequence
const box = $('giftBoxContainer');
const bouquet = $('flowersBouquet');
const surpriseCard = $('surpriseCard');
const heading = $('giftHeading');
const sub = $('giftSub');
let hasOpened = false;

function openGiftSequence() {
  if (hasOpened) return;
  hasOpened = true;

  // Step 1: Wiggle anticipation
  box.classList.add('wiggling');

  setTimeout(() => {
    // Step 2: Lid pops off and opens
    box.classList.remove('wiggling');
    box.classList.add('opened');

    // Play sounds
    playMagicChime();
    playMusic();

    // Step 3: Flowers emerge and bloom!
    setTimeout(() => {
      bouquet.classList.add('bloomed');
      if (heading) heading.textContent = GIFT_CONFIG.heading;
      if (sub) sub.textContent = GIFT_CONFIG.subheading;

      // Heavy flower petal burst
      rainPetals(50, true);

      // Step 4: Card reveals
      setTimeout(() => {
        surpriseCard.classList.add('visible');
        surpriseCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 1000);

    }, 350);

  }, 650);
}

// Click to Open Box
if (box) {
  box.addEventListener('click', openGiftSequence);
  box.addEventListener('touchend', (e) => {
    e.preventDefault();
    openGiftSequence();
  });
}

// Re-bloom Button Action
const reBloomBtn = $('reBloomBtn');
if (reBloomBtn) {
  reBloomBtn.addEventListener('click', () => {
    playMagicChime();
    rainPetals(40, true);

    // Subtle flower bouquet re-accentuate
    if (bouquet) {
      bouquet.style.transform = 'translateX(-50%) translateY(-125px) scale(1.06)';
      setTimeout(() => {
        bouquet.style.transform = 'translateX(-50%) translateY(-110px) scale(1)';
      }, 450);
    }
  });
}

// Auto open after 1.2s if user navigated from the main page
window.addEventListener('load', () => {
  setTimeout(() => {
    if (!hasOpened) {
      openGiftSequence();
    }
  }, 1200);
});
