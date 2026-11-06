/**
 * rsvp.js - Gọi API Spring Boot cho phần Xác nhận tham dự (RSVP) & Lời chúc
 * Khi Backend chưa sẵn sàng hoặc chạy trên GitHub Pages, tự động fallback về dữ liệu Dummy + localStorage.
 */
const STORAGE_KEY = 'wedding_wishes_data';

function getLocalWishes() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
        const seed = (window.WEDDING_CONFIG && WEDDING_CONFIG.dummyWishes) ? WEDDING_CONFIG.dummyWishes : [];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
        return seed;
    }
    try {
        return JSON.parse(raw);
    } catch (_) {
        return [];
    }
}

function saveLocalWish(entry) {
    const list = getLocalWishes();
    list.push(entry);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    return list;
}

/**
 * Lấy danh sách lời chúc từ API Spring Boot (GET /api/wishes)
 * Fallback sang localStorage + dummyWishes nếu backend chưa chạy
 */
async function fetchWishes() {
    try {
        const response = await fetch(`${WEDDING_CONFIG.apiBaseUrl}/wishes`, {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
        });
        if (!response.ok) throw new Error('API not available');
        return await response.json();
    } catch (_) {
        return getLocalWishes();
    }
}

/**
 * Gửi thông tin RSVP & lời chúc lên API Spring Boot (POST /api/rsvp)
 * Fallback lưu vào localStorage nếu backend chưa chạy
 */
async function submitRsvpToApi(payload) {
    try {
        const response = await fetch(`${WEDDING_CONFIG.apiBaseUrl}/rsvp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (!response.ok) throw new Error('API not available');
        return await response.json();
    } catch (_) {
        // Fallback lưu local khi chưa bật backend
        if (payload.wish) {
            saveLocalWish(payload);
        }
        return { status: 'dummy_saved', data: payload };
    }
}

function renderWishesList(wishes) {
    const container = document.getElementById('wishes');
    if (!container) return;

    container.innerHTML = '';
    wishes.slice().reverse().forEach(w => {
        if (!w.wish) return;
        const div = document.createElement('div');
        div.className = 'wish';

        const header = document.createElement('div');
        const b = document.createElement('b');
        b.textContent = w.name;
        header.appendChild(b);

        if (w.attend) {
            const badge = document.createElement('span');
            badge.className = 'wish-meta';
            badge.textContent = w.attend === 'yes'
                ? `• Tham dự (${w.guests || 1} người)`
                : '• Gửi lời chúc';
            header.appendChild(badge);
        }

        const p = document.createElement('p');
        p.textContent = w.wish;

        div.append(header, p);
        container.appendChild(div);
    });
}

async function initRsvp() {
    const form = document.getElementById('rsvpForm');
    const wishes = await fetchWishes();
    renderWishesList(wishes);

    if (!form) return;

    form.addEventListener('submit', async e => {
        e.preventDefault();
        const nameEl = document.getElementById('name');
        const guestsEl = document.getElementById('guests');
        const attendEl = document.getElementById('attend');
        const wishEl = document.getElementById('wish');

        const payload = {
            name: nameEl.value.trim(),
            guests: parseInt(guestsEl.value, 10) || 1,
            attend: attendEl.value,
            wish: wishEl.value.trim(),
            createdAt: new Date().toISOString()
        };

        await submitRsvpToApi(payload);

        alert(payload.attend === 'yes'
            ? `Cảm ơn ${payload.name}! Hẹn gặp bạn tại tiệc cưới 💕`
            : 'Cảm ơn bạn đã phản hồi. Chúng tôi rất tiếc vì sự vắng mặt của bạn!');

        form.reset();
        const updatedWishes = await fetchWishes();
        renderWishesList(updatedWishes);
    });
}

document.addEventListener('DOMContentLoaded', initRsvp);
