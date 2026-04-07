-- Drop existing table
DROP TABLE IF EXISTS public.rooms;

-- Create rooms table
CREATE TABLE public.rooms (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  price INTEGER NOT NULL,
  address TEXT NOT NULL,
  district TEXT NOT NULL,
  city TEXT NOT NULL DEFAULT 'TP. Hồ Chí Minh',
  lat FLOAT NOT NULL,
  lng FLOAT NOT NULL,
  images TEXT[] NOT NULL DEFAULT '{}',
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;

-- Create policy allowing anyone to read (SELECT)
CREATE POLICY "Cho phép tất cả mọi người xem phòng" ON public.rooms
  FOR SELECT USING (true);

-- Create policy allowing ONLY ADMIN to insert/update/delete
-- Note: Replace 'your_admin_email' with the actual Superabase Auth User. 
-- In MVP mode without Supabase Auth, you might need to enable anon insert (unsafe) 
-- OR use service_role key to bypass RLS in the server via Next.js server actions.
-- For local usage MVP with anon key, we'll allow public everything, BUT you SHOULD secure this later.

CREATE POLICY "Cho phép sửa/xóa ẩn danh (DÙNG CHO MVP/DEV, KHÔNG AN TOÀN TRÊN PROD)" ON public.rooms
  FOR ALL USING (true) WITH CHECK (true);

-- Insert a mock room
INSERT INTO public.rooms (title, price, address, district, lat, lng, images, description)
VALUES (
  'Phòng trọ cao cấp gần ĐH Bách Khoa',
  3500000,
  '123 Lý Thường Kiệt, Phường 14',
  'Quận 10',
  10.7726,
  106.6601,
  ARRAY['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop'],
  'Phòng trọ cao cấp, đầy đủ nội thất, gần trường ĐH Bách Khoa TP.HCM.'
);
