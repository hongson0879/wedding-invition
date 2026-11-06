/**
 * envelope.js - Xử lý hiệu ứng mở thiệp, cuộn trang (scroll reveal) và cánh hoa rơi
 */
function observeReveal() {
    const io = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
}

function initEnvelope() {
    const openBtn = document.getElementById('openBtn');
    const envelope = document.getElementById('envelope');
    const card = document.getElementById('card');

    if (openBtn && envelope && card) {
        openBtn.addEventListener('click', () => {
            envelope.classList.add('open');
            card.classList.remove('hidden');
            observeReveal();
            if (window.MusicController && WEDDING_CONFIG.music.autoPlayOnOpen) {
                MusicController.toggle(true);
            }
        });
    }
}

function initPetals() {
    const cv = document.getElementById('petals');
    if (!cv) return;
    const ctx = cv.getContext('2d');

    function resize() {
        cv.width = window.innerWidth;
        cv.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function newPetal(init) {
        return {
            x: Math.random() * window.innerWidth,
            y: init ? Math.random() * window.innerHeight : -20,
            r: 4 + Math.random() * 6,
            vy: 0.6 + Math.random() * 1.2,
            vx: -0.5 + Math.random(),
            a: Math.random() * 6.28,
            va: 0.02 + Math.random() * 0.03
        };
    }

    const petals = Array.from({ length: 30 }, () => newPetal(true));

    (function loop() {
        ctx.clearRect(0, 0, cv.width, cv.height);
        petals.forEach((p, i) => {
            p.y += p.vy;
            p.x += p.vx + Math.sin(p.a) * 0.6;
            p.a += p.va;
            if (p.y > cv.height + 20) petals[i] = newPetal(false);
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.a);
            ctx.fillStyle = 'rgba(232,130,155,.7)';
            ctx.beginPath();
            ctx.ellipse(0, 0, p.r, p.r / 2, 0, 0, 6.28);
            ctx.fill();
            ctx.restore();
        });
        requestAnimationFrame(loop);
    })();
}

document.addEventListener('DOMContentLoaded', () => {
    initEnvelope();
    initPetals();
});
