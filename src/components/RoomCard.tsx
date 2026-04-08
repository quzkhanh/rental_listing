'use client';

import Link from 'next/link';
import { Room } from '@/lib/types';
import { formatPriceShort, truncateText } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { ZALO_PHONE, DEFAULT_ZALO_MESSAGE } from '@/lib/constants';
import { getZaloLink } from '@/lib/utils';

interface RoomCardProps {
  room: Room;
}

export default function RoomCard({ room }: RoomCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [isHot, setIsHot] = useState(false);

  useEffect(() => {
    // Randomize hot badge
    setIsHot(Math.random() > 0.6);
  }, []);

  const thumbnail = room.images?.[0] || '';

  const getDistrictUtility = (room: Room) => {
    const text = `${room.title} ${room.address} ${room.district}`.toLowerCase();
    
    // Core locations mapping
    if (text.includes('tô ký') || text.includes('quang trung') || text.includes('q12') || text.includes('quận 12')) return 'Gần CV Phần mềm Quang Trung';
    if (text.includes('sư vạn hạnh') || text.includes('lý thường kiệt') || text.includes('bách khoa') || text.includes('đh y dược')) return 'Gần ĐH Bách Khoa / Y Dược';
    if (text.includes('làng đại học') || text.includes('trại súc vật') || text.includes('suối tiên') || text.includes('linh trung')) return 'Gần Làng Đại Học Quốc Gia';
    if (text.includes('lotte') || text.includes('rmit') || text.includes('tôn đức thắng') || text.includes('nguyễn hữu thọ')) return 'Gần Lotte Mart / ĐH RMIT';
    if (text.includes('bạch đằng') || text.includes('hàng xanh') || text.includes('xô viết') || text.includes('d2') || text.includes('bình thạnh')) return 'Cách Q1 chỉ 5 phút đi xe';
    if (text.includes('sân bay') || text.includes('tân sơn nhất') || text.includes('trường sơn') || text.includes('phổ quang')) return 'Cách Sân bay TSN 5 phút';
    if (text.includes('gò vấp') || text.includes('phan văn trị') || text.includes('emart') || text.includes('phạm văn đồng')) return 'Gần Emart / Vincom Gò Vấp';
    if (text.includes('bến xe miền đông') || text.includes('hoàng hoa thám')) return 'Gần Bến xe Miền Đông';
    
    // Fallback safe defaults based on district parsing
    if (text.includes('quận 1') || text.includes('quận 3') || text.includes('quận 4')) return 'Khu vực Trung tâm kết nối';
    if (text.includes('quận 10') || text.includes('quận 5')) return 'Khu sầm uất, nhiều hàng quán ăn uống';
    
    return 'Gần chợ truyền thống, siêu thị 24h';
  };

  return (
    <div className="room-card bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-slate-100 flex flex-col h-full transition-all">
      <Link href={`/room/${room.id}`} className="relative aspect-[4/3] overflow-hidden bg-slate-100 block group">
        {!imageLoaded && !imgError && (
          <div className="absolute inset-0 shimmer" />
        )}
        {thumbnail && !imgError ? (
          <img
            src={thumbnail}
            alt={room.title}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImgError(true)}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
            <svg className="w-12 h-12 text-slate-300" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v13.5A1.5 1.5 0 003.75 21z" />
            </svg>
          </div>
        )}

        {/* Price badge */}
        <div className="absolute bottom-3 left-3">
          <span className="inline-flex px-3 py-1.5 rounded-lg bg-white/95 backdrop-blur-sm text-sm font-bold text-orange-600 shadow-lg">
            {formatPriceShort(room.price)}
          </span>
        </div>

        {/* Hot Badge */}
        {isHot && (
          <div className="absolute top-3 left-3 z-10 animate-pulse">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-red-500 text-xs font-bold text-white shadow-lg">
              🔥 Đang Hot
            </span>
          </div>
        )}

        {/* Image count badge */}
        {room.images && room.images.length > 1 && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-black/50 backdrop-blur-sm text-xs text-white">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v13.5A1.5 1.5 0 003.75 21z" />
              </svg>
              {room.images.length}
            </span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <Link href={`/room/${room.id}`} className="block mb-2 group">
          <h3 className="text-base font-semibold text-slate-800 leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
            {room.title}
          </h3>
        </Link>

        <div className="flex flex-col gap-1.5 mb-auto">
          <div className="flex items-start gap-1.5 text-slate-500">
            <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            <span className="text-sm leading-snug">
              {truncateText(room.address, 40)}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-400">
            <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
            </svg>
            <span className="text-xs font-medium">{room.district}</span>
          </div>
          
          <div className="flex items-center gap-1.5 text-slate-500">
            <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
            </svg>
            <span className="text-xs font-medium text-emerald-600">{getDistrictUtility(room)}</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="mt-4 flex gap-2">
          <a href={`tel:${ZALO_PHONE}`} className="flex-1 py-1.5 bg-green-50 text-green-600 rounded-lg text-xs font-bold text-center hover:bg-green-100 transition-colors shadow-sm">
            📞 Gọi ngay
          </a>
          <a href={getZaloLink(ZALO_PHONE, `${DEFAULT_ZALO_MESSAGE} - ${room.title}`)} target="_blank" rel="noopener noreferrer" className="flex-1 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold text-center hover:bg-blue-100 transition-colors shadow-sm">
            💬 Nhắn Zalo
          </a>
        </div>
      </div>
    </div>
  );
}
