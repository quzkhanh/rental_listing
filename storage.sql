-- Hỗ trợ upload ảnh, cần chạy script này trong tab SQL Editor trên Supabase

-- Tạo bucket mang tên 'rooms'
INSERT INTO storage.buckets (id, name, public) 
VALUES ('rooms', 'rooms', true)
ON CONFLICT (id) DO NOTHING;

-- (Đã xóa dòng ALTER TABLE vì Supabase đã tự động kích hoạt mặc định)

-- Tạo policy cho phép ai cũng có quyền đọc ảnh (Public Access)
CREATE POLICY "Cho phép xem ảnh công khai" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'rooms');

-- Tạo policy cho phép upload ảnh ẩn danh (dành cho Admin dùng Local MVP, trên Production nên yêu cầu Auth)
CREATE POLICY "Cho phép upload ảnh" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'rooms');

-- Tạo policy cho phép xóa ảnh (để sau này cập nhật/gỡ phòng có thể xóa ảnh đi)
CREATE POLICY "Cho phép xóa ảnh" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'rooms');
