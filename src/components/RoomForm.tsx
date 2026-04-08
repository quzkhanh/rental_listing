'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Room } from '@/lib/types';
import { HO_CHI_MINH_DISTRICTS } from '@/lib/constants';
import { createClient } from '@/utils/supabase/client';

interface RoomFormProps {
  initialData?: Room;
  onSubmit: (data: Partial<Room>) => void;
  isSubmitting: boolean;
}

export default function RoomForm({ initialData, onSubmit, isSubmitting }: RoomFormProps) {
  const router = useRouter();
  
  // Basic info
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    price: initialData?.price?.toString() || '',
    address: initialData?.address || '',
    district: initialData?.district || '',
    city: initialData?.city || '',
    lat: initialData?.lat?.toString() || '10.762622',
    lng: initialData?.lng?.toString() || '106.660172',
    description: initialData?.description || '',
    utilities: initialData?.utilities || '',
  });

  // Images state
  const [existingImages, setExistingImages] = useState<string[]>(initialData?.images || []);
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, '');
    setFormData({ ...formData, price: rawValue });
  };

  const formatPriceForInput = (value: string) => {
    if (!value) return '';
    return new Intl.NumberFormat('vi-VN').format(Number(value));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles((prev) => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };
  
  const removeExistingImage = (index: number) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    
    try {
      const supabase = createClient();
      let uploadedUrls: string[] = [];
      
      // Tải hình ảnh lên Supabase Storage
      for (const file of files) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`; // Lưu thẳng vào thư mục gốc của bucket
        
        const { error: uploadError } = await supabase.storage.from('rooms').upload(filePath, file);
        
        if (uploadError) {
          throw uploadError;
        }
        
        // Lấy link ảnh public
        const { data } = supabase.storage.from('rooms').getPublicUrl(filePath);
        uploadedUrls.push(data.publicUrl);
      }
      
      const allImages = [...existingImages, ...uploadedUrls];

      const parsedPrice = parseInt(formData.price) || 0;

      onSubmit({
        title: formData.title,
        price: parsedPrice,
        address: formData.address,
        district: formData.district,
        city: formData.city,
        lat: parseFloat(formData.lat),
        lng: parseFloat(formData.lng),
        images: allImages,
        description: formData.description,
        utilities: formData.utilities,
      });
      
    } catch (error) {
      console.error('Lỗi khi tải ảnh lên:', error);
      alert('Không thể tải ảnh lên. Vui lòng kiểm tra lại quyền Storage trên Supabase (chạy file storage.sql).');
    } finally {
      setIsUploading(false);
    }
  };

  const isBusy = isSubmitting || isUploading;

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-4">Thông tin cơ bản</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Tiêu đề <span className="text-red-500">*</span></label>
              <input required name="title" value={formData.title} onChange={handleChange} placeholder="Vd: Phòng trọ cao cấp trung tâm Quận 1..." className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 outline-none transition-all" />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Giá thuê (VNĐ/tháng) <span className="text-red-500">*</span></label>
              <div className="relative">
                <input required type="text" name="price" value={formatPriceForInput(formData.price)} onChange={handlePriceChange} placeholder="Vd: 3.500.000" className="w-full px-4 py-3 pr-8 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 outline-none transition-all" />
                {formData.price && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400 pointer-events-none">đ</span>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Quận / Huyện <span className="text-red-500">*</span></label>
              <select required name="district" value={formData.district} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 outline-none transition-all appearance-none">
                <option value="" disabled>Chọn quận huyện</option>
                {HO_CHI_MINH_DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Địa chỉ chi tiết <span className="text-red-500">*</span></label>
              <input required name="address" value={formData.address} onChange={handleChange} placeholder="Vd: 123 Lê Lợi, Phường Bến Thành" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 outline-none transition-all" />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Tiện ích nổi bật cận kề</label>
              <input name="utilities" value={formData.utilities} onChange={handleChange} placeholder="Vd: Gần Đại học Bách Khoa, Lotte Mart..." className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 outline-none transition-all" />
            </div>
          </div>
        </div>

        <hr className="border-slate-100" />

        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-4">Hình ảnh</h3>
          
          <div className="mb-4">
            <label className="block text-sm font-semibold text-slate-700 mb-2">Tải ảnh từ máy tính (có thể chọn nhiều file) <span className="text-red-500">*</span></label>
            <input 
              type="file" 
              multiple 
              accept="image/*" 
              onChange={handleFileChange}
              className="block w-full text-sm text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-xl file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100
                focus:outline-none transition-all
              "
            />
          </div>

          {/* Preview images */}
          {(existingImages.length > 0 || files.length > 0) && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6 p-4 bg-slate-50 rounded-2xl border border-slate-200">
              
              {/* Existing Images */}
              {existingImages.map((url, i) => (
                <div key={`exist-${i}`} className="relative aspect-square rounded-xl overflow-hidden group shadow-sm">
                  <img src={url} alt="Room" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button type="button" onClick={() => removeExistingImage(i)} className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 hover:scale-110 shadow-lg">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/50 backdrop-blur-sm text-[10px] uppercase font-bold text-white rounded-md">Đã Tải Lên</div>
                </div>
              ))}

              {/* New Files Preview */}
              {files.map((file, i) => (
                <div key={`new-${i}`} className="relative aspect-square rounded-xl overflow-hidden group shadow-sm bg-white">
                  <img src={URL.createObjectURL(file)} alt="New upload" className="w-full h-full object-cover opacity-90" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button type="button" onClick={() => removeFile(i)} className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 hover:scale-110 shadow-lg">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-blue-600 text-[10px] uppercase font-bold text-white rounded-md shadow-sm">Ảnh Mới</div>
                </div>
              ))}
            </div>
          )}
          
          {existingImages.length === 0 && files.length === 0 && (
            <p className="text-red-500 text-xs mt-2 font-medium">Vui lòng tải lên ít nhất một hình ảnh!</p>
          )}

        </div>

        <hr className="border-slate-100" />

        <div>
           <h3 className="text-lg font-bold text-slate-800 mb-4">Chi tiết</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Vĩ độ (Latitude)</label>
              <input type="number" step="any" name="lat" value={formData.lat} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 outline-none transition-all" />
              <p className="text-xs text-slate-500 mt-2">Ví dụ: 10.762622</p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Kinh độ (Longitude)</label>
              <input type="number" step="any" name="lng" value={formData.lng} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 outline-none transition-all" />
              <p className="text-xs text-slate-500 mt-2">Ví dụ: 106.660172</p>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Mô tả phòng <span className="text-red-500">*</span></label>
            <textarea required name="description" value={formData.description} onChange={handleChange} rows={6} placeholder="Nhập mô tả chi tiết phòng trọ, điện nước, giờ giấc..." className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 outline-none transition-all leading-relaxed" />
          </div>
        </div>
      </div>

      <div className="flex gap-3 pt-6 border-t border-slate-100">
        <button type="button" onClick={() => router.back()} className="px-6 py-3 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors">
          Hủy bỏ
        </button>
        <button disabled={isBusy || (existingImages.length === 0 && files.length === 0)} type="submit" className={`flex-1 px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold transition-colors shadow-sm
          ${isBusy || (existingImages.length === 0 && files.length === 0) ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700 active:scale-[0.98]'}`}>
          {isUploading ? 'Đang tải ảnh...' : isSubmitting ? 'Đang lưu...' : 'Lưu phòng trọ'}
        </button>
      </div>
    </form>
  );
}
