'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import AdminLayout from '@/components/AdminLayout';
import RoomForm from '@/components/RoomForm';
import { updateRoom } from '@/lib/mutations';
import { Room } from '@/lib/types';
import { MOCK_ROOMS } from '@/lib/mockData';

export default function EditRoomPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Determine the room data to edit
    const fetchRoom = async () => {
      // In real app, call getRoomById(id)
      const stored = localStorage.getItem('mock_rooms');
      const rooms: Room[] = stored ? JSON.parse(stored) : MOCK_ROOMS;
      const found = rooms.find(r => r.id === id);
      
      if (found) {
        setRoom(found);
      } else {
        alert('Không tìm thấy phòng!');
        router.push('/admin');
      }
      setLoading(false);
    };
    
    if (id) fetchRoom();
  }, [id, router]);

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      await new Promise(res => setTimeout(res, 500));
      await updateRoom(id, data);
      alert('Đã lưu thay đổi!');
      router.push('/admin');
    } catch (err) {
      console.error(err);
      alert('Có lỗi xảy ra, vui lòng thử lại.');
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/admin" className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors inline-flex items-center gap-1 mb-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            Quay lại danh sách
          </Link>
          <h1 className="text-2xl font-bold text-slate-800">Chỉnh sửa phòng</h1>
          <p className="text-slate-500 text-sm mt-1">Cập nhật thông tin phòng trọ</p>
        </div>
        
        {loading ? (
          <div className="text-center py-12 text-slate-500">Đang tải dữ liệu...</div>
        ) : room ? (
          <RoomForm initialData={room} onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        ) : null}
      </div>
    </AdminLayout>
  );
}
