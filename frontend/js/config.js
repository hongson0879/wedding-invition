/**
 * config.js - Lưu cấu hình ngày cưới, tên cô dâu chú rể, địa điểm, ngân hàng, album và API
 * Những chỗ backend chưa có thì sử dụng giá trị cấu hình cứng / dummy tại đây.
 */
const WEDDING_CONFIG = {
    // Cấu hình API Spring Boot (khi backend chưa chạy sẽ tự động fallback sang dummy/localStorage)
    apiBaseUrl: 'http://localhost:8080/api',

    // Thông tin Cô dâu & Chú rể
    couple: {
        shortTitle: 'Sơn & Hạ',
        groom: {
            shortName: 'Hồng Sơn',
            fullName: 'Đặng Hồng Sơn',
            initial: 'S',
            parents: 'Con trai bà Nguyễn Thị Mai'
        },
        bride: {
            shortName: 'Tố Hạ',
            fullName: 'Phạm Nguyên Tố Hạ',
            initial: 'H',
            parents: 'Con gái ông Phạm Công Toàn<br>và bà Nguyễn Thị Tâm Anh'
        }
    },

    // Ngày giờ cưới
    weddingDate: {
        iso: '2027-03-28T11:00:00+07:00',
        solarDisplay: '28 . 03 . 2027',
        lunarDisplay: '21 . 02 . Đinh Mùi',
        timeText: '11:00 - Chủ Nhật, 28/03/2027'
    },

    // Địa điểm tổ chức
    venue: {
        name: 'Trung Tâm Hội Nghị Tiệc Cưới Gold Palace',
        address: 'QL1A, An Thắng, Đà Nẵng, Việt Nam',
        mapUrl: 'https://maps.app.goo.gl/SURdS3xMy4xF3qZJ9',
        qrQueryUrl: 'https://www.google.com/maps/search/?api=1&query=Trung+Tam+Hoi+Nghi+Tiec+Cuoi+Gold+Palace+Da+Nang'
    },

    // Thông tin ngân hàng & Mã QR (Ưu tiên ảnh tĩnh trong assets/qr/, hoặc tạo qua VietQR/QRServer)
    bank: {
        id: 'VCB',
        account: '0123456789',
        name: 'DANG HONG SON',
        transferNote: 'Mung cuoi Hong Son - To Ha',
        localQrGift: 'assets/qr/qr-gift.svg',
        localQrMap: 'assets/qr/qr-map.svg',
        useDynamicQr: true // Đặt false để chỉ dùng ảnh tĩnh trong assets/qr/
    },

    // Nhạc nền
    music: {
        src: 'assets/audio/music.mp3',
        autoPlayOnOpen: true
    },

    // Danh sách ảnh cưới (có thể thay bằng đường dẫn trong assets/images/)
    gallery: [
        { src: 'https://picsum.photos/seed/wed1/800/1000', thumb: 'https://picsum.photos/seed/wed1/400/500', alt: 'Khoảnh khắc ngọt ngào 1' },
        { src: 'https://picsum.photos/seed/wed2/800/800', thumb: 'https://picsum.photos/seed/wed2/400/400', alt: 'Khoảnh khắc ngọt ngào 2' },
        { src: 'https://picsum.photos/seed/wed3/800/1000', thumb: 'https://picsum.photos/seed/wed3/400/500', alt: 'Khoảnh khắc ngọt ngào 3' },
        { src: 'https://picsum.photos/seed/wed4/800/800', thumb: 'https://picsum.photos/seed/wed4/400/400', alt: 'Khoảnh khắc ngọt ngào 4' }
    ],

    // Lời chúc mẫu (Dummy data khi Backend Spring Boot chưa chạy)
    dummyWishes: [
        {
            name: 'Minh Tuấn & Thanh Hà',
            guests: 2,
            attend: 'yes',
            wish: 'Chúc hai bạn trăm năm hạnh phúc, sớm có thiên thần nhỏ nhé! 💕',
            createdAt: '2027-03-01T09:30:00+07:00'
        },
        {
            name: 'Hội bạn thân cấp 3',
            guests: 4,
            attend: 'yes',
            wish: 'Chúc mừng Hồng Sơn & Tố Hạ! Hẹn gặp hai vợ chồng tại Đà Nẵng nhé 🎉',
            createdAt: '2027-03-05T14:20:00+07:00'
        },
        {
            name: 'Anh Khoa (Đồng nghiệp)',
            guests: 1,
            attend: 'no',
            wish: 'Chúc hai em mãi mãi hạnh phúc viên mãn! Rất tiếc hôm đó anh bận công tác xa không về kịp.',
            createdAt: '2027-03-10T18:00:00+07:00'
        }
    ]
};

/**
 * Khởi tạo thông tin cấu hình lên giao diện và nạp cấu hình từ Backend (nếu có)
 */
async function initConfig() {
    const $ = id => document.getElementById(id);

    // Thử gọi API /api/config từ Spring Boot, nếu chưa có thì giữ nguyên WEDDING_CONFIG cứng
    try {
        const res = await fetch(`${WEDDING_CONFIG.apiBaseUrl}/config`, { method: 'GET' });
        if (res.ok) {
            const remoteConfig = await res.json();
            Object.assign(WEDDING_CONFIG, remoteConfig);
        }
    } catch (_) {
        // Backend chưa chạy -> dùng cấu hình cứng trong WEDDING_CONFIG
    }

    // Gán dữ liệu QR & Ngân hàng
    const qrMapEl = $('qrMap');
    const qrGiftEl = $('qrGift');
    const bankInfoEl = $('bankInfo');

    if (qrMapEl) {
        if (WEDDING_CONFIG.bank.useDynamicQr) {
            qrMapEl.src = 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&margin=8&data=' +
                encodeURIComponent(WEDDING_CONFIG.venue.qrQueryUrl || WEDDING_CONFIG.venue.mapUrl);
            qrMapEl.onerror = () => { qrMapEl.src = WEDDING_CONFIG.bank.localQrMap; };
        } else {
            qrMapEl.src = WEDDING_CONFIG.bank.localQrMap;
        }
    }

    if (qrGiftEl) {
        const b = WEDDING_CONFIG.bank;
        if (b.useDynamicQr) {
            qrGiftEl.src = `https://img.vietqr.io/image/${b.id}-${b.account}-compact2.png?accountName=${encodeURIComponent(b.name)}&addInfo=${encodeURIComponent(b.transferNote)}`;
            qrGiftEl.onerror = () => { qrGiftEl.src = b.localQrGift; };
        } else {
            qrGiftEl.src = b.localQrGift;
        }
    }

    if (bankInfoEl) {
        const b = WEDDING_CONFIG.bank;
        bankInfoEl.innerHTML = `${b.id} - ${b.account}<br>${b.name}`;
    }
}

document.addEventListener('DOMContentLoaded', initConfig);
