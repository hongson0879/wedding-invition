# Thiệp mời cưới online - Hồng Sơn & Tố Hạ

```
wedding-invition/
├── frontend/                              # Giao diện (HTML/CSS/JS thuần, có sẵn fallback dummy)
│   ├── index.html
│   ├── css/
│   │   ├── style.css                      # CSS giao diện chính
│   │   ├── animation.css                  # Quản lý hiệu ứng mở phong bì và animation
│   │   └── responsive.css                 # Tách CSS responsive khỏi CSS giao diện chính
│   ├── js/
│   │   ├── config.js                      # Lưu cấu hình ngày cưới, tên, địa điểm, dummy data
│   │   ├── countdown.js                   # Tách logic đếm ngược
│   │   ├── gallery.js                     # Xử lý album và Lightbox
│   │   ├── music.js                       # Điều khiển nhạc nền
│   │   ├── envelope.js                    # Xử lý hiệu ứng mở thiệp & cánh hoa rơi
│   │   └── rsvp.js                        # Gọi API Spring Boot (tự động fallback localStorage/dummy)
│   └── assets/
│       ├── images/                        # Ảnh cưới
│       ├── qr/                            # Tách QR khỏi ảnh cưới (qr-map.svg, qr-gift.svg)
│       └── audio/                         # music.mp3
├── backend/                               # Spring Boot + Flyway
│   └── src/main/resources/
│       └── db/migration/                  # Quản lý phiên bản database bằng Flyway
│           ├── V1__init_wedding_schema.sql
│           └── V2__seed_initial_data.sql
└── docs/                                  # Tài liệu kiến trúc và database
    ├── architecture.md
    └── database.md
```

## Chạy frontend
Mở `frontend/index.html` bằng trình duyệt, hoặc chạy server tĩnh:
```bash
npx serve frontend
```
> Khi Backend Spring Boot chưa chạy, Frontend sẽ tự động dùng cấu hình cứng và dữ liệu lời chúc mẫu (dummy data) trong `frontend/js/config.js` kết hợp `localStorage`.

## Tài liệu thiết kế
- Kiến trúc hệ thống & phân rã module: `docs/architecture.md`
- Thiết kế cơ sở dữ liệu & Flyway migration: `docs/database.md`
