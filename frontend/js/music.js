/**
 * music.js - Điều khiển nhạc nền
 */
const MusicController = (() => {
    let audio = null;
    let musicBtn = null;

    function init() {
        musicBtn = document.getElementById('musicBtn');
        const src = (window.WEDDING_CONFIG && WEDDING_CONFIG.music && WEDDING_CONFIG.music.src)
            ? WEDDING_CONFIG.music.src
            : 'assets/audio/music.mp3';

        audio = new Audio(src);
        audio.loop = true;

        if (musicBtn) {
            musicBtn.addEventListener('click', () => toggle());
        }
    }

    function toggle(forcePlay) {
        if (!audio) return;
        if (forcePlay === true || audio.paused) {
            audio.play()
                .then(() => {
                    if (musicBtn) musicBtn.classList.add('playing');
                })
                .catch(() => {
                    // Trình duyệt chặn autoplay hoặc chưa có file mp3 trong assets/audio/
                });
        } else {
            audio.pause();
            if (musicBtn) musicBtn.classList.remove('playing');
        }
    }

    return { init, toggle };
})();

document.addEventListener('DOMContentLoaded', MusicController.init);
