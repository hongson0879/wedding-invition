/**
 * countdown.js - Tách logic đếm ngược đến ngày cưới
 */
function initCountdown() {
    const dEl = document.getElementById('d');
    const hEl = document.getElementById('h');
    const mEl = document.getElementById('m');
    const sEl = document.getElementById('s');

    if (!dEl || !hEl || !mEl || !sEl) return;

    const targetDate = new Date(WEDDING_CONFIG.weddingDate.iso);

    function tick() {
        const diff = Math.max(0, targetDate - new Date());
        dEl.textContent = Math.floor(diff / 864e5);
        hEl.textContent = String(Math.floor(diff / 36e5) % 24).padStart(2, '0');
        mEl.textContent = String(Math.floor(diff / 6e4) % 60).padStart(2, '0');
        sEl.textContent = String(Math.floor(diff / 1e3) % 60).padStart(2, '0');
    }

    tick();
    setInterval(tick, 1000);
}

document.addEventListener('DOMContentLoaded', initCountdown);
