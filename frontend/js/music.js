/**
 * music.js - Điều khiển nhạc nền
 * Nhạc nền tự động phát sau thao tác mở phong bì hoặc khi nhấn nút nhạc góc màn hình.
 * Nếu chưa có file mp3 trong assets/audio/music.mp3, tự động tạo giai điệu hộp nhạc (Web Audio API) dịu nhẹ.
 */
const MusicController = (() => {
    let audio = null;
    let musicBtn = null;
    let isPlaying = false;
    let synthTimer = null;
    let audioCtx = null;

    // Giai điệu Canon in D dịu nhẹ bằng Web Audio API khi chưa có file music.mp3
    const MELODY_NOTES = [
        659.25, 587.33, 523.25, 493.88, 440.00, 392.00, 440.00, 493.88,
        523.25, 493.88, 440.00, 392.00, 349.23, 329.63, 349.23, 392.00
    ];
    let noteIdx = 0;

    function playGentleNote(freq) {
        if (!audioCtx) {
            const Ctx = window.AudioContext || window.webkitAudioContext;
            if (!Ctx) return;
            audioCtx = new Ctx();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

        gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.04, audioCtx.currentTime + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.1);

        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 1.15);
    }

    function startFallbackMelody() {
        if (synthTimer) return;
        playGentleNote(MELODY_NOTES[noteIdx % MELODY_NOTES.length]);
        noteIdx++;
        synthTimer = setInterval(() => {
            playGentleNote(MELODY_NOTES[noteIdx % MELODY_NOTES.length]);
            noteIdx++;
        }, 950);
    }

    function stopFallbackMelody() {
        if (synthTimer) {
            clearInterval(synthTimer);
            synthTimer = null;
        }
    }

    function updateUi(playing) {
        isPlaying = playing;
        if (!musicBtn) return;
        musicBtn.classList.toggle('playing', playing);
        musicBtn.setAttribute('aria-pressed', playing ? 'true' : 'false');
    }

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
        const shouldPlay = forcePlay === true ? true : !isPlaying;

        if (shouldPlay) {
            if (audio) {
                audio.play()
                    .then(() => {
                        stopFallbackMelody();
                        updateUi(true);
                    })
                    .catch(() => {
                        // Nếu chưa có file assets/audio/music.mp3 thì phát giai điệu hộp nhạc nhẹ nhàng
                        startFallbackMelody();
                        updateUi(true);
                    });
            } else {
                startFallbackMelody();
                updateUi(true);
            }
        } else {
            if (audio) audio.pause();
            stopFallbackMelody();
            updateUi(false);
        }
    }

    return { init, toggle };
})();

document.addEventListener('DOMContentLoaded', MusicController.init);
