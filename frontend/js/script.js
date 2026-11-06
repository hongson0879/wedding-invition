// Ngày cưới - chỉnh tại đây
const WEDDING_DATE = new Date('2027-03-28T11:00:00+07:00');

// Link Google Maps của địa điểm tiệc
const MAP_URL = 'https://www.google.com/maps/search/?api=1&query=White+Palace+Pham+Van+Dong';

// Thông tin nhận tiền mừng (THAY bằng thông tin thật)
// BANK: mã ngân hàng theo VietQR (vd: VCB, TCB, MB, ACB, BIDV, VPB, TPB...)
const BANK = { id: 'VCB', account: '0123456789', name: 'DANG HONG SON' };

const $ = id => document.getElementById(id);

// Tạo mã QR
$('qrMap').src = 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&margin=8&data=' + encodeURIComponent(MAP_URL);
$('qrGift').src = `https://img.vietqr.io/image/${BANK.id}-${BANK.account}-compact2.png?accountName=${encodeURIComponent(BANK.name)}&addInfo=${encodeURIComponent('Mung cuoi Hong Son - To Ha')}`;
$('bankInfo').innerHTML = `${BANK.id} - ${BANK.account}<br>${BANK.name}`;

// Mở thiệp
$('openBtn').addEventListener('click', () => {
  $('envelope').classList.add('open');
  $('card').classList.remove('hidden');
  observeReveal();
  toggleMusic(true);
});

// Đếm ngược
function tick() {
  let diff = Math.max(0, WEDDING_DATE - new Date());
  $('d').textContent = Math.floor(diff / 864e5);
  $('h').textContent = Math.floor(diff / 36e5) % 24;
  $('m').textContent = Math.floor(diff / 6e4) % 60;
  $('s').textContent = Math.floor(diff / 1e3) % 60;
}
tick(); setInterval(tick, 1000);

// Hiệu ứng cuộn
function observeReveal() {
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('show'); io.unobserve(e.target); }
  }), { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
}

// Nhạc nền (đặt file music.mp3 vào assets/audio/ để có nhạc)
const audio = new Audio('assets/audio/music.mp3');
audio.loop = true;
function toggleMusic(forcePlay) {
  if (forcePlay === true || audio.paused) {
    audio.play().then(() => $('musicBtn').classList.add('playing')).catch(() => {});
  } else {
    audio.pause(); $('musicBtn').classList.remove('playing');
  }
}
$('musicBtn').addEventListener('click', () => toggleMusic());

// RSVP + lời chúc (lưu localStorage)
function renderWishes() {
  const list = JSON.parse(localStorage.getItem('wishes') || '[]');
  $('wishes').innerHTML = '';
  list.slice().reverse().forEach(w => {
    const div = document.createElement('div');
    div.className = 'wish';
    const b = document.createElement('b');
    b.textContent = w.name;
    const p = document.createElement('p');
    p.textContent = w.wish;
    div.append(b, p);
    $('wishes').appendChild(div);
  });
}
$('rsvpForm').addEventListener('submit', e => {
  e.preventDefault();
  const list = JSON.parse(localStorage.getItem('wishes') || '[]');
  const wish = $('wish').value.trim();
  if (wish) list.push({ name: $('name').value.trim(), wish });
  localStorage.setItem('wishes', JSON.stringify(list));
  alert($('attend').value === 'yes'
    ? `Cảm ơn ${$('name').value}! Hẹn gặp bạn tại tiệc cưới 💕`
    : 'Cảm ơn bạn đã phản hồi. Chúng tôi rất tiếc vì sự vắng mặt của bạn!');
  e.target.reset();
  renderWishes();
});
renderWishes();

// Cánh hoa rơi
const cv = $('petals'), ctx = cv.getContext('2d');
function resize() { cv.width = innerWidth; cv.height = innerHeight; }
resize(); addEventListener('resize', resize);
const petals = Array.from({ length: 30 }, () => newPetal(true));
function newPetal(init) {
  return {
    x: Math.random() * innerWidth,
    y: init ? Math.random() * innerHeight : -20,
    r: 4 + Math.random() * 6,
    vy: 0.6 + Math.random() * 1.2,
    vx: -0.5 + Math.random(),
    a: Math.random() * 6.28,
    va: 0.02 + Math.random() * 0.03
  };
}
(function loop() {
  ctx.clearRect(0, 0, cv.width, cv.height);
  petals.forEach((p, i) => {
    p.y += p.vy; p.x += p.vx + Math.sin(p.a) * 0.6; p.a += p.va;
    if (p.y > cv.height + 20) petals[i] = newPetal(false);
    ctx.save();
    ctx.translate(p.x, p.y); ctx.rotate(p.a);
    ctx.fillStyle = 'rgba(232,130,155,.7)';
    ctx.beginPath(); ctx.ellipse(0, 0, p.r, p.r / 2, 0, 0, 6.28); ctx.fill();
    ctx.restore();
  });
  requestAnimationFrame(loop);
})();
