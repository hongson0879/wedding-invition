/**
 * rsvp.js - Gọi API Spring Boot cho 07. RSVP – Xác nhận tham dự & Lời chúc
 * Khi Backend chưa sẵn sàng hoặc chạy tĩnh, tự động fallback về dữ liệu Dummy + localStorage.
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
        if (payload.wish) {
            saveLocalWish(payload);
        }
        return { status: 'dummy_saved', data: payload };
    }
}

function renderWishesList(wishes) {
    const container = document.getElementById('wishesList');
    if (!container) return;

    container.innerHTML = '';
    wishes.slice().reverse().forEach(w => {
        if (!w.wish) return;
        const item = document.createElement('article');
        item.className = 'wish-card';

        const header = document.createElement('div');
        header.className = 'wish-header';

        const author = document.createElement('h4');
        author.className = 'wish-author';
        author.textContent = w.name;

        const badge = document.createElement('span');
        badge.className = 'wish-badge';
        badge.textContent = w.attend === 'yes'
            ? `Tham dự (${w.guests || 1} khách)`
            : 'Gửi lời chúc';

        header.append(author, badge);

        const msg = document.createElement('p');
        msg.className = 'wish-text';
        msg.textContent = w.wish;

        item.append(header, msg);
        container.appendChild(item);
    });
}

async function initRsvp() {
    const form = document.getElementById('rsvpForm');
    const attendSelect = document.getElementById('rsvpAttend');
    const guestsGroup = document.getElementById('guestsFieldGroup');
    const feedbackEl = document.getElementById('rsvpFeedback');

    const wishes = await fetchWishes();
    renderWishesList(wishes);

    if (attendSelect && guestsGroup) {
        attendSelect.addEventListener('change', () => {
            const isAttending = attendSelect.value === 'yes';
            guestsGroup.style.opacity = isAttending ? '1' : '0.45';
        });
    }

    if (!form) return;

    form.addEventListener('submit', async e => {
        e.preventDefault();
        const nameEl = document.getElementById('rsvpName');
        const attendEl = document.getElementById('rsvpAttend');
        const guestsEl = document.getElementById('rsvpGuests');
        const wishEl = document.getElementById('rsvpWish');

        const payload = {
            name: nameEl.value.trim(),
            attend: attendEl.value,
            guests: attendEl.value === 'yes' ? (parseInt(guestsEl.value, 10) || 1) : 0,
            wish: wishEl.value.trim(),
            createdAt: new Date().toISOString()
        };

        await submitRsvpToApi(payload);

        if (feedbackEl) {
            feedbackEl.textContent = payload.attend === 'yes'
                ? `Cảm ơn ${payload.name}! Gia đình rất hân hạnh được đón tiếp bạn tại buổi tiệc.`
                : `Cảm ơn ${payload.name} đã gửi lời chúc tốt đẹp đến vợ chồng mình!`;
            feedbackEl.classList.add('visible');
            setTimeout(() => feedbackEl.classList.remove('visible'), 5000);
        }

        form.reset();
        if (guestsGroup) guestsGroup.style.opacity = '1';

        const updatedWishes = await fetchWishes();
        renderWishesList(updatedWishes);
    });
}

document.addEventListener('DOMContentLoaded', initRsvp);
