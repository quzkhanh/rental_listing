'use client';

import { useState, useEffect } from 'react';
import { RoomFilters } from '@/lib/types';
import { HA_NOI_DISTRICTS, HO_CHI_MINH_DISTRICTS } from '@/lib/constants';

interface FilterBarProps {
  districts: string[];
  onFilter: (filters: RoomFilters) => void;
  initialFilters?: RoomFilters;
}

export default function FilterBar({ districts, onFilter, initialFilters }: FilterBarProps) {
  const [keyword, setKeyword] = useState(initialFilters?.keyword || '');
  const [minPrice, setMinPrice] = useState(initialFilters?.minPrice?.toString() || '');
  const [maxPrice, setMaxPrice] = useState(initialFilters?.maxPrice?.toString() || '');
  const [district, setDistrict] = useState(initialFilters?.district || '');
  const [mobileOpen, setMobileOpen] = useState(false);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      applyFilters();
    }, 400);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword]);

  const applyFilters = () => {
    onFilter({
      keyword: keyword.trim() || undefined,
      minPrice: minPrice ? parseInt(minPrice) : undefined,
      maxPrice: maxPrice ? parseInt(maxPrice) : undefined,
      district: district || undefined,
    });
  };

  const clearFilters = () => {
    setKeyword('');
    setMinPrice('');
    setMaxPrice('');
    setDistrict('');
    onFilter({});
  };

  const hasActiveFilters = keyword || minPrice || maxPrice || district;

  const handlePriceChange = (value: string, setter: (val: string) => void) => {
    const rawValue = value.replace(/\D/g, '');
    setter(rawValue);
  };

  const formatPriceForInput = (value: string) => {
    if (!value) return '';
    return new Intl.NumberFormat('vi-VN').format(Number(value));
  };

  const pricePresets = [
    { label: 'Dưới 2 triệu', min: '', max: '2000000' },
    { label: '2-4 triệu', min: '2000000', max: '4000000' },
    { label: '4-6 triệu', min: '4000000', max: '6000000' },
    { label: 'Trên 6 triệu', min: '6000000', max: '' },
  ];

  // Split districts into Hanoi and HCM groups
  const hanoiDistricts = districts.filter(d => HA_NOI_DISTRICTS.includes(d));
  const hcmDistricts = districts.filter(d => HO_CHI_MINH_DISTRICTS.includes(d));
  const otherDistricts = districts.filter(d => !HA_NOI_DISTRICTS.includes(d) && !HO_CHI_MINH_DISTRICTS.includes(d));

  const renderFilterContent = () => (
    <div className="space-y-5">
      {/* Search */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          🔍 Tìm kiếm
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="Tên phòng, địa chỉ..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full px-4 py-3 pl-10 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
          />
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </div>
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          💰 Khoảng giá
        </label>
        {/* Presets */}
        <div className="flex flex-wrap gap-2 mb-3">
          {pricePresets.map((preset) => (
            <button
              key={preset.label}
              onClick={() => {
                setMinPrice(preset.min);
                setMaxPrice(preset.max);
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all ${
                minPrice === preset.min && maxPrice === preset.max
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-600'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
        {/* Custom inputs */}
        <div className="flex gap-3 items-center">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Từ"
              value={formatPriceForInput(minPrice)}
              onChange={(e) => handlePriceChange(e.target.value, setMinPrice)}
              className="w-full px-3 py-2.5 pr-6 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
            />
            {minPrice && <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 pointer-events-none">đ</span>}
          </div>
          <span className="text-slate-300 text-sm font-bold">—</span>
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Đến"
              value={formatPriceForInput(maxPrice)}
              onChange={(e) => handlePriceChange(e.target.value, setMaxPrice)}
              className="w-full px-3 py-2.5 pr-6 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
            />
            {maxPrice && <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 pointer-events-none">đ</span>}
          </div>
        </div>
      </div>

      {/* District */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          📍 Quận / Huyện
        </label>
        <select
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all appearance-none cursor-pointer"
          style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.75rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.25rem 1.25rem' }}
        >
          <option value="">Tất cả quận</option>
          {hanoiDistricts.length > 0 && (
            <optgroup label="🏙️ Hà Nội">
              {hanoiDistricts.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </optgroup>
          )}
          {hcmDistricts.length > 0 && (
            <optgroup label="🏙️ TP. Hồ Chí Minh">
              {hcmDistricts.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </optgroup>
          )}
          {otherDistricts.length > 0 && (
            <optgroup label="📍 Khác">
              {otherDistricts.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </optgroup>
          )}
        </select>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button
          onClick={() => {
            applyFilters();
            setMobileOpen(false);
          }}
          className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md shadow-blue-500/25 active:scale-[0.98]"
        >
          Tìm kiếm
        </button>
        {hasActiveFilters && (
          <button
            onClick={() => {
              clearFilters();
              setMobileOpen(false);
            }}
            className="px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all active:scale-[0.98]"
          >
            Xóa lọc
          </button>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-80 xl:w-[340px] shrink-0 -ml-2 xl:-ml-6">
        <div className="sticky top-24 bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-5 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
            </svg>
            Bộ lọc
          </h2>
          {renderFilterContent()}
        </div>
      </aside>

      {/* Mobile Filter Button */}
      <div className="lg:hidden fixed bottom-20 left-4 z-40">
        <button
          onClick={() => setMobileOpen(true)}
          className="flex items-center gap-2 px-5 py-3 rounded-full bg-white text-slate-700 text-sm font-semibold shadow-xl border border-slate-200 hover:bg-slate-50 transition-all active:scale-95"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
          </svg>
          Bộ lọc
          {hasActiveFilters && (
            <span className="w-2 h-2 rounded-full bg-blue-600" />
          )}
        </button>
      </div>

      {/* Mobile Filter Modal */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 filter-overlay"
            onClick={() => setMobileOpen(false)}
          />

          {/* Modal */}
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl max-h-[85vh] overflow-y-auto animate-slide-up">
            <div className="p-6">
              {/* Handle */}
              <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-6" />

              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-slate-800">Bộ lọc</h2>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {renderFilterContent()}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
