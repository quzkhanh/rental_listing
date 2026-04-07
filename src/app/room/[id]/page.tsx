'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Room } from '@/lib/types';
import { MOCK_ROOMS, ZALO_PHONE, DEFAULT_ZALO_MESSAGE } from '@/lib/mockData';
import { formatPrice, getZaloLink, getGoogleMapsEmbedUrl } from '@/lib/utils';
import ImageGallery from '@/components/ImageGallery';

// Set to true to use Supabase, false for mock data
const USE_SUPABASE = true;

export default function RoomDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRoom() {
      setLoading(true);
      try {
        if (USE_SUPABASE) {
          const { getRoomById } = await import('@/lib/queries');
          const data = await getRoomById(id);
          setRoom(data);
        } else {
          await new Promise((res) => setTimeout(res, 300));
          const stored = localStorage.getItem('mock_rooms');
          const rooms: Room[] = stored ? JSON.parse(stored) : MOCK_ROOMS;
          const found = rooms.find((r) => r.id === id);
          setRoom(found || null);
        }
      } catch (error) {
        console.error('Error fetching room:', error);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchRoom();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-6 w-32 bg-slate-200 rounded" />
          <div className="aspect-[16/9] bg-slate-200 rounded-2xl" />
          <div className="h-8 w-2/3 bg-slate-200 rounded" />
          <div className="h-6 w-1/3 bg-slate-200 rounded" />
          <div className="space-y-3">
            <div className="h-4 bg-slate-200 rounded" />
            <div className="h-4 w-5/6 bg-slate-200 rounded" />
            <div className="h-4 w-4/6 bg-slate-200 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-slate-100 flex items-center justify-center">
          <svg className="w-10 h-10 text-slate-300" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-slate-700 mb-2">Không tìm thấy phòng</h2>
        <p className="text-slate-500 mb-6">Phòng này có thể đã được gỡ hoặc không tồn tại.</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
        >
          ← Về trang chủ
        </Link>
      </div>
    );
  }

  const zaloUrl = getZaloLink(ZALO_PHONE, `${DEFAULT_ZALO_MESSAGE} - ${room.title}`);
  const mapUrl = getGoogleMapsEmbedUrl(room.lat, room.lng);

  return (
    <>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Trang chủ
          </Link>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
          <span className="text-slate-700 font-medium truncate max-w-xs">
            {room.title}
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <ImageGallery images={room.images} title={room.title} />

            {/* Title & Price */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 leading-tight mb-3">
                {room.title}
              </h1>
              <div className="text-2xl sm:text-3xl font-extrabold text-orange-600">
                {formatPrice(room.price)}
              </div>
            </div>

            {/* Info badges */}
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-medium">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                {room.district}
              </span>
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-100 text-slate-600 text-sm font-medium">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 0h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                </svg>
                {room.city}
              </span>
            </div>

            {/* Address */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Địa chỉ
              </h3>
              <p className="text-base text-slate-800 font-medium">
                {room.address}, {room.district}, {room.city}
              </p>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
                Mô tả chi tiết
              </h3>
              <div className="text-base text-slate-700 leading-relaxed whitespace-pre-line">
                {room.description}
              </div>
            </div>

            {/* Map */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <div className="p-5 pb-0">
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
                  Bản đồ
                </h3>
              </div>
              <div className="aspect-[16/9]">
                <iframe
                  src={mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Vị trí phòng trọ"
                />
              </div>
            </div>
          </div>

          {/* Right column - CTA sidebar (desktop) */}
          <div className="hidden lg:block">
            <div className="sticky top-24 space-y-4">
              {/* Price card */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <div className="text-sm text-slate-500 mb-1">Giá thuê</div>
                <div className="text-3xl font-extrabold text-orange-600 mb-6">
                  {formatPrice(room.price)}
                </div>

                {/* Zalo CTA */}
                <a
                  href={zaloUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-6 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-base font-bold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 active:scale-[0.98] zalo-pulse"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.49 10.272v-.45h1.347v6.322h-.77a.58.58 0 01-.577-.494l-.048-.326a3.026 3.026 0 01-2.18.94 3.04 3.04 0 01-2.26-.96 3.57 3.57 0 01-.905-2.49c0-.96.31-1.78.92-2.45a3 3 0 012.25-.97c.84 0 1.57.3 2.18.87zm-2.02 4.72c.62 0 1.14-.22 1.56-.66.43-.44.64-.99.64-1.64s-.21-1.2-.64-1.64c-.42-.44-.95-.66-1.56-.66-.62 0-1.14.22-1.57.66-.42.44-.63.99-.63 1.64s.21 1.2.63 1.64c.43.44.95.66 1.57.66z" />
                    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zM4 12c0-4.42 3.58-8 8-8s8 3.58 8 8-3.58 8-8 8-8-3.58-8-8z" />
                  </svg>
                  Nhắn Zalo
                </a>

                <p className="text-center text-xs text-slate-400 mt-3">
                  &ldquo;{DEFAULT_ZALO_MESSAGE}&rdquo;
                </p>
              </div>

              {/* Quick info */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
                <h4 className="text-sm font-semibold text-slate-700 mb-3">Thông tin nhanh</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <span className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center">
                      💰
                    </span>
                    <div>
                      <div className="text-slate-500">Giá thuê</div>
                      <div className="font-medium text-slate-800">{formatPrice(room.price)}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                      📍
                    </span>
                    <div>
                      <div className="text-slate-500">Khu vực</div>
                      <div className="font-medium text-slate-800">{room.district}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                      🏙️
                    </span>
                    <div>
                      <div className="text-slate-500">Thành phố</div>
                      <div className="font-medium text-slate-800">{room.city}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sticky CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200 px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <div className="flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <div className="text-xs text-slate-500">Giá thuê</div>
            <div className="text-lg font-extrabold text-orange-600 truncate">
              {formatPrice(room.price)}
            </div>
          </div>
          <a
            href={zaloUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-bold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg shadow-blue-500/30 active:scale-[0.98] zalo-pulse shrink-0"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.49 10.272v-.45h1.347v6.322h-.77a.58.58 0 01-.577-.494l-.048-.326a3.026 3.026 0 01-2.18.94 3.04 3.04 0 01-2.26-.96 3.57 3.57 0 01-.905-2.49c0-.96.31-1.78.92-2.45a3 3 0 012.25-.97c.84 0 1.57.3 2.18.87zm-2.02 4.72c.62 0 1.14-.22 1.56-.66.43-.44.64-.99.64-1.64s-.21-1.2-.64-1.64c-.42-.44-.95-.66-1.56-.66-.62 0-1.14.22-1.57.66-.42.44-.63.99-.63 1.64s.21 1.2.63 1.64c.43.44.95.66 1.57.66z" />
              <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zM4 12c0-4.42 3.58-8 8-8s8 3.58 8 8-3.58 8-8 8-8-3.58-8-8z" />
            </svg>
            Nhắn Zalo
          </a>
        </div>
      </div>
    </>
  );
}
