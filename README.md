# 🏠 Thuê Trọ HCMC - Rental Listing App

Một ứng dụng web tinh gọn giúp người dùng tìm kiếm và quản lý phòng trọ tại TP. Hồ Chí Minh với giao diện hiện đại, tối ưu cho trải nghiệm di động.

## 🚀 Tính năng chính

### 1. Cho người dùng (Phòng Trọ)
- **Danh sách phòng**: Hiển thị dạng lưới đẹp mắt, đầy đủ thông tin giá, địa chỉ, hình ảnh.
- **Tìm kiếm & Bộ lọc**:
  - Tìm kiếm theo từ khóa (tiêu đề, địa chỉ).
  - Lọc theo khoảng giá (Dưới 2tr, 2-4tr, 4-6tr, trên 6tr).
  - Lọc theo Quận/Huyện tại TP.HCM.
- **Trang chi tiết**: Xem đầy đủ hình ảnh (gallery), mô tả, bản đồ Google Maps và nút liên hệ nhanh qua Zalo.

### 2. Cho Quản trị viên (Admin Panel)
- **Quản lý danh sách**: Xem, sửa và xóa các phòng trọ hiện có.
- **Đăng bài mới**: 
  - Giao diện kéo thả/chọn ảnh trực tiếp từ máy (Zalo tải về).
  - Tự động tải ảnh lên Supabase Storage.
  - Tọa độ bản đồ dễ dàng cấu hình.

## 🛠 Công nghệ sử dụng

- **Frontend**: Next.js 15+ (App Router), React, TailwindCSS.
- **Backend/Database**: Supabase (PostgreSQL, Storage, SSR Auth).
- **Styling**: Vanilla CSS + Tailwind cho hiệu ứng mượt mà (glassmorphism, animations).

## ⚙️ Cài đặt & Chạy ứng dụng

1. **Clone project:**
   ```bash
   git clone git@github.com:quzkhanh/rental_listing.git
   cd rental-listing
   ```

2. **Cài đặt dependencies:**
   ```bash
   npm install
   ```

3. **Cấu hình biến môi trường:**
   Tạo file `.env.local` và thêm các thông tin từ Supabase của bạn:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_ADMIN_PASSWORD=admin123
   ```

4. **Chạy ở chế độ phát triển:**
   ```bash
   npm run dev
   ```

## 🗄 Cấu trúc Database (Supabase SQL)

Để ứng dụng chạy được, hãy chạy các script SQL sau trong Supabase SQL Editor:
- `supabase.sql`: Tạo bảng `rooms` và cấu hình RLS.
- `storage.sql`: Tạo bucket `rooms` để lưu trữ hình ảnh.

---

*Phát triển bởi quzkhanh.*
