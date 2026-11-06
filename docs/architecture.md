# Tài liệu Kiến trúc Hệ thống (System Architecture)

## 1. Tổng quan kiến trúc

Dự án **Thiệp mời cưới Online (Hồng Sơn & Tố Hạ)** được thiết kế theo mô hình **Client–Server tách biệt**, hỗ trợ chế độ **Progressive Fallback (Static / Dummy Mode)** để frontend có thể chạy độc lập trên GitHub Pages ngay cả khi backend Spring Boot chưa khởi chạy.

```
wedding-invition/
├── frontend/                              # Giao diện người dùng (Vanilla HTML5 / CSS3 / JS)
│   ├── index.html                         # Trang chính của thiệp cưới
│   ├── css/
│   │   ├── style.css                      # CSS giao diện chính (layout, màu sắc, typography)
│   │   ├── animation.css                  # Quản lý hiệu ứng mở phong bì & các @keyframes animation
│   │   └── responsive.css                 # Tách CSS responsive (@media queries cho Tablet/Mobile)
│   ├── js/
│   │   ├── config.js                      # Lưu cấu hình ngày cưới, tên, địa điểm, ngân hàng & dummy data
│   │   ├── countdown.js                   # Tách logic đếm ngược đến ngày cưới
│   │   ├── gallery.js                     # Xử lý hiển thị album ảnh cưới và Lightbox phóng to
│   │   ├── music.js                       # Điều khiển phát/tạm dừng nhạc nền
│   │   ├── envelope.js                    # Xử lý hiệu ứng mở thiệp, scroll reveal & cánh hoa rơi
│   │   └── rsvp.js                        # Gọi API Spring Boot (kèm cơ chế fallback localStorage/dummy)
│   └── assets/
│       ├── audio/                         # Lưu nhạc nền (music.mp3)
│       ├── images/                        # Lưu ảnh cưới tĩnh
│       └── qr/                            # Tách riêng mã QR khỏi thư mục ảnh cưới (qr-map.svg, qr-gift.svg)
├── backend/                               # Dịch vụ Backend (Spring Boot + Flyway + PostgreSQL/MySQL)
│   └── src/main/resources/
│       └── db/migration/                  # Quản lý phiên bản Database bằng Flyway
│           ├── V1__init_wedding_schema.sql
│           └── V2__seed_initial_data.sql
└── docs/                                  # Tài liệu kiến trúc và thiết kế cơ sở dữ liệu
    ├── architecture.md
    └── database.md
```

---

## 2. Phân rã Module Frontend

| Tệp / Thư mục | Trách nhiệm chính | Cơ chế khi Backend chưa có |
| :--- | :--- | :--- |
| `css/style.css` | Định nghĩa biến màu (`--rose`, `--gold`, `--cream`), bố cục các section, form, card và Lightbox. | Không phụ thuộc backend |
| `css/animation.css` | Toàn bộ `@keyframes` (`float`, `spin`, `bounce`, `beat`, `zoomIn`), transition mở phong bì và hiệu ứng `.reveal`. | Không phụ thuộc backend |
| `css/responsive.css` | Media queries cho màn hình `<= 768px` (Tablet) và `<= 480px` (Mobile). | Không phụ thuộc backend |
| `js/config.js` | Chứa đối tượng `WEDDING_CONFIG` (thông tin cô dâu chú rể, ngày cưới, địa điểm, ngân hàng, album, lời chúc mẫu). Thử gọi `GET /api/config`. | Dùng trực tiếp giá trị cứng trong `WEDDING_CONFIG` |
| `js/countdown.js` | Đọc `WEDDING_CONFIG.weddingDate.iso` và cập nhật bộ đếm Ngày / Giờ / Phút / Giây mỗi giây. | Đọc ngày cưới cứng từ `config.js` |
| `js/gallery.js` | Render lưới ảnh từ cấu hình và điều khiển hộp thoại Lightbox (phóng to, chuyển ảnh Trước/Sau, phím tắt `Esc`, `←`, `→`). | Dùng danh sách ảnh cấu hình sẵn trong `config.js` |
| `js/music.js` | Đóng gói `MusicController` quản lý `HTMLAudioElement`, nút bật/tắt nhạc góc dưới phải. | Phát tệp tĩnh `assets/audio/music.mp3` |
| `js/envelope.js` | Xử lý sự kiện nhấn nút "Mở thiệp", kích hoạt `IntersectionObserver` cho các khối `.reveal` và vẽ hiệu ứng cánh hoa rơi trên `<canvas id="petals">`. | Không phụ thuộc backend |
| `js/rsvp.js` | Giao tiếp với Spring Boot qua `GET /api/wishes` và `POST /api/rsvp`. | Tự động đọc/ghi vào `localStorage` kết hợp `dummyWishes` trong `config.js` |
| `assets/qr/` | Lưu trữ ảnh QR chỉ đường (`qr-map.svg`) và QR mừng cưới (`qr-gift.svg`), tách biệt hoàn toàn khỏi `assets/images/`. | Hiển thị ảnh QR tĩnh hoặc VietQR |

---

## 3. Thiết kế API Backend (Spring Boot)

Khi xây dựng Backend Spring Boot, các REST API chuẩn giao tiếp với Frontend gồm:

1. **`GET /api/config`**
   - Trả về cấu hình đám cưới từ bảng `wedding_config` và danh sách ảnh từ `gallery_photo`.
2. **`GET /api/wishes`**
   - Trả về danh sách lời chúc đã duyệt (`is_approved = true`) từ bảng `rsvp_wish` sắp xếp mới nhất lên đầu.
3. **`POST /api/rsvp`**
   - Nhận payload JSON từ `rsvp.js`:
     ```json
     {
       "name": "Nguyễn Văn A",
       "guests": 2,
       "attend": "yes",
       "wish": "Chúc hai bạn trăm năm hạnh phúc!"
     }
     ```
   - Lưu bản ghi mới vào bảng `rsvp_wish`.
