-- =========================================================
-- Flyway Migration V1: Khởi tạo schema cho Thiệp Mời Cưới
-- =========================================================

-- 1. Bảng cấu hình đám cưới (ngày cưới, cô dâu chú rể, địa điểm, ngân hàng)
CREATE TABLE IF NOT EXISTS wedding_config (
    id              BIGSERIAL PRIMARY KEY,
    groom_name      VARCHAR(120) NOT NULL,
    groom_parents   VARCHAR(255),
    bride_name      VARCHAR(120) NOT NULL,
    bride_parents   VARCHAR(255),
    wedding_date    TIMESTAMPTZ NOT NULL,
    lunar_date_str  VARCHAR(100),
    venue_name      VARCHAR(200) NOT NULL,
    venue_address   VARCHAR(300) NOT NULL,
    map_url         VARCHAR(500),
    bank_id         VARCHAR(30),
    bank_account    VARCHAR(50),
    bank_owner      VARCHAR(120),
    qr_map_path     VARCHAR(255) DEFAULT 'assets/qr/qr-map.svg',
    qr_gift_path    VARCHAR(255) DEFAULT 'assets/qr/qr-gift.svg',
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 2. Bảng xác nhận tham dự (RSVP) và lời chúc của khách mời
CREATE TABLE IF NOT EXISTS rsvp_wish (
    id              BIGSERIAL PRIMARY KEY,
    guest_name      VARCHAR(120) NOT NULL,
    guests_count    INT NOT NULL DEFAULT 1 CHECK (guests_count >= 1 AND guests_count <= 20),
    attend_status   VARCHAR(10) NOT NULL CHECK (attend_status IN ('yes', 'no')),
    wish_message    TEXT,
    is_approved     BOOLEAN NOT NULL DEFAULT TRUE,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_rsvp_wish_created_at ON rsvp_wish(created_at DESC);

-- 3. Bảng quản lý ảnh trong Album cưới
CREATE TABLE IF NOT EXISTS gallery_photo (
    id              BIGSERIAL PRIMARY KEY,
    image_url       VARCHAR(500) NOT NULL,
    thumb_url       VARCHAR(500),
    caption         VARCHAR(255),
    display_order   INT NOT NULL DEFAULT 0,
    is_active       BOOLEAN NOT NULL DEFAULT TRUE,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
