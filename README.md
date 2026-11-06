# Thiệp mời cưới online - Hồng Sơn & Tố Hạ

```
demo-project/
├── frontend/              # Giao diện (HTML/CSS/JS thuần)
│   ├── index.html
│   ├── css/style.css
│   ├── js/script.js
│   └── assets/
│       ├── images/        # Ảnh cưới
│       └── audio/         # music.mp3
└── backend/               # (dự kiến) Spring Boot
```

## Chạy frontend
Mở `frontend/index.html` bằng trình duyệt, hoặc chạy server tĩnh:
`npx serve frontend`

## Kế hoạch backend (Spring Boot)
- Tạo project Spring Boot (Maven/Gradle) trong thư mục `backend/`.
- API gợi ý: `POST /api/rsvp`, `GET /api/wishes`, `GET /api/config` (thông tin cưới, ngân hàng, bản đồ).
- Bật CORS cho origin của frontend khi chạy riêng, hoặc copy `frontend/` vào `src/main/resources/static` để Spring Boot phục vụ cùng domain.
- Trong `frontend/js/script.js`, thay phần `localStorage` (RSVP/lời chúc) bằng `fetch('/api/...')`.
