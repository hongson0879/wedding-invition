/**
 * config.js - Lưu cấu hình ngày cưới, tên cô dâu chú rể, câu chuyện, album, địa điểm 2 họ, ngân hàng và API
 * Những chỗ backend chưa có thì sử dụng giá trị cấu hình cứng / dummy tại đây.
 */
const WEDDING_CONFIG = {
    // Cấu hình API Spring Boot (khi backend chưa chạy sẽ tự động fallback sang dummy/localStorage)
    apiBaseUrl: 'http://localhost:8080/api',

    // 01 & 02. Thông tin Cô dâu & Chú rể + Trích dẫn
    couple: {
        monogram: 'H & S',
        shortTitle: 'Tố Hạ & Hồng Sơn',
        quote: '“Giữa hàng vạn người bước qua nhau, thật may mắn vì chúng ta đã dừng lại, nắm tay và chọn đi cùng nhau đến suốt cuộc đời.”',
        bride: {
            shortName: 'Tố Hạ',
            fullName: 'Phạm Nguyên Tố Hạ',
            parents: 'Ông Phạm Công Toàn & Bà Nguyễn Thị Tâm Anh'
        },
        groom: {
            shortName: 'Hồng Sơn',
            fullName: 'Đặng Hồng Sơn',
            parents: 'Bà Nguyễn Thị Mai'
        }
    },

    // 03. Ngày giờ cưới (Đếm ngược)
    weddingDate: {
        iso: '2027-03-28T11:00:00+07:00',
        solarDisplay: '28 . 03 . 2027',
        lunarDisplay: 'Ngày 21 tháng 02 năm Đinh Mùi',
        fullText: 'Chủ Nhật, ngày 28 tháng 03 năm 2027'
    },

    // 04. Câu chuyện tình yêu (Our Story)
    story: [
        {
            date: 'Mùa Thu · 2022',
            title: 'Lần đầu gặp gỡ',
            description: 'Một buổi chiều tình cờ với ánh nắng dịu nhẹ, cuộc trò chuyện tưởng chừng ngắn ngủi ấy lại mở ra hành trình dài của hai trái tim.',
            image: 'img/hero.jpg'
        },
        {
            date: 'Mùa Hè · 2024',
            title: 'Những chuyến đi thanh xuân',
            description: 'Cùng nhau đi qua bao cung đường biển xanh và phố núi, lưu giữ hàng trăm bức hình và nhận ra đối phương chính là bình yên.',
            image: 'img/beach.jpg'
        },
        {
            date: 'Mùa Đông · 2026',
            title: 'Lời cầu hôn ngọt ngào',
            description: 'Chiếc nhẫn trao tay cùng lời hứa giản dị nhưng trọn vẹn: Từ nay về sau, mọi mùa trong năm mình đều về chung một nhà.',
            image: 'img/hands.jpg'
        }
    ],

    // 05. Album ảnh cưới (Grid bất đối xứng & Lightbox)
    gallery: [
        { src: 'img/hero.jpg', thumb: 'img/hero.jpg', alt: 'Tố Hạ & Hồng Sơn - Khoảnh khắc 01', span: 'tall' },
        { src: 'img/beach.jpg', thumb: 'img/beach.jpg', alt: 'Tố Hạ & Hồng Sơn - Khoảnh khắc 02', span: 'wide' },
        { src: 'img/hands.jpg', thumb: 'img/hands.jpg', alt: 'Nhẫn cưới gắn kết - Khoảnh khắc 03', span: 'normal' },
        { src: 'img/fashion.jpg', thumb: 'img/fashion.jpg', alt: 'Phong cách thanh lịch - Khoảnh khắc 04', span: 'tall' },
        { src: 'img/aisle.jpg', thumb: 'img/aisle.jpg', alt: 'Không gian lễ đường - Khoảnh khắc 05', span: 'wide' }
    ],

    // 06. Thông tin lễ cưới (Địa điểm Nhà Gái, Nhà Trai & Tiệc Cưới Chính)
    venues: {
        mainCeremony: {
            title: 'Tiệc Cưới Chính Thức',
            time: '11:00 · Chủ Nhật, 28/03/2027',
            lunar: 'Tức ngày 21/02 năm Đinh Mùi',
            name: 'Trung Tâm Hội Nghị Tiệc Cưới Gold Palace',
            address: 'QL1A, An Thắng, Điện Bàn, Quảng Nam - Đà Nẵng',
            mapUrl: 'https://maps.app.goo.gl/SURdS3xMy4xF3qZJ9',
            embedUrl: 'https://www.google.com/maps?q=Trung+Tam+Hoi+Nghi+Tiec+Cuoi+Gold+Palace+Da+Nang&output=embed'
        },
        groomSide: {
            label: 'Lễ Tân Hôn · Nhà Trai',
            family: 'Bà Nguyễn Thị Mai',
            representative: 'Chú rể: Đặng Hồng Sơn',
            time: '09:00 · Chủ Nhật, 28/03/2027',
            venueName: 'Tư gia Nhà Trai & Gold Palace',
            address: 'QL1A, An Thắng, Đà Nẵng, Việt Nam',
            mapUrl: 'https://maps.app.goo.gl/SURdS3xMy4xF3qZJ9'
        },
        brideSide: {
            label: 'Lễ Vu Quy · Nhà Gái',
            family: 'Ông Phạm Công Toàn & Bà Nguyễn Thị Tâm Anh',
            representative: 'Cô dâu: Phạm Nguyên Tố Hạ',
            time: '08:00 · Chủ Nhật, 28/03/2027',
            venueName: 'Tư gia Nhà Gái & Gold Palace',
            address: 'QL1A, An Thắng, Đà Nẵng, Việt Nam',
            mapUrl: 'https://maps.app.goo.gl/SURdS3xMy4xF3qZJ9'
        }
    },

    // 07. Lời chúc mẫu (Dummy data khi Backend Spring Boot chưa chạy)
    dummyWishes: [
        {
            name: 'Minh Tuấn & Thanh Hà',
            guests: 2,
            attend: 'yes',
            wish: 'Chúc Tố Hạ & Hồng Sơn trăm năm hạnh phúc, luôn ngập tràn tiếng cười nhé! 💕',
            createdAt: '2027-03-01T09:30:00+07:00'
        },
        {
            name: 'Hội bạn thân Đại học',
            guests: 4,
            attend: 'yes',
            wish: 'Chúc mừng hai vợ chồng! Chắc chắn tụi mình sẽ có mặt đông đủ chung vui tại Gold Palace 🎉',
            createdAt: '2027-03-05T14:20:00+07:00'
        },
        {
            name: 'Anh Khoa (Đồng nghiệp)',
            guests: 1,
            attend: 'no',
            wish: 'Chúc hai em mãi mãi hạnh phúc viên mãn! Rất tiếc hôm đó anh bận công tác xa không về kịp.',
            createdAt: '2027-03-10T18:00:00+07:00'
        }
    ],

    // 08. Mừng cưới (Wedding Gift - QR & Ngân hàng)
    gifts: {
        groomBank: {
            role: 'Mừng cưới Chú Rể',
            bankId: 'VCB',
            bankName: 'Vietcombank (Ngân hàng Ngoại thương VN)',
            accountNumber: '0123456789',
            accountHolder: 'DANG HONG SON',
            transferNote: 'Mung cuoi Hong Son To Ha',
            localQr: 'assets/qr/qr-gift.svg'
        },
        brideBank: {
            role: 'Mừng cưới Cô Dâu',
            bankId: 'TCB',
            bankName: 'Techcombank (Ngân hàng Kỹ thương VN)',
            accountNumber: '9876543210',
            accountHolder: 'PHAM NGUYEN TO HA',
            transferNote: 'Mung cuoi To Ha Hong Son',
            localQr: 'assets/qr/qr-gift.svg'
        },
        useDynamicQr: true
    },

    // Nhạc nền
    music: {
        src: 'assets/audio/music.mp3',
        autoPlayOnOpen: true
    }
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

    // Khởi tạo QR & thông tin ngân hàng cho phần 08. Wedding Gift
    const setupGiftCard = (prefix, bankCfg) => {
        const qrEl = $(`${prefix}QrImg`);
        const bankNameEl = $(`${prefix}BankName`);
        const accNumEl = $(`${prefix}AccNumber`);
        const accHolderEl = $(`${prefix}AccHolder`);
        const copyBtn = $(`${prefix}CopyBtn`);

        if (bankNameEl) bankNameEl.textContent = bankCfg.bankName;
        if (accNumEl) accNumEl.textContent = bankCfg.accountNumber;
        if (accHolderEl) accHolderEl.textContent = bankCfg.accountHolder;

        if (qrEl) {
            if (WEDDING_CONFIG.gifts.useDynamicQr) {
                qrEl.src = `https://img.vietqr.io/image/${bankCfg.bankId}-${bankCfg.accountNumber}-compact2.png?accountName=${encodeURIComponent(bankCfg.accountHolder)}&addInfo=${encodeURIComponent(bankCfg.transferNote)}`;
                qrEl.onerror = () => { qrEl.src = bankCfg.localQr; };
            } else {
                qrEl.src = bankCfg.localQr;
            }
        }

        if (copyBtn) {
            copyBtn.addEventListener('click', async () => {
                const textToCopy = bankCfg.accountNumber;
                try {
                    await navigator.clipboard.writeText(textToCopy);
                } catch (_) {
                    const ta = document.createElement('textarea');
                    ta.value = textToCopy;
                    document.body.appendChild(ta);
                    ta.select();
                    document.execCommand('copy');
                    document.body.removeChild(ta);
                }
                const labelEl = copyBtn.querySelector('span');
                const originalText = labelEl ? labelEl.textContent : copyBtn.textContent;
                if (labelEl) {
                    labelEl.textContent = 'Đã sao chép STK ✓';
                } else {
                    copyBtn.textContent = 'Đã sao chép STK ✓';
                }
                copyBtn.classList.add('copied');
                setTimeout(() => {
                    if (labelEl) {
                        labelEl.textContent = originalText;
                    } else {
                        copyBtn.textContent = originalText;
                    }
                    copyBtn.classList.remove('copied');
                }, 2200);
            });
        }
    };

    setupGiftCard('groom', WEDDING_CONFIG.gifts.groomBank);
    setupGiftCard('bride', WEDDING_CONFIG.gifts.brideBank);
}

document.addEventListener('DOMContentLoaded', initConfig);
