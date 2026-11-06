/**
 * countdown.js - Tách logic đếm ngược (03. Countdown)
 * Tự động cập nhật Ngày, Giờ, Phút, Giây theo ngày cưới trong WEDDING_CONFIG
 */
function initCountdown() {
    const dEl = document.getElementById('cdDays');
    const hEl = document.getElementById('cdHours');
    const mEl = document.getElementById('cdMinutes');
    const sEl = document.getElementById('cdSeconds');
    const statusEl = document.getElementById('cdStatus');

    if (!dEl || !hEl || !mEl || !sEl) return;

    const isoDate = (window.WEDDING_CONFIG && WEDDING_CONFIG.weddingDate)
        ? WEDDING_CONFIG.weddingDate.iso
        : '2027-03-28T11:00:00+07:00';
    const targetDate = new Date(isoDate);

    function tick() {
        const now = new Date();
        const diff = Math.max(0, targetDate - now);

        const days = Math.floor(diff / 86400000);
        const hours = Math.floor(diff / 3600000) % 24;
        const minutes = Math.floor(diff / 60000) % 60;
        const seconds = Math.floor(diff / 1000) % 60;

        dEl.textContent = String(days).padStart(2, '0');
        hEl.textContent = String(hours).padStart(2, '0');
        mEl.textContent = String(minutes).padStart(2, '0');
        sEl.textContent = String(seconds).padStart(2, '0');

        if (statusEl) {
            if (diff <= 0) {
                statusEl.textContent = 'Hôm nay là ngày trọng đại của chúng tôi!';
            } else {
                statusEl.textContent = `Còn ${days} ngày nữa đến lễ thành hôn`;
            }
        }
    }

    tick();
    setInterval(tick, 1000);
}

document.addEventListener('DOMContentLoaded', initCountdown);
