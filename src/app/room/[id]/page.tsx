'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Room } from '@/lib/types';
import { ZALO_PHONE, DEFAULT_ZALO_MESSAGE } from '@/lib/constants';
import { formatPrice, getZaloLink, getGoogleMapsEmbedUrl } from '@/lib/utils';
import ImageGallery from '@/components/ImageGallery';
import { getRoomById, getSimilarRooms } from '@/lib/queries';
import RoomCard from '@/components/RoomCard';

export default function RoomDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);

  const [similarRooms, setSimilarRooms] = useState<Room[]>([]);
  const [viewersCount, setViewersCount] = useState<number>(0);

  useEffect(() => {
    setViewersCount(Math.floor(Math.random() * 5) + 2);
  }, []);

  useEffect(() => {
    async function fetchRoom() {
      setLoading(true);
      try {
        const data = await getRoomById(id);
        setRoom(data);
        if (data && data.district) {
          const similar = await getSimilarRooms(data.district, data.id);
          setSimilarRooms(similar);
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
              <div className="text-2xl sm:text-3xl font-extrabold text-orange-600 break-all" title={formatPrice(room.price)}>
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
                <div className="text-2xl font-extrabold text-orange-600 mb-6 break-all leading-tight" title={formatPrice(room.price)}>
                  {formatPrice(room.price)}
                </div>

                <div className="space-y-3">
                  <a
                    href={`tel:${ZALO_PHONE}`}
                    className="flex items-center justify-center gap-2 w-full px-6 py-4 rounded-xl bg-green-500 text-white text-base font-bold hover:bg-green-600 transition-all shadow-lg active:scale-[0.98]"
                  >
                    📞 Gọi điện trực tiếp
                  </a>
                  <div className="flex gap-3">
                    <a
                      href={zaloUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full px-6 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-base font-bold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 active:scale-[0.98] zalo-pulse"
                    >
                      💬 Nhắn Zalo
                    </a>
                    <a
                      href={`sms:${ZALO_PHONE}?body=${encodeURIComponent(DEFAULT_ZALO_MESSAGE + ' - ' + room.title)}`}
                      className="flex items-center justify-center gap-2 w-full px-6 py-4 rounded-xl bg-slate-100 text-slate-700 text-base font-bold hover:bg-slate-200 transition-all shadow-md active:scale-[0.98]"
                    >
                      ✉️ Gửi SMS
                    </a>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-red-50 rounded-xl border border-red-100 flex items-center justify-center gap-2 text-red-600 text-sm font-semibold animate-pulse">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                  </svg>
                  Đang có {viewersCount} người cũng quan tâm phòng này!
                </div>

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
                    <div className="min-w-0 flex-1">
                      <div className="text-slate-500">Giá thuê</div>
                      <div className="font-medium text-slate-800 break-all">{formatPrice(room.price)}</div>
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

        {/* Similar Rooms */}
        {similarRooms.length > 0 && (
          <div className="mt-12 pt-8 border-t border-slate-200">
            <h3 className="text-xl font-bold text-slate-800 mb-6">
              Các phòng trọ tương tự khu vực {room.district}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarRooms.map((similarRoom) => (
                <RoomCard key={similarRoom.id} room={similarRoom} />
              ))}
            </div>
          </div>
        )}
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
          <div className="flex gap-2">
            <a
              href={`tel:${ZALO_PHONE}`}
              className="flex items-center justify-center w-12 py-3 rounded-xl bg-green-500 text-white hover:bg-green-600 transition-all shadow-lg active:scale-[0.98] shrink-0"
            >
              📞
            </a>
            <a
              href={zaloUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-bold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg shadow-blue-500/30 active:scale-[0.98] zalo-pulse shrink-0"
            >
              💬 Zalo
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
