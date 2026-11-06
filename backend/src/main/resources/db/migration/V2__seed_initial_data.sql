-- =========================================================
-- Flyway Migration V2: Dữ liệu mẫu (Seed Data) ban đầu
-- =========================================================

INSERT INTO wedding_config (
    groom_name, groom_parents,
    bride_name, bride_parents,
    wedding_date, lunar_date_str,
    venue_name, venue_address, map_url,
    bank_id, bank_account, bank_owner,
    qr_map_path, qr_gift_path
) VALUES (
    'Đặng Hồng Sơn', 'Con trai bà Nguyễn Thị Mai',
    'Phạm Nguyên Tố Hạ', 'Con gái ông Phạm Công Toàn và bà Nguyễn Thị Tâm Anh',
    '2027-03-28 11:00:00+07', '21 . 02 . Đinh Mùi',
    'Trung Tâm Hội Nghị Tiệc Cưới Gold Palace', 'QL1A, An Thắng, Đà Nẵng, Việt Nam', 'https://maps.app.goo.gl/SURdS3xMy4xF3qZJ9',
    'VCB', '0123456789', 'DANG HONG SON',
    'assets/qr/qr-map.svg', 'assets/qr/qr-gift.svg'
);

INSERT INTO rsvp_wish (guest_name, guests_count, attend_status, wish_message) VALUES
    ('Minh Tuấn & Thanh Hà', 2, 'yes', 'Chúc hai bạn trăm năm hạnh phúc, sớm có thiên thần nhỏ nhé! 💕'),
    ('Hội bạn thân cấp 3', 4, 'yes', 'Chúc mừng Hồng Sơn & Tố Hạ! Hẹn gặp hai vợ chồng tại Đà Nẵng nhé 🎉'),
    ('Anh Khoa (Đồng nghiệp)', 1, 'no', 'Chúc hai em mãi mãi hạnh phúc viên mãn! Rất tiếc hôm đó anh bận công tác xa không về kịp.');

INSERT INTO gallery_photo (image_url, thumb_url, caption, display_order) VALUES
    ('https://picsum.photos/seed/wed1/800/1000', 'https://picsum.photos/seed/wed1/400/500', 'Khoảnh khắc ngọt ngào 1', 1),
    ('https://picsum.photos/seed/wed2/800/800',  'https://picsum.photos/seed/wed2/400/400', 'Khoảnh khắc ngọt ngào 2', 2),
    ('https://picsum.photos/seed/wed3/800/1000', 'https://picsum.photos/seed/wed3/400/500', 'Khoảnh khắc ngọt ngào 3', 3),
    ('https://picsum.photos/seed/wed4/800/800',  'https://picsum.photos/seed/wed4/400/400', 'Khoảnh khắc ngọt ngào 4', 4);
