const CONFIG = {
  name: "Sayanggg",
  date: "OCTOBER 15  ·  THE MOST SPECIAL DAY",
  letterDate: "OCTOBER 15",
  sbDate: "15.10.26",
  letter: `sayang, thank you for being here, for surviving all the hard days, and for making it this far. aku mungkin ngga tau semua hal yang udah kamu lewatin, but i’m so proud of you. semoga kamu juga bisa bangga sama diri kamu sendiri karena udah bertahan sejauh ini, yaa.

semoga Allah selalu jaga kamu, mudahkan semua urusan kamu, dan kabulkan doa-doa yang selama ini kamu simpan sendiri. semoga di umur yang baru ini, kamu lebih banyak bahagia, lebih sedikit nangisnya, dan selalu dikelilingi hal-hal baik. i hope life gets kinder to you, bby.

thank you for being part of my life. semoga aku masih punya banyak kesempatan buat ngerayain ulang tahun kamu, nemenin kamu tumbuh, dan ngeliat satu per satu mimpi kamu jadi nyata.

aku seneng banget kamu lahir ke dunia ini, dan aku jauh lebih bersyukur karena kamu masih bertahan sampai hari ini. semoga kamu selalu punya alasan buat bahagia dan nggak pernah ngerasa sendirian. aku sayang kamu, dan aku bakal selalu bangga sama kamu. 🤍🫶🏻`,
  ps: "P.S. — I will always be here for you, today, tomorrow, and forever. ♡"
};

const $ = id => document.getElementById(id);
const scrollWrap = document.querySelector('.scroll-wrap');

['name1', 'name2'].forEach(id => { if ($(id)) $(id).textContent = CONFIG.name; });
if ($('date')) $('date').textContent = CONFIG.date;
if ($('ldate')) $('ldate').textContent = CONFIG.letterDate;
if ($('ps')) $('ps').textContent = CONFIG.ps;
if ($('sbDateBadge')) {
  const span = $('sbDateBadge').querySelector('span');
  if (span) span.textContent = CONFIG.sbDate;
}

const audio = $('music');

function playMusic() {
  audio.play().then(() => {
    $('musicLabel').textContent = 'MUSIC ON';
    $('musicBtn').classList.add('playing');
  }).catch(() => {
    $('musicLabel').textContent = 'ADD MP3';
  });
}

$('musicBtn').onclick = () => {
  if (audio.paused) playMusic();
  else {
    audio.pause();
    $('musicLabel').textContent = 'MUSIC OFF';
    $('musicBtn').classList.remove('playing');
  }
};

function petals(n = 12) {
  for (let i = 0; i < n; i++) {
    let p = document.createElement('span');
    p.className = 'petal';
    p.textContent = ['🌸', '✿', '🌼', '🌷', '🌺'][Math.random() * 5 | 0];
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDuration = 7 + Math.random() * 7 + 's';
    p.style.animationDelay = Math.random() * 2 + 's';
    p.style.fontSize = 12 + Math.random() * 12 + 'px';
    $('petals').appendChild(p);
    setTimeout(() => p.remove(), 16000);
  }
}

// Loading overlay fade out
window.addEventListener('load', () => {
  petals(12);
  setTimeout(() => {
    const overlay = $('loaderOverlay');
    overlay.classList.add('fade-out');
    setTimeout(() => { overlay.style.display = 'none'; }, 800);
    document.querySelector('.envelope-section').classList.add('in-view');
  }, 2800);
});

// Envelope open
let opened = false;
$('openEnv').onclick = async () => {
  if (opened) return;
  opened = true;
  $('openEnv').classList.add('open');
  playMusic();
  petals(18);
  setTimeout(() => {
    scrollWrap.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
    setTimeout(() => scrollWrap.dispatchEvent(new Event('scroll')), 100);
  }, 1100);
};

// Scroll reveal
const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      if (entry.target.id === 'letter') typeLetter();
      if (entry.target.id === 'birthday') petals(10);
    }
  });
}, { root: scrollWrap, threshold: 0.3 });

sections.forEach(s => observer.observe(s));

// Fallback: scroll-based reveal (for environments where IntersectionObserver is unreliable)
scrollWrap.addEventListener('scroll', () => {
  const scrollTop = scrollWrap.scrollTop;
  const viewH = window.innerHeight;
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (scrollTop >= sectionTop - viewH * 0.5 && scrollTop < sectionTop + viewH * 0.5) {
      if (!section.classList.contains('in-view')) {
        section.classList.add('in-view');
        if (section.id === 'letter') typeLetter();
        if (section.id === 'birthday') petals(10);
      }
    }
  });
}, { passive: true });

// Typewriter letter
let typed = false;
function typeLetter() {
  if (typed) return;
  typed = true;
  let i = 0;
  const target = $('letterCopy');
  target.textContent = '';
  const t = setInterval(() => {
    target.textContent += CONFIG.letter[i] || '';
    i++;
    if (i >= CONFIG.letter.length) {
      clearInterval(t);
      $('cursor').style.display = 'none';
    }
  }, 14);
}

// Image error handling
document.querySelectorAll('.polaroid img, .g-item img, .sb-polaroid img, .sb-strip-slot img').forEach((img, i) => {
  img.onerror = () => {
    img.alt = 'Foto kenangan ' + (i + 1);
    img.style.color = '#3a1f2b';
    img.parentElement.style.background = [
      'linear-gradient(135deg,#f4a8c0,#c4527a)',
      'linear-gradient(135deg,#f7c4d4,#e879a0)',
      'linear-gradient(135deg,#e879a0,#9c3a5e)',
      'linear-gradient(135deg,#fbcfe0,#d46890)',
      'linear-gradient(135deg,#f0a0b8,#b8406a)',
      'linear-gradient(135deg,#fad4e0,#e07098)'
    ][i % 6];
  };
});

// Gift box button click transition
const giftBtn = $('giftBoxBtn');
if (giftBtn) {
  giftBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const box = $('giftBox3D');
    if (box) {
      box.style.transform = 'scale(1.18) translateY(-14px)';
      box.style.filter = 'drop-shadow(0 0 25px #ffd54f) drop-shadow(0 0 45px #f06292)';
    }
    petals(20);
    setTimeout(() => {
      window.location.href = giftBtn.getAttribute('href');
    }, 400);
  });
}
