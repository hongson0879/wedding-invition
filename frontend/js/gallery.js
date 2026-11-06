/**
 * gallery.js - Xử lý album ảnh cưới và Lightbox phóng to ảnh
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

    const items = WEDDING_CONFIG.gallery || [];
    let currentIndex = 0;

    // Render danh sách ảnh từ cấu hình nếu có
    if (items.length > 0) {
        galleryContainer.innerHTML = '';
        items.forEach((item, index) => {
            const img = document.createElement('img');
            img.src = item.thumb || item.src;
            img.alt = item.alt || `Ảnh cưới ${index + 1}`;
            img.dataset.full = item.src;
            img.dataset.index = index;
            img.loading = 'lazy';
            galleryContainer.appendChild(img);
        });
    }

    const images = Array.from(galleryContainer.querySelectorAll('img'));

    function openLightbox(index) {
        if (!lightbox || images.length === 0) return;
        currentIndex = (index + images.length) % images.length;
        const targetImg = images[currentIndex];
        lightboxImg.src = targetImg.dataset.full || targetImg.src;
        lightboxImg.alt = targetImg.alt;
        if (lightboxCaption) {
            lightboxCaption.textContent = `${targetImg.alt} (${currentIndex + 1}/${images.length})`;
        }
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        if (!lightbox) return;
        lightbox.classList.remove('active');
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

    images.forEach((img, idx) => {
        img.addEventListener('click', () => openLightbox(idx));
    });

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (prevBtn) prevBtn.addEventListener('click', showPrev);
    if (nextBtn) nextBtn.addEventListener('click', showNext);

    if (lightbox) {
        lightbox.addEventListener('click', e => {
            if (e.target === lightbox) closeLightbox();
        });
    }

    document.addEventListener('keydown', e => {
        if (!lightbox || !lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'ArrowRight') showNext();
    });
}

document.addEventListener('DOMContentLoaded', initGallery);
