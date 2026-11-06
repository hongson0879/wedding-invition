/**
 * gallery.js - Xử lý album ảnh bất đối xứng và Lightbox (05. Gallery)
 * Hỗ trợ click mở Lightbox, phím mũi tên và vuốt (swipe) trái/phải trên điện thoại
 */
function initGallery() {
    const galleryContainer = document.getElementById('galleryGrid');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const closeBtn = document.getElementById('lightboxClose');
    const prevBtn = document.getElementById('lightboxPrev');
    const nextBtn = document.getElementById('lightboxNext');

    if (!galleryContainer) return;

    const images = Array.from(galleryContainer.querySelectorAll('.gallery-item img'));
    let currentIndex = 0;
    let touchStartX = 0;
    let touchEndX = 0;

    function openLightbox(index) {
        if (!lightbox || images.length === 0) return;
        currentIndex = (index + images.length) % images.length;
        const targetImg = images[currentIndex];
        lightboxImg.src = targetImg.dataset.full || targetImg.src;
        lightboxImg.alt = targetImg.alt;
        if (lightboxCaption) {
            lightboxCaption.textContent = `${targetImg.alt} (${currentIndex + 1} / ${images.length})`;
        }
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        if (!lightbox) return;
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    function showPrev(e) {
        if (e) e.stopPropagation();
        openLightbox(currentIndex - 1);
    }

    function showNext(e) {
        if (e) e.stopPropagation();
        openLightbox(currentIndex + 1);
    }

    // Nhấn vào từng khung ảnh để mở Lightbox
    galleryContainer.querySelectorAll('.gallery-item').forEach((item, idx) => {
        item.addEventListener('click', () => openLightbox(idx));
    });

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (prevBtn) prevBtn.addEventListener('click', showPrev);
    if (nextBtn) nextBtn.addEventListener('click', showNext);

    if (lightbox) {
        lightbox.addEventListener('click', e => {
            if (e.target === lightbox) closeLightbox();
        });

        // Hỗ trợ vuốt ngang (swipe) trên màn hình cảm ứng điện thoại
        lightbox.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        lightbox.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            const deltaX = touchEndX - touchStartX;
            if (Math.abs(deltaX) > 45) {
                if (deltaX < 0) {
                    showNext();
                } else {
                    showPrev();
                }
            }
        }, { passive: true });
    }

    document.addEventListener('keydown', e => {
        if (!lightbox || !lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'ArrowRight') showNext();
    });
}

document.addEventListener('DOMContentLoaded', initGallery);
