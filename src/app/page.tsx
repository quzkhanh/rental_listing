'use client';

import { useState, useEffect, useCallback } from 'react';
import { Room, RoomFilters } from '@/lib/types';
import RoomCard from '@/components/RoomCard';
import FilterBar from '@/components/FilterBar';
import { ALL_DISTRICTS } from '@/lib/constants';
import { getRooms, getDistricts } from '@/lib/queries';

export default function HomePage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<RoomFilters>({});
  const [districts, setDistricts] = useState<string[]>(ALL_DISTRICTS);

  const fetchRooms = useCallback(async (currentFilters: RoomFilters) => {
    setLoading(true);
    try {
      const [roomsData, districtsData] = await Promise.all([
        getRooms(currentFilters),
        getDistricts(),
      ]);
      setRooms(roomsData || []);
      if (districtsData && districtsData.length > 0) {
        setDistricts(districtsData);
      }
    } catch (error) {
      console.error('Error fetching rooms:', error);
      setRooms([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRooms(filters);
  }, [filters, fetchRooms]);

  const handleFilter = (newFilters: RoomFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 py-16 sm:py-20">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
            Tìm phòng trọ
            <span className="block text-blue-200">nhanh chóng & dễ dàng</span>
          </h1>
          <p className="text-lg text-blue-100/80 max-w-2xl mx-auto mb-8">
            Hàng trăm phòng trọ, căn hộ mini giá tốt.
            Tìm kiếm theo giá, khu vực — liên hệ ngay qua Zalo.
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-8 sm:gap-16">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white">{rooms.length}</div>
              <div className="text-sm text-blue-200/70">Phòng trọ</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white">{districts.length}</div>
              <div className="text-sm text-blue-200/70">Khu vực</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white">24/7</div>
              <div className="text-sm text-blue-200/70">Hỗ trợ</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="flex gap-8">
          {/* Filter Sidebar */}
          <FilterBar
            districts={districts}
            onFilter={handleFilter}
            initialFilters={filters}
          />

          {/* Room Grid */}
          <div className="flex-1 min-w-0">
            {/* Results count */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-800">
                {loading ? 'Đang tìm...' : `${rooms.length} phòng trọ`}
              </h2>
              {!loading && rooms.length > 0 && (
                <span className="text-sm text-slate-500">
                  Mới nhất trước
                </span>
              )}
            </div>

            {/* Loading state */}
            {loading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100">
                    <div className="aspect-[4/3] shimmer" />
                    <div className="p-4 space-y-3">
                      <div className="h-5 w-3/4 rounded shimmer" />
                      <div className="h-4 w-1/2 rounded shimmer" />
                      <div className="h-3 w-1/3 rounded shimmer" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Empty state */}
            {!loading && rooms.length === 0 && (
              <div className="text-center py-20">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-slate-100 flex items-center justify-center">
                  <svg className="w-10 h-10 text-slate-300" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-700 mb-2">
                  Không tìm thấy phòng
                </h3>
                <p className="text-slate-500 text-sm max-w-sm mx-auto">
                  Hãy thử thay đổi bộ lọc hoặc từ khóa tìm kiếm để xem thêm kết quả.
                </p>
              </div>
            )}

            {/* Room grid */}
            {!loading && rooms.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 stagger-children">
                {rooms.map((room) => (
                  <RoomCard key={room.id} room={room} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
