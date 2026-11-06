/**
 * envelope.js - Xử lý hiệu ứng mở phong bì (01. Envelope), cuộn trang mượt, reveal và parallax
 * - Nhấn nút mở thiệp -> Nắp phong bì mở ra (.flap-open) -> Thiệp bên trong trượt lên (.letter-slide)
 * - Màn hình phong bì mờ dần (.envelope-dismissed) và nhạc nền bắt đầu phát
 */
function initScrollRevealAndParallax() {
    const io = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in');
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.14 });

    document.querySelectorAll('.reveal, .stagger, .wipe-holder').forEach(el => io.observe(el));

    // Hiệu ứng thanh điều hướng & Parallax nhẹ cho ảnh
    const plxImages = Array.from(document.querySelectorAll('.plx'));
    const heroImg = document.getElementById('heroImg');
    const navbar = document.querySelector('.navbar');
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
            ticking = false;
            const sy = window.scrollY;
            const vh = window.innerHeight;

            if (navbar) {
                navbar.classList.toggle('scrolled', sy > vh * 0.35);
            }

            for (const img of plxImages) {
                const rect = img.parentElement.getBoundingClientRect();
                const progress = (rect.top + rect.height / 2 - vh / 2) / vh;
                const speed = parseFloat(img.dataset.speed) || -16;
                img.style.transform = `translateY(${progress * speed}px) scale(1.08)`;
            }

            if (heroImg) {
                const sp = Math.min(1, Math.max(0, sy / vh));
                heroImg.style.transform = `translateY(${sp * 36}px) scale(${1.1 - sp * 0.05})`;
            }
        });
    }, { passive: true });
}

function initEnvelope() {
    const envelopeSection = document.getElementById('envelopeSection');
    const envelopeBox = document.getElementById('envelopeBox');
    const openBtn = document.getElementById('openEnvelopeBtn');

    // Khóa cuộn trang khi chưa mở thiệp
    document.body.classList.add('envelope-locked');

    function handleOpenEnvelope() {
        if (!envelopeBox || envelopeBox.classList.contains('opening')) return;
        envelopeBox.classList.add('opening');

        // Bắt đầu phát nhạc nền ngay sau thao tác mở thiệp
        if (window.MusicController && (!window.WEDDING_CONFIG || WEDDING_CONFIG.music.autoPlayOnOpen)) {
            MusicController.toggle(true);
        }

        // Bước 1: Mở nắp phong bì (0ms -> 650ms)
        // Bước 2: Thiệp bên trong trượt lên (650ms -> 1500ms)
        // Bước 3: Ẩn màn phong bì và hiển thị Hero section
        setTimeout(() => {
            if (envelopeSection) {
                envelopeSection.classList.add('envelope-dismissed');
            }
            document.body.classList.remove('envelope-locked');
            document.body.classList.add('loaded');
        }, 1550);
    }

    if (openBtn) {
        openBtn.addEventListener('click', e => {
            e.stopPropagation();
            handleOpenEnvelope();
        });
    }

    if (envelopeBox) {
        envelopeBox.addEventListener('click', handleOpenEnvelope);
    }

    // Điều hướng mượt cho các liên kết neo (#section)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            const targetId = anchor.getAttribute('href');
            if (!targetId || targetId === '#') return;
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                targetEl.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    initScrollRevealAndParallax();
}

document.addEventListener('DOMContentLoaded', initEnvelope);
